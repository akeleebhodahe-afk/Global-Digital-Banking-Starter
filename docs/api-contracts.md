# API contracts

Base URL: `/api`

All responses are JSON. Public content endpoints return deterministic in-memory data. No route in the current phase requires authentication or changes financial state.

## Prototype profile

### `GET /api/demo/profile`

Returns a clearly labeled, non-authenticated demo profile. This endpoint must not be promoted to a real user endpoint until the authentication and privacy model are approved.

```json
{
  "data": {
    "id": "demo-profile",
    "displayName": "Demo member",
    "email": "demo@example.invalid",
    "locale": "en-US",
    "preferredCurrency": "USD",
    "status": "PROTOTYPE_ONLY"
  },
  "meta": { "prototypeOnly": true }
}
```

## Minimal account model contract

### `GET /api/demo/accounts`

Read-only sample accounts for rendering the dashboard. Balances are display strings and do not represent stored or spendable funds.

```json
{
  "data": [
    {
      "id": "demo-account-usd",
      "name": "USD checking",
      "currency": "USD",
      "maskedNumber": "•••• 2048",
      "balanceDisplay": "$24,850.72",
      "status": "PREVIEW"
    }
  ],
  "meta": { "count": 1 }
}
```

## Demo-safe transfer DTO

### `GET /api/demo/transfers`

This is a read-only activity preview. It is not a transfer command, quote, settlement, or ledger entry. No account is debited and no provider is called.

```json
{
  "id": "demo-transfer-001",
  "sourceAccountId": "demo-account-usd",
  "beneficiaryLabel": "Maya Chen · Singapore",
  "sourceAmountDisplay": "$850.00",
  "destinationAmountDisplay": "S$1,142.00",
  "feeDisplay": "$4.50",
  "status": "PREVIEW_ONLY",
  "createdAt": "2026-09-23T10:30:00Z"
}
```

## Request IDs and errors

Clients may send `x-request-id`; every response returns it in the header. Errors include it in the body. Collections use `{ data: [], meta: { count } }`. Validation errors use `VALIDATION_ERROR`, missing records/routes use `NOT_FOUND`, and unexpected failures use `INTERNAL_ERROR`.

## Approval gate

Before replacing `/api/demo/*` with authenticated `/api/profile`, `/api/accounts`, or `/api/transfers`, approve the security model, persistence model, ownership rules, audit requirements, and double-entry ledger design.
