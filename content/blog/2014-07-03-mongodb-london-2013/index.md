---
title: MongoDB London 2013
date: "2014-07-03"
---

Some very rough notes from MongoDB London 2013:

<p lang="en-US">
  Session 1 - Performance
</p>

<p lang="en-US">
  <p lang="en-US">
    Keep indexes in memory
  </p>
  
  <p lang="en-US">
    Data in memory if you can
  </p>
  
  <p lang="en-US">
    Slow queries can be configured to appear in logs
  </p>
  
  <p lang="en-US">
    Use SSDs
  </p>
  
  <p lang="en-US">
    Growing documents is bad
  </p>
  
  <p lang="en-US">
    Do an &#8216;explain' on queries
  </p>
  
  <p lang="en-US">
    Padding factor
  </p>
  
  <p lang="en-US">
    DB locks when writing
  </p>
  
  <p lang="en-US">
    Sharding to scale writes
  </p>
  
  <p lang="en-US">
    Optionally read from slaves but they may not have the written data yet
  </p>
  
  <p lang="en-US">
    Write concern level configurable
  </p>
  
  <p lang="en-US">
    Can set importance level of writes based on the node that has acknowledged the write
  </p>
  
  <p lang="en-US">
    You can define your own _id structure to help querying
  </p>
  
  <p lang="en-US">
    Use short field names - use an abstraction layer
  </p>
  
  <p lang="en-US">
    Covered indexes
  </p>
  
  <p lang="en-US">
    Dropping collections is faster than removing
  </p>
  
  <p lang="en-US">
    mongostat
  </p>
  
  <p lang="en-US">
    Run your own benchmark - benchrun
  </p>
  
  <p lang="en-US">
    serverdensity.com/mdb
  </p>
  
  <p lang="en-US">
    @davidmytton
  </p>
  
  <p lang="en-US">
    Document per day,  pre allocated then use inc operator
  </p>
  
  <p lang="en-US">
    <p lang="en-US">
      <span style="font-weight: bold;">Session 2 - Backups</span>
    </p>
    
    <p lang="en-US">
      <p lang="en-US">
        bsondump converts bson to json
      </p>
      
      <p lang="en-US">
        Use journalling
      </p>
      
      <p lang="en-US">
        Disk backups faster
      </p>
      
      <p lang="en-US">
        <p lang="en-US">
          <p lang="en-US">
            TTL indexes and capped collections
          </p>
          
          <p lang="en-US">
            <p lang="en-US">
              <p lang="en-US">
                <span style="font-weight: bold;">Replication</span>
              </p>
              
              <p lang="en-US">
                An uneven number of nodes is advised
              </p>
              
              <p lang="en-US">
                There's a mesh of hearbeats between the nodes
              </p>
              
              <p lang="en-US">
                An arbiter node only exists for voting - it stores no data
              </p>
              
              <p lang="en-US">
                You can have hiddden nodes, for "backup" purposes only
              </p>
              
              <p lang="en-US">
                You can give a node a slaveDelay so the replication is delayed
              </p>
              
              <p>
                Servers can be tagged e,g, { datacenter: new york }
              </p>
              
              <p>
                There are 5 read preference modes
              </p>
              
              <p>
                You can test all this on a single machine
              </p>
              
              <p>
                Failure points:
              </p>
              
              <ul type="disc">
                <li>
                  Power
                </li>
                <li>
                  Network
                </li>
                <li>
                  Data Center (5 nodes safest, 2 (primary) +2 (primary)+1 (backup DC)
                </li>
                <li lang="en-US">
                  Multi-node failure can occur e.g. 2 out of 3 fail
                </li>
              </ul>
              
              <p lang="en-US">
                When there's only one node, the whole cluster becomes read-only
              </p>
              
              <p lang="en-US">
                You can disabled indexing if you want to, e.g. on a backup node that isn't ever queried
              </p>
              
              <p lang="en-US">
                OpenStreetMap data contains lots of Points Of Interest, e.g. pubs
              </p>
              
              <p lang="en-US">
                MongoDB can be used with Hadoop
              </p>
              
              <p lang="en-US">
                There's a mongo-storm project
              </p>
