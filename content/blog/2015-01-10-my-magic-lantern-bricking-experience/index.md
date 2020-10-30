---
title: My Magic Lantern bricking experience
date: "2015-01-10"
---

A few months ago I managed to brick my wife's Canon 60D. This is the story of how it happened and the things I tried doing to fix it before finally giving up and sending it off to be repaired.

Whilst using my Canon 60D (Firmware 1.1.1, ML 2.3) to take long exposures (astrophotography) I noticed it had apparently frozen up. Unfortunately I can't remember exactly what I then did, but it was probably a good 30 seconds or more before I removed the battery and card.

I wasn't able to start it up again no matter what combination of button presses or card/battery removals/replacements I tried.

I was seeing nothing at all on the rear screen, LCD display or in the viewfinder, no beeps or clicks, no smells. The only sign of life I could get was with one of the cards I had Magic Lantern installed on - I get either a single flash when I insert the card or occasionally a double flash - it does this every time but only with that card. No other card does anything at any time. I originally copied Magic Lantern onto two identical 16GB cards. The other card (same version of ML, same card manufacturer) does nothing.

I tried the following standard suggestions for a "bricked" camera but nothing helped:

- different batteries - partially charged and 100% charged
- different lenses
- with/without lens
- with/without card
- using a card formatted on my PC - empty
- using a card formatted on my PC - clean ML install
- using a card formatted on another 60D (low-level format)

I posted my problem onto the Magic Lantern forums: [Bricked 60D - no sign of life except for the SD card light with one ML card](http://magiclantern.fm/forum/index.php?topic=13383)

There were a few diagnostic tools which I was able to run:

- LED blink test
- Startup log
- ROM dump

After a few teething issues with incorrectly formatted cards and corrupted file copies, we managed to get the LED blink test and ROM dump to run. The LED blink test just flashes the SD card light once a second - useful for showing that it's able to read the card and that basic startup routines are executing. The ROM dump was meaningless to me, but was of interest to the Magic Lantern developers who were able to look for possible corruption.

I also had a lot of "fun" trying to build Magic Lantern and the ROM dump code from the source. I'm a developer, but I was way outside my comfort zone with the Magic Lantern build process and embedded ARM development tooling. I got there in the end but it wasn't fun.

We had a few red herrings and dead ends due to the aforementioned card formatting/filesystem corruption problems.

What was really needed was more detail about the startup, to try and find what was running, and more importantly, what wasn't - and why.

The Magic Lantern developers have come up with a very clever way of doing this. Because the only way my camera could communicate with the outside world was by flashing its SD card light then the only way to get startup data out was via this light.

There are two parts - code that runs on the problematic camera which flashes the light rapidly - a bit like morse code - long blinks and short blinks. Then you need another helper camera (also running Magic Lantern) and the deblink module, which watches and decodes the blinks in realtime and displays the output.

The tricky part of this, was finding someone else local who had Magic Lantern installed and was able/willing to run the deblink process.

Thanks to Andy Harris (a regular at [Reading Geek Night](http://rdggeeknight.wordpress.com/)), we managed to give this a go. The result was something we coined "camera inception". Below you can see my camera (furthest away), the decoding camera (middle) and then for good measure a third camera recording the output that was being decoded via the decoding camera. The reason for the third camera was that we kept running into problems where the decoding camera either turned off, or didn't record the output anywhere on its own card. So the third camera acted as a record of what happened.

[<img class="alignnone wp-image-172 size-large" src="images/2014/12/20141108_105917-e1420046925113-768x1024.jpg" alt="20141108_105917" width="640" height="853" srcset="images/2014/12/20141108_105917-e1420046925113-768x1024.jpg 768w, images/2014/12/20141108_105917-e1420046925113-225x300.jpg 225w" sizes="(max-width: 640px) 100vw, 640px" />](images/2014/12/20141108_105917.jpg)

The decoding camera was set up with a very nice macro lens, looking straight at the flashing light on my camera. You can see the orange glow in this photo.

[<img class="alignnone size-full wp-image-174" src="images/2014/12/20141108_110117.jpg" alt="20141108_110117" width="3264" height="2448" srcset="images/2014/12/20141108_110117.jpg 3264w, images/2014/12/20141108_110117-300x225.jpg 300w, images/2014/12/20141108_110117-1024x768.jpg 1024w" sizes="(max-width: 3264px) 100vw, 3264px" />](images/2014/12/20141108_110117.jpg)

&nbsp;

The end result was this:

Unfortunately (as is probably obvious with hindsight) the decoding process didn't work that well so the output is a bit corrupted.

The Magic Lantern developers had a few more suggestions but it was beginning to require skills I just didn't have - electronics and low level ARM programming knowledge.

After an interesting few months I finally had to call it a day and returned the camera to a Canon repair centre. They did a great job and the camera is back to normal, but my wallet took a bit of a battering.

I'd like to thank Alex from Magic Lantern and Andy Harris for their time and effort in trying to fix this. Hopefully this post will be helpful to anyone else in a similar situation, or at least interesting!
