---
sidebar_position: 4
---

# Fulcrum Indexer

Fulcrum is an indexer. An indexer is like a search engine, which crawls the blockchain and *indexes* the raw data into a database. Fulcrum tracks address balances, UTXOs, and transaction histories. It provides this data over the Electrumx protocol.

The PSF maintains a set of Docker containers which wraps the Fulcrum indexer into a REST API. This REST API can then interface with bch-api for exchanging data.

## Links

- [docker-fulcrum](https://github.com/Permissionless-Software-Foundation/docker-fulcrum) Docker containers
- [CashStrap](https://fullstack.cash/cashstrap) pre-synced blockchain databases

## Videos

### Part 1 - Downloading a pre-synced blockchain over IPFS

<iframe width="540" height="295" src="https://www.youtube.com/embed/kqRZ4Um9PbQ" title="Installing Fulcrum Electrumx Indexer for BCH" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
