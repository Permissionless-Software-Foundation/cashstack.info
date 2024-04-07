---
sidebar_position: 6
---

# File Storage

Most web 3 applications need access to both data and money. The [ipfs-file-pin-service](https://github.com/Permissionless-Software-Foundation/ipfs-file-pin-service) allows for storage and retrieval of files over the IPFS network. File storage is paid by burning PSF tokens, which can be obtained from [PSFoundation.cash](https://psfoundation.cash).

The protocol for paying for and storing files is covered by the [PSF File Pinning Protocol (PSFFPP)](https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps010-file-pinning-protocol.md). This allows for permissionless, censorship-resistent file storage and retrieval, which compliments the same features of money provided by blockchain technology.

[ipfs-file-pin-service](https://github.com/Permissionless-Software-Foundation/ipfs-file-pin-service) runs on the same machine as the [SLP Token Indexer](./slp-indexer/slp-indexer-software.md). When the Indexer detects a *Pin Claim* on the blockchain, it sends the information to *ipfs-file-pin-service* via a webhook. The File Pin Service evaluates the data and will pin the file if it meets the requirements. That file is then available for download by that node. A network of these File Pin Services ensure the data is stored redundantly across the world.

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
