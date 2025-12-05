---
title: Azure Functions - The listener for function 'MyTimerFunction' was unable to start
---
# Azure Functions - The listener for function 'MyTimerFunction' was unable to start


```
2020-12-21T10:09:09.038 [Error] The listener for function 'MyTimerFunction' was unable to start.
Microsoft.Azure.WebJobs.Host.Listeners.FunctionListenerException : The listener for function 'MyTimerFunction' was unable to start. ---> System.ArgumentNullException : Value cannot be null. (Parameter 'connectionString')
   at Microsoft.Azure.Storage.CloudStorageAccount.Parse(String connectionString)
   at Microsoft.Azure.WebJobs.Extensions.Timers.StorageScheduleMonitor.get_TimerStatusDirectory() at C:\azure-webjobs-sdk-extensions\src\WebJobs.Extensions\Extensions\Timers\Scheduling\StorageScheduleMonitor.cs : 77
   at Microsoft.Azure.WebJobs.Extensions.Timers.StorageScheduleMonitor.GetStatusBlobReference(String timerName) at C:\azure-webjobs-sdk-extensions\src\WebJobs.Extensions\Extensions\Timers\Scheduling\StorageScheduleMonitor.cs : 144
   at async Microsoft.Azure.WebJobs.Extensions.Timers.StorageScheduleMonitor.GetStatusAsync(String timerName)
   at System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw()
   at async Microsoft.Azure.WebJobs.Extensions.Timers.Listeners.TimerListener.StartAsync(CancellationToken cancellationToken) at C:\azure-webjobs-sdk-extensions\src\WebJobs.Extensions\Extensions\Timers\Listener\TimerListener.cs : 99
   at System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw()
   at async Microsoft.Azure.WebJobs.Host.Listeners.SingletonListener.StartAsync(CancellationToken cancellationToken) at C:\projects\azure-webjobs-sdk-rqm4t\src\Microsoft.Azure.WebJobs.Host\Singleton\SingletonListener.cs : 70
   at System.Runtime.ExceptionServices.ExceptionDispatchInfo.Throw()
   at async Microsoft.Azure.WebJobs.Host.Listeners.FunctionListener.StartAsync(??) at C:\projects\azure-webjobs-sdk-rqm4t\src\Microsoft.Azure.WebJobs.Host\Listeners\FunctionListener.cs : 68
   End of inner exception
```

Make sure `AzureWebJobsStorage` is configured in the connection strings section, not the general configuration section.

Check Kudu logs:

`D:\home\LogFiles\Application\Functions\Host`
