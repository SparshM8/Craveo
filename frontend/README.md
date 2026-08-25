# Craveo Frontend

React 19 and Vite frontend for the [Craveo](https://github.com/SparshM8/Craveo) visual food-discovery prototype.

## Development

```bash
npm install
cp .env.example .env
npm run dev
```

Use `npm run lint` for static checks, `npm run build` for a production build, and `npm run e2e` for Playwright browser tests. The frontend expects the backend URL configured through the environment variables documented in [`.env.example`](.env.example).

## Main routes

- `/` — home feed and curated food discovery
- `/reels` — visual food content
- `/lucknow` — city and neighborhood discovery
- `/restaurant/:id` — restaurant and menu view
- `/cart`, `/orders`, `/saved` — user actions and saved content

See the [root README](../README.md) for the product overview, architecture, backend setup, and current prototype status.
