---
title: This version of ChromeDriver only supports Chrome version 76
date: "2019-09-22"
---

This blog post is for anyone getting this error when

When using managed agent.

```
[07:43:32] I/launcher - Running 1 instances of WebDriver
[07:43:32] I/direct - Using ChromeDriver directly...
[07:43:35] E/runner - Unable to start a WebDriver session.
[07:43:35] E/launcher - Error: SessionNotCreatedError: session not created: This version of ChromeDriver only supports Chrome version 76
  (Driver info: chromedriver=76.0.3809.12 (220b19a666554bdcac56dff9ffd44c300842c933-refs/branch-heads/3809@{#83}),platform=Windows NT 10.0.17763 x86_64)
    at Object.checkLegacyResponse (d:\a\1\s\test\Empactis.HRCM.UITests\node_modules\selenium-webdriver\lib\error.js:546:15)
    at parseHttpResponse (d:\a\1\s\test\Empactis.HRCM.UITests\node_modules\selenium-webdriver\lib\http.js:509:13)
    at doSend.then.response (d:\a\1\s\test\Empactis.HRCM.UITests\node_modules\selenium-webdriver\lib\http.js:441:30)
    at <anonymous>
    at process._tickCallback (internal/process/next_tick.js:188:7)
[07:43:35] E/launcher - Process exited with error code 100
```

See which Azure Pipelines image is using:

https://github.com/microsoft/azure-pipelines-image-generation/blob/master/images/win/Vs2019-Server2019-Readme.md#google-chrome

```
(Get-Item "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe").VersionInfo
```

Get the appropriate ChromeDriver version from here:

https://chromedriver.chromium.org/downloads

Download a specific version

https://github.com/angular/webdriver-manager/blob/legacy/docs/versions.md#download-a-specific-version

Don't use the global version as protractor uses the local

```
node_modules\.bin\webdriver-manager update --gecko false --standalone false --versions.chrome 75.0.3770.140
```

```
node_modules\.bin\webdriver-manager status
```

Example output on Azure Pipelines.

```
[10:06:31] I/status - selenium standalone version available: 3.141.59 [last]
[10:06:31] I/status - chromedriver versions available: 75.0.3770.140 [last], 76.0.3809.12
[10:06:31] I/status - geckodriver version available: v0.25.0 [last]
[10:06:31] I/status - IEDriverServer is not present
[10:06:31] I/status - android-sdk is not present
[10:06:31] I/status - appium is not present
```
