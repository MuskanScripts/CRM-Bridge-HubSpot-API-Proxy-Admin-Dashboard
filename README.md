

```md
# 🚀 HubSpot CRM Agent (MERN + HubSpot API Integration)

A full-stack CRM dashboard that integrates with **HubSpot CRM APIs** to manage **Contacts, Deals, Companies, and Tickets** from a single unified interface.

This project demonstrates **real-world full-stack development**, **REST API design**, **third-party API integration**, and **secure backend architecture**.

---

# 📌 Features

### 📇 Contacts
- Create contact
- Get all contacts
- Get contact by ID
- Update contact (by ID or email)
- Delete contact
- Search contacts

### 💰 Deals
- Create deal
- Get all deals
- Get deal by ID
- Update deal
- Delete deal
- Search deals (exact match and contains filter)

### 🏢 Companies
- Create company
- Get all companies
- Get company by ID
- Update company
- Delete company
- Search companies

### 🎫 Tickets
- Create ticket
- Get all tickets
- Get ticket by ID
- Update ticket
- Delete ticket

---

# 🧠 Tech Stack

### Frontend
- React.js
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- Axios (for HubSpot API calls)
- CORS middleware

### Third Party Integration
- HubSpot CRM API

---

# 🏗️ Architecture

```

Frontend (React)
│
▼
Backend (Express API Layer)
│
▼
HubSpot CRM API
│
▼
HubSpot Database

```

---

# 🔐 Security & Backend Design

This project follows **enterprise-grade API practices**:

- 🔐 Token normalization for consistent Bearer authentication
- 🌐 CORS handling for frontend-backend communication
- ⚠️ Centralized error response handling
- 📜 Request logging middleware for debugging and monitoring
- 🔒 Backend acts as secure middleware between frontend and HubSpot APIs

---

```
# 📂 Project Structure

```

CRM-Bridge-HubSpot-API-Proxy-Admin-Dashboard/
│
├── backend/
│   ├── node_modules/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js              # Express backend (HubSpot API integration)
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/                   # React components & pages
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
└── README.md

```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/MuskanScripts/CRM-Bridge-HubSpot-API-Proxy-Admin-Dashboard
````

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
node server.js
```

Server runs at:

```
http://localhost:3000
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3001
```

---

# 🔑 Authentication (HubSpot Token)

This project uses **HubSpot Private App Token (PAT)**.

Include token in headers:

```
Authorization: Bearer YOUR_HUBSPOT_TOKEN
```

---

# 📡 API Endpoints

## 📇 Contacts

| Method | Endpoint                 |
| ------ | ------------------------ |
| POST   | `/contacts`              |
| GET    | `/contacts`              |
| GET    | `/contacts/:id`          |
| PATCH  | `/contacts/:id`          |
| PATCH  | `/contacts/email/:email` |
| DELETE | `/contacts/:id`          |
| POST   | `/contacts/search`       |

---

## 💰 Deals

| Method | Endpoint                         |
| ------ | -------------------------------- |
| GET    | `/deals`                         |
| GET    | `/deals/:id`                     |
| POST   | `/deals`                         |
| PATCH  | `/deals/:id`                     |
| DELETE | `/deals/:id`                     |
| POST   | `/deals/search`                  |
| POST   | `/deals/search-by-name-exact`    |
| POST   | `/deals/search-by-name-contains` |

---

## 🏢 Companies

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | `/companies`        |
| GET    | `/companies/:id`    |
| POST   | `/companies`        |
| PATCH  | `/companies/:id`    |
| DELETE | `/companies/:id`    |
| POST   | `/companies/search` |

---

## 🎫 Tickets

| Method | Endpoint       |
| ------ | -------------- |
| GET    | `/tickets`     |
| GET    | `/tickets/:id` |
| POST   | `/tickets`     |
| PATCH  | `/tickets/:id` |
| DELETE | `/tickets/:id` |

---

# 🧪 Example Request

### Create Contact

```http
POST /contacts
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "properties": {
    "firstname": "Muskan",
    "lastname": "Muskan",
    "email": "muskan@gmail.com"
  }
}
```

---

# 🌍 Real World Use Cases

This system can be used by:

* Startups
* SaaS companies
* Sales teams
* Marketing teams
* Customer support teams

### It helps with:

* Lead management
* Sales pipeline tracking
* Customer database management
* Support ticket handling
* Business relationship tracking

---

# 🎯 Key Highlights

* Built a **mini CRM system like HubSpot/Salesforce**
* Full CRUD operations for all CRM objects
* Secure backend middleware architecture
* Clean and scalable API design
* Real-world business use case implementation

---

# 🚀 Future Improvements

* Role-based authentication (Admin, Sales, Support)
* Analytics dashboard (charts, revenue insights)
* Email automation workflows
* AI-based recommendations for deals

---

# 👩‍💻 Author

**Muskan**
B.Tech Electrical Engineering, NIT Jalandhar
Backend Developer | MERN Stack | CRM Systems

---

