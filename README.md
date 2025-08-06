# CreditVeto: Credit Dispute Management Platform

CreditVeto is a fullstack, modern platform for managing credit disputes, built with NestJS (backend), Next.js (frontend), PostgreSQL, and Redis. It features JWT authentication, role-based access, AI-powered dispute letter generation, and real-time updates.

---

## Features

- Secure JWT-based login/registration (user/admin roles)
- Credit profile display (mocked data, extensible to real providers)
- Dispute lifecycle management (CRUD, status, history)
- AI-powered (or mocked) dispute letter generation (text & PDF)
- Real-time dispute status updates (WebSocket)
- Role-based route protection (admin/user)
- Modern, accessible UI (Next.js + MUI)
- Dockerized setup (frontend, backend, PostgreSQL, Redis)

---

## Architecture

- **Frontend:** Next.js (React 19, App Router, MUI, REST/WebSocket)
- **Backend:** NestJS (TypeScript, modular, REST, WebSocket)
- **Database:** PostgreSQL (persistent data)
- **Cache/Queue:** Redis (cache, session, queue)
- **AI Integration:** Mocked or real API for dispute letter generation
- **Containerization:** Docker, docker-compose for orchestration

See [SYSTEM_DESIGN.md](./SYSTEM_DESIGN.md) for a detailed system design.

---

## Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/idowuseyi/creditveto.git
cd creditveto
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update as needed (see docker-compose.yml for defaults).

### 3. Start with Docker (Recommended)

```bash
docker-compose up --build
```

- frontend acess: `http://localhost:3000/`
- backend swagger access: `http://localhost:4000/api/docs#/`

### 4. Local Development

- Backend: `cd backend && npm install && npm run start:dev`
- Frontend: `cd frontend && npm install && npm run dev`
- PostgreSQL/Redis: Use Docker or install locally

### 5. Sample Users (Seeded)

- Admin: `admin@creditveto.com` / `adminpass`
- User: `user@creditveto.com` / `userpass`

---

## Usage

1. Register or login as a user or admin (registration form now allows role selection)
2. View your credit profile (mocked data)
3. Create, view, and manage disputes (with full status history)
4. Generate AI-powered dispute letters (text or PDF)
5. Admins can update dispute statuses for all users (approve, reject, etc.)
6. Receive real-time updates on dispute status changes

---

## Folder Structure

- `/frontend` – Next.js app (UI, MUI, pages, components)
- `/backend` – NestJS app (API, modules, entities, services)
- `/docker-compose.yml` – Orchestration

---

## API Endpoints (Key)

- `POST /auth/register` – Register user (with role selection: user/admin)
- `POST /auth/login` – Login user
- `POST /auth/regenerate-token` – Regenerate access token (manual refresh)
- `GET /credit-profile` – Get user credit profile (mocked)
- `GET /disputes/history` – Get user dispute history (with status changes)
- `POST /disputes/create` – Create dispute (user)
- `POST /disputes/:id/stat` – Update dispute status (admin)
- `POST /ai/generate-letter` – Generate AI letter
- `POST /ai/generate-letter-pdf` – Generate AI letter as PDF

---

## Development & Testing

- Run all services with `docker-compose up --build`
- Frontend: `cd frontend && npm run dev`
- Backend: `cd backend && npm run start:dev`
- Seed data: `cd backend && npm run seed`

---

## Documentation

- **System Design:** [SYSTEM_DESIGN.md](./SYSTEM_DESIGN.md)
- **API Docs:** Swagger at `/api/docs` (when backend is running)

---

## License

MIT
