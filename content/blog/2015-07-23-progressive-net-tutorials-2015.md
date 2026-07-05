---
title: Progressive .NET Tutorials 2015
date: 2015-07-23
tags:
  - conference
---

# Progressive .NET Tutorials 2015

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

- [Introduction to Microservices — microservices.io](http://microservices.io/patterns/microservices.html)

## Akka.NET

Concurrency

Everything is an actor

3 Core Abilities of an actor

1. Send messages
2. Create other actors
3. Change behaviour

Location transparency (same code in different locations)

But URLs do have machine names in them

ReactiveManifesto.org

Switchable behaviour

Akka.net web crawler

Lighthouse (dedicated seed node)

Dead letters

Push dangerous calls down to children

Supervision directives

- [Petabridge Bootcamp](https://petabridge.com/bootcamp/)
- [Top Akka.NET Design Patterns — Petabridge](https://petabridge.com/blog/top-akkadotnet-design-patterns/)

## Functional programming in F#

fsharpforfunandprofit.com

Types are sets and are composable

Algebraic types

Function oriented

Expressions

Pattern matching

No ==, use let for assignment otherwise it will compare

pure - no side effects

Pipeline more logical than nesting paranthesis

Currying - one input, then returns a function taking another input??

HOFs - parameterise all the things

## PowerShell DSC

DSC not just a Microsoft/PowerShell standard

AWS $userdata

Pull server

Generates MOF file

"WMI Tester"

DSC resource kit - lots of modules!

- [PowerShell Gallery](http://www.powershellgallery.com/)

The DSC book

Also see Chef's site

Microsoft DSC Resource Kit

Check git repo for slides etc

## Keynote - Why I'm _not_ leaving .NET!

- [Why I'm not leaving .NET — SkillsCast](https://skillsmatter.com/skillscasts/6397-why-i-m-not-leaving-dot-net)

## ASP.NET 5: How to Get Your Cheese Back

- [ASP.NET 5: How to Get Your Cheese Back — SkillsCast](https://skillsmatter.com/skillscasts/6401-aspdot-net-5-how-to-get-your-cheese-back)

## Visual Studio & .NET on OS-X, Linux, and Windows

- [Visual Studio & .NET on OS-X, Linux, and Windows — SkillsCast](https://skillsmatter.com/skillscasts/6444-visual-studio-and-dot-net-on-os-x-linux-and-windows)

## Going Further with ASP.NET 5

- [Going Further with ASP.NET 5 — SkillsCast](https://skillsmatter.com/skillscasts/6402-going-further-with-aspdot-net-5)

## Complete Code Craft

- [Complete Code Craft — SkillsCast](https://skillsmatter.com/skillscasts/6438-complete-code-craft)

## Introduction to RabbitMQ & EasyNetQ

- [Introduction to RabbitMQ & EasyNetQ — SkillsCast](https://skillsmatter.com/skillscasts/6424-introduction-to-rabbitmq-and-easynetq)

tryrabbitmq.com

EasyNETMQ

## Knowing what went bump in Production - modern monitoring in .net

- [Knowing what went bump in Production — SkillsCast](https://skillsmatter.com/skillscasts/6473-knowing-what-went-bump-in-production-modern-monitoring-in-dot-net)

Seyren

Grafana

nxlog community edition

200GB/day of logs

How big is the cluster?

13 months retained

Scheduled health checks

statsd

embedded checks - config missing etc

HipChat

Move reads from writes

Correlation IDs

## Reactive-interactive approaches to visualization of F# jobs

- [Reactive-interactive approaches to visualization of F# jobs — SkillsCast](https://skillsmatter.com/skillscasts/6443-reactive-interactive-approaches-to-visualization-of-f-sharp-jobs)
- [Akka.NET Fundamentals — #ProgNet15 slides](https://www.slideshare.net/petabridge/prog-net-slides)

## The Joy Of REPL

- [The Joy Of REPL — SkillsCast](https://skillsmatter.com/skillscasts/6428-the-joy-of-repl)
- [richardadalton/JoyOfREPL](https://github.com/richardadalton/JoyOfREPL)

## Monoliths to Microservices: A Journey

- [Monoliths to Microservices: A Journey — SkillsCast](https://skillsmatter.com/skillscasts/6471-monoliths-to-microservices-a-journey)
