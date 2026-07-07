---
title: MongoDB London 2013
date: 2014-07-03
tags:
  - conference
  - database
---

# MongoDB London 2013

Some very rough notes from MongoDB London 2013.

## Session 1 - Performance

- Keep indexes in memory
- Data in memory if you can
- Slow queries can be configured to appear in logs
- Use SSDs
- Growing documents is bad
- Do an 'explain' on queries
- Padding factor
- DB locks when writing
- Sharding to scale writes
- Optionally read from slaves, but they may not have the written data yet
- Write concern level configurable
- Can set importance level of writes based on the node that has acknowledged the write
- You can define your own `_id` structure to help querying
- Use short field names - use an abstraction layer
- Covered indexes
- Dropping collections is faster than removing
- `mongostat`
- Run your own benchmark - benchrun
- serverdensity.com/mdb (@davidmytton)
- Document per day, pre-allocated, then use the `inc` operator

## Session 2 - Backups

- `bsondump` converts BSON to JSON
- Use journalling
- Disk backups faster
- TTL indexes and capped collections

## Replication

- An uneven number of nodes is advised
- There's a mesh of heartbeats between the nodes
- An arbiter node only exists for voting - it stores no data
- You can have hidden nodes, for "backup" purposes only
- You can give a node a `slaveDelay` so the replication is delayed
- Servers can be tagged, e.g. `{ datacenter: "new york" }`
- There are 5 read preference modes
- You can test all this on a single machine
- Failure points:
  - Power
  - Network
  - Data Center (5 nodes safest: 2 (primary) + 2 (primary) + 1 (backup DC))
  - Multi-node failure can occur, e.g. 2 out of 3 fail
- When there's only one node, the whole cluster becomes read-only
- You can disable indexing if you want to, e.g. on a backup node that isn't ever queried

## Misc

- OpenStreetMap data contains lots of Points Of Interest, e.g. pubs
- MongoDB can be used with Hadoop
- There's a mongo-storm project
