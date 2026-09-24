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

## Prototype route contracts

These objects are in-memory display fixtures only:

```text
Profile
- id
- displayName
- email (invalid demo domain only)
- locale
- preferredCurrency
- status: PROTOTYPE_ONLY

Account
- id
- name
- currency
- maskedNumber
- balanceDisplay (presentation string, not a ledger balance)
- status: PREVIEW

TransferPreview
- id
- sourceAccountId
- beneficiaryLabel (display label only)
- sourceAmountDisplay
- destinationAmountDisplay
- feeDisplay
- status: PREVIEW_ONLY
- createdAt
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
- Prototype display balances must never be used to authorize a financial action.
