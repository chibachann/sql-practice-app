# SQL Practice App

A full-stack practice app for executing and testing SQL queries against a sample employee database.

- **Backend**: Node.js + Express + SQLite3 (`better-sqlite3`)
- **Frontend**: React + TypeScript + Vite
- **Container**: Docker-ready for consistent development
- **Purpose**: Practice SQL queries and visualize results through a web UI

---

## 📂 Project Structure

```
sql-practice-app/
├── backend/ # Express server with SQLite3 and seed data
│ ├── schema/ # Contains init.sql for DB schema + data
│ └── src/
├── frontend/ # React frontend with Vite and TypeScript
│ └── src/
└── README.md

```
---

## 🚀 Getting Started

### 1. Requirements

- **Node.js 20.x**
- (Optional) Install via [nvm](https://github.com/nvm-sh/nvm):
  ```bash
  nvm install 20
  nvm use 20

### 2. Backend Setup

``` bash
cd backend
npm install          # Install dependencies
npm run seed         # Compile & initialize the database from schema/init.sql
npm run dev          # Start the backend server at http://localhost:3000


```
This will generate dist/sample.db containing preloaded employee data.

### 3. Frontend Setup
``` bash
cd ../frontend
npm install
npm run dev          # Starts the frontend at http://localhost:5173

```

The frontend is configured via Vite to proxy API requests (/api/*) to http://localhost:3000.

## 🔄 API Route

```
POST /api/run-sql
Content-Type: application/json
Body:
{
  "sql": "SELECT * FROM employees;"
}

```
Returns:

``` json
{
  "success": true,
  "result": [ { ...rows } ]
}

```

## 🛠 Notes
All data is reset on each npm run seed, as init.sql drops and recreates tables.

The app is currently in development; frontend styling and query validation may be improved.

## 📄 License
MIT
