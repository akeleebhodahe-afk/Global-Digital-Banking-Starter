# Backend architecture

## Scope

This phase adds a small, read-only backend foundation for the frontend prototype. It deliberately excludes authentication, payments, money movement, live community features, KYC decisions, and production account balances.

## Runtime shape

```text
HTTP client
  -> backend/src/server.js
      -> health route
      -> read-only content routes
      -> in-memory content catalog
```

The in-memory catalog is intentional for this first milestone. Replace it with PostgreSQL/Prisma only after the API contracts and data model are approved.

## Proposed later stack

- Fastify + TypeScript for the API
- PostgreSQL + Prisma for durable data
- Redis for rate limits, queues, and cached reads
- Structured logging and schema validation at every boundary

## Initial modules

| Module | Current phase | Later phase |
|---|---|---|
| Health | Implemented | Add dependency/readiness checks |
| Knowledge | Read-only in-memory API | PostgreSQL-backed publishing workflow |
| Resources | Read-only in-memory API | PostgreSQL-backed catalog |
| Membership plans | Read-only in-memory API | Product and entitlement management |
| Users/auth | Not implemented | Secure sessions, verification, recovery |
| Accounts/transfers | Not implemented | Ledger-first design after review |
| Community | Not implemented | Moderated, authenticated functionality |

## Operational requirements before production

- Environment-specific configuration and secret management
- Request IDs, structured logs, metrics, and error tracking
- CORS allowlist and rate limiting
- JSON schema validation and consistent error envelopes
- Automated tests and CI
- PostgreSQL migrations and backup strategy
- Threat model and security review

No endpoint in this phase changes financial state or represents a completed financial action.
