---
tags:
  - parkrun
  - web
  - scraping
date: 2026-07-04
---
I had an idea for a fun webpage which relies on scraping parkrun data for a specified parkrunner ID. Unfortunately it wasn't possible. These notes might help others to avoid attempting to do the same.

**Conclusion: it isn't possible from a purely client-side page.** parkrun deliberately blocks every programmatic route to its data.

## The blockers (all verified by testing)

- **No CORS headers.** Profile pages (`parkrun.org.uk/parkrunner/<id>/`) send no `Access-Control-Allow-Origin`, so a cross-origin `fetch()` succeeds at the network level but the browser refuses to let JavaScript read the response.
- **`X-Frame-Options: DENY`.** Profile pages cannot be iframed at all.
- **User-agent filtering.** Requests without a browser user-agent get 403 (served by `awselb`, i.e. an AWS WAF in front of the site).
- **Datacenter IP blocklisting.** Requests from cloud provider IP ranges are blocked even with a browser user-agent: Cloudflare Workers receive HTTP 450; requests from GCP/AWS-hosted services are silently dropped (connection timeout).
- **Terms of use** explicitly prohibit scraping — the technical blocks are intentional, so workarounds are fragile by design.

## Options tried and why they fail

### 1. Direct `fetch()` from the page
Blocked by CORS (no `Access-Control-Allow-Origin` header). The browser withholds the response body from JavaScript.

### 2. Hidden iframe
Fails twice over: `X-Frame-Options: DENY` stops the iframe rendering at all, and even without that, the same-origin policy prevents the parent page reading a cross-origin iframe's DOM.

### 3. Web Worker / Service Worker in the browser
No help — CORS is enforced by the browser's network stack, not the main thread. Every in-browser context (workers, service workers, WASM, iframes) is bound by the same rules. `fetch(url, {mode: "no-cors"})` returns an opaque response with an unreadable body.

### 4. Public CORS proxies
corsproxy.io returned 403; codetabs and allorigins timed out (522) — their datacenter IPs are dropped by parkrun's WAF. Also unreliable and a privacy risk even when they work.

### 5. Cloudflare Worker proxy
Built and worked perfectly in local dev (egress from my residential IP). Deployed to Cloudflare's edge, parkrun answered **HTTP 450** — Cloudflare's egress IPs are explicitly blocked. The code was fine; the exit point was the problem.

### 6. Other serverless hosts (Vercel, Deno Deploy, etc.)
Not deployed, but probes showed GCP- and AWS-hosted services get silently dropped, so the datacenter block is wholesale, not Cloudflare-specific. Any free serverless platform egresses from blocked ranges.

### 7. parkrun.js / the private mobile API (`api.parkrun.com`)
The [parkrun.js](https://parkrun.js.org/) library wraps parkrun's reverse-engineered mobile-app API. Verified it's no escape route: the API returns 401 without OAuth (which requires a real parkrun account password — unusable in a public page), sends no CORS headers (preflight `OPTIONS` returns 404), is also datacenter-IP-blocked, and the library was last updated Feb 2023. Riskier ToS-wise than scraping public pages, for no gain.

## What *would* work (and why I didn't)

- **Home proxy + Cloudflare Tunnel.** A small Node proxy on a home machine (residential IP + browser user-agent gets 200 reliably), exposed via a free `cloudflared` tunnel. Fully delivers live lookups, but needs an always-on machine.
- **Tampermonkey userscript / browser extension.** Extensions with host permissions are exempt from CORS, so a userscript can fetch and parse profiles directly. Zero servers — but only works where it's installed, so useless for anonymous visitors.
- **Build-time fetch via GitHub Actions.** A scheduled workflow commits stats as JSON for the static page. Not live, only practical for known IDs, and Actions runs from Azure IPs which may also be blocked (untested).

## Bottom line

A residential IP plus a browser user-agent is the only thing parkrun's WAF trusts, and a static web page has no way to borrow one. Anything that makes "live stats for any ID" work requires either infrastructure at home or software installed in the visitor's browser.