---
title: Laptop battery performance fixes
date: 2026-06-20
tags:
  - linux
  - hardware
---
# Laptop Battery Performance — Fixes & Reference

**Last updated**: 2026-06-20

This is the single source of truth for the battery-performance work on this laptop.
It documents what was wrong, what was changed, how to verify it, and how to pick
things back up if the problem returns.

---

## System

| | |
|---|---|
| Model | HP Pavilion Laptop 15-eh0xxx |
| CPU | AMD Ryzen 7 4700U (Zen 2 / "Renoir", 8 cores, 15 W nominal) |
| GPU | AMD Radeon RX Vega 6 (integrated) |
| OS | Linux Mint 22.3 |
| Kernel | 6.17.0-35-generic |
| BIOS / EC | AMI F.17 / EC 35.50 |
| Power manager | TLP 1.10.1 (`thermald` present but inactive) |
| CPU freq driver | `acpi-cpufreq` (P-states: 1.4 / 1.7 / 2.0 GHz) |
| Disk encryption | LUKS on `/dev/nvme0n1p3` (`nvme0n1p3_crypt`), **typed passphrase** (no TPM auto-unlock) |

---

## Symptom & root cause

**Symptom**: noticeably slow when running on battery; also a brief screen blackout when unplugging.

**Root cause (confirmed)**: on battery the platform/EC applied a **power-saving boost-clock bias** to the CPU's SMU (System Management Unit), holding clock speeds down **even though full power and thermal budget were available**. It was *not* a TDP cap, governor, or thermal issue.

Proof, from `ryzenadj --info` taken on battery:

| SMU limit | Value on battery | Reading |
|---|---|---|
| STAPM (sustained power) | 15.0 W | full nominal — not reduced |
| PPT FAST / SLOW (burst) | 30 W / 25 W | generous |
| TDC / EDC (current) | 33 A / 50 A | not constrained |
| Thermal limit (tctl) | 100 °C (running ~50 °C) | huge headroom |
| **CCLK Boost SETPOINT** | **95** | **biased toward power-saving — the culprit** |

Power, current and thermals were all wide open; only the boost *bias* was throttling clocks. `ryzenadj --max-performance` overrides that bias.

**Diagnostic clue that pointed here**: single-thread slowdown on battery (1.60×) was *worse* than all-core (1.43×). A power/TDP cap hits all-core hardest — the opposite — so the limit had to be boost-clock, not power budget. `--info` then confirmed it.

---

## Benchmark used throughout

sqrt+log loop: all-core (8 threads × 3M) and single-thread (5M).

```python
python3 -c "
import time, math, multiprocessing as mp
def work(n):
    x=0.0
    for i in range(1,n): x+=math.sqrt(i)*math.log(i)
    return x
N=3_000_000
s=time.perf_counter()
with mp.Pool(8) as p: p.map(work,[N]*8)
print(f'8x parallel: {time.perf_counter()-s:.3f}s')
s=time.perf_counter(); work(5_000_001)
print(f'single 5M:   {time.perf_counter()-s:.3f}s')
"
```

Results (single boot, same battery, before vs after the fix):

| | Battery BEFORE | Battery AFTER `--max-performance` | AC reference |
|---|---|---|---|
| All-core | 0.527s | **0.383s** | 0.382s |
| Single-thread | 0.746s | **0.444s** | 0.454s |

→ The fix closes the AC↔battery gap entirely (27–40% faster on battery).

---

## Changes applied (these are the fixes that worked)

### 1. PRIMARY FIX — ryzenadj `--max-performance`, persistent via systemd

This is what actually solved the slowness.

**Prerequisite that had to be done first — Secure Boot disabled.**
ryzenadj writes directly to the SMU over PCI/`/dev/mem`. With Secure Boot on, the
kernel runs in **lockdown `integrity` mode**, which blocks that (log:
`Lockdown: ryzenadj: direct PCI access is restricted`). **Secure Boot was turned
off in BIOS** (Security tab → reboot, Esc → F10 to enter setup).
- Safe for this machine: LUKS uses a **typed passphrase** (`/etc/crypttab` key field
  is `none`), not TPM auto-unlock, so the key is not sealed to Secure Boot state.
  Disabling Secure Boot does not touch the encrypted disk and is fully reversible.
- After disabling, confirm: `cat /sys/kernel/security/lockdown` → `[none]`,
  `mokutil --sb-state` → `SecureBoot disabled`.

**ryzenadj install.** Built from source (<https://github.com/FlyGoat/RyzenAdj>,
v0.19.0). Build deps: `cmake libpci-dev` (plus `gcc`, `git`). Binary installed at
`/usr/local/bin/ryzenadj` (a copy is also at `/home/tom/ryzenadj`).
Rebuild from scratch if ever needed:
```bash
sudo apt install -y cmake libpci-dev git
cd /tmp && git clone --depth 1 https://github.com/FlyGoat/RyzenAdj.git
cd RyzenAdj && mkdir build && cd build && cmake .. && make
sudo cp ryzenadj /usr/local/bin/ryzenadj
```

**systemd units** (in `/etc/systemd/system/`):

`ryzenadj.service`:
```ini
[Unit]
Description=Apply ryzenadj max-performance (lift battery boost bias)

[Service]
Type=oneshot
ExecStart=/usr/local/bin/ryzenadj --max-performance
```

`ryzenadj.timer` — applies at boot and re-applies every 2 min (the EC can re-assert
the bias on power-source changes, so periodic re-application keeps it stuck):
```ini
[Unit]
Description=Re-apply ryzenadj max-performance at boot and periodically

[Timer]
OnBootSec=15
OnUnitActiveSec=2min
AccuracySec=10s

[Install]
WantedBy=timers.target
```

Enabled with:
```bash
sudo systemctl daemon-reload
sudo systemctl enable --now ryzenadj.timer
```

**Important**: `--max-performance` does **not** raise any power/current/thermal limit
(they stay 15 W / 30 W / 100 °C). It only removes the boost *bias*, so risk is low.

**Trade-off**: the CPU now boosts freely on battery → faster, but draws more under
load and shortens runtime. "Always-on" was chosen deliberately for speed. For maximum
runtime on a long unplugged session: `sudo systemctl disable --now ryzenadj.timer`
(re-enable later with `enable --now`).

### 2. CPU governor on battery — `/etc/tlp.conf`
```ini
CPU_SCALING_GOVERNOR_ON_AC=performance
CPU_SCALING_GOVERNOR_ON_BAT=schedutil
CPU_SCALING_GOVERNOR_ON_SAV=schedutil
```
Replaces TLP's default `powersave` (which pinned cores at the 1.4 GHz minimum).
`schedutil` runs full speed under load and drops clocks at idle. Minor now that the
boost fix is in place, but correct.

### 3. Screen blackout on unplug — `/etc/tlp.conf`
```ini
RUNTIME_PM_DRIVER_DENYLIST="amdgpu mei_me nouveau nvidia xhci_hcd"
```
Stops TLP runtime-suspending the AMD GPU on battery, which was briefly dropping the
display signal when unplugging.

### 4. WiFi power-save off on battery — `/etc/tlp.conf`
```ini
WIFI_PWR_ON_BAT=off
```
TLP enabled WiFi power-saving on battery by default, adding browsing latency that
fed the "feels slow" impression.

(Apply TLP changes without reboot: `sudo tlp bat` while on battery, or `sudo tlp start`.)

---

## How to verify everything is healthy

```bash
# Boost fix live? (run on battery)
sudo /usr/local/bin/ryzenadj --info        # check CCLK Boost SETPOINT / clocks; STAPM should be 15W
systemctl status ryzenadj.timer            # should be: enabled, active (running)
systemctl status ryzenadj.service          # last run: status=0/SUCCESS

# Security / lockdown state
mokutil --sb-state                         # SecureBoot disabled
cat /sys/kernel/security/lockdown          # [none]

# TLP state
grep -vE '^#|^$' /etc/tlp.conf             # confirm the 4 settings above are present
cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor   # schedutil on battery

# Re-run the benchmark (see section above) — battery should ≈ AC (~0.38 / ~0.45)
```

---

## If the slowness returns — resume here

1. **Confirm the timer is still enabled/active** (`systemctl status ryzenadj.timer`).
   If a kernel/OS update or manual change disabled it: `sudo systemctl enable --now ryzenadj.timer`.
2. **Confirm Secure Boot is still disabled** (`mokutil --sb-state`). A BIOS update or
   reset can silently re-enable it → lockdown returns → ryzenadj fails with
   `direct PCI access is restricted`. Re-disable in BIOS.
3. **Confirm the binary still exists** at `/usr/local/bin/ryzenadj` and runs:
   `sudo /usr/local/bin/ryzenadj --info`. If an OS upgrade changed things, rebuild
   (commands above). A backup copy is at `/home/tom/ryzenadj`.
4. **Manually re-apply and re-benchmark on battery** to isolate whether ryzenadj is
   the issue: `sudo /usr/local/bin/ryzenadj --max-performance` then run the benchmark.
   If battery now ≈ AC, the fix works and something had disabled it.
5. **If `--max-performance` no longer closes the gap**, the platform may have changed
   behaviour (BIOS update, different EC state from booting on AC vs battery). Re-check
   `ryzenadj --info`: if STAPM/PPT are *also* now reduced on battery, that's a genuine
   new power cap and you'd raise limits (e.g. `--stapm-limit 15000 --fast-limit 30000
   --slow-limit 25000`) — but only with care for heat/battery.
6. **Watch temperatures** under sustained load (`ryzenadj --info` → THM VALUE CORE, or
   `sensors`). The 4700U + thin chassis means cooling, not power, is the realistic ceiling.

---

## Theories investigated and ruled out (brief — don't re-chase these)

- **BIOS/firmware TDP reduction on battery** — disproven; `ryzenadj --info` shows full 15 W / 30 W on battery.
- **CPU governor** — under load all governors hit the same firmware ceiling; not the cause (still set `schedutil` as good practice).
- **Thermal throttling** — ruled out; 50–61 °C throughout vs 100 °C limit.
- **40 Hz panel on battery** — ruled out; display stays 60 Hz on battery.
- **`amd_pstate` driver** — unavailable: BIOS lacks CPPC/`_CPC` ACPI tables
  (`amd_pstate: the _CPC object is not present in SBIOS`); kernel falls back to
  `acpi-cpufreq`. `amd_pstate=passive` was tried in GRUB and reverted.
- **BIOS "Battery Health Optimizer"** — controls charge level only, not performance.
- **BIOS update** — already latest (AMI F.17); none available via `fwupdmgr`.

---

## How to undo

- Disable the boost fix: `sudo systemctl disable --now ryzenadj.timer`
  (and optionally remove `/etc/systemd/system/ryzenadj.{service,timer}` + `daemon-reload`).
- Re-enable Secure Boot: toggle in BIOS Security tab. Encryption unaffected.
- Revert TLP changes: re-comment the four edited lines in `/etc/tlp.conf`, then `sudo tlp start`.

## Possible future improvements (not done)
- Make ryzenadj apply only on battery, or via a power-source udev hook, if runtime matters.
- ryzenadj undervolt / curve optimiser for efficiency — deliberately skipped (stability risk).
- If HP ships a BIOS with CPPC tables, `amd_pstate` would unlock finer control.
