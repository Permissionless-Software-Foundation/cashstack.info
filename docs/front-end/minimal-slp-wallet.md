---
sidebar_position: 2
---

# minimal-slp-wallet

[minimal-slp-wallet](https://github.com/Permissionless-Software-Foundation/minimal-slp-wallet) is a JavaScript wallet "engine" for building web, mobile, and Node.js applications on Bitcoin Cash (BCH). It sits at the **Application Library** layer of the [Cash Stack](/docs/intro), one level above [bch-js](/docs/front-end/bch-js). Where bch-js is a low-level Swiss army knife that requires Bitcoin knowledge, minimal-slp-wallet provides a simple, high-level API for the most common wallet operations&mdash;creating wallets, sending and receiving BCH, working with SLP tokens and NFTs, checking balances, and more.

minimal-slp-wallet is token-aware and works with all SLP tokens, including NFTs. It can connect to either **Web 2** infrastructure ([psf-bch-api](/docs/back-end/psf-bch-api) via REST API) or **IPFS** (Web3) infrastructure ([ipfs-bch-wallet-consumer](/docs/IPFS/reduce-server-costs/ipfs-bch-wallet-consumer) via JSON RPC). It also embeds an instance of [bch-js](/docs/front-end/bch-js), so you can drop down to the lower-level API when you need fine-grained control.

minimal-slp-wallet is maintained by the [Permissionless Software Foundation](https://psfoundation.info).

## Links

- [minimal-slp-wallet](https://github.com/Permissionless-Software-Foundation/minimal-slp-wallet) &mdash; Source code on GitHub
- [npm package](https://www.npmjs.com/package/minimal-slp-wallet) &mdash; `minimal-slp-wallet` on npm
- [Code Examples](https://github.com/Permissionless-Software-Foundation/psf-js-examples/tree/master/minimal-slp-wallet) &mdash; Working examples organized by category
- [bch-js API Reference](https://bchjs.fullstack.cash/) &mdash; API docs for the embedded bch-js instance
- [Telegram support channel](https://t.me/bch_js_toolkit) &mdash; Community technical support

## Where minimal-slp-wallet Fits in the Cash Stack

The [Cash Stack](/docs/intro) is organized into layers. minimal-slp-wallet lives at the Application Library layer, directly below your application code and above the interface libraries:

```
Application (wallet, web app, bot)
    └── Application Libraries (minimal-slp-wallet)    ← this library
        └── Interface Library (bch-js, bch-consumer)
            └── REST API / JSON RPC (psf-bch-api, ipfs-bch-wallet-consumer)
                └── Indexers + Full Node
```

A key advantage of minimal-slp-wallet is that it supports both Web 2 and Web 3 back ends. When configured with `interface: 'rest-api'`, it uses [bch-js](/docs/front-end/bch-js) to talk to [psf-bch-api](/docs/back-end/psf-bch-api). When configured with `interface: 'consumer-api'`, it uses [bch-consumer](https://www.npmjs.com/package/bch-consumer) to talk to [ipfs-bch-wallet-consumer](/docs/IPFS/reduce-server-costs/ipfs-bch-wallet-consumer). Your application code stays the same either way.

### When to Use minimal-slp-wallet vs bch-js

| | minimal-slp-wallet | [bch-js](/docs/front-end/bch-js) |
|---|---|---|
| **Best for** | Most apps and wallets | Custom, advanced transactions |
| **Skill level** | Beginner to intermediate | Advanced (requires Bitcoin knowledge) |
| **API style** | High-level (`wallet.send()`) | Low-level (build transactions manually) |
| **Web 3 support** | Yes (`consumer-api`) | No (REST API only) |
| **Browser ready** | Yes (compiled with Browserify) | No (Node.js only) |
| **Token support** | Built-in | Manual (construct OP_RETURN scripts) |

## Installation

### Node.js

```bash
npm install minimal-slp-wallet
```

```javascript
// ESM
import BchWallet from 'minimal-slp-wallet'

// CommonJS
const BchWallet = require('minimal-slp-wallet')
```

### Browser

Add the script tag to your HTML:

```html
<script src="https://unpkg.com/minimal-slp-wallet"></script>
```

For React-based apps, see the [web app templates](/docs/front-end/web-apps) which include minimal-slp-wallet out of the box.

## Configuration

minimal-slp-wallet is configured by passing a mnemonic (or `undefined` for a new wallet) and an options object to the constructor. The `interface` and `restURL` options determine which back end infrastructure the wallet talks to.

### Connecting to a Back End

There are four common configurations, depending on which back end service you want to use.

**1. Web 2: x402 Pay-Per-Call**

The x402 server charges a small BCH micro-payment per API call. Pass a WIF private key and the wallet handles payments automatically. There are no rate limits:

```javascript
const bchWallet = new BchWallet(undefined, {
  interface: 'rest-api',
  restURL: 'https://x402-bch.fullstack.cash/v6/',
  wif: 'L1eYaneXDDXy8VDig4Arwe8wYHbhtsA5wuQvwsKwhaYeneoZuKG4'
})
await bchWallet.initialize()
```

**2. Web 3: Free Community Servers**

The `consumer-api` interface connects to [ipfs-bch-wallet-consumer](/docs/IPFS/reduce-server-costs/ipfs-bch-wallet-consumer) instances provided by community volunteers. It is faster than the free Web 2 server, but has no uptime guarantee:

```javascript
const bchWallet = new BchWallet(undefined, {
  interface: 'consumer-api',
  restURL: 'https://free-bch.fullstack.cash'
})
await bchWallet.initialize()
```

The list of community-provided wallet services is dynamically loaded from [this JSON file](https://consumers.psfoundation.info/consumers.json).

**3. Web 2: Free Public REST API**

The `rest-api` interface connects to [psf-bch-api](/docs/back-end/psf-bch-api). The free server has high uptime but is heavily rate-limited:

```javascript
const bchWallet = new BchWallet(undefined, {
  interface: 'rest-api',
  restURL: 'https://bch.fullstack.cash/v6/'
})
await bchWallet.initialize()
```

**4. Web 2: Private Infrastructure with Bearer Token**

If you run your own [psf-bch-api](/docs/back-end/psf-bch-api) with Bearer token authentication, pass the token:

```javascript
const bchWallet = new BchWallet(undefined, {
  interface: 'rest-api',
  restURL: 'https://your-server.example.com/v6/',
  bearerToken: 'your-secret-token'
})
await bchWallet.initialize()
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `interface` | string | — | `'rest-api'` for Web 2 (psf-bch-api) or `'consumer-api'` for Web 3 (ipfs-bch-wallet-consumer). |
| `restURL` | string | — | URL of the back end server. |
| `bearerToken` | string | — | Bearer token for authentication with a token-protected REST API server. |
| `wif` | string | — | Private key in WIF format. Enables automatic x402 payment handling. |
| `paymentAmountSats` | number | `10000` | Amount of satoshis to send when making x402 payments. |
| `bchServerURL` | string | `'https://bch.fullstack.cash/v6/'` | BCH server URL used for broadcasting x402 payment transactions. |
| `password` | string | — | Password for encrypting/decrypting the wallet mnemonic. |
| `HdPath` | string | `"m/44'/245'/0'/0/0"` | BIP44 HD derivation path. |

## Wallet Lifecycle

After instantiation, a wallet goes through two stages before it is ready for use.

**Stage 1: Wallet creation.** The constructor generates (or imports) wallet keys. Await `walletInfoPromise` to ensure the keys are ready:

```javascript
const bchWallet = new BchWallet()
await bchWallet.walletInfoPromise
```

At this point `bchWallet.walletInfo` contains the wallet details:

```javascript
console.log(bchWallet.walletInfo.mnemonic)     // 12-word seed phrase
console.log(bchWallet.walletInfo.cashAddress)   // BCH address
console.log(bchWallet.walletInfo.legacyAddress) // Legacy address
console.log(bchWallet.walletInfo.privateKey)    // WIF private key
```

**Stage 2: Blockchain initialization.** Call `initialize()` to fetch the wallet's balance, tokens, and UTXOs from the blockchain. This is not necessary for brand-new wallets with no transaction history:

```javascript
await bchWallet.initialize()
```

## Key Features

### Create a Wallet

Pass `undefined` as the first argument to generate a new wallet with a random 12-word mnemonic:

```javascript
const bchWallet = new BchWallet()
await bchWallet.walletInfoPromise

console.log(bchWallet.walletInfo.mnemonic)
console.log(bchWallet.walletInfo.cashAddress)
```

### Import a Wallet

Import an existing wallet from a mnemonic phrase:

```javascript
const bchWallet = new BchWallet(
  'minor bench until split suffer shine series bag avoid cruel orient aunt'
)
await bchWallet.walletInfoPromise
```

Or from a WIF private key (keys start with a capital `K` or `L`):

```javascript
const bchWallet = new BchWallet('L3BUek8oq1iijZTkfdRYo8RDxEe3PpB8MyJnh2FSGWAoCjAffQCp')
await bchWallet.walletInfoPromise
```

### Encrypt and Decrypt the Mnemonic

Encrypt the mnemonic for safe storage:

```javascript
const bchWallet = new BchWallet(null, {
  password: 'myStrongPassword'
})
await bchWallet.walletInfoPromise

// Store the encrypted mnemonic
const encrypted = bchWallet.walletInfo.mnemonicEncrypted

// Later, decrypt it to restore the wallet
const restored = new BchWallet(encrypted, {
  password: 'myStrongPassword'
})
await restored.walletInfoPromise
console.log(restored.walletInfo.mnemonic)
```

### Check Balance

```javascript
// Balance for the wallet's own address
const myBalance = await bchWallet.getBalance()
console.log('Balance (satoshis):', myBalance)

// Balance for any address
const otherBalance = await bchWallet.getBalance({
  bchAddress: 'bitcoincash:qp2rmj8heytjrksxm2xrjs0hncnvl08xwgkweawu9h'
})
```

### Get BCH Price in USD

```javascript
const usd = await bchWallet.getUsd()
console.log('BCH price in USD:', usd)
```

### Send BCH

Send BCH to one or more recipients:

```javascript
const receivers = [
  {
    address: 'bitcoincash:qp2rmj8heytjrksxm2xrjs0hncnvl08xwgkweawu9h',
    amountSat: 100000
  }
]

const txid = await bchWallet.send(receivers)
console.log('Transaction ID:', txid)
```

### List Tokens

List the SLP tokens held by an address:

```javascript
const tokens = await bchWallet.listTokens()
console.log('Tokens:', tokens)
```

### Send Tokens

Send SLP tokens to another address:

```javascript
const receiver = {
  address: 'simpleledger:qpeq7xx5x3a2jfa0x0w8cjqp4v9cm842vgsjqwzvfk',
  tokenId: 'a4fb5c2da1aa064e25018a43f9165040071d9e984ba190c222a7f59053af84b2',
  qty: 1.25
}

const txid = await bchWallet.sendTokens(receiver)
console.log('Transaction ID:', txid)
```

### Get Token Data

Retrieve metadata for an SLP token, including mutable and immutable data defined by the [PS002](https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps002-slp-mutable-data.md) and [PS007](https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps007-token-data-schema.md) specifications (token icons, descriptions, etc.):

```javascript
const tokenId = '59a62f35b0882b7c0ed80407d9190b460cc566cb6c01ed4817ad64f9d2508702'

// Basic token data (client-side IPFS lookup)
const tokenData = await bchWallet.getTokenData(tokenId)

// Token data with server-side IPFS lookup (includes resolved media URLs)
const tokenData2 = await bchWallet.getTokenData2(tokenId)

// Include transaction history (useful for tracking NFT ownership)
const tokenDataWithHistory = await bchWallet.getTokenData(tokenId, true)
```

### Get Transaction History and Details

```javascript
// Get transaction IDs for the wallet
const txids = await bchWallet.getTransactions()

// Get detailed data for up to 20 transactions
const txData = await bchWallet.getTxData([
  '01517ff1587fa5ffe6f5eb91c99cf3f2d22330cd7ee847e928ce90ca95bf781b'
])
```

### Send OP_RETURN Data

Write a small amount of data to the blockchain, compatible with [memo.cash](https://memo.cash):

```javascript
const txid = await bchWallet.sendOpReturn('This is a memo.cash post.')
console.log('Transaction ID:', txid)
```

### Optimize the Wallet

Every [UTXO](https://github.com/bitcoinbook/bitcoinbook/blob/develop/ch06.asciidoc#transaction-outputs-and-inputs) in the wallet requires an API call. Over time, a wallet can accumulate many small UTXOs from receiving payments. The `optimize()` function consolidates them into a single UTXO, which speeds up performance and improves the user experience:

```javascript
await bchWallet.optimize()
```

### Get UTXOs

```javascript
// UTXOs for the wallet's own address
const utxos = await bchWallet.getUtxos()

// UTXOs for any address
const otherUtxos = await bchWallet.getUtxos('bitcoincash:qp2rmj8heytjrksxm2xrjs0hncnvl08xwgkweawu9h')
```

### Validate a UTXO

Check whether a UTXO is still unspent and spendable:

```javascript
const utxo = {
  txid: 'b94e1ff82eb5781f98296f0af2488ff06202f12ee92b0175963b8dba688d1b40',
  vout: 0
}

const isValid = await bchWallet.utxoIsValid(utxo)
console.log('UTXO is valid:', isValid)
```

### Get a Public Key

If an address has made at least one send transaction, its public key can be looked up from the blockchain. This is useful for sending encrypted messages:

```javascript
const pubKey = await bchWallet.getPubKey('bitcoincash:qp2rmj8heytjrksxm2xrjs0hncnvl08xwgkweawu9h')
console.log('Public key:', pubKey)
```

### Broadcast a Raw Transaction

If you have a hex-encoded transaction (for example, one built with [bch-js](/docs/front-end/bch-js)), you can broadcast it:

```javascript
const hex = '0200...tx-in-hex-format'
const txid = await bchWallet.broadcast({ hex })
console.log('Transaction ID:', txid)
```

### Generate Additional Key Pairs

If the wallet was created from a mnemonic, you can derive additional key pairs from the HD wallet:

```javascript
const keyPair = await bchWallet.getKeyPair(5)
```

### Resolve IPFS CIDs

When working with token metadata, mutable and immutable data is returned as IPFS CIDs. You can resolve a CID to its JSON content:

```javascript
const cid = 'bafkreigbgrvpagnmrqz2vhofifrqobigsxkdvnvikf5iqrkrbwrzirazhm'
const json = await bchWallet.cid2json({ cid })
console.log(json)
```

## Accessing bch-js

minimal-slp-wallet embeds an instance of [bch-js](/docs/front-end/bch-js) that you can access directly. This is useful for utility functions or when you need lower-level control:

```javascript
// Convert satoshis to BCH
const bch = bchWallet.bchjs.BitcoinCash.toBitcoinCash(100000)

// Convert address formats
const legacy = bchWallet.bchjs.Address.toLegacyAddress(bchWallet.walletInfo.cashAddress)
```

## Security

When building BCH applications, never send private keys, mnemonics, or seed phrases to your servers.

1. Your servers can be hacked.
2. Depending on your jurisdiction, you may not be allowed to manage the funds of your users.

In browser apps, you can store the mnemonic in `localStorage`:

```javascript
// Save the mnemonic
localStorage.setItem('BCH_MNEMONIC', bchWallet.walletInfo.mnemonic)

// Restore the wallet later
const restored = new BchWallet(localStorage.getItem('BCH_MNEMONIC'))
```

For stronger protection, use the mnemonic encryption feature described above.

## Error Handling

Wrap wallet operations in try/catch blocks to handle errors gracefully:

```javascript
try {
  const txid = await bchWallet.send([
    {
      address: 'bitcoincash:qrlhkg4d9z3y88j246a6482xzregxaxnfsagmd2kh3',
      amountSat: 1000
    }
  ])
} catch (err) {
  console.error(err)

  if (err.message && err.message.indexOf('Insufficient') > -1) {
    console.log('Insufficient balance.')
  }
}
```

## Code Examples

The [psf-js-examples](https://github.com/Permissionless-Software-Foundation/psf-js-examples/tree/master/minimal-slp-wallet) repository contains working examples organized by category:

- **wallet/** &mdash; Create wallets, check balances, send BCH, get UTXOs, get transaction data, optimize wallets, retrieve token metadata
- **access/** &mdash; Configure minimal-slp-wallet for different back end servers (free REST API, free Web 3, x402 pay-per-call, private Bearer token)

The recommended workflow for trying the examples:

1. Run `create-wallet` to generate a `wallet.json` file.
2. Send a few cents of BCH to the generated address.
3. Run `get-balance` to verify the wallet has funds.
4. Run `send-bch` or any other example.

## Support

Have questions? Need help? Join the community support [Telegram channel](https://t.me/bch_js_toolkit).
