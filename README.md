# B2Broker Backend Integration

This backend serves as an interface to interact with the [B2BrokerToken](https://github.com/JohnPochta/b2broker-contract) — an Ownable ERC-20 token with LayerZero native messaging support.

## 🧱 Prerequisites

Before using this backend, make sure the token contract is deployed and the environment is correctly configured.

---

## 🚀 Step-by-Step Setup

### 1. Deploy the Token

Clone and deploy the token contract from the official repository:

🔗 https://github.com/JohnPochta/b2broker-contract

Follow its README to complete the deployment process on your desired network (e.g., Ethereum Sepolia).

---

### 2. Clone the Backend Test Client

Clone the utility backend project for testing:

```bash
git clone https://github.com/JohnPochta/b2broker-backend-test.git
cd b2broker-backend-test
```

```
cp .env.example .env
```

Start the Backend Server
Run the startup script:
./start.sh

This will install dependencies and launch the local backend server.

Configure Environment
Copy the example environment file:

```
cp .env.example .env
```

Then, fill in the required variables in .env (e.g., RPC URL, private key, deployed token address, etc.).

API Endpoints
🔍 Get Token Balance
```
GET http://localhost:3000/contract-call/:tokenAddress/balance/:userAddress
```

:userAddress — Wallet address to check balance for

✅ Example:

```
http://localhost:3000/contract-call/0x01297e5b14004883CC77c0c5d3f42CA1000013C1/balance/0x2D0bf6D3BD0636eec331f7c2861F44D74a2dcaC3
```

Check the tests on the sepolia etherscan: 
https://sepolia.etherscan.io/address/0x01297e5b14004883cc77c0c5d3f42ca1000013c1

🧪 TransferFrom Testing
To test the transferFrom functionality, use the provided frontend interface.

The frontend handles wallet connection and transaction signing for simulating token transfers.
