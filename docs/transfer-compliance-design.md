# Transfer and compliance design

Design-only proposal. The current transfer DTO is a read-only preview and cannot create, quote, approve, settle, or post funds.

## Transfer state machine

```text
DRAFT -> PENDING_REVIEW -> COMPLIANCE_REVIEW -> APPROVED -> PROCESSING -> COMPLETED
DRAFT -> CANCELLED
PENDING_REVIEW -> FAILED
COMPLIANCE_REVIEW -> BLOCKED
PROCESSING -> FAILED
```

Terminal states are `COMPLETED`, `FAILED`, `CANCELLED`, and `BLOCKED`. State changes must be explicit, authorized, idempotent, and audited.

## Compliance boundaries

Future transfer processing must keep these responsibilities separate:

- identity and KYC verification;
- sanctions and watchlist screening;
- transaction monitoring and manual review;
- quote and fee calculation;
- provider submission and webhook handling;
- internal ledger posting;
- settlement and reconciliation.

A provider callback is evidence about provider state, not permission to bypass internal authorization or ledger controls.

## Sensitive data

Store only the beneficiary data required for an approved purpose. Encrypt sensitive fields with managed keys, mask them on reads, and avoid placing raw identifiers in logs, URLs, analytics, or client fixtures.

Before any implementation, approve jurisdictional requirements, retention, review queues, escalation paths, provider contracts, and incident handling. No transfer command or payment integration is part of the current milestone.
