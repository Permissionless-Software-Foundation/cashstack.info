---
sidebar_position: 4
---

# ipfs-bch-wallet-consumer

[ipfs-bch-wallet-consumer](https://github.com/Permissionless-Software-Foundation/ipfs-bch-wallet-consumer) is the primary component making up the *local* back end. It is a REST API server based on [Koa](https://koajs.com/). It's essentially a mirror image of [ipfs-bch-wallet-service](/docs/global-back-end/ipfs-bch-wallet-service). Where `ipfs-bch-wallet-service` is intended to be coupled to bch-api to provide blockchain service, `ipfs-bch-wallet-consumer` provides a localized REST API for consuming that blockchain service.

When started, this web server starts an IPFS node and connects to an ipfs-bch-wallet-service server over the IPFS network. It then pipes that connection over its own localized REST API.

This REST API is primarily consumed by the [bch-consumer JavaScript library](https://www.npmjs.com/package/bch-consumer), which is embedded in the [minimal-slp-wallet JavaScript library](https://www.npmjs.com/package/minimal-slp-wallet)

## Links

- [ipfs-bch-wallet-consumer](https://github.com/Permissionless-Software-Foundation/ipfs-bch-wallet-consumer) Docker containers
- [API Reference Documentation](https://free-bch.fullstack.cash/)

## Videos

### Part 1 - How to Use ipfs-bch-wallet-consumer

<iframe width="540" height="295" src="https://www.youtube.com/embed/7ntMPuqAX64" title="Installing Fulcrum Electrumx Indexer for BCH" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
