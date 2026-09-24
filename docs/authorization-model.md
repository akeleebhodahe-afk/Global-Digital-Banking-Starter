# Authorization model

This document defines the design boundary for future authenticated features. It does not implement authentication or authorization.

## Principles

- Every private resource must be owned by, or explicitly shared with, a user.
- Authorization is enforced in the backend service layer, never only in the UI.
- Deny by default when identity, session, ownership, or resource status is unclear.
- Prototype `/api/demo/*` routes remain public, read-only fixtures and must not be treated as private resources.

## Roles

- `MEMBER`: access to the member's own profile and permitted resources.
- `SUPPORT`: limited, audited support access; never direct financial mutation access.
- `COMPLIANCE`: audited access to compliance workflows and review evidence.
- `ADMIN`: operational configuration only, with separate break-glass controls.

Roles are additive but do not replace resource ownership checks.

## Authorization decisions

A future request must establish:

1. Authenticated principal and active session.
2. Required role or capability.
3. Resource ownership or explicit access grant.
4. Resource state permits the requested operation.
5. Audit event is appropriate for sensitive access.

Return a generic `403 FORBIDDEN` response without disclosing whether an inaccessible resource exists.

## Approval gate

Before implementation, approve the session model, permission vocabulary, support tooling, audit retention, privacy requirements, and incident response process.
