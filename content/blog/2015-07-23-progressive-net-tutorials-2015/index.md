---
id: 199
title: Progressive .NET Tutorials 2015
date: 2015-07-23T11:12:58+00:00
author: Tom Robinson
layout: post
categories:
  - Uncategorized
---
# <span style="color: #000000;"><span class="SpellingError SCX150598041">Microservices</span><span class="NormalTextRun SCX150598041"> in .NET</span></span>

IDL - interface definition language - swagger?

Components - don’t know what's remote

SOA - make it being remote explicit

Microservices - bounded contexts, eventual consistency

Hard to let go of understanding everything

QA - just test the contract of each service, not the whole system - reduces problems caused by configuration problems

Don't make services too small (Nanoservices) - can lead to too many changes in lots of places, latency (caching helps)

Monolith - staccato delivery

Break it up as each developer/team can only internalise so much

Embrace Conway's law - check the long version of this

Eventual consistency - 2 phase commit doesn't scale

Shared data - one source of truth, but can share out a "version" of the data

Try to avoid sharing dependencies, i.e. DTOs - duplicate theme

Enterprise service bus - becomes smart network, hard to test, locked in to vendor - keep the logic in the services instead

Anti-corruption layer for legacy code

Documentation driven design

REST in practice - reference data - ATOM feeds, very cacheable

Could use EventStore for the feed - then services poll the event feed - like a queue of orders in a restuarant

&nbsp;

Versioning?

What about having a single API to cover everything?

Steps:

  1. Break up into bounded contexts
  2. Ubiquitous language

Brighter

Paramore

Hexaganol architecture

Deploying:

Monitoring

DNS SD & SRV records - difficult to manage, so Zookeeper/etcd etc better

Consul

http://microservices.io/patterns/microservices.html

# <span style="color: #000000;">Akka.NET</span>

<span style="color: #000000;">Concurrency </span>

<span style="color: #000000;">Everything is an actor </span>

<span style="color: #000000;">3 Core Abilities of an actor </span>

  1. <span style="color: #000000;">Send messages </span>
  2. <span style="color: #000000;">Create other actors </span>
  3. <span style="color: #000000;">Change behaviour </span>

<span style="color: #000000;">Location transparency (same code in different locations) </span>

<span style="color: #000000;">But URLs do have machine names in them </span>

<span style="color: #000000;">ReactiveManifesto.org </span>

<span style="color: #000000;">Switchable behaviour </span>

<span style="color: #000000;">Akka.net web crawler </span>

<span style="color: #000000;">Lighthouse (dedicated seed node) </span>

<span style="color: #000000;">Dead letters </span>

<span style="color: #000000;">Push dangerous calls down to children </span>

<span style="color: #000000;">Supervision directives </span>

<span style="color: #000000;"><a style="color: #000000;" href="https://petabridge.com/bootcamp/">https://petabridge.com/bootcamp/</a> </span>

<span style="color: #000000;">https://petabridge.com/blog/top-akkadotnet-design-patterns/?__s=sysx7cuy86jz1nqm11nd&utm_campaign=blog_content&utm_content=post_title&utm_medium=email&utm_source=drip&utm_term=meet%20the%20top%20akka.net%20design%20patterns </span>

# <span style="color: #000000;">Functional programming in F#</span>

<span style="color: #000000;">fsharpforfunandprofit.com </span>

<span style="color: #000000;">Types are sets and are composable </span>

<span style="color: #000000;">Algebraic types </span>

<span style="color: #000000;">Function oriented </span>

<span style="color: #000000;">Expressions </span>

<span style="color: #000000;">Pattern matching </span>

<span style="color: #000000;">No ==, use let for assignment otherwise it will compare </span>

<span style="color: #000000;">pure - no side effects </span>

<span style="color: #000000;">Pipeline more logical than nesting paranthesis </span>

<span style="color: #000000;">Currying - one input, then returns a function taking another input?? </span>

<span style="color: #000000;">HOFs - parameterise all the things </span>

# <span style="color: #000000;">PowerShell DSC</span>

<span style="color: #000000;">DSC not just a Microsoft/PowerShell standard </span>

<span style="color: #000000;">AWS $userdata </span>

<span style="color: #000000;">Pull server </span>

<span style="color: #000000;">Generates MOF file </span>

<span style="color: #000000;">"WMI Tester" </span>

<span style="color: #000000;">DSC resource kit - lots of modules! </span>

<span style="color: #000000;"><a style="color: #000000;" href="http://www.powershellgallery.com/">http://www.powershellgallery.com/</a> </span>

<span style="color: #000000;">The DSC book </span>

<span style="color: #000000;">Also see Chef's site </span>

<span style="color: #000000;">Microsoft DSC Resource Kit </span>

<span style="color: #000000;">Check git repo for slides etc </span>

# <span style="color: #000000;">Keynote - Why I'm *not* leaving .NET!</span>

<span style="color: #000000;">https://skillsmatter.com/skillscasts/6397-why-i-m-not-leaving-dot-net</span>

# <span style="color: #000000;">ASP.NET 5: How to Get Your Cheese Back</span>

<span style="color: #000000;">https://skillsmatter.com/skillscasts/6401-aspdot-net-5-how-to-get-your-cheese-back</span>

# <span style="color: #000000;">Visual Studio & .NET on OS-X, Linux, and Windows</span>

<span style="color: #000000;">https://skillsmatter.com/skillscasts/6444-visual-studio-and-dot-net-on-os-x-linux-and-windows</span>

# <span style="color: #000000;">Going Further with ASP.NET 5</span>

<span style="color: #000000;">https://skillsmatter.com/skillscasts/6402-going-further-with-aspdot-net-5</span>

# <span style="color: #000000;">Complete Code Craft</span>

<span style="color: #000000;">https://skillsmatter.com/skillscasts/6438-complete-code-craft</span>

<span style="color: #000000;">http://t.co/dx3KSZFNng</span>

# <span style="color: #000000;">Introduction to RabbitMQ & EasyNetQ</span>

<span style="color: #000000;">https://skillsmatter.com/skillscasts/6424-introduction-to-rabbitmq-and-easynetq</span>

<span style="color: #000000;">tryrabbitmq.com </span>

<span style="color: #000000;">EasyNETMQ</span>

# <span style="color: #000000;">Knowing what went bump in Production - modern monitoring in .net</span>

<span style="color: #000000;">https://skillsmatter.com/skillscasts/6473-knowing-what-went-bump-in-production-modern-monitoring-in-dot-net</span>

<span style="color: #000000;">https://t.co/r6fPTYqDzH</span>

<span style="color: #000000;">Seyren </span>

<span style="color: #000000;">Grafana </span>

<span style="color: #000000;">nxlog community edition </span>

<span style="color: #000000;">200GB/day of logs </span>

<span style="color: #000000;">How big is the cluster? </span>

<span style="color: #000000;">13 months retained </span>

<span style="color: #000000;">Scheduled health checks </span>

<span style="color: #000000;">statsd </span>

<span style="color: #000000;">embedded checks - config missing etc </span>

<span style="color: #000000;">HipChat </span>

<span style="color: #000000;">Move reads from writes </span>

<span style="color: #000000;">Correlation IDs </span>

# <span style="color: #000000;">Reactive-interactive approaches to visualization of F# jobs</span>

<span style="color: #000000;">https://skillsmatter.com/skillscasts/6443-reactive-interactive-approaches-to-visualization-of-f-sharp-jobs</span>



<div style="margin-bottom:5px">
  <strong> <a href="https://www.slideshare.net/petabridge/prog-net-slides" title="Akka.NET Fundamentals — #ProgNet15" target="_blank">Akka.NET Fundamentals — #ProgNet15</a> </strong> from <strong><a href="https://www.slideshare.net/petabridge" target="_blank">petabridge</a></strong>
</div>

# <span style="color: #000000;">The Joy Of REPL</span>

<span style="color: #000000;">https://skillsmatter.com/skillscasts/6428-the-joy-of-repl</span>

<span style="color: #000000;">https://github.com/richardadalton/JoyOfREPL</span>

# <span style="color: #000000;">Monoliths to Microservices: A Journey</span>

<span style="color: #000000;">https://skillsmatter.com/skillscasts/6471-monoliths-to-microservices-a-journey</span>