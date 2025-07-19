# Ethereum Kickstarter Clone 🚀

A decentralized crowdfunding platform built on Ethereum, inspired by Kickstarter. Users can create campaigns, contribute Ether, and approve or reject spending requests — all transparently managed via smart contracts.

---

## 📖 Features

- 📦 Deploy new crowdfunding campaigns directly from the dApp.
- 💰 Contribute Ether to active campaigns.
- ✅ Campaign managers can create spending requests.
- 🗳️ Contributors vote to approve or reject spending requests.
- 🔐 Full transparency via Ethereum blockchain.

---

## 🛠️ Tech Stack

| Layer            | Stack                        |
|------------------|------------------------------|
| Smart Contracts  | Solidity, Remix, Infura      |
| Ethereum Network | Sepolia Testnet              |
| Frontend         | React.js, Next.js            |
| UI Components    | Semantic UI React            |
| Web3 Integration | web3.js                      |

---

## ⚙️ Setup & Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/kickstarter-clone.git
cd kickstarter-clone

### 2️⃣ Install Dependencies

```bash
npm install

### 3️⃣ Run Development Server
npm run dev

### 4️⃣ Deploy Contracts
1. Ensure you have set your Infura endpoint and wallet private key securely.
2. Run the deployment script:
    npm run deploy
3.Ensure you have set your Infura endpoint and wallet private key securely.
    ethereum/factory.js
---

### 5️⃣ Start Local Development Server
npm run dev

Access the dApp at:

http://localhost:3000

---

📂 Project Structure

/ethereum        # Solidity contracts, deployment scripts
/components      # Reusable React components (Header, Layout, Forms)
/pages           # Next.js pages (Campaigns, Requests)

---

📌 Important Files
/ethereum/Campaign.sol – Core smart contract for campaigns.

/ethereum/factory.js – Interacts with the deployed CampaignFactory.

/components/ContributeForm.js – Contribution UI logic.

/components/RequestRow.js – Handles individual request UI rendering.

---

🔐 Deployment
Network: Sepolia Testnet (can be changed)

Infura Project ID: Set in web3.js

Contract Address: Replace inside /ethereum/factory.js

---

✅ Contribution Guidelines
Fork this repo.

Create your feature branch: git checkout -b feature/YourFeature.

Commit changes: git commit -m 'Add your feature'.

Push to the branch: git push origin feature/YourFeature.

Create a pull request.

---

📄 License
MIT License. Feel free to use, modify, and distribute.

---

📢 Credits
Inspired by Stephen Grider's Ethereum & Solidity Bootcamp.

---