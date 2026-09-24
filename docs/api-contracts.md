# API contracts

Base URL: `/api`

All responses are JSON. Read-only content endpoints currently return deterministic in-memory data.

## Health

### `GET /api/health`

```json
{
  "status": "ok",
  "service": "globalbank-api",
  "version": "0.1.0"
}
```

This is a liveness check only. It does not claim that a database, queue, or payment provider is available.

## Content

### `GET /api/knowledge`

Returns published knowledge cards.

### `GET /api/knowledge/:slug`

Returns one published article, or `404` when the slug does not exist.

### `GET /api/resources`

Returns published resources.

### `GET /api/membership/plans`

Returns membership-plan previews. These are informational only; no subscriptions can be purchased.

## Error envelope

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

## Future contract rules

- Add authentication only after its session model is approved.
- Require ownership checks on all user-specific resources.
- Use idempotency keys for future transfer creation.
- Never expose encrypted or raw beneficiary identifiers in read responses.
- Keep transfer creation separate from provider settlement and ledger posting.
