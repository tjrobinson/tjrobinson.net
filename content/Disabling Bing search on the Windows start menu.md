---
tags:
  - windows
---
# Disabling Bing search on the Windows start menu

Disabling web search on the start menu makes it so much faster and more effective. No lag at all anymore!

1. Open `regedit` and navigate to:

   ```text
   HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Search
   ```

2. Create a new DWORD (32-bit) value called `BingSearchEnabled`.
3. Ensure the value is `0`.

## See also

- [[Windows Setup]]
