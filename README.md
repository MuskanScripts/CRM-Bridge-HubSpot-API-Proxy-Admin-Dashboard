---

# 🚀 CRM Bridge – HubSpot API Proxy & Admin Dashboard

A secure **Node.js + Express** backend proxy and a **web-based admin dashboard** to manage HubSpot CRM data (Contacts, Deals, Companies, Tickets) without exposing private API keys to the frontend.

This project acts as a **bridge** between your UI and HubSpot’s CRM APIs, enabling enterprise-style security, logging, and centralized API handling.

---

## 🔹 Features

* 🔐 Secure **API Proxy** for HubSpot CRM
* 👥 Manage Contacts (CRUD + Search)
* 💼 Manage Deals (CRUD + Search + Stage Update)
* 🏢 Manage Companies (CRUD + Search)
* 🎫 Manage Tickets (CRUD + Status/Priority Updates)
* 🔄 Universal passthrough gateway: `/crm/*`
* 🌐 CORS-enabled for frontend integration
* 🛡 Token normalization (auto-fixes Bearer token format)
* 📊 Clean admin dashboard UI with search, modals, and tables

---

## 🛠 Tech Stack

**Backend**

* Node.js
* Express
* Axios / Fetch
* HubSpot CRM REST API

**Frontend**

* HTML
* CSS
* Vanilla JavaScript

---

## 🧠 Architecture

```
Browser (Dashboard UI)
        ↓
Express API Proxy (CRM Bridge)
        ↓
HubSpot CRM REST API
```

---

## ▶️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/crm-bridge.git
cd crm-bridge
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the server

```bash
node server.js
```

### 4️⃣ Open the dashboard

Go to:

```
http://localhost:7986
```

---

## 🔑 Get Your HubSpot API Token

1. Go to **HubSpot Developer Portal**
2. Create a **Private App**
3. Copy the **Access Token**
4. Paste it into the dashboard sidebar
   (No need to write `Bearer` — it’s auto-handled.)

---

## 📁 Project Structure

```
crm-bridge/
│
├── server.js        # Express proxy server
├── index.html      # Admin dashboard UI
├── package.json
└── README.md
```

---

## 🔌 API Endpoints

| Resource    | Endpoint     | Methods   |
| ----------- | ------------ | --------- |
| Contacts    | `/contacts`  | GET, POST |
| Deals       | `/deals`     | GET, POST |
| Companies   | `/companies` | GET, POST |
| Tickets     | `/tickets`   | GET, POST |
| Search      | `/*/search`  | POST      |
| Passthrough | `/crm/*`     | ALL       |

---

## 🔒 Security Highlights

* API tokens never reach the frontend
* Authorization header normalization
* Centralized error handling
* Proxy prevents direct HubSpot exposure

---

## 🌟 Why CRM Bridge?

Most dashboards directly call external APIs from the browser — exposing secrets.

**CRM Bridge solves this with a secure backend gateway** that:

* Protects credentials
* Allows scaling
* Enables logging and analytics
* Supports future integrations

---

## 📌 Future Enhancements

* User authentication (JWT / OAuth)
* Role-based access control
* Analytics dashboard
* React-based frontend
* Cloud deployment (Render / Railway)

---

## 👩‍💻 Author

**Muskan**
B.Tech Electrical Engineering, NIT Jalandhar
Frontend + Backend Developer

---
