# GlobalBank Digital Banking Starter

A frontend-only GlobalBank MVP site shell preserving the existing dark technical design direction.

## Run locally

Because this first phase is intentionally backend-free, it can be previewed with any static server:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Included routes

- `/` — homepage
- `/knowledge` — knowledge hub placeholder
- `/community` — community placeholder
- `/membership` — membership preview
- `/resources` — resources page
- `/about` — about page
- `/guidelines` — community guidelines
- `/contact` — contact form placeholder
- `/login` — frontend-only login placeholder
- `/register` — frontend-only registration placeholder
- `/dashboard` — frontend-only dashboard preview

Navigation uses the browser history API and works with direct static hosting when the host falls back to `index.html` for unknown routes. The original standalone `world-clock.html` is preserved; the clock is also included in the dashboard preview.

## Not included yet

There is no backend, database, live authentication, payments, real account data, or live community functionality. Forms intentionally show prototype messages until those later phases are approved.
