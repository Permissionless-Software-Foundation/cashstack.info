---
sidebar_position: 2
title: Why SLP?
---

There are multiple token protocols. The purpose of this page is to compare and contrast the SLP protocol for tokens to other cryptographic token protocols. To provide context to the value of the SLP protocol, it's good to understand some the history of blockchain token protocols.

- [Counterparty](https://counterparty.io) is one of the oldest token protocols, it started on the Bitcoin (BTC) blockchain in 2014. The company and protocol has evolved, but it had a tumultuous relationship with the Bitcoin developer community, spawning the [OP_RETURN wars](https://blog.bitmex.com/dapps-or-only-bitcoin-transactions-the-2014-debate/). The lesson to take away from the Counterparty experience is that blockchain developers can sometimes be hostile toward token protocols, changing the rules of the system to discourage the use of tokens.

- Ethereum famously launched its ERC20 token standard, which lead to the ICO boom of 2017. As anyone who tries to use tokens on the Ethereum main chain will discover, the transaction fee is often prohibitively expensive. The vast majority of businesses that want to use tokens require a low-fee blockchain in order to make their token economically feasible. The lesson to take away from Ethereum tokens is that high transaction fees reduce the economic viability of a token program.

- In 2018 the mining giant [Bitmain launched](https://news.bitcoin.com/wormhole-project-launches-1-2m-worth-of-bch-burned-so-far/) the [Wormhole token protocol](https://www.bcbitcoin.com/articles/new-protocol-wormhole-to-bring-app-development-to-the-bitcoin-cash-network/) on the Bitcoin Cash blockchain. This was a fork of the [Omni token protocol](https://www.omnilayer.org/). It gained popularity quickly, but died suddenly in November 2019. The reason? The protocol was based on a fork of the ABC full node. The Wormhole development team lost funding, and the BCH network had a tradition of creating a network upgrade (hard fork) every 6 months. Without anyone to update the Wormhole node, it got forked off the network and the entire token ecosystem suddenly died. In software engineering, this is known as a *tight coupling*, and it's consider an anti-pattern (something to avoid). The lesson to take away from Wormhole is that token protocols that are tightly coupled to the full node can have sudden deaths.

The three examples above illustrate the value of the SLP token protocol compared to other token protocols. SLP is *loosely coupled* to the full node, because token transactions are validated by an independent validator. The full node software does not care or know anything about the transaction. It's simply processing normal transactions with an OP_RETURN field.

Furthermore, the SLP token protocol can be adapted to any blockchain that includes a text field in the transaction. This includes Bitcoin forks such as Bitcoin Cash (BCH), [eCash](https://e.cash/) (XEC), [Nexa](https://nexa.org/), [Radiant](https://radiantblockchain.org/), but it also includes non-Bitcoin forks such as the [AVAX X-chain](https://www.avax.network/) or [Qortal](https://qortal.org/). There are currently mature SLP ecosystems on the Bitcoin Cash and eCash blockchains.

Because SLP is loosely coupled and so easy to adapt to a blockchain, this reduces [platform risk](https://www.startupillustrated.com/Archive/Platform-Risk/) for any business that creates tokens with it. If an issue ever arises with the chosen blockchain (the platform), weather it be hostile devs, high fees, or some other source, a business can easily move their token ecosystem to a more favorable blockchain.

## CashTokens

A new token protocol was launched on the Bitcoin Cash blockchain in May of 2023 called [CashTokens](https://cashtokens.org/). Many in the BCH space viewed this as the successor of the SLP token protocol. It had these main feature improvements:

- *Miner validated tokens* - Token transaction are validated by the full node software and not by a secondary validator. The main advantage here is that tokens can not be accidentally burned through a malformed transaction, the transaction will instead be rejected.
- *Bitcoin Script programming* - The same Bitcoin Script programming language that is accessible to normal transactions is now accessible to token transactions as well.

The CashStack framework continues to focus on the SLP token protocol instead of the CashToken protocol. The CashToken protocol is *tightly coupled* to the full node, the dangers of which are covered above. The protocol has not been adopted by any other blockchain. This means that any business that builds on the CashToken protocol is 'locked in' to the Bitcoin Cash blockchain, increasing their platform risk.

While unintentional burning of SLP tokens is possible, the infrastructure around the protocol is extremely mature. Tools like the [minimal-slp-wallet](https://www.npmjs.com/package/minimal-slp-wallet) and the open source [web wallet](https://bchn-wallet.fullstack.cash) can be forked and used by any business, and they have not had any issue with burning tokens in several years. It's also entirely possible for a business to have a 'burning policy' to detect and compensate users if an accidental token burn should ever occur.
