---
sidebar_position: 2
---

# ipfs-service-provider

[ipfs-service-provider](https://github.com/Permissionless-Software-Foundation/ipfs-service-provider) is a boilerplate application that consumes the [helia-coord](/docs/IPFS/helia-coord) library and wraps it in a production-ready web server. It provides REST API and JSON RPC endpoints, user management with [JWT tokens](https://jwt.io/), logging, and other features needed to operate as a service provider on the IPFS network. It is the primary starting point for building new IPFS-based services in the [Cash Stack](/docs/intro).

---

## Why ipfs-service-provider?

[helia-coord](/docs/IPFS/helia-coord) is a low-level coordination library. It handles peer discovery, pubsub channels, end-to-end encryption, and circuit relay connections, but it is just a library &mdash; it has no web server, no user accounts, and no API surface of its own. An application developer who wants to offer a service over IPFS needs all of those things.

ipfs-service-provider bridges that gap. It embeds a [Helia](https://github.com/ipfs/helia) IPFS node, wires it up to helia-coord, and exposes the result through a [Koa](https://koajs.com/)-based REST API and a JSON RPC interface. It also provides:

- **User management** &mdash; Account creation, authentication, and authorization using JWT tokens.
- **Rate limiting** &mdash; Access control to prevent abuse.
- **Logging** &mdash; A logging system with API access.
- **JSON RPC over IPFS** &mdash; An API between service providers and consumers, routed over the IPFS network rather than HTTP.

Because helia-coord handles the networking automatically, an ipfs-service-provider instance can operate behind a residential firewall without a public IP address. It connects to the PSF IPFS subnetwork through [Circuit Relays](/docs/IPFS/circuit-relay), making it accessible to consumers anywhere on the network.

---

## The Boilerplate Pattern

ipfs-service-provider is not just an application &mdash; it is a **boilerplate** designed to be forked. When a developer needs to create a new IPFS-based service, they fork ipfs-service-provider and add their domain-specific logic on top of the existing infrastructure. This pattern means that every fork inherits:

- A working IPFS node with helia-coord already integrated.
- REST API scaffolding with middleware, routing, and error handling.
- User management and JWT-based authentication.
- JSON RPC handlers for IPFS-based communication.
- A [Clean Architecture](https://christroutner.github.io/trouts-blog/blog/clean-architecture) file structure that separates business logic from external interfaces.

The developer can then focus on their application's unique features rather than re-implementing networking, authentication, and API plumbing from scratch.

---

## Major Forks

Three major Cash Stack infrastructure projects have been forked from ipfs-service-provider:

| Fork | Purpose |
| :--- | :--- |
| [ipfs-bch-wallet-service](/docs/IPFS/reduce-server-costs/ipfs-bch-wallet-service) | A censorship-resistant, IPFS-based microservice providing wallet access to the Bitcoin Cash blockchain. Runs on a home desktop and proxies the local blockchain API over IPFS via JSON RPC. |
| [ipfs-bch-wallet-consumer](/docs/IPFS/reduce-server-costs/ipfs-bch-wallet-consumer) | A lightweight REST API that consumes blockchain services from ipfs-bch-wallet-service over IPFS. Runs on a minimal cloud VPS to provide a localized HTTP interface for front-end apps. |
| [ipfs-file-pin-service](/docs/IPFS/file-storage/ipfs-file-pin-service) | Paid IPFS file pinning using the [Pin Claim protocol (PS010)](https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps010-file-pinning-protocol.md). Validates proof-of-burn transactions and pins files to the IPFS network. |

Each of these projects shares the same foundational code &mdash; the Koa web server, user management, IPFS node setup, and helia-coord integration &mdash; but adds its own business logic in the use-cases and controllers layers.

---

## Running as a Circuit Relay

In addition to being forked as a boilerplate, ipfs-service-provider can be run as a stand-alone application to operate a [Circuit Relay](/docs/IPFS/circuit-relay). Circuit Relays are IPFS nodes with public IP addresses that help other nodes behind firewalls communicate with one another. They are a critical piece of the PSF IPFS network's censorship resistance.

Running ipfs-service-provider as a Circuit Relay requires setting the `ENABLE_CIRCUIT_RELAY` environment variable. See the [Circuit Relay](/docs/IPFS/circuit-relay) documentation for full network configuration details.

---

## Architecture

ipfs-service-provider follows the [Clean Architecture](https://troutsblog.com/blog/clean-architecture) design pattern, the same pattern used by helia-coord and all of its forks:

```
src/
├── adapters/          # Interfaces to external services (IPFS, MongoDB, wallet)
│   ├── ipfs/          # Helia IPFS node and helia-coord setup
│   └── localdb/       # Mongoose models and database adapter
├── controllers/       # Input handlers
│   ├── rest-api/      # Koa REST API routes and middleware
│   ├── json-rpc/      # JSON-RPC handlers (over IPFS)
│   └── timer-controllers.js  # Periodic maintenance tasks
├── entities/          # Business logic validation
└── use-cases/         # Application business rules
```

When the application starts, it creates a Helia IPFS node, initializes helia-coord with that node, and starts the Koa web server. helia-coord then handles peer discovery, circuit relay connections, and pubsub coordination automatically in the background.

---

## Installation

### Production (Docker)

```bash
git clone https://github.com/Permissionless-Software-Foundation/ipfs-service-provider
cd ipfs-service-provider/production/docker
docker-compose pull
docker-compose up -d
```

### Development

```bash
git clone https://github.com/Permissionless-Software-Foundation/ipfs-service-provider
cd ipfs-service-provider
./install-mongo-sh
npm install
npm start
```

### Configuration

The application is configured through environment variables. See the [config/env/common.js](https://github.com/Permissionless-Software-Foundation/ipfs-service-provider/blob/master/config/env/common.js) file for the full list of available settings.

---

## Links

- [ipfs-service-provider on GitHub](https://github.com/Permissionless-Software-Foundation/ipfs-service-provider) &mdash; Source code and Docker containers.
- [helia-coord](/docs/IPFS/helia-coord) &mdash; The coordination library consumed by ipfs-service-provider.
- [Circuit Relays](/docs/IPFS/circuit-relay) &mdash; How to run ipfs-service-provider as a Circuit Relay.
- [CashStack.info](https://cashstack.info) &mdash; The full software stack documentation.

## Videos

### Installing ipfs-service-provider

<iframe width="540" height="295" src="https://www.youtube.com/embed/Z0NsboIVN44" title="Setting up ipfs-service-provider" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
