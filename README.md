# 📰 News Platform API (Express + TypeScript)

A RESTful news platform API built with **Express** and **TypeScript**. Features **JWT-based authentication**, user registration & login, and **protected article submission**. Uses a **MySQL** database with parameterised queries, **bcrypt** password hashing, and organised routing to demonstrate core full-stack backend concepts.

---

## 📋 Description

This project was built as part of the **Development Platforms** course in the **Noroff Frontend Development (2-year vocational studies)**.

The module covers the fundamentals of **Express.js back-end development** and **REST API creation**, with an emphasis on building complete CRUD-style applications using:

- TypeScript
- Middleware
- Express routing patterns
- Secure authentication
- Database integration (MySQL)

---

## 💡 Motivation

My goal with this assignment was to **understand what makes the backend tick, directly in the code**.

I chose the “API-only / backend focus” approach because I enjoy exploring what normally sits behind the UI. I already have some experience with **Firebase / Firestore** and I’ve experimented a bit with **Sanity**, so this time I wanted to go deeper into a more traditional setup using **Express.js + a relational MySQL database** and see how a custom API is actually built.

What I enjoyed most was working with the parts we typically don’t see as frontend developers: **routing, middleware, authentication, and database interaction**. It was also cool to recognise patterns that likely exist in the **Noroff APIs** we’ve used in earlier projects—especially around authentication and structured endpoints—because this project gave me the “full picture” of how those systems might be wired together behind the scenes.

The biggest “aha” moment was understanding how **Express and MySQL communicate**, and how important it is to make that integration stable and predictable. I’m especially proud that I can explain how the pieces connect end-to-end (route handling → database calls → auth), and that I understand *why* we use things like **bcrypt hashing**, **JWT**, and **parameterised queries**.

Challenges-wise, the hardest part was **making everything type-safe while learning new patterns**. Some types were inferred automatically, while other parts required explicit typing, especially when I wasn’t fully sure which parameters were required by certain methods yet. Connecting the dots between TypeScript, Express request/response objects, and MySQL query results definitely pushed my understanding.

Finally, comparing a custom API to a SaaS option (like Supabase) helped clarify the trade-offs:

- **SaaS (Supabase/Firebase etc.)** is faster to set up, more user-friendly, and removes a lot of maintenance work (updates, infrastructure, security defaults).
- **A custom API** can be cheaper at scale, gives more flexibility, and lets you tailor the database structure, tooling, and logic exactly to your project’s needs, but it also requires more responsibility around security, structure, and upkeep.

Overall, this assignment helped me connect frontend requests to backend logic in a way I hadn’t fully understood before. 

---

## ✨ Features

- 🔐 **JWT Authentication** (token-based login)
- 👤 **User registration and login**
- 📰 **Protected routes for article submission**
- 🔒 **Password hashing** with bcrypt
- 🗄️ **MySQL database integration** using parameterised queries
- 🧩 **Modular routing structure**
- 📄 **Swagger tooling included** (swagger-jsdoc + swagger-ui-express)

---

## 🛠️ Tech Stack

- **Node.js**
- **Express**
- **TypeScript**
- **MySQL** (`mysql2`)
- **JWT** (`jsonwebtoken`)
- **Password hashing** (`bcrypt`)
- **Validation** (`zod`)
- **Docs tooling** (`swagger-jsdoc`, `swagger-ui-express`)
- **Tooling:** ESLint, Prettier, tsx

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js (v18+ recommended)
- MySQL or MySQL Workbench 
- npm

---

### 📦 Install

```bash
git clone https://github.com/mamf92/development-platforms-ca.git
cd development-platforms-ca
npm install
```

---

## 🔐 Environment variables (.env)

This project expects environment variables to run correctly (including hashing + JWT).

1. Copy the example env file:

```bash
cp .env.example .env
```

2. Update `.env` with your values:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name

# Server Configuration
PORT=3000

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_change_in_production
```

> ⚠️ Don’t commit `.env` to GitHub.

---

## 🗄️ Copy/import the database .sql

This project includes a .sql file with the database structure set up. 

1. Import ./database.sql from the root folder and set up the server with MySQL.

2. Include the database user, password, and name in the .env file.

3. Start the server. 

---

## ▶️ Running the API

### Development (recommended)

Runs with hot reload:

```bash
npm run dev
```

### Build + run production build

```bash
npm run build
npm start
```

---

## 📜 Scripts

These are the scripts available in `package.json`:

| Script | What it does |
|------|--------------|
| `npm run dev` | Runs the API in dev mode with hot reload (`tsx watch`) |
| `npm run build` | Compiles TypeScript with `tsc` |
| `npm start` | Runs compiled output from `dist/` |
| `npm run lint` | Runs ESLint across the project |
| `npm run format` | Formats code using Prettier |

---

## 📚 API Docs (Swagger)

Swagger tooling is included in the project and can be accessed here: 

```
http://localhost:3000/api-docs
```
---

## 🧠 What this project demonstrates

- Building REST endpoints using Express + TypeScript
- Using middleware to protect routes
- Handling authentication securely (bcrypt + JWT)
- Safely querying a relational database (parameterised queries)
- Structuring an API project in a clean, readable way

---

## 📌 Roadmap / Improvements

- Add pagination and filtering for article lists
- Add edit/delete endpoints for articles (full CRUD)
- Add request rate limiting and improved logging
- Add tests (Jest + Supertest)
- Add refresh tokens / token rotation (advanced auth)

---

## 📄 License

© 2026 Martin Fischer. All rights reserved.

This project was created as part of a course assignment and is not intended for redistribution without permission.

---

## 🙏 Acknowledgements

- Express documentation
- MySQL documentation
- JWT and bcrypt documentation
- Noroff instructors and course material
