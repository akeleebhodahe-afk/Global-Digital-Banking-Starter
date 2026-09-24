# API contracts

Base URL: `/api`

All responses are JSON. Read-only content endpoints currently return deterministic in-memory data.

## Request IDs

Clients may send `x-request-id`. The API returns the same value when supplied, or generates one. Every response includes the `x-request-id` response header. Error bodies also include the request ID for support and log correlation.

## Health

### `GET /api/health`

```json
{
  "status": "ok",
  "service": "globalbank-api",
  "version": "0.1.0",
  "requestId": "request-id"
}
```

This is a liveness check only. It does not claim that a database, queue, or payment provider is available.

## Collections

`GET /api/knowledge`, `GET /api/resources`, and `GET /api/membership/plans` return:

```json
{
  "data": [],
  "meta": { "count": 0 }
}
```

## Validation

Knowledge slugs must be lowercase kebab-case, for example `moving-money-internationally`. Invalid route parameters return HTTP `400`:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request validation failed",
    "requestId": "request-id"
  }
}
```

## Errors

All not-found and unexpected errors use this shape:

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found",
    "requestId": "request-id"
  }
}
```

The current API remains read-only. No endpoint changes financial state or represents a completed financial action.
