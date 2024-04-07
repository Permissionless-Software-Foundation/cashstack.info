---
sidebar_position: 9
---

# Ports

This page is a reference for looking up the default ports of the different pieces of software that make up the Cash Stack.

## Core Blockchain Infrastructure

### Full Node

- [docker-bchn](https://github.com/Permissionless-Software-Foundation/docker-bchn)
- Docker container name: bchn-main
  - 8332 - JSON RPC
  - 8333 - p2p node communication

### Fulcrum Indexer

- [docker-fulcrum](https://github.com/Permissionless-Software-Foundation/docker-fulcrum)
- Docker container name: fulcrum-mainnet
  - 50001 - Electrum TCP port
  - 50002 - Electrum SSL port
- Docker container name: fulcrum-rest-api
  - 3001 - REST API

### psf-slp-indexer

- [psf-slp-indexer](https://github.com/Permissionless-Software-Foundation/psf-slp-indexer)
- Docker container name: slp-indexer
  - 5010 - REST API

### bch-api

- [bch-api](https://github.com/Permissionless-Software-Foundation/bch-api)
- Docker container name: bch-api-main
  - 3000 - REST API

## File Storage

### ipfs-file-pin-service

- [ipfs-file-pin-service](https://github.com/Permissionless-Software-Foundation/ipfs-file-pin-service)
- Docker container name: file-service
  - 4001 - IPFS TCP Port
  - 4003 - IPFS WS Port
  - 5031 - REST API (psf-slp-indexer webhook calls this port to alert for new Pin Claims)
- Docker container name: mongo-file-service
  - 5556 - Mongo DB connection

### psffpp-client

- [psffpp-client](https://github.com/Permissionless-Software-Foundation/psffpp-client)
- Docker container name:
  - 4201 - IPFS TCP Port
  - 4203 - IPFS WS Port
  - 5020 - REST API

## IPFS Layer

### ipfs-bch-wallet-service

- [ipfs-bch-wallet-service](https://github.com/Permissionless-Software-Foundation/ipfs-bch-wallet-service)
- Docker container name: ipfs-bch-wallet
  - 5668 - IPFS TCP Port
  - 5669 - IPFS WS Port
  - 5032 - REST API
- Docker container name: mongo-bch
  - 5557 - Mongo DB connection

### ipfs-bch-wallet-consumer

- [ipfs-bch-wallet-consumer](https://github.com/Permissionless-Software-Foundation/ipfs-bch-wallet-consumer)
- Docker container name:
  - 4101 - IPFS TCP Port
  - 4102 - IPFS WS Port
  - 5015 - REST API
