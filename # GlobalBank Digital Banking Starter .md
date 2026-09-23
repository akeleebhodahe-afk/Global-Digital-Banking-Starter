# GlobalBank MVP — Digital Banking Starter

A complete, production-oriented MVP for a global digital banking platform supporting:

- User registration & authentication (JWT)
- Account requests + KYC intake
- Multi-currency ready accounts
- Virtual cards (simulated + ready for Stripe Issuing)
- Personal loans
- Admin approval workflow
- Double-entry ledger foundation

## Architecture

```
frontend/          → Next.js 14 (App Router) + Tailwind
backend/           → Fastify + Prisma + PostgreSQL
docker-compose.yml → Postgres + Redis
```

## Quick Start

### 1. Start infrastructure

```bash
docker compose up -d
```

### 2. Backend

```bash
cd backend
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run dev
```

API runs on http://localhost:4000

### 3. Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

App runs on http://localhost:3000

## Default Flow for Testing

1. Register a new user at `/register`
2. You are redirected to Request Account
3. Submit the account request
4. (Manual) Create an ADMIN user in the database or via Prisma Studio and approve the request
5. After approval an Account is created
6. Create a virtual card and apply for a loan

## Creating an Admin User

After registering a normal user, open Prisma Studio:

```bash
cd backend && npx prisma studio
```

Change the user’s `role` to `ADMIN`.

## Environment Variables

See `.env.example` files in both `frontend/` and `backend/`.

## Project Structure

```
banking-mvp/
├── backend/
│   ├── prisma/schema.prisma
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── accounts/
│   │   │   ├── cards/
│   │   │   ├── loans/
│   │   │   ├── kyc/
│   │   │   └── admin/
│   │   ├── prisma/client.ts
│   │   └── server.ts
│   └── package.json
├── frontend/
│   ├── app/
│   │   ├── (auth)/login & register
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   ├── accounts/
│   │   │   ├── cards/
│   │   │   ├── loans/
│   │   │   └── request-account/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Next Steps (Post-MVP)

- Real document upload (S3 + virus scan)
- Stripe Issuing / Marqeta for real cards
- Proper refresh token rotation + httpOnly cookies
- Multi-currency FX
- Transaction webhooks
- Compliance export & audit logs
- Mobile app (React Native / Expo)

---

Built as a clean, global-ready foundation.
