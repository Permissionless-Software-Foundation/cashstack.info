---
sidebar_position: 1
title: SLP Indexer
---

# SLP Token Indexer

SLP tokens are not tracked by the full node. In the same way the [Fulcrum indexer](/docs/back-end/fulcrum-indexer) crawls the blockchain to index BCH addresses and balances, the PSF SLP indexer crawls the blockchain to index SLP token transactions. The indexer tracks tokens according to the [Type 1 specification](https://github.com/simpleledger/slp-specifications/blob/master/slp-token-type-1.md) and the [NFT1 specification](https://github.com/simpleledger/slp-specifications/blob/master/slp-nft-1.md).

Together with the [BCHN full node](/docs/back-end/bchn-full-node) and the [Fulcrum indexer](/docs/back-end/fulcrum-indexer), the SLP indexer forms the core of the Cash Stack back-end infrastructure.

## Architecture

The indexer runs as **three Docker containers**:

- **psf-slp-db** &mdash; A [LevelDB](https://github.com/google/leveldb) database wrapped in a REST API. This container manages the actual database where all indexed data is stored. The other two processes read and write data through its REST API.
- **Block Indexer** &mdash; Performs an Initial Block Download (IBD) starting from SLP Genesis (around block 543,000), crawling every block up to the tip of the chain. After IBD completes, it monitors the full node's ZMQ interface for new blocks. It also creates periodic zip-file backups of the database. Once IBD is complete, it signals the TX Indexer to start.
- **TX Indexer** &mdash; Waits for the Block Indexer to finish IBD, then monitors the full node's ZMQ interface for new unconfirmed transactions and indexes them in real time.

This separation into three containers is a deliberate architectural choice. Because JavaScript is single-threaded, the previous generation of the SLP indexer would get blocked when processing a large block, causing it to stop processing real-time transactions. By splitting blocks and transactions into separate processes that communicate through the database's REST API, large blocks no longer stall real-time transaction processing.

## Links

- [psf-slp-indexer-g2](https://github.com/Permissionless-Software-Foundation/psf-slp-indexer-g2) &mdash; The indexer (block indexer + TX indexer)
- [psf-slp-db](https://github.com/Permissionless-Software-Foundation/psf-slp-db) &mdash; The LevelDB database with REST API

## Videos

### Installing the SLP Token Indexer

<iframe width="639" height="359" src="https://www.youtube.com/embed/GSL6dIF5h6w" title="Install BCH Full Node" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe>

#### Instructions

**Prerequisites:** You must have a fully synced [BCHN Full Node](/docs/back-end/bchn-full-node) running before installing the SLP indexer. The [Fulcrum indexer](/docs/back-end/fulcrum-indexer) is not required for the SLP indexer to operate, but is required for a complete Cash Stack setup.

**1. Clone the repository:**

```bash
git clone https://github.com/Permissionless-Software-Foundation/psf-slp-indexer-g2
cd psf-slp-indexer-g2
```

**2. Navigate to the production Docker directory:**

```bash
cd production/docker
```

Inside you will find three subdirectories, one for each container: `block-indexer/`, `slp-db/`, and `tx-indexer/`.

**3. Configure environment variables:**

Each subdirectory contains a `.env.example` (or `.env.local`) file. Copy it to `.env` in the same directory:

```bash
cp block-indexer/.env.example block-indexer/.env
cp slp-db/.env.example slp-db/.env
cp tx-indexer/.env.example tx-indexer/.env
```

If you are running on a CashBox or followed the previous full node installation guide, the default values will work without changes. Otherwise, edit each `.env` file to match your full node's RPC credentials and network settings. See the [Configuration](#configuration) section below for a full list of environment variables.

:::tip
You must create the `.env` files **before** building the Docker containers. The build process expects them to exist.
:::

**4. Build the Docker containers:**

```bash
docker-compose build
```

**5. Start the containers:**

```bash
docker-compose up -d
```

The `slp-db` container should come up first&mdash;the other two containers communicate with it over its REST API. Once all three containers are running, you can verify them:

```bash
docker ps
```

You should see three containers: `slp-db`, `block-indexer`, and `tx-indexer`.

**6. Monitor progress:**

Check the block indexer logs to verify it is syncing:

```bash
docker logs -f block-indexer
```

On first startup, the block indexer begins at SLP Genesis (around block 543,000) and works its way up to the current chain tip. The TX indexer will not start processing until the block indexer completes its Initial Block Download.

**7. Manage the containers:**

```bash
# Stop all containers:
docker-compose down

# Start all containers again:
docker-compose up -d
```

**Data Storage:** Once the containers start, a `data/` directory is created alongside the `docker/` directory under `production/`. Inside `data/leveldb/` you will find:

- `current/` &mdash; The live LevelDB databases, updated in real time as the indexer processes blocks.
- `zips/` &mdash; Periodic backup snapshots. Every 1,000 blocks, the indexer creates a zip-file backup of the database. If the indexer encounters an error, it rolls back to the most recent snapshot and re-syncs from there.

**Syncing Time:** A full sync from SLP Genesis can take **two to three weeks** because the indexing process is difficult to parallelize and JavaScript is single-threaded. To speed this up significantly, see the next section on downloading a pre-synced database.

---

### Downloading a Pre-Synced Database

<iframe width="639" height="359" src="https://www.youtube.com/embed/YQfaJYX1aZ4" title="Install BCH Full Node" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe>

#### Instructions

Instead of syncing from SLP Genesis (which takes weeks), you can download a pre-synced database snapshot and restore it. This can save weeks of syncing time.

**1. Download the latest snapshot:**

Visit [https://fullstack.cash/cashstrap](https://fullstack.cash/cashstrap) and find the latest SLP database snapshot (the one with the highest block height).

:::tip
Use `wget` instead of your browser to download the snapshot. The file is several gigabytes and many browsers do not properly support resumable downloads. If the download gets interrupted, you can resume it with the `-c` flag:

```bash
# Start the download:
wget <snapshot-url>

# Resume an interrupted download:
wget -c <snapshot-url>
```
:::

**2. Stop the SLP indexer containers:**

```bash
cd psf-slp-indexer-g2/production/docker
docker-compose down
```

**3. Clear the existing database:**

The database files are owned by root (created by Docker), so you will need `sudo` for these commands:

```bash
cd ../data/leveldb

# Remove old backups:
sudo rm -rf zips/*

# Remove the live database:
sudo rm -rf current/*
```

**4. Extract the snapshot:**

Copy the downloaded zip file into the `zips/` directory and unzip it:

```bash
sudo cp /path/to/downloaded-snapshot.zip zips/
cd zips
sudo unzip downloaded-snapshot.zip
```

:::tip
After unzipping, you may want to rename the extracted folder to include the block height (e.g., `925000/`) so you can easily identify which snapshot it came from.
:::

**5. Restore the database:**

Copy the contents of the extracted snapshot into the `current/` directory. Navigate into the unzipped folder until you find the `current/` subdirectory containing the database files, then copy them:

```bash
sudo cp -r zips/<extracted-folder>/.../current/* current/
```

**6. Restart the containers:**

```bash
cd ../../docker
docker-compose up -d
```

**7. Verify the restoration:**

Check the block indexer logs:

```bash
docker logs -f block-indexer
```

Instead of starting from block 543,000, the indexer should resume from the block height of the snapshot. From here it only needs to sync the remaining blocks to reach the chain tip, which is much faster.

**8. Set EXIT_ON_MISSING_BACKUP:**

Once the indexer is near the tip of the chain, you should set the `EXIT_ON_MISSING_BACKUP` environment variable to `true` in **both** the `block-indexer/.env` and `slp-db/.env` files:

```
EXIT_ON_MISSING_BACKUP=true
```

During Initial Block Download, the indexer automatically recovers from errors by rolling back to the latest snapshot. If no snapshot is found, it rolls all the way back to Genesis and re-syncs&mdash;this is acceptable during IBD. However, once you are fully synced and running at the tip of the chain, this rollback-to-Genesis behavior is undesirable. There is a race condition when restarting the system that can accidentally trigger a full rollback even with a fully synced database. Setting this variable to `true` makes the process exit instead of rolling back, protecting your synced data.

After editing the `.env` files, restart the containers to apply the change:

```bash
docker-compose down
docker-compose up -d
```

---

## Configuration

The indexer is configured through environment variables set in `.env` files. Below is a complete reference of all available settings.

### psf-slp-db

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5020` | TCP port the psf-slp-db REST API server listens on. |
| `MNEMONIC` | *(empty)* | A 12-word BCH mnemonic used to generate encryption keys and a payment address. If set, the app will create a wallet from this mnemonic when no wallet file is found. |
| `WALLET_FILE` | `wallet.json` | Path to a wallet file. If the file exists it will be used; otherwise a new wallet is created from `MNEMONIC`. |
| `WALLET_INTERFACE` | `web3` | Determines how the app connects to bch-api. `web3` connects via JSON RPC over IPFS; `web2` connects via REST API over HTTP. |
| `APISERVER` | *(varies by interface)* | The bch-api server URL. Defaults to `https://api.fullstack.cash/v5/` for web2 or `https://free-bch.fullstack.cash/` for web3. |
| `ADMIN_PASSWORD` | *(random)* | Password for the admin account. If not set, a random 20-character string is generated at startup. |
| `BACKUP_QTY` | `3` | Number of LevelDB backup zip files to retain. Older backups beyond this count are deleted. |
| `EXIT_ON_MISSING_BACKUP` | `false` | Set to `true` to exit the process instead of rolling back to Genesis when a backup file is missing. **Recommended once fully synced.** |
| `BLACKLIST` | *(empty)* | A comma-separated list of SLP token IDs to exclude from API responses. Example: `BLACKLIST=tokenId1,tokenId2`. |

### psf-slp-indexer-g2 (Block Indexer & TX Indexer)

#### Database Connection

| Variable | Default | Description |
|---|---|---|
| `PSF_SLP_DB_URL` | `http://localhost:5020` | URL of the psf-slp-db REST API. The indexer reads and writes all indexed data through this endpoint. |

#### Full Node RPC

| Variable | Default | Description |
|---|---|---|
| `RPC_IP` | `172.17.0.1` | IP address of the BCH full node RPC server. The default is the Docker bridge gateway, suitable for containers accessing a full node on the host. |
| `RPC_PORT` | `8332` | TCP port of the full node's RPC interface. |
| `RPC_USER` | `bitcoin` | Username for RPC authentication. |
| `RPC_PASS` | `password` | Password for RPC authentication. |

#### Full Node ZMQ

| Variable | Default | Description |
|---|---|---|
| `ZMQ_PORT` | `28332` | TCP port of the full node's ZMQ interface. Used to receive real-time notifications of new blocks and transactions. |

#### TX Indexer REST API

The block indexer communicates with the TX indexer over a small internal REST API to signal when IBD is complete.

| Variable | Default | Description |
|---|---|---|
| `TX_REST_API_PORT` | `5454` | TCP port the TX indexer listens on for its internal REST API. |
| `TX_REST_API_IP` | `localhost` | IP address the block indexer uses to reach the TX indexer's REST API. Change this when the two processes run in separate containers. |

#### Token Blacklist

| Variable | Default | Description |
|---|---|---|
| `DISABLE_BLACKLIST` | *(unset)* | Set to any value to disable the built-in token blacklist. When unset, several known problematic tokens are automatically excluded from indexing. |

#### Backups

| Variable | Default | Description |
|---|---|---|
| `EXIT_ON_MISSING_BACKUP` | `false` | Set to `true` to exit the process instead of rolling back to Genesis when a backup is missing. **Recommended once fully synced.** |

#### Pin Service Webhook

| Variable | Default | Description |
|---|---|---|
| `PIN_API_URL` | `http://172.17.0.1:5031` | URL of the ipfs-file-pin-service API. When a Pin Claim transaction is detected, the indexer sends a webhook to this endpoint. |

## Development Environment

If you want to modify the code and contribute, you can run the indexer outside of Docker:

```bash
git clone https://github.com/Permissionless-Software-Foundation/psf-slp-indexer-g2
cd psf-slp-indexer-g2
npm install
```

Create a `.env` file in the project root with the configuration values listed above, then start each process in a separate terminal:

```bash
# Terminal 1 - Block Indexer:
npm run block-indexer

# Terminal 2 - TX Indexer:
npm run tx-indexer
```

Shell scripts `slp-block.sh` and `slp-tx.sh` are also provided for convenience.

For psf-slp-db development:

```bash
git clone https://github.com/Permissionless-Software-Foundation/psf-slp-db
cd psf-slp-db
npm install
npm start
```
