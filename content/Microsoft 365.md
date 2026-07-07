---
tags:
  - microsoft
---
# Microsoft 365

- [Developer Program | Microsoft 365 Dev Center](https://developer.microsoft.com/en-us/microsoft-365/dev-program)
- [Microsoft 365 Dev Center](https://developer.microsoft.com/en-us/microsoft-365/profile?source=transaction-welcome-email)
- [VIDEO Maximise Productivity with Windows 365 | Microsoft](https://info.microsoft.com/ww-thankyou-maximize-productivity-and-efficiency-with-windows-in-the-cloud.html?LCID=EN-GB&ocid=eml_pg396188_gdc_comm_mw)
- [How to look up Microsoft 365 storage usage? – Afi Backup](https://support.afi.ai/hc/en-us/articles/360010206759-How-to-look-up-Microsoft-365-storage-usage-)

## M365 groups are public by default

A cautionary tale I came across, worth remembering when creating M365 groups:

> Here's something I see on a lot of security assessments for M365:
>
> When you create an M365 group (not a security group), all the members have access to a shared mailbox, shared files, SharePoint site, OneDrive, Archives, Teams, and whatever resources the owner applied. You can choose to make the group public or private. The default is public.
>
> Let's say you created the group with all defaults and are now sharing sensitive documents and information within your group.
>
> A low privileged user logs into http://myapps.microsoft.com and selects the People application. They scroll down and view All Distribution Lists. They go through each group and see which ones have the Files tab option. From those groups, they select to see all files. This redirects to the shared mailbox where they can read the group activity and select the files icon to view all the groups files. They can also select to browse to the SharePoint site.
>
> I've seen company documents containing tax IDs, passwords, accounting information, operations data, you name it. All because when the M365 group was created, the creator used all the defaults. They thought when they created the group, only the members would be able to access the information contained in the group.
>
> I've seen this on every assessment. Make sure your M365 groups are Private.
