---
sidebar_position: 1
---

# bch-js

[bch-js](https://github.com/Permissionless-Software-Foundation/bch-js) is a JavaScript npm library for building web and mobile apps that interact with the Bitcoin Cash (BCH) blockchain. It sits at the **Interface Library** layer of the [Cash Stack](/docs/intro), providing a developer-friendly API for communicating with the [psf-bch-api](/docs/back-end/psf-bch-api) REST API server. bch-js is the Swiss army knife of the Cash Stack&mdash;it contains tools for creating wallets, building transactions, working with SLP tokens and NFTs, and much more.

bch-js is maintained by the [Permissionless Software Foundation](https://psfoundation.info).

## Links

- [bch-js](https://github.com/Permissionless-Software-Foundation/bch-js) &mdash; Source code on GitHub
- [npm package](https://www.npmjs.com/package/@psf/bch-js) &mdash; `@psf/bch-js` on npm
- [API Reference Documentation](https://bchjs.fullstack.cash/) &mdash; Full API docs for every method
- [Code Examples](https://github.com/Permissionless-Software-Foundation/psf-js-examples) &mdash; Working examples organized by category
- [Telegram support channel](https://t.me/bch_js_toolkit) &mdash; Community technical support

## Where bch-js Fits in the Cash Stack

The [Cash Stack](/docs/intro) is organized into layers, similar to the OSI model. bch-js lives at the Interface Library layer, bridging the gap between application code and the back end REST API:

```
Application (wallet, web app, bot)
    └── Application Libraries (minimal-slp-wallet, etc.)
        └── Interface Library (bch-js)           ← this library
            └── REST API (psf-bch-api)
                └── Indexers + Full Node
```

bch-js talks directly to an instance of [psf-bch-api](/docs/back-end/psf-bch-api). You can use the public infrastructure provided by [FullStack.cash](https://fullstack.cash), or [run your own infrastructure](/docs/back-end/psf-bch-api).

For most web apps, you will not use bch-js directly. Instead, you will use [minimal-slp-wallet](https://www.npmjs.com/package/minimal-slp-wallet), which embeds bch-js and provides a simpler, higher-level interface for common wallet operations. bch-js is the right choice when you need fine-grained control over transactions or access to advanced features that minimal-slp-wallet does not expose.

## Installation

Install from npm:

```bash
npm install @psf/bch-js
```

Instantiate the library in your code:

```javascript
import BCHJS from '@psf/bch-js'

const bchjs = new BCHJS()
```

By default, bch-js connects to the public REST API at `https://x402-bch.fullstack.cash/v6/`. You can point it at a different server by passing a `restURL` option (see [Configuration](#configuration) below).

## Configuration

bch-js can be configured through constructor options or environment variables. Constructor options take precedence over environment variables.

### Constructor Options

```javascript
import BCHJS from '@psf/bch-js'

const bchjs = new BCHJS({
  restURL: 'https://x402-bch.fullstack.cash/v6/',
  bearerToken: 'your-bearer-token',
  wif: 'your-private-key-wif',
  paymentAmountSats: 20000,
  bchServerURL: 'https://bch.fullstack.cash'
})
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `restURL` | string | — | The REST API server URL for making API calls. |
| `bearerToken` | string | `''` | Bearer token for authentication with a Bearer-token-protected REST API server. |
| `wif` | string | `''` | Private key in WIF format. When provided, enables automatic x402 payment handling. |
| `paymentAmountSats` | number | `20000` | Default amount of satoshis to send when making x402 payments. |
| `bchServerURL` | string | `'https://bch.fullstack.cash'` | BCH server URL used for broadcasting x402 payment transactions. |

### Environment Variables

You can also configure bch-js using environment variables:

| Environment Variable | Config Option | Description |
|---------------------|---------------|-------------|
| `RESTURL` | `restURL` | REST API server URL for making API calls. |
| `BCHJSBEARERTOKEN` | `bearerToken` | Bearer token for API authentication. |
| `BCHJSWIF` | `wif` | Private key in WIF format for x402 payments. |
| `BCHJSBCHSERVERURL` | `bchServerURL` | BCH server URL for x402 payment transactions. |

### Connecting to Different Back Ends

The `restURL` you choose determines which back end infrastructure bch-js talks to and how access control works. There are three common configurations:

**1. x402 Pay-Per-Call (default)**

The public x402 server charges a small BCH micro-payment per API call. Pass a WIF private key and bch-js handles payments automatically:

```javascript
const bchjs = new BCHJS({
  restURL: 'https://x402-bch.fullstack.cash/v6/',
  wif: 'L1eYaneXDDXy8VDig4Arwe8wYHbhtsA5wuQvwsKwhaYeneoZuKG4'
})
```

**2. Free Public Server**

The free server at `https://bch.fullstack.cash/v6/` does not require authentication or payment, but is rate-limited:

```javascript
const bchjs = new BCHJS({
  restURL: 'https://bch.fullstack.cash/v6/'
})
```

**3. Private Infrastructure with Bearer Token**

If you run your own [psf-bch-api](/docs/back-end/psf-bch-api) with Bearer token authentication enabled, pass the token:

```javascript
const bchjs = new BCHJS({
  restURL: 'https://your-server.example.com/v6/',
  bearerToken: 'your-secret-token'
})
```

## Key Features

bch-js provides tools organized into several areas. The full list is available in the [API Reference Documentation](https://bchjs.fullstack.cash/). Below is an overview of the most important areas with code examples.

### Wallet Creation

bch-js uses the BIP39 and BIP44 standards to create HD (hierarchical deterministic) wallets from a 12-word mnemonic phrase:

```javascript
import BCHJS from '@psf/bch-js'
const bchjs = new BCHJS()

async function createWallet () {
  const mnemonic = bchjs.Mnemonic.generate(128)

  const seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic)
  const masterHDNode = bchjs.HDNode.fromSeed(seedBuffer)

  // BIP44 derivation path for BCH: m/44'/145'/0'/0/0
  const childNode = masterHDNode.derivePath("m/44'/145'/0'/0/0")

  const cashAddress = bchjs.HDNode.toCashAddress(childNode)

  console.log('Mnemonic:', mnemonic)
  console.log('Cash Address:', cashAddress)
}

createWallet()
```

:::tip
Always back up the mnemonic phrase. It is the only way to recover the wallet. Never share it with anyone.
:::

### Checking Balances and UTXOs

Query an address for its balance or list its unspent transaction outputs (UTXOs):

```javascript
async function checkBalance (address) {
  const balance = await bchjs.Electrumx.balance(address)
  console.log('Balance:', balance)

  const utxos = await bchjs.Electrumx.utxo(address)
  console.log('UTXOs:', utxos)
}
```

The `bchjs.Utxo.get()` method returns UTXOs with SLP token metadata attached, which is useful when building token-aware transactions.

### Sending BCH

Building and broadcasting a BCH transaction follows this general pattern:

1. Get UTXOs for the sender's address
2. Find a suitable UTXO to spend
3. Build the transaction with inputs and outputs
4. Sign the transaction with the sender's private key
5. Broadcast the raw transaction to the network

```javascript
async function sendBch (wif, toAddress, amountSats) {
  const ecPair = bchjs.ECPair.fromWIF(wif)
  const fromAddress = bchjs.ECPair.toCashAddress(ecPair)

  // Get UTXOs
  const data = await bchjs.Electrumx.utxo(fromAddress)
  const utxos = data.utxos
  const utxo = bchjs.Utxo.findBiggestUtxo(utxos)

  // Build transaction
  const transactionBuilder = new bchjs.TransactionBuilder()
  transactionBuilder.addInput(utxo.tx_hash, utxo.tx_pos)

  const satoshisIn = utxo.value
  const fee = 250
  const change = satoshisIn - amountSats - fee

  transactionBuilder.addOutput(toAddress, amountSats)
  transactionBuilder.addOutput(fromAddress, change)

  // Sign and broadcast
  transactionBuilder.sign(0, ecPair, undefined, transactionBuilder.hashTypes.SIGHASH_ALL, satoshisIn)

  const tx = transactionBuilder.build()
  const hex = tx.toHex()

  const txid = await bchjs.RawTransactions.sendRawTransaction([hex])
  console.log('Transaction ID:', txid)
}
```

### SLP Tokens

bch-js has full support for the [Simple Ledger Protocol (SLP)](https://github.com/simpleledger/slp-specifications), which enables fungible tokens and NFTs on the Bitcoin Cash blockchain. SLP transactions are standard BCH transactions with an OP_RETURN output that encodes token data.

**Creating a new token:**

```javascript
async function createToken (wif) {
  const ecPair = bchjs.ECPair.fromWIF(wif)
  const address = bchjs.ECPair.toCashAddress(ecPair)

  const data = await bchjs.Electrumx.utxo(address)
  const utxo = bchjs.Utxo.findBiggestUtxo(data.utxos)

  const configObj = {
    fundingAddress: address,
    fundingWif: wif,
    tokenName: 'My Token',
    ticker: 'MTK',
    documentUrl: 'https://example.com',
    decimals: 2,
    initialQty: 1000
  }

  // Generate the OP_RETURN script for a Genesis transaction
  const script = bchjs.SLP.TokenType1.generateGenesisOpReturn(configObj)

  const transactionBuilder = new bchjs.TransactionBuilder()
  transactionBuilder.addInput(utxo.tx_hash, utxo.tx_pos)

  const fee = 350
  const dust = 546

  // OP_RETURN output (token data)
  transactionBuilder.addOutput(script, 0)
  // Token receiver output (dust amount carries the tokens)
  transactionBuilder.addOutput(address, dust)
  // Change output
  transactionBuilder.addOutput(address, utxo.value - dust - fee)

  transactionBuilder.sign(0, ecPair, undefined, transactionBuilder.hashTypes.SIGHASH_ALL, utxo.value)

  const hex = transactionBuilder.build().toHex()
  const txid = await bchjs.RawTransactions.sendRawTransaction([hex])
  console.log('Token created. Token ID:', txid)
}
```

**Sending tokens, minting additional tokens, and burning tokens** follow similar patterns. Working examples for each operation are available in the [psf-js-examples](https://github.com/Permissionless-Software-Foundation/psf-js-examples/tree/master/slp) repository.

### NFTs

bch-js supports the [NFT1 specification](https://github.com/simpleledger/slp-specifications/blob/master/slp-nft-1.md), which builds on SLP to create non-fungible tokens. The NFT workflow has two steps:

1. **Create an NFT Group token** &mdash; A fungible token where each unit can be consumed to create a unique NFT.
2. **Create an NFT Child** &mdash; Burn one Group token to mint a unique, non-fungible token.

This two-step process allows you to create collections of NFTs. The Group token defines the collection, and each Child token is a unique item within it. See the [NFT examples](https://github.com/Permissionless-Software-Foundation/psf-js-examples/tree/master/slp/nft) for complete working code.

### Message Signing and Verification

bch-js can cryptographically sign messages with a private key and verify signatures against a public address. This is useful for proving ownership of an address without making a transaction:

```javascript
// Sign a message
const wif = 'L1eYaneXDDXy8VDig4Arwe8wYHbhtsA5wuQvwsKwhaYeneoZuKG4'
const message = 'Hello, Bitcoin Cash!'
const signature = bchjs.BitcoinCash.signMessageWithPrivKey(wif, message)

// Verify the signature
const address = bchjs.ECPair.toCashAddress(bchjs.ECPair.fromWIF(wif))
const isValid = bchjs.BitcoinCash.verifyMessage(address, signature, message)
console.log('Signature valid:', isValid)
```

### Address Conversion

Bitcoin Cash uses several address formats. bch-js can convert between them:

```javascript
const cashAddr = 'bitcoincash:qp3sn6vlwz28ntmf3wmyra7jqttfx7z6zgtkygjhc7'

const legacyAddr = bchjs.Address.toLegacyAddress(cashAddr)
const slpAddr = bchjs.SLP.Address.toSLPAddress(cashAddr)

console.log('Legacy:', legacyAddr)
console.log('SLP:', slpAddr)
```

### Utility Functions

bch-js includes several utility functions for working with BCH amounts and data:

```javascript
// Convert between satoshis and BCH
const bch = bchjs.BitcoinCash.toBitcoinCash(100000)
const sats = bchjs.BitcoinCash.toSatoshi(0.001)

// Encode and decode data in OP_RETURN outputs
const script = bchjs.Script.nullData.output.encode(Buffer.from('Hello BCH'))
```

## Web Apps

bch-js is a Node.js library. For front-end browser apps, use [minimal-slp-wallet](https://www.npmjs.com/package/minimal-slp-wallet), which bundles bch-js and compiles it for use in the browser with Browserify. minimal-slp-wallet provides a simpler, higher-level API for common wallet operations and is the recommended starting point for [web apps](/docs/front-end/web-apps).

If you need to use bch-js directly in a browser without minimal-slp-wallet, [this gist](https://gist.github.com/christroutner/6cb9d1b615f3f9363af79723157bc434) shows how to include it in a basic web page.

## Code Examples

The [psf-js-examples](https://github.com/Permissionless-Software-Foundation/psf-js-examples) repository contains working examples organized by category:

- **wallet/** &mdash; Create wallets, check balances, send BCH, consolidate UTXOs, sign messages
- **slp/** &mdash; Create tokens, mint, send, burn, and look up token information
- **slp/nft/** &mdash; Create NFT Groups, mint Group tokens, create and send NFT Children
- **access/** &mdash; Configure bch-js for different back end servers (free, x402, Bearer token)

Each example includes a `create-wallet` script that generates a `wallet.json` file. Fund the wallet with a small amount of BCH, then run the other examples. Most examples follow the same pattern: load the wallet, get UTXOs, build a transaction, sign it, and broadcast it.

## Important Constants

When building transactions with bch-js, keep these values in mind:

| Constant | Value | Description |
|----------|-------|-------------|
| Dust limit | 546 satoshis | Minimum output value the network will relay. SLP token outputs use this value. |
| BIP44 coin type (BCH) | 145 | Derivation path: `m/44'/145'/0'/0/0` |
| BIP44 coin type (SLP) | 245 | Derivation path: `m/44'/245'/0'/0/0` |
| Typical transaction fee | 250&ndash;550 satoshis | Depends on the number of inputs and outputs. |

## Support

Have questions? Need help? Join the community support [Telegram channel](https://t.me/bch_js_toolkit).
