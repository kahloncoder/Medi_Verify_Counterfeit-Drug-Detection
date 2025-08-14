<p align="center">
  <img src="https://raw.githubusercontent.com/Pranav-Marwaha-73/Medi_Verify_Counterfeit-Drug-Detection/main/logo.png" alt="Medi-Verify Logo" width="150">
</p>

# Medi-Verify: Counterfeit Drug Detection

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

## ✨ Key Features

* **👥 Role-Based Access:** Separate, intuitive interfaces for Manufacturers, Sellers, and Consumers.
* **🔗 Immutable On-Chain Ledger:** All medicine data is stored in `StableBTreeMap` within an ICP canister, ensuring data persistence and tamper-proof records.
* **🚚 End-to-End Tracking:** The entire journey of a medicine package is tracked and visible on the blockchain.
* **✅ Instant Verification:** Consumers can easily scan a product's code to view its complete history and confirm its authenticity in real-time.
* **📋 Transaction History & Reporting:** All verification activities are logged, ensuring accountability and providing data for audits.

---

## 📸 Screenshots

*(Here you can add screenshots of your application. Replace the placeholder links with your actual image URLs.)*

**Verification Result:**
![Verification Result](https://raw.githubusercontent.com/Pranav-Marwaha-73/Medi_Verify_Counterfeit-Drug-Detection/main/Verification-Result.png)

---

## 🛠️ Tech Stack

| Layer       | Technology                    |
| ----------- | ----------------------------- |
| **Frontend** | React, Vite, Tailwind CSS     |
| **Backend/API** | FastAPI                       |
| **Blockchain** | ICP Canister (StableBTreeMap) |
| **Storage** | On-chain in stable memory     |
| **Others** | RFID/QR emulation, Lucide Icons |

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

## 🧑‍💻 Project Team

This project was brought to you by **Team X Rankers**:

* **Pranav Marwaha** (Team Leader) - [Pranav-Marwaha-73](https://github.com/Pranav-Marwaha-73)
* **Tarandeep Singh**
* **Hargun Kaur**
