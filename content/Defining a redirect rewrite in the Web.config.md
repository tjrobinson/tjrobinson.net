# Defining a redirect/rewrite in the Web.config

```
<?xml version="1.0"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="Index Request" enabled="true" stopProcessing="true">
          <match url="^$"/>
          <action type="Rewrite" url="App/app.html" logRewrittenUrl="true"/>
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>`
```

