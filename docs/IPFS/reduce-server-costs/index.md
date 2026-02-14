---
sidebar_position: 1
---

# Reduce Server Costs

**Learn how the Permissionless Software Foundation (PSF) reduced recurring cloud costs by 92% and built a more resilient, censorship-resistant infrastructure.**

<iframe width="639" height="359" src="https://www.youtube.com/embed/hnAzmns7H9g" title="Install ipfs-file-pin-service" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe>

---

## Introduction

Running blockchain infrastructure is traditionally expensive, creating a barrier for hobbyist developers and entrepreneurs. The **Cash Stack** is a five-layer software framework that describes how applications communicate with the Bitcoin Cash blockchain. By inserting an **IPFS networking layer** into this stack, the PSF moved heavy infrastructure from the cloud to home desktops, reducing monthly costs from **$50 to roughly $4**.

## The Problem: Cloud Infrastructure Barriers

Every Bitcoin Cash application requires back-end infrastructure, including a **full node**, **indexers**, and an **API server**. In a traditional Web 2.0 deployment, these run on cloud providers like Hetzner or AWS.

*   **Cost:** A single instance of the full stack costs approximately **$50/month** on the cheapest providers.
*   **Barrier to Entry:** For many developers, particularly those in developing countries, even $10/month is a significant deterrent.
*   **Centralization:** Cloud-hosted infrastructure is vulnerable to corporate or government censorship.

## The Solution: The Web 3 Cash Stack

The **Web 3 Cash Stack** introduces an IPFS layer between the API and the front-end application. This architecture allows the resource-intensive parts of the stack to run on a home desktop while maintaining a lightweight presence in the cloud.

### The Five Layers of the Cash Stack
1.  **Application Layer:** The user interface (wallet, web app, mobile app).
2.  **Interface Library Layer:** Libraries like `bch-js` that translate user actions into blockchain calls.
3.  **API Layer:** The bridge between client and server (REST, GraphQL, or JSON RPC over IPFS).
4.  **Indexer Layer:** Software like **Fulcrum** or the **SLP indexer** that organizes blockchain data.
5.  **Full Node Layer:** The software that validates blocks and broadcasts transactions.

---

## Core Components

The transition to the Web 3 Cash Stack is made possible by two primary pieces of software and automated networking technology.

### 1. ipfs-bch-wallet-service (Back-End)
This Node.js microservice runs on a **home desktop** alongside the full node and indexers. It:
*   Connects to the local blockchain API.
*   Listens for incoming **JSON RPC** requests over the IPFS network.
*   Requires no public IP address, allowing it to function behind residential firewalls and NAT.

### 2. ipfs-bch-wallet-consumer (Front-End)
This lightweight application runs on a **minimal $4/month VPS**. It:
*   Provides a **local REST API** that front-end apps can call using standard HTTP.
*   Translates REST requests into JSON RPC messages sent over IPFS to the back-end service.

### 3. Circuit Relays: The "Magic Sauce"
Circuit relays are IPFS nodes with public IP addresses that act as intermediaries. They allow the home-based service and the cloud-based consumer to communicate without manual port forwarding or complex network configuration. This automation replaces the need for expensive network engineering expertise.

---

## Cost Comparison: Web 2 vs. Web 3

| Feature | Web 2 Cash Stack | Web 3 Cash Stack |
| :--- | :--- | :--- |
| **Monthly Cloud Cost** | ~$50/month | **~$4/month** |
| **Setup Cost** | $0 | ~$400 (one-time desktop purchase) |
| **Break-even Point** | N/A | ~8 months |
| **Cost Reduction** | — | **92%** |

**

While the Web 3 model requires a one-time hardware investment (e.g., a desktop with 32 GB RAM and 1 TB hard drive), it eliminates the perpetual burden of high recurring subscriptions.

---

## Key Benefits Beyond Cost

### Censorship Resistance
By moving the heavy infrastructure to home-hosted hardware, the system is no longer dependent on the terms of service or political pressures faced by cloud providers.

### Redundancy and Resilience
The architecture is inherently **decentralized**. Multiple community members can run their own instances of `ipfs-bch-wallet-service`. If one back-end goes offline, applications can automatically detect the failure and switch to another available back-end on the IPFS subnetwork.

---

## Resources
*   [**CashStack.info**](https://cashstack.info) — Official documentation
*   [**PSFoundation.info**](https://psfoundation.info) — Permissionless Software Foundation
*   [**FullStack.cash**](https://fullstack.cash) — Development services
*   [**ipfs-bch-wallet-service GitHub**](https://github.com/Permissionless-Software-Foundation/ipfs-bch-wallet-service) — Back-end bridge
*   [**ipfs-bch-wallet-consumer GitHub**](https://github.com/Permissionless-Software-Foundation/ipfs-bch-wallet-consumer) — Front-end bridge