# Project Name

> AI Interview Coach

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Running in Development](#running-in-development)
- [Running in Production](#running-in-production)
- [API Reference](#api-reference)
- [Scripts](#scripts)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## Overview

I Interview Coach is a web app where you paste a job description and your resume, and it generates tailored interview questions, grades your answers in real-time with coaching feedback - all powered by AI.

---

## Tech Stack

**Frontend**
- Framework: React.js
- Styling: Tailwind CSS

**Backend**
- Runtime: Node.js / Python
- Framework: Express
- Database: PostgreSQL / MongoDB
- ORM: Drizzle
- LLM: Groq

---

## Project Structure

```
project-root/
├── frontend/          # Client-side application
│   ├── src/
│   ├── public/
│   └── index.html
│   └── package.json
│   └── .gitignore
│   └── eslint.config.js
│   └── vite.config.js
│   └── tsconfig.app.json
│   └── tsconfig.json
│   └── tsconfig.node.json
├── backend/           # Server-side application
│   ├── drizzle/
│   ├── src/
│   ├── env.ts
│   ├── eslint.config.mjs
│   ├── drizzle.config.ts
│   ├── tsconfig.ts
│   ├── .gitignore
└── README.md
```

---

## Prerequisites

Make sure you have the following installed before getting started:

- [Node.js](https://nodejs.org/) >= 18.x
- [npm](https://www.npmjs.com/) >= 9.x (or yarn / pnpm)
- [Git](https://git-scm.com/)

---

## Environment Variables

Both `frontend/` and `backend/` have their own `.env` files.

### Frontend (`frontend/.env`)

| Variable | Description | Example |
|---|---|---|
| `VITE_BACKEND_URL` | Base URL of the backend API | `http://localhost:8000` |
| `VITE_APP_NAME` | Display name of the app | `My App` |

### Backend (`backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the server listens on | `8000` |
| `DATABASE_CONNECTION_URL` | Full database connection string | `postgresql://user:pass@localhost:5432/dbname` |
| `CORS_WHITELIST` | CORS allowed origins | `http://localhost:5173 http://localhost:3000` |
| `NODE_ENV` | Environment mode | `development` |
| `APP_STAGE` | App Stage | `dev` |
| `GROQ_API_KEY` | Groq LLM API Key | `secret_groq_api_key` |

> Never commit `.env` files. They are already in `.gitignore`.

---

## Running in Development

### 1. Clone the repository

```bash
git clone https://github.com/your-org/your-repo.git
cd your-repo
```

### 2. Install dependencies

```bash
# Frontend
cd frontend && npm install

# Backend
cd ../backend && npm install
```

### 3. Set up the database

```bash
# Run migrations
cd backend
npx drizzle-kit migrate
```

### 4. Start both servers

Open two terminals, or use a tool like [concurrently](https://www.npmjs.com/package/concurrently).

**Terminal 1 — Backend**
```bash
cd backend
npm run dev
# Runs on http://localhost:8000
```

**Terminal 2 — Frontend**
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

Alternatively, from the project root if you have a root-level script:

```bash
npm run dev
```

---

## Running in Production

```bash
# Build frontend
cd frontend && npm run build

# Start backend in production mode
cd ../backend && npm start
```

---

## API Reference

Base URL: `http://localhost:8000/api`

| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| GET | `/health` | Health check | No |
| POST | `/api/applications` | Create new application | No |
| GET | `/api/session/:id` | Get session, questions and answers if there is | No |
| POST | `/api/session/:applicationId` | Create new session | No |
| POST | `/api/answers/:questionId` | Create answer for question | No |

---

## Scripts

### Frontend

| Script | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Backend

| Script | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm start` | Start production server |
| `npx drizzle-kit migrate` | Run database migrations |
| `npx drizzle-kit studio` | View database tables |

---

## Troubleshooting

**Port already in use**
```bash
# Find and kill the process using the port
lsof -i :8000
kill -9 <PID>
```

**Database connection refused**
- Make sure your database service is running.
- Double-check `DATABASE_URL` in your `.env` file.

**CORS errors in browser**
- Ensure `CORS_WHITELIST` in the backend `.env` matches your frontend URLs exactly (no trailing slash).

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to your branch: `git push origin feat/your-feature`
5. Open a Pull Request

Please follow the existing code style and include tests where relevant.

---

## License

[MIT](LICENSE)