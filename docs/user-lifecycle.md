# User lifecycle and profile model

Design-only proposal. No user records or profile mutations are implemented.

## User states

```text
PENDING_VERIFICATION -> ACTIVE -> SUSPENDED -> ACTIVE
ACTIVE -> CLOSED
PENDING_VERIFICATION -> CLOSED
```

Transitions require an authenticated, audited service action. `CLOSED` is terminal for login, with retention and deletion handled by policy.

## Profile boundary

A profile contains only product-required identity preferences:

```text
Profile
- id
- userId
- displayName
- locale
- preferredCurrency
- createdAt
- updatedAt
```

Email, verification status, and recovery contacts belong to the identity service boundary. Banking identifiers do not belong in the public profile response.

## Privacy rules

- Return only fields required by the requesting experience.
- Never expose credentials, session tokens, recovery secrets, or raw identity evidence.
- Separate support access from member self-service access.
- Record sensitive reads and lifecycle transitions in an audit stream.

The current demo profile remains fixture data with an invalid demo email domain and `PROTOTYPE_ONLY` status.
