# EIP.AI

> autonomous intelligence. building something worth launching.

Full-stack monorepo — static site + on-chain escrow marketplace on Base.

---

## Structure

```
eip-ai/
│
├── index.html            ← landing page
├── market.html           ← escrow marketplace (P2P token trading)
├── pricing.html
├── projects.html
├── roadmap.html
├── terminal.html
├── walkthrough.html
├── builder.html
├── council.html
├── demo.html
├── launch.html
│
├── disclaimer.js         ← disclaimer gate (injected in all pages)
│
├── contracts/
│   └── EIPEscrow.sol     ← Solidity escrow contract (Base)
│
├── scripts/
│   └── deploy.cjs        ← Hardhat deploy script
│
├── netlify/
│   └── functions/
│       └── council.js    ← Netlify serverless function
│
├── docs/
│   └── ESCROW.md         ← Escrow contract documentation
│
├── hardhat.config.js     ← Hardhat config (Base Sepolia + Mainnet)
├── package.json
├── netlify.toml          ← Netlify deploy config
└── .env.example          ← Environment variable template
```

---

## Site (Frontend)

Static HTML — no build step. Deploy directly to Netlify by dragging the folder or connecting this repo.

**Netlify deploy:**
- Publish directory: `.` (repo root)
- No build command needed

---

## Escrow Marketplace

Peer-to-peer AI compute credit trading with on-chain escrow.

### How it works

```
Seller:
  1. approve(escrowAddress, tokenAmount)  ← on token contract
  2. createListing(token, amount, price, payType, label)
  3. Tokens are locked in escrow — visible on market.html

Buyer:
  1. Browse market.html
  2a. buyWithETH(id)   ← send ETH equal to listing price
  2b. buyWithUSDC(id)  ← approve USDC first, then call
  3.  Tokens → buyer wallet, payment → seller (minus 1% fee)

Cancel:
  - Seller calls cancelListing(id) while listing is OPEN
  - Tokens returned immediately, no fee charged
```

### Deploy to Base Sepolia (testnet)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env: add your DEPLOYER_PRIVATE_KEY

# 3. Get testnet ETH
# https://www.coinbase.com/faucets/base-ethereum-goerli-faucet

# 4. Deploy
npm run deploy:sepolia
# → Deployed at: 0xYOUR_CONTRACT_ADDRESS
# → Saved to deployment.json
```

### Connect frontend to deployed contract

Open `market.html` and update the `CONFIG` block near the top:

```javascript
const CONFIG = {
  contractAddress: '0xYOUR_CONTRACT_ADDRESS',  // ← paste here
  // everything else stays the same
};
```

### Deploy to Base Mainnet

```bash
npm run deploy:base
```

> ⚠️ Audit the contract before mainnet. See `docs/ESCROW.md`.

---

## Contract Details

| Property | Value |
|---|---|
| Solidity | 0.8.24 |
| Network | Base (chainId 8453) / Base Sepolia (84532) |
| Payment | ETH or USDC |
| Protocol fee | 1% (100 bps) — max 5% |
| Timeout | 48 hours |
| USDC (Sepolia) | `0x036CbD53842c5426634e7929541eC2318f3dCF7e` |
| USDC (Mainnet) | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` |

---

## Deployed Addresses

| Network | Address | Status |
|---|---|---|
| Base Sepolia | _deploy and paste_ | pending |
| Base Mainnet | _after audit_ | pending |

---

## Links

- Site: [eip.ai](https://eip.ai)
- X: [@eip_ai](https://x.com/eip_ai)
- Basescan: [sepolia.basescan.org](https://sepolia.basescan.org)
