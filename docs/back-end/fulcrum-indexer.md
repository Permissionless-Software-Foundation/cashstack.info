---
sidebar_position: 3
---

# Fulcrum Indexer

Fulcrum is an indexer. An indexer is like a search engine, which crawls the blockchain and *indexes* it by generating and saving metadata into a database. The Full Node only tracks transactions. It does not track important data like address balances, UTXOs, and transaction histories. The Fulcrum indexer exists to track those things. It implements the [Electrum protocol](https://electrumx.readthedocs.io/en/latest/protocol.html).

The PSF maintains a set of Docker containers which wrap the Fulcrum indexer's Electrum protocol into a web2 REST API. This REST API can then interface with [pspf-bch-api](psf-bch-api) for exchanging data.

## Links

- [docker-fulcrum](https://github.com/Permissionless-Software-Foundation/docker-fulcrum) GitHub repository with Docker containers

## Videos

### Installing Fulcrum Docker Container

<iframe width="639" height="359" src="https://www.youtube.com/embed/7dF7dW7fIXU" title="Fulcrum Indexer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe>