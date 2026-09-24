# Session model

Design-only proposal. Real authentication and sessions are not implemented.

## Session requirements

Future sessions must have:

- opaque, high-entropy identifiers;
- server-side revocation support;
- bounded idle and absolute lifetimes;
- secure, HTTP-only, same-site cookies for browser sessions;
- device/session listing and explicit sign-out;
- step-up authentication for sensitive actions;
- request and audit correlation without logging secrets.

## Lifecycle

```text
ISSUED -> ACTIVE -> REVOKED
ACTIVE -> EXPIRED
```

Password reset and email verification must invalidate sessions according to the approved threat model. Tokens must be single-use where applicable and stored only in hashed or otherwise non-recoverable form.

## Failure behavior

Use generic authentication failures to avoid account enumeration. Apply rate limits, monitoring, and progressive response to repeated failures. Do not add login endpoints until the identity provider, recovery flow, cookie policy, and abuse controls are approved.
