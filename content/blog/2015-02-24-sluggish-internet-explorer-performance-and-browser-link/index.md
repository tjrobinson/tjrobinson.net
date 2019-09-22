---
title: Sluggish Internet Explorer performance and Browser Link
date: "2015-02-24"
---
I recently experienced problems where Internet Explorer performance was sluggish, almost unusable. I could barely log in to the application I was running as there was a long lag between key presses and the text appearing. It turns out that the culprit was Browser Link, a new feature in Visual Studio 2013 that creates a communication channel between the development environment and one or more web browsers.

Disabling Browser Link solved the performance problems.

Uncheck the "Enable Browser Link" option:

&nbsp;

[<img class="alignnone size-full wp-image-182" src="https://www.tjrobinson.net/wp-content/uploads/2015/02/Untitled.png" alt="Untitled" width="399" height="201" srcset="https://www.tjrobinson.net/wp-content/uploads/2015/02/Untitled.png 399w, https://www.tjrobinson.net/wp-content/uploads/2015/02/Untitled-300x151.png 300w" sizes="(max-width: 399px) 100vw, 399px" />](https://www.tjrobinson.net/wp-content/uploads/2015/02/Untitled.png)