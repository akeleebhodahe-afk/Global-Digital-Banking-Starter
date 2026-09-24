# Account and ledger design

Design-only proposal. Prototype account balances are presentation strings and are not ledger balances.

## Account model

```text
Account
- id
- ownerUserId
- currency (ISO 4217)
- kind: CASH | HOLDING
- status: PENDING | ACTIVE | BLOCKED | CLOSED
- createdAt
- closedAt
```

Account reads require ownership or an approved operational capability. Account status controls whether future operations may be proposed; it never authorizes settlement by itself.

## Ledger model

```text
LedgerTransaction
- id
- idempotencyKey
- referenceType
- referenceId
- status
- createdAt

LedgerEntry
- id
- transactionId
- ledgerAccountId
- direction: DEBIT | CREDIT
- amountMinorUnits (integer)
- currency
- createdAt
```

Every posted transaction must have balanced debit and credit entries in the same currency context. Entries are immutable; corrections use compensating transactions. Balances are derived from posted entries, not stored as mutable display fields.

## Non-negotiable controls

- Separate authorization, ledger posting, provider settlement, and reconciliation.
- Enforce idempotency at the service boundary.
- Reject floating-point monetary arithmetic.
- Audit status transitions and privileged reads.
- Reconcile provider records against internal ledger records.

No ledger tables, balance mutations, or financial commands should be implemented until this design and the security model are approved.
