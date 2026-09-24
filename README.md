# GlobalBank Digital Banking Starter

A frontend-first GlobalBank MVP with a dark technical site shell and a small read-only backend foundation.

## Frontend

The frontend remains static and frontend-only:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Backend foundation

The first backend stage provides health checks and public content APIs only:

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

See `backend/README.md` and the design documents in `docs/`.

## Scope boundaries

There is currently no authentication, database, real account data, KYC processing, payment integration, live money movement, or live community functionality. The backend content catalog is in-memory and intended to validate API shape before persistence is introduced.

## Existing routes

- `/` — homepage
- `/knowledge` — knowledge hub
- `/community` — community placeholder
- `/membership` — membership preview
- `/resources` — resources page
- `/about` — about page
- `/guidelines` — community guidelines
- `/contact` — contact form placeholder
- `/login` — frontend-only login placeholder
- `/register` — frontend-only registration placeholder
- `/dashboard` — frontend-only dashboard preview
