---
sidebar_position: 1
---

# psf-bch-api REST API

[psf-bch-api](https://github.com/Permissionless-Software-Foundation/psf-bch-api) is a REST API server, written in node.js JavaScript, using the [Express.js](https://expressjs.com/) framework. It follows the [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) design pattern. The purpose of this code is to create a REST API server that provides a [single, common interface](https://bch.fullstack.cash) for developers to build blockchain-based business applications.

psf-bch-api is the heart of the Cash Stack. If you think of the Cash Stack like stories in a building, the [full node](/docs/back-end/bchn-full-node) is the base layer&mdash;the software that actually does transactions and has direct access to the blockchain. The next layer up is the indexer layer: the [Fulcrum indexer](/docs/back-end/fulcrum-indexer) and the [SLP Token Indexer](/docs/back-end/slp-indexer/slp-indexer-software). psf-bch-api sits on top of all of that, providing a single web2 REST API that normal web developers can use to access all of the blockchain infrastructure below it.

![psf-bch-api dependency graph](../img/bch-api-dependency-graph.png)

The psf-bch-api REST API server depends on three pieces of blockchain infrastructure:

- [BCHN Full Node](bchn-full-node) &mdash; the base blockchain node that validates transactions and blocks.
- [Fulcrum Indexer](fulcrum-indexer) &mdash; an address indexer that tracks balances, transaction histories, and UTXOs.
- [SLP Token Indexer](slp-indexer/slp-indexer-software) &mdash; tracks all SLP tokens on the blockchain.

Front-end applications interact with psf-bch-api through libraries such as [bch-js](https://github.com/Permissionless-Software-Foundation/bch-js) or [bch-consumer](https://www.npmjs.com/package/bch-consumer). psf-bch-api replaces the legacy [bch-api](https://github.com/Permissionless-Software-Foundation/bch-api) and implements the [x402-bch protocol](https://github.com/x402-bch/x402-bch) for optional per-call payments.

## Links

- [psf-bch-api](https://github.com/Permissionless-Software-Foundation/psf-bch-api) &mdash; Code base and Docker containers
- [API Reference Documentation](https://bch.fullstack.cash) &mdash; Live interactive API docs
- [bch-js](https://github.com/Permissionless-Software-Foundation/bch-js) &mdash; JavaScript library for interacting with psf-bch-api
- [Telegram support channel](https://t.me/bch_js_toolkit) &mdash; Community technical support

## Videos

### Installing the psf-bch-api Docker Container

<iframe width="639" height="359" src="https://www.youtube.com/embed/JagNOmVWKCM" title="Install psf-bch-api" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe>

#### Instructions

**Prerequisites:** You must have all three pieces of back end infrastructure fully synced and running before installing psf-bch-api:

- A fully synced [BCHN Full Node](/docs/back-end/bchn-full-node)
- A fully synced [Fulcrum Indexer](/docs/back-end/fulcrum-indexer)
- A fully synced [SLP Token Indexer](/docs/back-end/slp-indexer/slp-indexer-software)

You can verify your infrastructure is healthy by checking the logs for each service. The full node should show `progress=1` (100% synced). Fulcrum should show a regular heartbeat of mempool transactions. The block indexer should be reporting new blocks as they come in.

**1. Clone the repository:**

```bash
git clone https://github.com/Permissionless-Software-Foundation/psf-bch-api
cd psf-bch-api
```

**2. Navigate to the production Docker directory:**

```bash
cd production/docker
```

**3. Configure environment variables:**

Copy the example `.env` file:

```bash
cp .env-example .env
```

If you are running on a [CashBox](https://woodcashbox.com) or followed the previous installation guides for the full node, Fulcrum, and SLP indexer, the default values should work without changes. The defaults use `172.17.0.1` (the Docker bridge gateway on Linux) to reach services running on the host machine. You can verify this by comparing the ports in your `.env` file against `docker ps` output.

Otherwise, edit the `.env` file to match your infrastructure. See the [Configuration](#configuration) section below for a full list of environment variables.

:::tip
You must create the `.env` file **before** building the Docker container. The build process expects it to exist.
:::

**4. Build the Docker container:**

```bash
docker-compose build --no-cache
```

**5. Start the container:**

```bash
docker-compose up -d
```

You can verify it is running with:

```bash
docker ps
```

You should see a container named `psf-bch-api` running on port `5942`.

**6. Monitor the server:**

```bash
docker logs -f psf-bch-api
```

You should see the server start up, load its configuration, and begin listening on port `5942`.

**7. Manage the container:**

```bash
# Stop the container:
docker-compose down

# Start the container again:
docker-compose up -d
```

The `.env` file is mounted into the container as a volume, so you can update configuration settings without rebuilding. Just edit `.env` and restart the container.

A helper script `cleanup-images.sh` is provided to remove dangling Docker images after rebuilds.

---

### End-to-End Testing

After installing psf-bch-api, you should run the [bch-js](https://github.com/Permissionless-Software-Foundation/bch-js) integration tests to verify that everything is wired up correctly. bch-js communicates with psf-bch-api just like a real front-end application would, exercising all the endpoints and confirming that psf-bch-api can talk to the full node, Fulcrum indexer, and SLP indexer.

**1. Clone bch-js:**

```bash
git clone https://github.com/Permissionless-Software-Foundation/bch-js
cd bch-js
```

**2. Install dependencies:**

```bash
npm install
```

**3. Run the integration tests:**

The `package.json` includes several integration test scripts for different access-control configurations. If you installed psf-bch-api with the default settings (`X402_ENABLED=false` and `USE_BASIC_AUTH=false`), run:

```bash
npm run test:integration:local:noauth
```

:::tip
You may need to edit the `RESTURL` in the `test:integration:local:noauth` script in `package.json` to match the IP address and port of your psf-bch-api server (e.g., `http://localhost:5942/v6` or `http://192.168.1.65:5942/v6`).
:::

All tests should pass. If some tests fail (for example, all SLP-related tests), that usually indicates the corresponding piece of infrastructure is not reachable&mdash;check your `.env` configuration and verify that the port and IP are correct.

There are also integration test scripts for the other access-control modes:

- `npm run test:integration:local:auth` &mdash; Tests with Bearer token authentication. Set the `BCHJSBEARERTOKEN` environment variable to your configured `BASIC_AUTH_TOKEN`.
- `npm run test:integration:local:x402` &mdash; Tests with x402-bch payments. Set the `BCHJSWIF` environment variable to a WIF private key that has BCH for paying per-call fees.

---

## Configuration

psf-bch-api is configured through environment variables set in a `.env` file. An example file is provided at `.env-example` in both the project root (for development) and in `production/docker/` (for Docker deployments).

The `.env` file is organized into two sections: **Infrastructure Setup** and **Access Control**.

### Infrastructure Setup

These variables tell psf-bch-api where to find the back end services it depends on:

| Variable | Default | Description |
|---|---|---|
| `RPC_BASEURL` | `http://127.0.0.1:8332` | URL of the BCHN full node JSON-RPC interface. Use `http://172.17.0.1:8332` when running inside Docker. |
| `RPC_USERNAME` | *(empty)* | RPC username for the full node. |
| `RPC_PASSWORD` | *(empty)* | RPC password for the full node. |
| `RPC_TIMEOUT_MS` | `15000` | Full node RPC request timeout in milliseconds. |
| `FULCRUM_API` | *(empty)* | URL of the Fulcrum indexer REST API (e.g., `http://172.17.0.1:3001/v1`). |
| `FULCRUM_TIMEOUT_MS` | `15000` | Fulcrum API request timeout in milliseconds. |
| `SLP_INDEXER_API` | *(empty)* | URL of the SLP Token Indexer REST API (e.g., `http://172.17.0.1:5010`). |
| `SLP_INDEXER_TIMEOUT_MS` | `15000` | SLP Indexer API request timeout in milliseconds. |
| `LOCAL_RESTURL` | `http://127.0.0.1:5942/v6/` | The REST API URL used internally for wallet operations. |

:::tip
Inside a Docker container, `localhost` refers to the container itself. Use `172.17.0.1` (the default Docker bridge gateway) to reach services running on the host machine.
:::

### Access Control

These variables control who can access the API and how they pay for it. See the [Access Control](#access-control) section below for detailed explanations of the three use cases.

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5942` | Port the server listens on. |
| `X402_ENABLED` | `true` | Enable x402-bch per-call payment middleware. |
| `SERVER_BCH_ADDRESS` | `bitcoincash:qqsrke9lh257tqen99dkyy2emh4uty0vky9y0z0lsr` | BCH address that receives x402 payments. |
| `FACILITATOR_URL` | `http://localhost:4345/facilitator` | URL of the x402-bch facilitator service. |
| `X402_PRICE_SAT` | `200` | Price in satoshis charged per API call via x402. |
| `USE_BASIC_AUTH` | `false` | Enable Bearer token authentication middleware. |
| `BASIC_AUTH_TOKEN` | *(empty)* | The expected Bearer token value. |

### Other Settings

| Variable | Default | Description |
|---|---|---|
| `NODE_ENV` | `development` | Environment (`development` or `production`). |
| `API_PREFIX` | `/v6` | URL prefix for all REST endpoints. |
| `LOG_LEVEL` | `info` | Winston logging level. |
| `IPFS_GATEWAY` | `p2wdb-gateway-678.fullstack.cash` | IPFS gateway hostname. |

---

## Access Control

psf-bch-api supports three major access-control configurations. Which one you choose depends on your deployment scenario. The behavior is controlled entirely by the `X402_ENABLED` and `USE_BASIC_AUTH` environment variables.

### 1. No Rate Limits (Open Access)

Set both access-control flags to `false`:

```
X402_ENABLED=false
USE_BASIC_AUTH=false
```

All API endpoints are publicly accessible without any authentication or payment. This is the simplest configuration, ideal for **local development**, a **CashBox** on your home network, or **private, trusted networks** where access control is handled at the network level (e.g. behind a firewall or VPN).

This is the default setting in the Docker `.env-example`.

### 2. Bearer Token Authentication

Set `USE_BASIC_AUTH=true` and `X402_ENABLED=false`:

```
X402_ENABLED=false
USE_BASIC_AUTH=true
BASIC_AUTH_TOKEN=my-secret-token
```

Every API request (except `/health` and `/`) must include an `Authorization` header with a valid Bearer token:

```
Authorization: Bearer my-secret-token
```

Requests without a valid token receive an HTTP `401 Unauthorized` response. This is the best option when you want to **restrict access to a known set of users or services** (e.g. an organization's internal apps) without requiring cryptocurrency payments.

### 3. x402-bch Per-Call Payments

Set `X402_ENABLED=true`:

```
X402_ENABLED=true
SERVER_BCH_ADDRESS=bitcoincash:qqlrzp23w08434twmvr4fxw672whkjy0py26r63g3d
FACILITATOR_URL=http://localhost:4345/facilitator
X402_PRICE_SAT=200
```

Every API call under the `/v6` prefix requires a BCH micro-payment. When a request arrives without a valid `X-PAYMENT` header, the server responds with HTTP `402 Payment Required` and includes the payment details. Client libraries that support the [x402-bch protocol](https://github.com/x402-bch/x402-bch) (like [bch-js](https://github.com/Permissionless-Software-Foundation/bch-js)) can handle payments automatically.

This is the right choice for **public, monetized APIs** where you want to charge per call.

### Combined: x402 + Bearer Token

You can enable both at the same time:

```
X402_ENABLED=true
USE_BASIC_AUTH=true
BASIC_AUTH_TOKEN=my-secret-token
```

In this mode, requests that present a valid Bearer token bypass the x402 payment requirement. All other requests must pay. This allows you to give **free access to trusted clients** (via the Bearer token) while still **monetizing public access** via x402.

---

## Development Environment

If you want to modify the code and contribute, you can run psf-bch-api outside of Docker:

```bash
git clone https://github.com/Permissionless-Software-Foundation/psf-bch-api
cd psf-bch-api
npm install
```

Create a `.env` file in the project root:

```bash
cp .env-example .env
```

Edit `.env` to point to your back end infrastructure. For local development you will typically want to disable access control:

```
X402_ENABLED=false
USE_BASIC_AUTH=false
```

Start the server:

```bash
npm start
```

The server will start on port `5942` by default. API documentation is available at `http://localhost:5942/`.

### Generating API Docs

The API reference documentation is generated by [apiDoc](https://apidocjs.com/) from inline annotations in the source code:

```bash
npm run docs
```

The output is written to the `docs/` directory and served by the running server at its root URL. A live version is available at [bch.fullstack.cash](https://bch.fullstack.cash).

### Running Tests

The project includes unit tests and integration tests using [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), and [Sinon](https://sinonjs.org/). Code coverage is provided by [c8](https://github.com/bcoe/c8).

**Unit tests** do not require any running infrastructure:

```bash
npm test
```

This lints the code with [Standard](https://standardjs.com/) and then runs all unit tests with code coverage.

**Integration tests** require the back end infrastructure (full node, Fulcrum, SLP indexer) to be running:

```bash
npm run test:integration
```

To generate an HTML coverage report:

```bash
npm run coverage
```
