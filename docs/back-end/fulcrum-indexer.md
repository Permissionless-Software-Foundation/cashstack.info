---
sidebar_position: 3
---

# Fulcrum Indexer

Fulcrum is an indexer. An indexer is like a search engine, which crawls the blockchain and *indexes* it by generating and saving metadata into a database. The Full Node only tracks transactions. It does not track important data like address balances, UTXOs, and transaction histories. The Fulcrum indexer exists to track those things. It implements the [Electrum protocol](https://electrumx.readthedocs.io/en/latest/protocol.html).

The PSF maintains a set of Docker containers which wrap the Fulcrum indexer's Electrum protocol into a web2 REST API. This REST API can then interface with [pspf-bch-api](psf-bch-api) for exchanging data.

## Links

- [docker-fulcrum](https://github.com/Permissionless-Software-Foundation/docker-fulcrum) GitHub repository with Docker containers

## Videos

### Installing Fulcrum Docker Container

<iframe width="639" height="359" src="https://www.youtube.com/embed/7dF7dW7fIXU" title="Fulcrum Indexer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe>

#### Instructions

**Prerequisites:** You must have a fully synced [BCHN Full Node](bchn-full-node) running before installing Fulcrum. The indexer cannot operate until your full node has completed syncing.

**1. Clone the repository:**

```bash
git clone https://github.com/Permissionless-Software-Foundation/docker-fulcrum
cd docker-fulcrum
```

**2. Create the blockchain directory:**

This is where the Fulcrum database will be stored.

```bash
mkdir blockchain
```

**3. Navigate to your architecture directory:**

There are two flavors of Fulcrum depending on your hardware:
- `x86-amd64/mainnet/` - For standard desktops and laptops
- `rpi-arm64/mainnet/` - For Raspberry Pi devices

```bash
# For x86/AMD64 (desktop/laptop):
cd x86-amd64/mainnet

# OR for Raspberry Pi:
cd rpi-arm64/mainnet
```

**4. Configure settings (optional):**

If you're using the PSF's [docker-bchn](https://github.com/Permissionless-Software-Foundation/docker-bchn) container, the default settings in `mainnet.conf` will work automatically. The defaults use:
- Username: `bitcoin`
- Password: `password`
- RPC port: `8332`

Edit `mainnet.conf` only if your full node uses different credentials.

**5. Create SSL certificates:**

Create a `certs` directory and generate a self-signed SSL certificate. This certificate is only used for internal communication between Fulcrum and the REST API.

```bash
mkdir certs
cd certs
openssl genrsa -des3 -out server.pass.key 2048
openssl rsa -in server.pass.key -out server.key
rm server.pass.key
openssl req -new -key server.key -out server.csr
openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt
rm server.csr
cd ..
```

When prompted for a passphrase, you can use any simple password (e.g., `test`). When prompted for certificate details, you can accept all defaults by pressing Enter.

**6. Build and run the Docker container:**

```bash
docker compose build
docker compose up -d
```

This starts two containers:
- `fulcrum-mainnet` - The Fulcrum indexer
- `fulcrum-rest-api` - A REST API wrapper for web2 integration

**7. Verify the installation:**

Check the logs to ensure Fulcrum is running correctly:

```bash
docker logs fulcrum-mainnet
```

You should see messages indicating that Fulcrum is processing and indexing blocks. If you see errors about the blockchain folder, ensure you created it with the correct permissions in step 2.

**Syncing Time:** The Fulcrum indexer will take anywhere from 2 hours to 2 days to fully sync, depending on your hardware. Once complete, you'll have both the full node and Fulcrum indexer ready as the foundation of your Cash Stack.
