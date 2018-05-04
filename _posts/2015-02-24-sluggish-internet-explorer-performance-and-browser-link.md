---
id: 181
title: Sluggish Internet Explorer performance and Browser Link
date: 2015-02-24T09:03:56+00:00
author: Tom
layout: post
guid: http://www.tjrobinson.net/?p=181
permalink: /?p=181
categories:
  - Uncategorized
---
I recently experienced problems where Internet Explorer performance was sluggish, almost unusable. I could barely log in to the application I was running as there was a long lag between key presses and the text appearing. It turns out that the culprit was Browser Link, a new feature in Visual Studio 2013 that creates a communication channel between the development environment and one or more web browsers.

Disabling Browser Link solved the performance problems.

Uncheck the &#8220;Enable Browser Link&#8221; option:

&nbsp;

[<img class="alignnone size-full wp-image-182" src="http://www.tjrobinson.net/wp-content/uploads/2015/02/Untitled.png" alt="Untitled" width="399" height="201" srcset="http://www.tjrobinson.net/wp-content/uploads/2015/02/Untitled.png 399w, http://www.tjrobinson.net/wp-content/uploads/2015/02/Untitled-300x151.png 300w" sizes="(max-width: 399px) 100vw, 399px" />](http://www.tjrobinson.net/wp-content/uploads/2015/02/Untitled.png)