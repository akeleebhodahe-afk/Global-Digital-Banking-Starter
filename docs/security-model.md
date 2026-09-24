# Security model

The current backend has no authentication and no user-specific data. It is safe only for public, read-only prototype content.

Before adding private data:

- Define authentication, session expiry, revocation, and recovery flows.
- Validate and normalize every request with route schemas.
- Add rate limits and abuse monitoring.
- Configure an explicit CORS origin allowlist.
- Use HTTPS and secure secret storage.
- Add request IDs and structured audit logging.
- Encrypt sensitive beneficiary fields with KMS/HSM-managed keys.
- Do not log passwords, tokens, account numbers, or payment credentials.
- Add authorization checks at the service boundary, not only in the UI.
- Complete threat modeling, compliance review, and penetration testing.

Real payments, money movement, KYC decisions, and transfer settlement remain out of scope.
