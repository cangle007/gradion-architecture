# Expense Report Management System

A full-stack expense report application with a Node.js/Express REST API backend and a React/Redux frontend.

---

## Prerequisites

Make sure you have the following installed before you begin:

- [Docker](https://www.docker.com/) and Docker Compose
- [Node.js](https://nodejs.org/) 20+
- npm

---

## Backend Setup

The backend runs inside Docker. All you need is Docker Desktop running.

### 1. Navigate to the backend directory

```bash
cd backend
```

### 2. Start the database and API server

```bash
docker compose down -v
docker compose up --build
```

This will spin up two containers: a PostgreSQL 16 database and the Express API server. The API will be available at **http://localhost:3000**.

> The app container waits for the database health check to pass before starting, so the first boot may take a few seconds.

### 3. Seed the database

In a separate terminal, run:

```bash
docker compose exec app npx knex seed:run
```

This creates two default accounts:

| Email               | Password      | Role  |
| ------------------- | ------------- | ----- |
| `admin@example.com` | `password123` | admin |
| `test@example.com`  | `password123` | user  |

---

## Frontend Setup

### 1. Navigate to the frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**.

> Make sure the backend is already running before starting the frontend, otherwise API calls will fail.

---

## Running Both Together

Open two terminal windows side by side:

**Terminal 1 — Backend:**

```bash
cd backend
docker compose up --build
```

**Terminal 2 — Frontend:**

```bash
cd frontend
npm install
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

## Running Tests

The test suite runs against a separate local test database. The Docker containers must be running first.

### 1. Make sure the app is running

```bash
docker compose up -d
```

### 2. Create the test database (first time only)

```bash
docker compose exec db psql -U postgres -c "CREATE DATABASE expense_reports_test;"
```

### 3. Run migrations against the test database

```bash
NODE_ENV=test npx knex migrate:latest
```

### 4. Run the tests

```bash
npm install
npm test
```

---

## Application Overview

### User Features (`/`)

- View all your expense reports in a table
- Create a new report
- Edit or delete reports that are in `DRAFT` status
- Click **View** on any report to open the detail modal where you can:
  - Add, edit, and delete expense line items
  - Submit the report for admin review

### Admin Features (`/admin`)

- Log in with the admin account (`admin@example.com` / `password123`)
- View all reports across all users
- Filter reports by status: `ALL`, `DRAFT`, `SUBMITTED`, `APPROVED`, `REJECTED`
- Approve or reject any `SUBMITTED` report

---

## Report Status Flow

```
  DRAFT  ──[Submit]──►  SUBMITTED  ──[Approve]──►  APPROVED
    ▲                       │                         (final)
    │                    [Reject]
    └───────────────────────┘
                        REJECTED
```

- Items can only be added, edited, or deleted while a report is in `DRAFT` or `REJECTED`
- Once approved, a report is in a terminal state and cannot be changed
- After rejection, the report reverts so the user can correct and resubmit

---

## Tech Stack

| Layer     | Technology                        |
| --------- | --------------------------------- |
| Frontend  | React, Redux, React Router, Axios |
| Backend   | Node.js, Express                  |
| Database  | PostgreSQL 16 via Knex.js         |
| Auth      | JWT + bcrypt                      |
| Testing   | Jest + Supertest                  |
| Container | Docker + Docker Compose           |
