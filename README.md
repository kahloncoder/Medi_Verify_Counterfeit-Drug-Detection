# 🛡️ Medi-Verify: Counterfeit Drug Detection

<p align="center">
  <strong>A decentralized web application leveraging the Internet Computer blockchain to combat counterfeit drugs and ensure pharmaceutical supply chain integrity.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
  <img src="https://img.shields.io/badge/Internet_Computer-3B00B9?style=for-the-badge&logo=internet-computer&logoColor=white" alt="Internet Computer">
</p>

---

## 🎯 The Problem

Counterfeit medicines pose a significant and life-threatening risk to global health. It is incredibly challenging for pharmacies, hospitals, and consumers to reliably verify the authenticity of drugs. Existing systems are often manual or centralized, making them vulnerable to errors, manipulation, and security breaches. There is a critical need for a transparent, secure, and decentralized solution.

## 💡 Our Solution

**Medi-Verify** is a decentralized application that provides a transparent and immutable ledger for pharmaceutical supply chains, built on the Internet Computer (ICP). By scanning a product's unique identifier (emulated via QR code, barcode, or RFID), the system cross-references it with a secure on-chain canister to instantly verify its authenticity, trace its journey, and confirm critical details like:

* **Manufacturer Name**
* **Batch Number**
* **Manufacturing & Expiry Date**
* **Unique Blockchain Hash**

This process ensures that every stakeholder—from the manufacturer to the end consumer—can trust the legitimacy of the medicine, enhancing patient safety and building confidence in the pharmaceutical ecosystem.

---

## ⚙️ How It Works

The Medi-Verify ecosystem operates in a clear, sequential flow that ensures integrity at every step of the supply chain.

### 1. Manufacturer Registration
* **Action:** A pharmaceutical manufacturer registers a new batch of medicine through the dedicated portal.
* **Process:** Product details (name, batch number, expiry date) are submitted.
* **Outcome:** A new, immutable record is created in the ICP canister, generating a unique QR code/ID for the batch.

### 2. Supply Chain Transfer
* **Action:** The manufacturer sells or transfers the medicine batch to a registered seller (distributor/pharmacy).
* **Process:** The ownership transfer is recorded on the blockchain, updating the product's journey.
* **Outcome:** The transaction is logged, providing a transparent and auditable trail of custody.

### 3. Consumer Verification
* **Action:** A consumer, pharmacist, or hospital scans the QR code on the medicine package using the Medi-Verify dashboard.
* **Process:** The application queries the ICP canister using the unique product ID.
* **Outcome:** The dashboard displays the full, verified history of the product. If the details match the on-chain record, it is marked as **"Authentic."** If not, it is flagged, preventing a potential counterfeit from being used.

---

## ✨ Key Features

* **👥 Role-Based Access:** Separate, intuitive interfaces for Manufacturers, Sellers, and Consumers.
* **🔗 Immutable On-Chain Ledger:** All medicine data is stored in `StableBTreeMap` within an ICP canister, ensuring data persistence and tamper-proof records.
* **🚚 End-to-End Tracking:** The entire journey of a medicine package is tracked and visible on the blockchain.
* **✅ Instant Verification:** Consumers can easily scan a product's code to view its complete history and confirm its authenticity in real-time.
* **📋 Transaction History & Reporting:** All verification activities are logged, ensuring accountability and providing data for audits.

---

## 📸 Project Showcase

This section provides a visual walkthrough of the Medi-Verify application, from the user-facing interface to the backend components.

### 1. The User Verification Flow
The core journey for a consumer or pharmacist is simple and intuitive.

**The Scanning Dashboard**
*The main dashboard where users can scan a product's QR code to begin the verification process.*
![Dashboard image preview for scanning](https://github.com/user-attachments/assets/0dfc43ec-0b81-4b4a-a0e1-13d1122e3033)

**Verification Results**
*After a successful scan, the system displays the full, verified details of the medicine, confirming its authenticity.*
![Dashboard showing verification results](https://github.com/user-attachments/assets/69abb4f4-150d-474f-8887-f9a01206fb1b)

### 2. Admin Portal & Data Management
The application provides powerful tools for administrators to manage the supply chain.

**Admin Dashboard**
*The admin portal provides a comprehensive overview of all medicines registered in the system.*
![Dashboard showing Admin portal](https://github.com/user-attachments/assets/764fea6f-2eb1-4e69-9367-95c4d2a3f520)

**Transaction History**
*A detailed, immutable log of all verification transactions is available for auditing and tracking purposes.*
![Dashboard showing Transaction history](https://github.com/user-attachments/assets/d2814506-9642-46f8-b208-2bc2597290a4)

### 3. Behind the Scenes: The Technology
A look at the backend components that power Medi-Verify's secure and decentralized architecture.

**Candid UI for the ICP Canister (Backend)**
*The Candid UI provides a direct interface to interact with the functions on our Internet Computer canister, which holds the secure, on-chain data.*
![Candid UI for the ICP Canister](https://github.com/user-attachments/assets/53569ce3-b19f-4945-bacd-ab129f3e6987)

**FastAPI Backend Documentation**
*The auto-generated documentation for our FastAPI backend, which handles API requests and communicates with the blockchain.*
![Fast API backend documentation](https://github.com/user-attachments/assets/5f745083-d8e0-4973-963e-9beed753a35d)

---

## 🛠️ Tech Stack

### Frontend (Web Dashboard)
* **Framework:** `React.js` + `Vite`
* **Styling:** `Tailwind CSS`
* **UI Components:** `Lucide Icons`

### Backend (Smart Contract & API)
* **Blockchain:** `Internet Computer (ICP)`
* **Language:** `Rust` or `Motoko` for the canister logic.
* **Data Structure:** `StableBTreeMap` for persistent, stable memory storage on-chain.
* **API Server:** `FastAPI` (Python) to serve as a bridge or for off-chain logic.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

* Node.js and npm
* DFINITY Canister SDK (`dfx`)

### Installation and Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/Pranav-Marwaha-73/Medi_Verify_Counterfeit-Drug-Detection.git](https://github.com/Pranav-Marwaha-73/Medi_Verify_Counterfeit-Drug-Detection.git)
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd Medi_Verify_Counterfeit-Drug-Detection
    ```

3.  **Start the local ICP environment:**
    Open a new terminal window and run:
    ```sh
    dfx start --background --clean
    ```

4.  **Deploy the ICP Canister:**
    In the main project directory, deploy the backend canister:
    ```sh
    dfx deploy
    ```
    After deployment, `dfx` will output the canister ID. Copy this ID.

5.  **Set up the Frontend:**
    * Navigate to the frontend directory (e.g., `cd frontend/`).
    * Install the necessary npm packages:
        ```sh
        npm install
        ```
    * Create a `.env` file in the frontend directory and add the canister ID you copied:
        ```
        VITE_CANISTER_ID=<PASTE_YOUR_CANISTER_ID_HERE>
        ```

6.  **Start the development server:**
    In the frontend directory, run:
    ```sh
    npm run dev
    ```
    The application will be available at the local address provided by Vite (usually `http://localhost:5173`).

---

## 📈 Impact & Future Scope

### Impact

* **Reduces Counterfeit Drugs:** Ensures only genuine medicines reach patients, directly saving lives.
* **Enhances Trust:** Creates a transparent and auditable supply chain that builds trust among all stakeholders.
* **Empowers Consumers:** Allows anyone to easily verify the authenticity of their medication.

### Future Scope

* **Mobile Application:** Develop a dedicated mobile app for iOS and Android for on-the-go verification.
* **AI-Powered Analytics:** Implement AI to analyze supply chain data and predict potential counterfeit hotspots or fraudulent patterns.
* **Deeper System Integration:** Integrate directly with pharmacy and hospital inventory management systems for a seamless workflow.

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## 🧑‍💻 Project Team

This project was brought to you by **Team X Rankers**. The project was planned and primarily built by the team lead, with key contributions from all members.

### Pranav Marwaha (Team Leader)
- **Role:** Lead Developer (Blockchain & Frontend)
- **GitHub:** [Pranav-Marwaha-73](https://github.com/Pranav-Marwaha-73)
- **Contact:** `pranavmarwaha73@gmail.com`

### Tarandeep Singh (Senior Developer)
- **Role:** QR/Barcode Scanning Integration
- **Contact:** `taran3366@gmail.com`

### Rishipal Singh ( Developer)
- **Role:** Backend Development (FastAPI)
- **Contact:** `rishipal@gmail.com`
