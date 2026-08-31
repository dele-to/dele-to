<p align="center">
  <a href="https://dele.to">
    <img src="https://raw.githubusercontent.com/dele-to/cli/main/.github/dele-to-logo.png" width="100" height="100" alt="DELE.TO">
  </a>
</p>

<!-- <h1 align="center">DELE.TO</h1> -->

<p align="center">
  Share secrets securely with end-to-end encryption and automatic expiration.
</p>

<p align="center">
  <a href="https://dele.to">Website</a> ·
  <a href="https://dele.to/cloud">DELE.TO Cloud</a> ·
  <a href="#deployment">Deployment</a> ·
  <a href="#guides">Guides</a> ·
  <a href="https://github.com/dele-to/cli">CLI</a> ·
  <a href="LICENSE">MIT License</a>
</p>

DELE.TO is a zero-knowledge service for sharing passwords, API keys, credentials, and notes. Secrets are encrypted on your device before they are uploaded, and the decryption key remains in the URL fragment.

## Try the website

No account is required. [Create a secret on dele.to](https://dele.to/create) and share a link that expires after a chosen time or number of views.

<p align="center">
  <img src=".github/screen1.png" alt="Create a structured secret" width="32%">
  <img src=".github/screen2.png" alt="Share an encrypted link" width="32%">
  <img src=".github/screen3.png" alt="Open a decrypted secret" width="32%">
</p>

## Features

- Client-side AES-256-GCM encryption
- Expiring and single-view links
- Optional password protection
- Structured templates for common secret types
- Per-recipient links, QR codes, and creator revocation
- Redis storage with a local development fallback

## DELE.TO Cloud

[DELE.TO Cloud](https://dele.to/cloud) provides a managed, dedicated DELE.TO instance with a custom subdomain for users and teams that want an isolated deployment without managing the infrastructure themselves.

## CLI

The official [DELE.TO CLI](https://github.com/dele-to/cli) creates and opens encrypted shares from your terminal.

```sh
# macOS and Linux
curl -fsSL https://dele.to/install.sh | sh

# Open the interactive interface
deleto

# Share text or a file
deleto 'the launch code is 1234'
deleto --file .env --expires 15m --views 1
```

For Windows installation, configuration, and all commands, see the [CLI guide](https://github.com/dele-to/cli#readme).

## Deployment

Choose between a managed dedicated instance or self-hosting.

### DELE.TO Cloud

[DELE.TO Cloud](https://dele.to/cloud) deploys and manages an isolated instance for you, including a custom subdomain.

### Vercel

Deploy and manage your own instance on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdele-to%2Fdele-to)

### Local or self-hosted

```sh
git clone https://github.com/dele-to/dele-to.git
cd dele-to
corepack enable
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000). Development uses local file storage by default. For Redis-backed deployments, copy `.env.example` to `.env` and configure the required values.

Docker is also supported:

```sh
docker compose up --build -d
```

## Guides

- [About DELE.TO and its security model](https://dele.to/about)
- [API keys and developer access](https://dele.to/developers)
- [CLI installation and usage](https://github.com/dele-to/cli#readme)
- [Test status and coverage](TEST_STATUS.md)

## Testing

```sh
pnpm test
pnpm build
```

## Security

Plaintext secrets and root encryption keys never reach the server. Anyone with a complete share URL can open it while it remains available, so treat the URL as sensitive.

For security issues, contact [support@dele.to](mailto:support@dele.to).

## License

[MIT](LICENSE)
