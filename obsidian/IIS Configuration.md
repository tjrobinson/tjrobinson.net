---
title: IIS Configuration
date: "2012-07-06"
---

We recently needed to make sure that anonymous authentication was enabled (at the IIS level) for an application, regardless of the defaults or configuration of the server the application was being installed on.

To do this you can add the following (as a sibling of <system.web>) in the Web.config to make the required IIS authentication settings explicit:

<pre class="csharpcode"><span class="kwrd">&lt;</span><span class="html">system.webServer</span><span class="kwrd">&gt;</span>
      <span class="kwrd">&lt;</span><span class="html">security</span><span class="kwrd">&gt;</span>
         <span class="kwrd">&lt;</span><span class="html">authentication</span><span class="kwrd">&gt;</span>
            <span class="kwrd">&lt;</span><span class="html">anonymousAuthentication</span> <span class="attr">enabled</span><span class="kwrd">="true"</span> <span class="kwrd">/&gt;</span>
         <span class="kwrd">&lt;/</span><span class="html">authentication</span><span class="kwrd">&gt;</span>
      <span class="kwrd">&lt;/</span><span class="html">security</span><span class="kwrd">&gt;</span>
   <span class="kwrd">&lt;/</span><span class="html">system.webServer</span><span class="kwrd">&gt;</span></pre>

This will override any settings made in the IIS Manager and the applicationHost.config file.

Whilst on this subject, it’s worth mentioning that you can also configure IIS on the command line using something like this:

<pre class="csharpcode">appcmd.exe set config "Contoso"
    -section:system.webServer/security/authentication/windowsAuthentication
    /enabled:"True"
    /commit:apphost</pre>

There is lots more inforomation about the various settings here:  
<http://www.iis.net/ConfigReference/system.webServer/security>

However, we hit a slight snag with this.

Although we can put the setting in the web.config, the default IIS permissions prevent this particular set of settings from being modifed in the web.config unless you explicitly enable these settings to be delegated to the web.config.

See:  
<http://learn.iis.net/page.aspx/159/configuring-remote-administration-and-feature-delegation-in-iis-7/>

Given that anonymous authentication is enabled by default (unless we’ve changed it as part of the machine image) then for this particular case we felt that it would be simplest just to assume that IIS is set up correctly. We would soon notice if this wasn’t the case.

The better long-term solution would be to make sure that we set up the IIS delegation permissions as part of machine/image setup - to allow us to configure this setting and others in the web.config. This can be done via the command line so could be part of a server setup script.
