---
sidebar_position: 1
---

# Decentralized File Hosting

This documentation accompanies the **Cash Stack: File Hosting** video and the [Completed Cash Stack Slide Deck](/img/The_Completed_Cash_Stack.pdf). While the video provides a high-level overview of how Bitcoin Cash (BCH) and IPFS are integrated, this page dives deeper into the technical protocols, economic incentives, and software components that make this decentralized architecture possible.

<iframe width="639" height="359" src="https://www.youtube.com/embed/aa2yFjK7IzA" title="Cash Stack + IPFS" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe>

---

## The Vision: A Full-Stack Decentralized Web

The existing Bitcoin Cash stack is highly efficient at handling **Value** (money) and **State** (tokens and NFTs), but it has historically lacked the capacity to store the large-scale **Content** (images, video, media) that makes up the modern web.

By creating a **Protocol Bridge** known as the **PSF File Pinning Protocol (PSFFPP)**, the system combines the best of two worlds:
*   **Bitcoin Cash (BCH):** Acts as the **Ledger of Truth**, providing native cryptocurrency for payments and small, immutable pointers to data.
*   **IPFS (Inter-Planetary File System):** Acts as the **Distributed Hard Drive**, capable of storing files of any size using content-addressable IDs (CIDs).

This allows for permissionless, censorship-resistant file storage and retrieval, which compliments the same features of money provided by blockchain technology. File storage is paid by burning PSF tokens, which can be obtained from [PSFoundation.cash](https://psfoundation.cash) or the [SLP DEX](https://slpdex.com).

---

## The PSF File Pinning Protocol (PSFFPP)

The [PSF File Pinning Protocol (PSFFPP)](https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps010-file-pinning-protocol.md) creates a permissionless marketplace for file retention. It is designed with the following targets:
*   **Cost:** Approximately **$0.01 USD per megabyte**.
*   **Duration:** A **one-year hosting guarantee**, which is renewable.
*   **Capacity:** Up to **100 MB per file**.
*   **Currency:** Payments are made by burning **PSF Tokens** (an SLP Type 1 token).

### The Pin Claim Workflow

The process of hosting a file involves a specific sequence of operations:

1.  **IPFS Upload:** The user uploads a file to IPFS to generate a unique **CID**.
2.  **Proof of Burn (PoB):** The user performs an SLP transaction where tokens are permanently destroyed. The amount burned must meet or exceed the required price for the file size.
3.  **Broadcast Pin Claim:** The user broadcasts a BCH transaction with an **OP_RETURN** data structure containing the **Lokad ID (0x00510000)**, the PoB Transaction ID, the CID, and the filename.
4.  **Detection & Validation:** Independent pinning services (running `ipfs-file-pin-service`) monitor the blockchain. When they detect a Pin Claim, they independently validate the burn amount and download the file via IPFS.
5.  **Redundant Pinning:** If valid, the service "pins" the file, committing to host it for one year. Because multiple nodes operate independently, the network achieves **censorship-resistant redundancy** without a master server.

---

## Economic Engine: Why "Proof of Burn"?

Instead of paying a central company like Amazon or Google, users **verifiably destroy tokens**. This model offers several advantages:
*   **Permissionless Access:** No accounts or API keys are required; anyone with the necessary tokens can use the service.
*   **Value Capture:** Burning tokens reduces the total supply, capturing value for all remaining token holders and funding the ecosystem.
*   **Decentralized Governance:** The write price is not set by a CEO, but by the **PSF Minting Council** through a multisignature approval process (PS009).

---

## Data-Rich Tokens (SLP + IPFS)

This integration fundamentally upgrades what a token can be. Under this architecture, a token becomes a rich, layered digital asset:
*   **On-Chain (Genesis Data):** Core immutable data like the ticker and name.
*   **Immutable Layer (IPFS):** Linked via CID, this contains fixed metadata or media files that should never change.
*   **Mutable Layer (IPFS):** Linked via a **Mutable Data Address (MDA)**, allowing for updatable information like game stats or supply chain tracking while maintaining a decentralized history.

---

## Software Components

### psffpp

The [psffpp npm JavaScript library](https://www.npmjs.com/package/psffpp) allows developers to integrate the [PSF File Pinning Protocol (PSFFPP)](https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps010-file-pinning-protocol.md) into their own applications. This allows them to download files from or upload files to the PSFFPP network if they have access to a wallet and IPFS node.

### psffpp-client

The [psffpp-client](https://github.com/Permissionless-Software-Foundation/psffpp-client) is a small web server for interacting with the PSFFPP network. It integrates the [psffpp library](https://www.npmjs.com/package/psffpp) and can be controlled by the [psf-bch-wallet command line app](https://github.com/Permissionless-Software-Foundation/psf-bch-wallet) over a REST API.

On startup, the psffpp-client creates a [Helia IPFS node](https://github.com/ipfs/helia) and connects to the PSF IPFS network. This allows it to download files from the PSFFPP network. Files can also be pinned by the Helia node, then a wallet like psf-bch-wallet can also generate the blockchain transactions to ask the PSFFPP network to pin the file. psffpp-client will seed (upload) the initial copy of the file to the PSFFPP network.

### ipfs-file-pin-service

[ipfs-file-pin-service](https://github.com/Permissionless-Software-Foundation/ipfs-file-pin-service) runs on the same machine as the [SLP Token Indexer](/docs/back-end/slp-indexer/slp-indexer-software). When the Indexer detects a *Pin Claim* on the blockchain, it sends the information to *ipfs-file-pin-service* via a webhook. The File Pin Service evaluates the data and will pin the file if it meets the requirements. That file is then available for download from that node. A network of these File Pin Services ensure the data is stored redundantly across the world.

---

## Developer Resources & Specifications

To build on the Completed Cash Stack, developers can utilize the following open-source tools and technical specifications.

### Key Specifications

| Spec | Name | Purpose |
| :--- | :--- | :--- |
| **[PS010](https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps010-file-pinning-protocol.md)** | **File Pinning Protocol** | Core rules for Pin Claims and Proof of Burn. |
| **[PS007](https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps007-token-data-schema.md)** | **Token Data Schema** | Standardized schema for token icons and media. |
| **[PS002](https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps002-slp-mutable-data.md)** | **SLP Mutable Data** | Mechanics for updating token data over time. |
| **[PS009](https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps009-multisig-approval.md)** | **Multisig Approval** | Governance for price setting and protocol updates. |

### Tooling

*   [**explorer.psffpp.com**](https://explorer.psffpp.com): Browse pinned files and generate Pin Claims.
*   [**TokenTiger.com**](https://tokentiger.com): Create NFTs with media hosted on the PSFFPP network.
*   **psffpp-client:** A JavaScript library and node manager for integrating file pinning into custom apps.
*   **ipfs-file-pin-service:** The server-side infrastructure for running your own pinning node.

### Documentation

- [PSFFPP.com](https://psffpp.com/docs/intro) - Official documentation site.

### Videos

- [upload.psfoundation.info Demo](https://youtu.be/d9AGMTRM3Ws?si=pNZkDcikPQO1Jpbe)
- [PSFFPP Technical Introduction](https://youtu.be/flaEm4RFzYA?si=adnqps_BKhzx0xy0)
- [psffpp-client](https://youtu.be/viX_SBpEgEU?si=sQCfDTOhyX04-l4H)

### Software

- [psffpp](https://www.npmjs.com/package/psffpp) - npm JavaScript library implementing this specification.
- [psf-slp-indexer, pin-ipfs branch](https://github.com/Permissionless-Software-Foundation/psf-slp-indexer/tree/pin-ipfs) used to track Pin Claims on the blockchain.
- [ipfs-file-pin-service](https://github.com/Permissionless-Software-Foundation/ipfs-file-pin-service) validates Pin Claims and pins IPFS files. Works in tandem with psf-slp-indexer.

For more information, visit [**CashStack.info**](https://cashstack.info) for full stack documentation or [**PSFFPP.com**](https://psffpp.com) for protocol-specific details.
