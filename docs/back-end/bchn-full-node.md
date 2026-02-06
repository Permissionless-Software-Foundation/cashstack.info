---
sidebar_position: 2
---

# BCHN Full Node

The bottom most layer in the Cash Stack is the Full Node. Every blockchain produces a full node, but not all full nodes can be operated on an normal desktop computer. BCH full nodes can be easily run on a desktop, or even a small mini-computer like a Raspberry Pi. The [PSF](https://psfoundation.info) maintains a Docker container for running a full node on the Bitcoin Cash (BCH) blockchain.

## BCHN Full Node

There are many full node implementations for BCH. The Cash Stack focuses on the BCHN node because it is the software most commonly operated by miners.

### Links

- [docker-bchn](https://github.com/Permissionless-Software-Foundation/docker-bchn) Docker containers
- [BCHN Official Website](https://bitcoincashnode.org/en/)
- [Full Node Commands](https://docs.bitcoincashnode.org/doc/json-rpc/)

### Videos

#### Installing a BCH Full Node

<iframe width="639" height="359" src="https://www.youtube.com/embed/JWmzgWQ-SUE" title="Install BCH Full Node" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe>

##### Instructions

**Prerequisites:** You need an Ubuntu 64-bit system (or similar Linux distribution) with Docker and Docker Compose installed. You should be logged in as a non-root user with sudo privileges.

**1. Clone the repository:**

```bash
git clone https://github.com/Permissionless-Software-Foundation/docker-bchn
```

**2. Create required directories:**

In the same parent directory where you cloned `docker-bchn`, create two folders:

```bash
mkdir config blockchain-data
```

- `config/` - Holds configuration files for the node
- `blockchain-data/` - Stores the blockchain database (this folder can be moved between computers)

**3. Copy configuration files:**

Copy the run script and bitcoin.conf file from the mainnet folder to your config directory:

```bash
cp docker-bchn/mainnet/run-script.sh config/
cp docker-bchn/mainnet/bitcoin.conf config/
```

**4. Build the Docker container:**

Navigate to the mainnet directory and build the container:

```bash
cd docker-bchn/mainnet
docker compose build
```

This typically takes about 10 minutes as it compiles the full node software from source. You can add the `--no-cache` flag to force a fresh build if needed.

**5. Start the container:**

```bash
docker compose up -d
```

The `-d` flag runs the container in the background so you retain control of your terminal.

**6. Monitor synchronization:**

```bash
docker compose logs -f
```

The first line will display the version number—this is important to verify since Bitcoin Cash undergoes a network upgrade each year, requiring updated software. The node will first synchronize headers, then begin downloading blocks. Full synchronization takes 1–14 days depending on your hardware and internet speed.

**7. Stop the container:**

```bash
docker compose down
```

**Interacting with the Node:**

Once fully synced, you can interact with the node via the command line:

```bash
docker exec -it bchn-main bash
bitcoin-cli -conf=/data/bitcoin.conf getnetworkinfo
```

Or via JSON-RPC (which is how other Cash Stack software communicates with the node):

```bash
curl --data-binary '{"jsonrpc":"1.0","id":"curltext","method":"getnetworkinfo","params":[]}' \
  -H 'content-type:text/plain;' http://bitcoin:password@127.0.0.1:8332/
```

**Portability Tip:** You can sync the blockchain on a faster desktop computer, then copy the entire `blockchain-data/` folder to a lower-powered device like a Raspberry Pi. When you start the container on the new device, it will pick up where the other computer left off—saving days of sync time.

**Annual Upgrades:** Bitcoin Cash performs a network upgrade (hard fork) once per year. Make sure to rebuild your container with the latest version before May 1st each year, or your node will fall off the network.

