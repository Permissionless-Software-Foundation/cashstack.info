---
sidebar_position: 1
---

# File Storage

Most web 3 applications need access to both data and money. The [ipfs-file-pin-service](https://github.com/Permissionless-Software-Foundation/ipfs-file-pin-service) allows for storage and retrieval of files over the IPFS network. File storage is paid by burning PSF tokens, which can be obtained from [PSFoundation.cash](https://psfoundation.cash).

The protocol for paying for and storing files is covered by the [PSF File Pinning Protocol (PSFFPP)](https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps010-file-pinning-protocol.md), and additional documentation can be found at [PSFFPP.com](https://psffpp.com). This allows for permissionless, censorship-resistent file storage and retrieval, which compliments the same features of money provided by blockchain technology.

## psffpp

The [psffpp npm JavaScript library](https://www.npmjs.com/package/psffpp) allows developers to integrate the [PSF File Pinning Protocol (PSFFPP)](https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps010-file-pinning-protocol.md) into their own applications. This allows them to download files from or upload files to the PSFFPP network if they have access to a wallet and IPFS node.

## psffpp-client

The [psffpp-client](https://github.com/Permissionless-Software-Foundation/psffpp-client) is a small web server for interacting with the PSFFPP network. It integrates the [psffpp library](https://www.npmjs.com/package/psffpp) and can be controlled by the [psf-bch-wallet command line app](https://github.com/Permissionless-Software-Foundation/psf-bch-wallet) over a REST API.

On startup, the psffpp-client creates a [Helia IPFS node](https://github.com/ipfs/helia) and connects to the PSF IPFS network. This allows it to download files from the PSFFPP network. Files can also be pinned by the Helia node, then a wallet like psf-bch-wallet can also generate the blockchain transactions to ask the PSFFPP network to pin the file. psffpp-client will seed (upload) the initial copy of the file to the PSFFPP network.

## ipfs-file-pin-service

[ipfs-file-pin-service](https://github.com/Permissionless-Software-Foundation/ipfs-file-pin-service) runs on the same machine as the [SLP Token Indexer](/docs/back-end/slp-indexer/slp-indexer-software). When the Indexer detects a *Pin Claim* on the blockchain, it sends the information to *ipfs-file-pin-service* via a webhook. The File Pin Service evaluates the data and will pin the file if it meets the requirements. That file is then available for download from that node. A network of these File Pin Services ensure the data is stored redundantly across the world.

## Links

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
