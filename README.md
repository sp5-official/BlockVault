# 🔐 BlockVault – Blockchain-Based Cloud Storage Platform

BlockVault is a **decentralized cloud storage platform** that leverages **IPFS (InterPlanetary File System)** and **Blockchain technology** to provide secure, immutable, and distributed file storage.

Unlike traditional cloud storage systems (Google Drive, Dropbox), BlockVault eliminates centralized control and ensures that user data remains **tamper-proof, transparent, and permanently accessible**.



## 🚀 Live Demo

👉 Link: (https://block-vault-ebon.vercel.app/)



## 🧠 Problem Statement

Traditional cloud storage systems suffer from:

* ❌ Centralized control (single point of failure)
* ❌ Data manipulation risks
* ❌ Privacy concerns
* ❌ Dependency on third-party providers



## 💡 Proposed Solution

BlockVault introduces a **decentralized architecture** where:

* Files are stored on **IPFS (distributed storage)**
* File references (CID + metadata) are stored on **Blockchain**
* Users authenticate and interact via **MetaMask wallet**

This ensures:

* 🔒 Data Security
* 🌐 Decentralization
* 📜 Immutability
* 👤 Ownership transparency



## ⚙️ Tech Stack

### 🖥 Frontend

* React.js
* Tailwind CSS
* Ethers.js

### 🧠 Backend

* Node.js
* Express.js
* Multer (file handling)
* Axios (API calls)

### 🔗 Blockchain

* Solidity
* Smart Contracts
* Hardhat
* Polygon Amoy Testnet
* MetaMask

### ☁️ Storage

* IPFS via Pinata



## 🏗️ System Architecture

```id="3kzslv"
User (Browser)
   ↓
Frontend (React - Vercel)
   ↓
Backend API (Node.js - Render)
   ↓
IPFS (Pinata)
   ↓
Blockchain (Polygon)
```



## 🔄 Working Flow

1. User selects a file from the frontend
2. File is sent to backend using API
3. Backend uploads file to IPFS via Pinata
4. IPFS returns a unique **CID (Content Identifier)**
5. CID + filename is stored on Blockchain via smart contract
6. Frontend fetches stored data from blockchain
7. Files are displayed and accessible via IPFS gateway



## 🔑 Key Features

* 📤 Upload files securely to IPFS
* 🔗 Store file CID on blockchain
* 📂 Persistent file display after refresh
* 🧾 Metadata storage (filename + CID)
* 🦊 MetaMask wallet integration
* 🌐 Fully deployed Web3 application
* 🔐 Decentralized and tamper-proof system



## 🚀 Installation & Setup

### 1️⃣ Clone Repository

```id="9htgsv"
git clone https://github.com/yourusername/blockvault.git
cd blockvault
```



### 2️⃣ Backend Setup

```id="j7x8ql"
cd backend
npm install
```

Create `.env` file:

```id="8tvb4j"
PINATA_JWT=your_pinata_jwt
```

Run server:

```id="6w39k6"
node server.js
```



### 3️⃣ Frontend Setup

```id="wpx6e8"
cd frontend
npm install
npm run dev
```



### 4️⃣ Blockchain Setup

```id="x3b6s2"
cd blockchain
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network amoy
```



## 🔐 Environment Variables

| Variable   | Description                    |
| ---------- | ------------------------------ |
| PINATA_JWT | Pinata API JWT for IPFS upload |



## 🌍 Deployment

* Frontend → Vercel
* Backend → Render
* Blockchain → Polygon Amoy
* Storage → Pinata (IPFS)



## 🧠 Smart Contract Overview

The smart contract stores:

* 📌 CID (IPFS hash)
* 📄 File name
* 👤 Uploader address
* ⏱ Timestamp




## 🔍 Limitations

* Blockchain transactions incur gas fees
* Data retrieval can be slower than traditional DB
* No advanced search/filtering



## 🎯 Future Enhancements

* 🌐 Modern & Clean UI
* 🔍 Search & filter files
* 👤 User-specific dashboards
* 📄 File preview (images/PDFs)
* ☁️ MongoDB integration for faster queries
* 🔐 Access control & permissions
* 📊 Analytics dashboard



## 🧑‍💻 Author

**Suraj Pawar**
Final Year B.E. Computer Engineering Student



## ⭐ Contribution

Feel free to fork, contribute, and enhance this project!



## 📜 License

This project is licensed under the MIT License.
