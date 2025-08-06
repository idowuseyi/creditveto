# System Design: CreditVeto

## 1. Architecture Overview

**Frontend:**

- Next.js (React 19, App Router, MUI for UI)
- Communicates with backend via REST (Axios) and WebSocket (Socket.IO)
- Modern, accessible, and responsive UI

**Backend:**

- NestJS (TypeScript, modular structure)
- PostgreSQL (persistent data)
- Redis (cache, session, queue)
- JWT authentication (access/refresh tokens)
- Role-based access control (user/admin)
- WebSocket (real-time dispute status updates)

**AI Integration:**

- Mocked or real API for dispute letter generation
- Endpoints: `/ai/generate-letter`, `/ai/generate-letter-pdf`

**Containerization:**

- Docker, docker-compose for orchestration
- Services: frontend, backend, postgres, redis

## 2. Data Flow

1. **Authentication:**
   - User registers/logs in (JWT issued, refresh tokens managed)
   - Role assigned (user/admin, selectable at registration)
2. **Credit Profile:**
   - User requests `/credit-profile` (mocked data returned)
3. **Dispute Management:**
   - User creates disputes by selecting an item and submitting via `/disputes/create`
   - Dispute statuses: pending, submitted, under_review, resolved, rejected
   - Dispute status/history tracked (full audit trail)
   - Admin can approve, reject, or update dispute status via `/disputes/:id/stat`
4. **AI Letter Generation:**
   - User submits details to `/ai/generate-letter` (returns letter text)
   - `/ai/generate-letter-pdf` returns PDF
5. **Real-Time Updates:**
   - WebSocket notifies users of dispute status changes

## 3. Mock & Seed Strategy

- Credit profile and AI letter generation are mocked for demo
- Backend seeds users, credit profiles, and disputes on startup (`src/seed.ts`)

## 4. Security

- JWT for authentication (access/refresh tokens)
- Role-based guards for admin/user endpoints
- Passwords hashed (bcryptjs)
- CORS enabled for frontend-backend communication

## 5. Extensibility

- Credit provider adapter pattern for future integrations (`credit-profile/credit-provider.adapter.ts`)
- Modular NestJS and Next.js structure for easy feature addition
- AI integration can be swapped from mock to real API

## 6. Deployment & DevOps

- Dockerized for local/dev/prod environments
- `docker-compose.yml` orchestrates all services
- Environment variables managed via `.env`
- Swagger API docs at `/api/docs` (backend)

## 7. Folder Structure (Monorepo)

- `/frontend` – Next.js app (UI, MUI, pages, components)
- `/backend` – NestJS app (API, modules, entities, services)
- `/docker-compose.yml` – Orchestration

## 8. API Endpoints (Key)

- `POST /auth/register` – Register user (with role selection: user/admin)
- `POST /auth/login` – Login user
- `POST /auth/regenerate-token` – Regenerate access token (manual refresh)
- `GET /credit-profile` – Get user credit profile (mocked)
- `GET /disputes/history` – Get user dispute history (with status changes)
- `POST /disputes/create` – Create dispute (user)
- `POST /disputes/:id/stat` – Update dispute status (admin)
- `POST /ai/generate-letter` – Generate AI letter
- `POST /ai/generate-letter-pdf` – Generate AI letter as PDF

## 9. Testing & Local Development

- Run all services with `docker-compose up --build`
- Frontend: `cd frontend && npm run dev`
- Backend: `cd backend && npm run start:dev`
- Seed data: `cd backend && npm run seed`

## 10. Future Improvements

- Real credit bureau API integration
- User notifications (email/SMS)
- Audit logging
- Multi-tenant support

---

For more, see the main [README.md](./README.md)
