---
id: 264
title: 'RavenDB: CryptographicException &#038; FormatException: Input string was not in a correct format'
date: 2017-01-13T08:55:11+00:00
author: Tom
layout: post
guid: http://www.tjrobinson.net/?p=264
permalink: /?p=264
categories:
  - Uncategorized
---
If you get an error similar to the below and are using encrypted databases, make sure that you&#8217;re running the RavenDB process as the same user you were when the databases were created/encrypted.

The encryption keys are stored in per-user stores by Windows so if you created the database while RavenDB was running as a Windows Service (as LOCAL SYSTEM) and then later run RavenDB directly using Raven.Server.exe it will be running as the logged in user, not LOCAL SYSTEM and won&#8217;t have access to the encryption keys.

<pre>Raven.Database.Server.Tenancy.AbstractLandlord`1,Warn,,45,Could not unprotect secured db data Raven/Encryption/EncryptIndexes setting the value to '&lt;data could not be decrypted&gt;',"System.Security.Cryptography.CryptographicException: Key not valid for use in specified state.
   at System.Security.Cryptography.ProtectedData.Unprotect(Byte[] encryptedData, Byte[] optionalEntropy, DataProtectionScope scope)
   at Raven.Database.Server.Tenancy.DatabasesLandlord.Unprotect(DatabaseDocument databaseDocument) in c:\Builds\RavenDB-Stable-3.0\Raven.Database\Server\Tenancy\DatabaseLandlord.cs:line 283
Raven.Database.Server.Controllers.RavenDbApiController,Warn,,45,Could not open database named: XXXX Input string was not in a correct format.,"System.FormatException: Input string was not in a correct format.
   at System.Number.StringToNumber(String str, NumberStyles options, NumberBuffer& number, NumberFormatInfo info, Boolean parseDecimal)
   at System.Number.ParseInt32(String s, NumberStyles style, NumberFormatInfo info)
   at Raven.Database.Config.InMemoryRavenConfiguration.Initialize() in c:\Builds\RavenDB-Stable-3.0\Raven.Database\Config\InMemoryRavenConfiguration.cs:line 339
   at Raven.Database.Server.Tenancy.DatabasesLandlord.CreateConfiguration(String tenantId, DatabaseDocument document, String folderPropName, InMemoryRavenConfiguration parentConfiguration) in c:\Builds\RavenDB-Stable-3.0\Raven.Database\Server\Tenancy\DatabaseLandlord.cs:line 263
   at Raven.Database.Server.Tenancy.DatabasesLandlord.CreateTenantConfiguration(String tenantId, Boolean ignoreDisabledDatabase) in c:\Builds\RavenDB-Stable-3.0\Raven.Database\Server\Tenancy\DatabaseLandlord.cs:line 99
   at Raven.Database.Server.Tenancy.DatabasesLandlord.TryGetOrCreateResourceStore(String tenantId, Task`1& database) in c:\Builds\RavenDB-Stable-3.0\Raven.Database\Server\Tenancy\DatabaseLandlord.cs:line 160
   at Raven.Database.Server.Controllers.RavenDbApiController.TrySetupRequestToProperResource(RequestWebApiEventArgs& args) in c:\Builds\RavenDB-Stable-3.0\Raven.Database\Server\Controllers\RavenDbApiController.cs:line 618</pre>