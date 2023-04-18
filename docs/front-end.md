---
sidebar_position: 2
---

# Front End

The Cash Stack includes [React templates](https://github.com/Permissionless-Software-Foundation/bch-wallet-web3-android) for creating a web-based, non-custodial wallet. It includes [Capacitor](https://capacitorjs.com/) libraries to easily compile the apps into iOS and Android phone apps. The structure allows developers to fork their own white-labeled wallet, then quickly build and share extensions to the wallet app.

Our templates are also built IPFS-first, meaning that the front-end user interface is optimized for uploading to [Filecoin](https://filecoin.io) or [IPFS](https://ipfs.io), allowing developers to build censorship-resistant user interfaces to their blockchain-based applications.

## React SPA
The fastest way to build a web app that communicates with a blockchain is the [react-bootstrap-web3-spa template](https://github.com/Permissionless-Software-Foundation/react-bootstrap-web3-spa). This template starts with [Create React App](https://create-react-app.dev/) and adds the [React Bootstrap library](https://react-bootstrap.github.io/) for easy layout. It also contains the [minimal-slp-wallet library](https://www.npmjs.com/package/minimal-slp-wallet) for interacting with the BCH blockchain. This template is appropriate for building any general-purpose blockchain-based app, as opposed to just a wallet.

## White-Label Wallet
[bch-wallet-web3-android](https://github.com/Permissionless-Software-Foundation/bch-wallet-web3-android) is forked from the above template and has additional React components added to create a wallet with basic functionality:
- Send and receive BCH
- Send and recieve Tokens
- Display token icons
- Backup, restore, and optimize the wallet
- Sweep BCH and tokens from a paper wallet
- Sign a message cryptographically

The wallet template includes [Capacitor](https://capacitorjs.com/) libraries to compile the app into native iOS and Android phone apps.

## Back End Service
The web wallet will need to connect to an instance of [ipfs-bch-wallet-consumer](https://github.com/Permissionless-Software-Foundation/ipfs-bch-wallet-consumer) in order to communicate with the blockchain. You can run that service yourself, or you can use wallet services provided by the PSF community. The wallet service can be chosen by clicking the button at the bottom of the screen labeled 'Select a different back end server'.

![Selecting a wallet service](./img/select-back-end.png)

No private information (keys, mnemonics, etc) is ever sent to the back end service. The service simply provides access to the blockchain and indexers, so the web wallet can query data and broadcast transactions.

The list of community-provided wallet services is dynamically loaded from [this Gist](https://gist.github.com/christroutner/63c5513782181f8b8ea3eb89f7cadeb6). To run your own wallet service, you'll need to install the [Local Back End](/docs/local-back-end).

## minimal-slp-wallet

[minimal-slp-wallet](https://www.npmjs.com/package/minimal-slp-wallet) is a JavaScript library compiled for use in a front end browser app. It provides basic wallet functionality for working with BCH and SLP tokens. It can be configured to operate on either the Web 2 or Web 3 architecture. It also has an instance of [bch-js](https://bchjs.fullstack.cash/) embedded into the library.

### Other Blockchains

- [minimal-avax-wallet](https://www.npmjs.com/package/minimal-avax-wallet) possesses the same functionality and interfaces, but operates on the [Avalanche X-Chain blockchain](https://www.avax.network/).

- [minimal-ecash-wallet](https://www.npmjs.com/package/minimal-ecash-wallet) possesses the same functionality and interfaces, but operates on the [eCash blockchain](https://e.cash).
