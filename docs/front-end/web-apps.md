---
sidebar_position: 3
---

# Web Apps

The Cash Stack includes React templates for building web-based, non-custodial wallet apps on Bitcoin Cash. Both templates are built on the [Cash Stack](https://cashstack.info) web3 architecture, which provides a censorship-resistant back end for accessing the blockchain. They can be statically compiled, uploaded to [Filecoin](https://filecoin.io/), and served over IPFS&mdash;giving you a censorship-resistant front end to match. They can also be compiled into native Android apps using [react-bootstrap-web3-android](https://github.com/Permissionless-Software-Foundation/react-bootstrap-web3-android).

## react-bootstrap-web3-spa

[react-bootstrap-web3-spa](https://github.com/Permissionless-Software-Foundation/react-bootstrap-web3-spa) is a general-purpose React single page app (SPA) template for building blockchain-based web apps. It is the starting point for any Cash Stack web app, not just wallets.

- [Live Demo on GitHub Pages](https://permissionless-software-foundation.github.io/react-bootstrap-web3-spa/)
- [Live Demo on Filecoin](https://bafybeic3nuawgogcfjkxxstyqyg6dmzajvkxp55ccldipwmgiyuikhrq5y.ipfs.dweb.link/)
- [Source Code](https://github.com/Permissionless-Software-Foundation/react-bootstrap-web3-spa)

Key features:

- [react-bootstrap](https://react-bootstrap.github.io/) for style and layout
- [minimal-slp-wallet](/docs/front-end/minimal-slp-wallet) for interacting with BCH and SLP tokens
- A server-selection dropdown that lets users choose from redundant web3 back end servers
- A customizable waiting modal for network calls
- A collapsible navigation menu for loading different views
- Static compilation for hosting on IPFS/Filecoin

### Installation

```bash
git clone https://github.com/Permissionless-Software-Foundation/react-bootstrap-web3-spa
cd react-bootstrap-web3-spa
npm install
npm start
```

Build for production with `npm run build`.

## bch-wallet-web3-spa

[bch-wallet-web3-spa](https://github.com/Permissionless-Software-Foundation/bch-wallet-web3-spa) is a non-custodial wallet app forked from react-bootstrap-web3-spa. It adds wallet-specific React components on top of the base template and pulls in upstream updates as they are made. A live version is available at [wallet.psfoundation.info](https://wallet.psfoundation.info).

- [Live Demo](https://wallet.psfoundation.info)
- [Source Code](https://github.com/Permissionless-Software-Foundation/bch-wallet-web3-spa)

This repository is intended to be a boilerplate for creating BCH-based web apps. Developers and businesses are encouraged to fork it and customize it for their own needs. It includes the following wallet functionality:

- Send and receive BCH
- Send and receive SLP tokens and NFTs
- Display token icons
- Backup, restore, and optimize the wallet
- Sweep BCH and tokens from a paper wallet
- Sign a message cryptographically

### Installation

```bash
git clone https://github.com/Permissionless-Software-Foundation/bch-wallet-web3-spa
cd bch-wallet-web3-spa
npm install
npm start
```

Build for production with `npm run build`.

## Back End Service

Both web apps use [minimal-slp-wallet](/docs/front-end/minimal-slp-wallet) to communicate with the blockchain. The wallet library can connect to either Web 2 infrastructure ([psf-bch-api](/docs/back-end/psf-bch-api)) or Web 3 infrastructure ([ipfs-bch-wallet-consumer](/docs/IPFS/reduce-server-costs/ipfs-bch-wallet-consumer)). You can run these services yourself, or use wallet services provided by the PSF community.

The back end server can be chosen at runtime by clicking the button at the bottom of the screen labeled "Select a different back end server".

![Selecting a wallet service](../img/select-back-end.png)

No private information (keys, mnemonics, etc.) is ever sent to the back end service. The service simply provides access to the blockchain and indexers so the app can query data and broadcast transactions.

The list of community-provided wallet services is dynamically loaded from [this JSON file](https://consumers.psfoundation.info/consumers.json).

## Example Apps

Below is a list of example applications built with the Cash Stack. The source code for each app is available for you to fork and hack on.

### Wallet

[wallet.psfoundation.info](https://wallet.psfoundation.info) is an open source, white-label wallet built from bch-wallet-web3-spa. It provides a foundation upon which to build additional functionality.

- [Live Demo](https://wallet.psfoundation.info)
- [Source Code](https://github.com/Permissionless-Software-Foundation/bch-wallet-web3-spa)

### Balance Checker

A simple demo of the react-bootstrap-web3-spa template. Given a BCH address, it reports the balance for that address, similar to a block explorer. A great beginner app for developers to start hacking on.

- [Live Demo](https://permissionless-software-foundation.github.io/react-bootstrap-web3-spa/)
- [Source Code](https://github.com/Permissionless-Software-Foundation/react-bootstrap-web3-spa)

### Address Conversion

Given a BCH, SLP, legacy BTC, or eCash address, this app converts it into its different address formats.

- [Live Demo](https://address.fullstack.cash/)
- [Source Code](https://github.com/Permissionless-Software-Foundation/web-app-address-conversion)

### Telegram and Discord Bots

A chat bot that silences all newcomers by default. They can gain the ability to speak in your Telegram or Discord channel by completing a challenge, such as signing a message with the web wallet or claiming a token.

- [PSF Telegram channel](https://t.me/permissionless_software)
- [Source Code](https://github.com/christroutner/vip-bot)
