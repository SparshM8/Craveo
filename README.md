# Craveo

> **Visual food discovery for local restaurants.** Discover a dish through authentic food moments, understand where it is available, and move from inspiration to order.

[![Frontend](https://img.shields.io/badge/frontend-React%2019%20%2B%20Vite-61DAFB?logo=react&logoColor=111827)](frontend/)
[![Backend](https://img.shields.io/badge/backend-Express%20%2B%20MongoDB-47A248?logo=mongodb&logoColor=white)](backend/)
[![Testing](https://img.shields.io/badge/testing-Playwright%20%2B%20Node%20Test%20Runner-2EAD33)](frontend/)
[![Status](https://img.shields.io/badge/status-pilot%20prototype-F59E0B)](#project-status)

**Live demo:** [craveo-wine.vercel.app](https://craveo-wine.vercel.app/)

Craveo is a **Lucknow-first food discovery and ordering prototype** that combines short-form food content with restaurant, dish, menu, review, cart, and order experiences. The product is designed around a simple loop:

> **Watch a local food moment → understand the dish → trust it → add it to the bag → order it → review it.**

## Why Craveo

Traditional food delivery starts with a static listing. Craveo starts with appetite and context: a dish being plated, a restaurant atmosphere, a customer recommendation, or a local food discovery moment. The goal is to make local food culture more visual, searchable, trustworthy, and actionable while giving restaurants a stronger content-to-demand channel.

## Current experience

The repository contains a React/Vite frontend and an Express/MongoDB backend with the following product surfaces:

| Surface | Purpose |
|---|---|
| Home | Curated food feed, search, category filters, likes, saves, and detail views |
| Reels | Visual discovery connected to restaurants and menu context |
| Lucknow | Neighborhood and cuisine discovery with restaurant cards and source-aware ratings |
| Restaurant | Menu browsing, restaurant reels, reviews, and order actions |
| Cart & Orders | Local preview journey for adding items and reviewing orders |
| Partner publishing | Authenticated food-partner upload flow with validation and storage integration |

## Technical architecture

```text
frontend/  React 19 + Vite + React Router
    │
    ├── Axios API client with cookie credentials
    │
backend/   Express 5 + MongoDB/Mongoose
    ├── Authentication and session cookies
    ├── Food feed, likes, saves, and reviews
    ├── Restaurant and menu catalog
    └── Partner media upload flow
```

The backend exposes the main API groups below:

```text
GET  /health
/api/auth
/api/food
/api/food-partner
/api/catalog
```

For the broader product strategy, integration boundaries, launch plan, and production architecture, see [`CRAVEO_PRODUCT_DOSSIER.md`](CRAVEO_PRODUCT_DOSSIER.md), [`INTEGRATION.md`](INTEGRATION.md), and [`craveo-architecture.md`](craveo-architecture.md).

## Local development

### Prerequisites

- Node.js 18 or newer
- npm
- MongoDB for the backend
- ImageKit credentials for media upload flows, when required

### 1. Start the backend

```bash
cd backend
npm install
cp .env.example .env
# Add the required local values to .env
npm run dev
```

The API runs on the port configured by the backend environment. Confirm it is healthy at `/health`.

### 2. Start the frontend

In another terminal:

```bash
cd frontend
npm install
cp .env.example .env
# Set VITE_API_URL to the backend URL
npm run dev
```

Open the Vite URL shown in the terminal. The frontend supports the core routes `/`, `/reels`, `/lucknow`, `/restaurant/:id`, `/cart`, `/orders`, and `/saved`.

## Testing and quality checks

```bash
# Frontend lint and production build
cd frontend
npm run lint
npm run build

# Browser tests
npm run e2e

# Backend syntax and test suite
cd ../backend
npm test
```

## Project status

Craveo is currently a **feature-complete prototype and pilot foundation**, not a production delivery marketplace. The deployed demo runs in self-contained preview mode when the optional backend is not configured. The repository uses starter catalog records and a local preview checkout until official provider access, live menus, payments, delivery operations, moderation workflows, and deployment secrets are configured.

The next high-value milestones are live Lucknow catalog data, restaurant claiming and moderation, rights-aware media ingestion, persisted commerce, payment and delivery adapters, and operational support tooling.

## Contributing

Contributions are welcome in product UX, accessible UI, API design, test coverage, catalog quality, and documentation. Before opening a pull request, run the relevant lint, build, and test commands and describe any environment-specific setup required to reproduce the change.

## License

The repository currently retains the license configuration present in its subprojects. Review the repository's licensing terms before redistributing or deploying the code.

---

Built by [Sparsh Mishra](https://github.com/SparshM8) for a more visual and trustworthy local food-discovery experience.
