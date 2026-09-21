---
tags:
  - home-assistant
  - reading-buses
---
# Reading Buses Home Assistant Sensor

A Home Assistant sensor and dashboard card showing live "next bus" times for a specific stop and route, sourced directly from Reading Buses' own live-tracking API.

## Overview

- **Stop/route/direction**: configured via constants in the script (see Maintenance below) — not repeated here
- **Sensor entity**: `sensor.next_bus_live`
- **Refresh**: every 60 seconds
- **Dashboard**: a "Buses" section on the Home view showing the current time, minutes until the next bus, the next 5 departures, and a "last updated X ago" line

## Architecture

Home Assistant has no built-in integration for Reading Buses' live-tracking API, so the sensor is a `command_line:` platform that shells out to a small Python script on every poll:

1. HA runs `python3 /config/scripts/next_bus.py` every 60s (standard library only, no extra dependencies to install).
2. The script calls the Stop Predictions endpoint on Reading Buses' open data platform, R2P (`reading-opendata.r2p.com`), for the target stop.
3. The API returns **SIRI-SM**, a standard transit XML format — not JSON, so Home Assistant's built-in `rest:` sensor (JSON only) couldn't be used directly.
4. The script parses the XML, filters to the configured route/destination, and prints a small JSON payload to stdout: `{"next_buses": [{route, direction, scheduled, estimated}, ...]}`.
5. Home Assistant reads that JSON via `value_template` (the sensor state = minutes to the next bus) and `json_attributes` (the full list, used by the dashboard card).

```yaml
command_line:
  - sensor:
      name: "Next Bus Live"
      command: "python3 /config/scripts/next_bus.py"
      command_timeout: 20
      scan_interval: 60
      icon: "mdi:bus"
      unit_of_measurement: "min"
      value_template: >-
        {% set buses = value_json.next_buses %}
        {% if buses %}
          {{ ((as_datetime(buses[0].estimated) - now()).total_seconds() / 60) | round(0, 'floor') | int }}
        {% else %}
          unknown
        {% endif %}
      json_attributes:
        - next_buses
```

The script itself lives at `/config/scripts/next_bus.py` on the Home Assistant box (not in source control) and holds the R2P API token as a constant — `command_line`'s `command:` field can't cleanly reference `!secret`, so it isn't in `secrets.yaml` like most other credentials.

## Dashboard card

A markdown card on the Home dashboard renders the sensor's `next_buses` attribute:

```
**{{ now().strftime('%H:%M') }}** next bus in **{{ states('sensor.next_bus_live') | int(0) }} min**

{% for bus in (state_attr('sensor.next_bus_live', 'next_buses') or [])[:5] %}
{% set t = as_datetime(bus.estimated) %}
{% set mins = ((t - now()).total_seconds() / 60) | round(0) | int %}
- **{{ t.strftime('%H:%M') }}** ({{ mins }} min) — {{ bus.route }} to {{ bus.direction }}
{% endfor %}

<sub>Updated {{ relative_time(states.sensor.next_bus_live.last_reported) }} ago</sub>
```

`last_reported` (rather than `last_updated`) is used for the timestamp so it reflects every poll, not just polls where the displayed minute value happened to change.

## Why this route

- The original [ReadingBusesMonitor](https://github.com/tjrobinson/ReadingBusesMonitor) side project used Reading Buses' old API (`rtl2.ods-live.co.uk`), which is now dead — the hostname doesn't even resolve any more.
- First attempt: Home Assistant's built-in `uk_transport` integration with TransportAPI. It worked, but TransportAPI's free tier caps out at 30 requests/day, and even halving the poll rate to stay under that still led to rate limiting in practice. That integration was later removed entirely — config and secrets deleted, not just disabled.
- Final solution: Reading Buses' own open data platform (R2P) has a Stop Predictions API with genuine live ETAs (including delay data) and no comparably tight cap — worth the extra effort of a custom `command_line` script since there's no ready-made Home Assistant integration for it.

## Maintenance

- **Change stop/route/destination**: edit the `ATCOCODE` / `ROUTE_FILTER` / `DESTINATION_FILTER` constants at the top of `/config/scripts/next_bus.py`. Script-only edits don't need a Home Assistant restart — it just re-runs the command on the next poll.
- **Debug**: run `python3 /config/scripts/next_bus.py` directly on the box. It never raises — failures are reported in an `error` key in its JSON output instead.
- **Config changes**: validate with `POST /api/config/core/check_config` before restarting Home Assistant to apply them.

## See also

- [[APIs]]
