# Backend foundation

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

The API listens on `http://127.0.0.1:4000` by default.

Try:

```bash
curl http://127.0.0.1:4000/api/health
curl http://127.0.0.1:4000/api/knowledge
curl http://127.0.0.1:4000/api/resources
curl http://127.0.0.1:4000/api/membership/plans
```

This first backend stage is intentionally read-only and uses in-memory content. It does not implement authentication, a database, accounts, beneficiaries, transfers, payments, or money movement.
