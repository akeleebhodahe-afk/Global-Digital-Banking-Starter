# Data model proposal

This is a design proposal, not an active database schema.

## Content

```text
KnowledgeArticle
- id
- slug (unique)
- title
- excerpt
- body
- status: DRAFT | PUBLISHED | ARCHIVED
- publishedAt
- createdAt
- updatedAt

Resource
- id
- slug (unique)
- title
- type
- description
- href
- status
- createdAt
- updatedAt

MembershipPlan
- id
- code (unique)
- name
- description
- priceDisplay
- features
- status
```

## Identity and future banking entities

```text
User -> Profile, Sessions, Accounts, Beneficiaries, AuditEvents
Account -> Currency, LedgerAccount
Beneficiary -> Transfers
Transfer -> User, source Account, Beneficiary, TransferQuote, AuditEvents
```

## Financial integrity rules

- Balances are derived from immutable double-entry ledger entries.
- A transfer record is not a settlement record.
- Provider callbacks must be idempotent and audited.
- Sensitive beneficiary data is encrypted through managed keys and masked on reads.
- Status transitions are explicit and auditable.
