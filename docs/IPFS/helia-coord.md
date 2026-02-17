---
sidebar_position: 1
---

# helia-coord

<iframe width="639" height="359" src="https://www.youtube.com/embed/k6ezQiufDo0 " title="helia-coord" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe>

**helia-coord** is a JavaScript npm library built on top of [Helia](https://github.com/ipfs/helia), the JS implementation of IPFS. It provides sophisticated coordination between IPFS nodes, enabling them to discover one another, form on-the-fly subnetworks, and maintain persistent, self-healing connections. It is the networking backbone of the Cash Stack's IPFS layer.

The name is short for "Helia Coordination". The library wraps a Helia IPFS node and adds the following high-level features:

*   **Subnets** — Helps IPFS nodes create an on-the-fly subnetwork using pubsub channels.
*   **Peer Discovery** — Allows new peers entering the subnetwork to find other subnetwork peers automatically.
*   **End-to-End Encryption (E2EE)** — Creates encrypted communication channels between peers using Elliptic Curve cryptography.
*   **Censorship Resistance** — Enables automatic networking between peers, even if they are behind firewalls, via [Circuit Relays](/docs/IPFS/circuit-relay).
*   **Payments** — Allows peers to easily pay one another in cryptocurrency for access to web services.

---

## Why helia-coord?

The ultimate goal of helia-coord is to be a building block for replacing conventional REST APIs. An IPFS-based API, in a fully distributed network, requires sophisticated coordination in order to function properly. helia-coord is that coordination library. It is consumed by higher-level applications like [ipfs-service-provider](https://github.com/Permissionless-Software-Foundation/ipfs-service-provider).

Here are some use cases where IPFS node coordination is needed:

*   End-to-end encrypted chat
*   Circuit relay as-a-service
*   Creating CoinJoin transactions for financial privacy
*   Decentralized exchange of currencies
*   Compute-as-a-service
*   Storage-as-a-service

---

## Core Sub-Components

helia-coord is assembled from three core technologies:

| Component | Role |
| :--- | :--- |
| **[libp2p](https://libp2p.io/) pubsub** (via [gossipsub](https://github.com/ChainSafe/js-libp2p-gossipsub)) | Communication between nodes over pubsub channels. |
| **[Circuit Relays](https://docs.libp2p.io/concepts/nat/circuit-relay/)** | Censorship resistance and tunneling through firewalls. |
| **[Bitcoin Cash](https://bitcoincash.org/)** (via [minimal-slp-wallet](https://www.npmjs.com/package/minimal-slp-wallet)) | End-to-end encryption key management and payments between peers. |

The library automatically tracks peers, connects to them through circuit relays, and end-to-end encrypts all communication. Interval timers continually maintain these connections, creating a **self-healing mesh network**.

---

## How It Works

helia-coord manages an IPFS node by tracking **Entities**, communicating over **Pubsub Channels**, and maintaining state with **Interval Timers**.

### Entities

There are three main entities tracked by helia-coord. All entities are stateless at startup — the node begins knowing nothing about itself or the network. Entities are created at runtime as the node discovers information.

*   **thisNode** — Represents the local IPFS node controlled by helia-coord. There is only one instance. It holds the node's IPFS ID, multiaddrs, BCH/SLP addresses, public encryption key, and metadata.
*   **peers** — Other IPFS nodes on the network that are also running helia-coord. These are nodes that `thisNode` wants to track and maintain connections to.
*   **relays** — A special subset of peers with a public IP address that run the [v2 Circuit Relay protocol](https://docs.libp2p.io/concepts/nat/circuit-relay/). Peers behind firewalls that cannot connect directly to one another can connect through a relay.

### Pubsub Channels

A series of pubsub channels are opened between the IPFS nodes on the network:

*   **Coordination Channel** — A public, unencrypted channel that every node on the subnet subscribes to. Every two minutes, a node broadcasts an *announcement object* containing its IPFS ID, multiaddrs, public encryption key, BCH/SLP addresses, and JSON-LD metadata describing its services. When a node receives an announcement, the peer is added to or updated in the tracked peer list.
*   **Private Channel (Receiving)** — Each node creates a pubsub channel named after its own IPFS peer ID. Other nodes subscribe to this channel to send it encrypted messages. The node only *receives* on this channel and never broadcasts on it. Low-level messages like ACK and metric commands are handled internally; all other decrypted messages are passed up to the consuming application via the `privateLog` callback.
*   **Private Channel (Sending)** — When a new peer is discovered, the node subscribes to that peer's private channel in order to *send* encrypted messages to it. Messages are encrypted with the recipient's public key using Elliptic Curve cryptography before being published.
*   **CoinJoin Channel** — A separate public channel reserved for coordinating CoinJoin transactions for financial privacy. This channel is not fully developed yet.

### Interval Timers

A series of interval timers are defined in the Timer Controller. They periodically trigger to maintain the node's state:

*   **manageCircuitRelays()** — Refreshes connections to known circuit relay nodes.
*   **manageAnnouncement()** — Periodically announces `thisNode` on the coordination channel so other peers can discover it.
*   **managePeers()** — Checks the list of known subnet peers and restores connections to any that have been disconnected, cycling through known circuit relays until a connection is established.

These timer-based functions are what allow the node to create the mesh network on-the-fly and self-heal as nodes come online or drop off the network.

---

## Architecture

helia-coord follows the [Clean Architecture](https://troutsblog.com/blog/clean-architecture) design pattern, organized into four layers:

*   **Entities** — Core business objects: `thisNode` (the local IPFS node), `peers` (other subnet nodes), `relays` (circuit relay nodes), and `pubsub` channels.
*   **Use Cases** — Actions performed on entities: creating the node identity (`createSelf`), managing peer connections (`addSubnetPeer`, `refreshPeerConnections`, `sendPrivateMessage`), handling relay connections (`getCRGist`, `connectToCRs`), and initializing pubsub (`initializePubsub`).
*   **Controllers** — Inputs to the system, primarily the interval timers that periodically maintain connections, announce the node, and manage peer/relay state.
*   **Adapters** — Interfaces to external systems: IPFS (Helia/libp2p), BCH (minimal-slp-wallet), encryption (Elliptic Curve), pubsub messaging, and a GitHub Gist adapter for discovering circuit relays.

After instantiation, the library exposes `useCases`, `controllers`, and `adapters` properties for programmatic access to its internals.

---

## Startup Procedure

The startup sequence for helia-coord follows these steps:

1.  The consuming application creates a Helia IPFS node (e.g. via `CreateHeliaNode`) and an instance of `minimal-slp-wallet`.
2.  The consuming application instantiates `IpfsCoord`, passing in the Helia node, wallet, and configuration options.
3.  The consuming application calls `ipfsCoord.start()`, which triggers the following:
    *   The IPFS adapter starts and retrieves the node's peer ID and multiaddrs.
    *   `createSelf()` builds the `thisNode` entity — aggregating IPFS info, generating BCH/SLP addresses and a public encryption key, initializing the Schema library, and subscribing to the node's own private pubsub channel.
    *   `initializePubsub()` subscribes the node to the general coordination pubsub channel.
    *   `startTimers()` initializes the interval timers for connection maintenance, announcements, and peer management.
    *   `_initializeConnections()` downloads the Circuit Relay list from a GitHub Gist and attempts initial connections to relays and subnet peers. This runs without blocking so it does not delay startup of the consuming application.

---

## Install

Install the npm library:

```bash
npm install --save helia-coord
```

This library requires a peer dependency of [minimal-slp-wallet](https://www.npmjs.com/package/minimal-slp-wallet).

---

## Quick Start

helia-coord exports two things:

*   **`IpfsCoord`** (default export) — The coordination library that wraps a Helia IPFS node.
*   **`CreateHeliaNode`** (via `helia-coord/create-helia-node`) — A factory class for creating a properly configured Helia IPFS node.

### Example in a Node.js App

```javascript
import SlpWallet from 'minimal-slp-wallet'
import IpfsCoord from 'helia-coord'
import CreateHeliaNode from 'helia-coord/create-helia-node'

async function start () {
  // Create an instance of the BCH wallet.
  const wallet = new SlpWallet()
  await wallet.walletInfoPromise

  // Create a Helia IPFS node.
  const createHeliaNode = new CreateHeliaNode()
  const ipfs = await createHeliaNode.start()

  // Pass the wallet and IPFS node to helia-coord when instantiating it.
  const ipfsCoord = new IpfsCoord({
    ipfs,
    wallet,
    type: 'node.js',
    debugLevel: 1
  })

  await ipfsCoord.start()
  console.log('IPFS and the coordination library is ready.')
}
start()
```

---

## Configuration

### IpfsCoord Options

When instantiating `IpfsCoord`, the following configuration properties can be passed to its constructor:

| Property | Required | Description |
| :--- | :--- | :--- |
| `ipfs` | Yes | An instance of a [Helia](https://github.com/ipfs/helia) IPFS node. |
| `wallet` | Yes | An instance of [minimal-slp-wallet](https://www.npmjs.com/package/minimal-slp-wallet). Used for BCH payments and generating encryption keys. |
| `type` | Yes | `'node.js'` or `'browser'` — the type of environment the app is running in. Determines the types of Circuit Relays the library can connect to. |
| `debugLevel` | No | Integer from 0–3. `0` = no debug output (default), `1` = status logs, `2` = verbose connection errors, `3` = everything. |
| `statusLog` | No | A function for handling status log messages. Defaults to `console.log`. |
| `privateLog` | No | A function for handling incoming e2e encrypted private messages from other peers. Defaults to `console.log`. |
| `nodeType` | No | `'embedded'` (default) or `'external'`. |
| `isCircuitRelay` | No | Boolean. Set to `true` if this node should act as a Circuit Relay. Defaults to `false`. |
| `circuitRelayInfo` | No | Object with additional info for circuit relay nodes (e.g. `{ ip4, tcpPort, crDomain }`). |
| `announceJsonLd` | No | A custom [JSON-LD](https://json-ld.org/) object for the node's announcement on the coordination channel. Overrides the default. |
| `tcpPort` | No | TCP port number. Used for auto-detecting the node's public multiaddr. |
| `apiInfo` | No | A string (URL or IPFS hash) pointing to API documentation for the service this node provides. |

### CreateHeliaNode Options

When instantiating `CreateHeliaNode`, the following configuration properties can be passed:

| Property | Default | Description |
| :--- | :--- | :--- |
| `ipfsDir` | `'./.ipfsdata/ipfs'` | Directory for IPFS block and data stores. |
| `tcpPort` | `4001` | TCP port for libp2p to listen on. |
| `wsPort` | `4003` | WebSocket port for libp2p to listen on. |
| `isCircuitRelay` | `false` | Whether to enable the circuit relay server. |
| `bootstrapPeers` | PSF defaults | Array of multiaddr strings for bootstrap peer discovery. |
| `getSeed` | Random | An async function returning a seed string for the libp2p keychain. Provide this to get a persistent IPFS peer ID across restarts. |

---

## Adapters Reference

The adapters layer provides interfaces to external systems. Understanding these is helpful for debugging or extending helia-coord.

*   **BCH Adapter** — Uses [minimal-slp-wallet](https://www.npmjs.com/package/minimal-slp-wallet) to handle payments and end-to-end encryption. Generates BCH/SLP addresses for payments and derives the Elliptic Curve key pair used for encrypting and decrypting pubsub messages.
*   **IPFS Adapter** — Interfaces with the injected Helia node's underlying libp2p layer for peer management, including connecting, disconnecting, and listing peers.
*   **Encryption Adapter** — Handles encryption and decryption of pubsub messages using the same Elliptic Curve cryptography used by the Bitcoin protocol. The private key that generates the BCH address is also used to decrypt incoming messages.
*   **Pubsub Adapter** — Publishes messages to pubsub channels and routes incoming messages to appropriate handlers. Includes sub-modules for messaging (`messaging.js`), message routing (`msg-router.js`), and retry logic (`resend-msg.js`).
*   **Gist Adapter** — Interfaces with the GitHub Gist API and the PSF bootstrap server to download a maintained list of Circuit Relay nodes, providing an up-to-date set of relay nodes to connect to at startup.
*   **Schema** — Contains formatted JSON objects used to generate standardized messages for peer-to-peer communication.

---

## Development Environment

Clone the repository and install dependencies:

```bash
git clone https://github.com/Permissionless-Software-Foundation/helia-coord
cd helia-coord
npm install
```

### Running Tests

This project uses [Mocha](https://mochajs.org/) for testing, [Chai](https://www.chaijs.com/) for assertions, [Sinon](https://sinonjs.org/) for mocks, and [nyc](https://github.com/istanbuljs/nyc) for code coverage.

Run the unit test suite:

```bash
npm test
```

Generate a coverage report:

```bash
npm run coverage:report
```

### Running the Example App

The `examples/` directory contains a working example that starts a Helia IPFS node with helia-coord attached:

```bash
cd examples
node start-node.js
```

This will create a Helia IPFS node, connect to the PSF coordination network, discover peers, and begin announcing itself on the pubsub coordination channel.

---

## Links

*   [helia-coord on GitHub](https://github.com/Permissionless-Software-Foundation/helia-coord) — Source code repository.
*   [helia-coord on npm](https://www.npmjs.com/package/helia-coord) — npm package.
*   [Helia](https://github.com/ipfs/helia) — The JavaScript IPFS implementation that helia-coord wraps.
*   [ipfs-service-provider](https://github.com/Permissionless-Software-Foundation/ipfs-service-provider) — A higher-level application that consumes helia-coord.
*   [CashStack.info](https://cashstack.info) — The full software stack that helia-coord is a part of.
*   [PSFoundation.cash](https://PSFoundation.cash) — The Permissionless Software Foundation.
