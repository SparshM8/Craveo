# Craveo integration guide

The frontend now uses the existing Express API when it is reachable and falls back to a clearly labelled preview mode when the user is not authenticated or the API is unavailable. Axios already sends cookies with `withCredentials: true`, so a successful user login makes the next feed request authenticated without storing a JWT in the browser.

## Runtime configuration

Create `frontend/.env` from `frontend/.env.example` and point `VITE_API_URL` at the deployed or local API. Create `backend/.env` from `backend/.env.example` and set `MONGODB_URI`, `JWT_SECRET`, the ImageKit credentials, and `CLIENT_ORIGIN` to the exact frontend origin. The backend must allow credentials in CORS, which it already does.

## User flow

1. A user registers or signs in through `/api/auth/user/register` or `/api/auth/user/login`.
2. The API sets the `token` cookie. The frontend keeps using Axios with `withCredentials: true`.
3. The home screen calls `GET /api/food`. The response includes each food item plus `isLiked`, `isSaved`, and the populated food-partner summary.
4. Like and bookmark actions call `POST /api/food/like` and `POST /api/food/save`. The UI updates optimistically and rolls back if the request fails.
5. The Saved route calls `GET /api/food/save`. An empty result now returns HTTP 200 with `savedFoods: []`, so the UI does not need to treat an empty collection as an error.

## Bite details and reviews

The new modal requests `GET /api/food/:foodId` when a live API item is opened. The response includes the food item, populated partner data, reviews, review count, average rating, and the current user’s review. The modal submits new or updated reviews with `POST /api/food/:foodId/reviews` using `{ rating, comment }`. One review per user per bite is enforced by a unique compound MongoDB index, and the API validates ratings from 1–5 plus a 3–500 character comment.

For a lightweight review-only request, the backend also exposes `GET /api/food/:foodId/reviews`.

## Food-partner upload flow

The existing partner flow remains intact. A partner registers or signs in through the existing `/api/auth/food-partner/*` endpoints, then the upload screen submits `multipart/form-data` to `POST /api/food` with `name`, `description`, and the video field `mama`. The backend validates that a file is present, uploads it through the existing storage service, stores the resulting URL, and redirects the partner back to the feed.

## Local run sequence

```bash
# terminal 1
cd backend
npm install
npm run dev

# terminal 2
cd frontend
npm install
npm run dev
```

Set `frontend/.env` to `VITE_API_URL=http://localhost:3000` for local API calls. To test authenticated data, create a user account from the frontend, then reload the home page. To test uploads, use a separate food-partner account because the backend intentionally distinguishes user and partner cookies by the account record behind the shared token.

## Validation performed

The backend passes its syntax test command. The frontend passes ESLint and a production Vite build. The browser preview was verified in both API-unavailable fallback mode and the Saved-route empty state.

## Automated verification

Run `npm test` inside `backend` to execute the multipart upload tests. These tests send a genuine `multipart/form-data` request with the `mama` video field through Express and Multer, assert that the storage service receives a `Buffer`, and mock only the final storage call so no live asset is created.

Run `npm run e2e` inside `frontend` to execute the Playwright suite. It covers the preview fallback detail modal and review form, saved-bite navigation, partner video selection, and a mocked-live API branch that verifies the detail and review response contracts. The partner form now validates the 100MB limit and reports expired sessions or storage/API failures without losing the page state.

## Completed MVP surfaces

The consumer MVP now includes `/` for discovery, `/reels` for immersive food-video browsing, `/restaurant/:id` for menu and restaurant conversion, `/cart` for persisted bag and checkout, `/orders` for order milestones, and `/saved` for saved bites. The reel-to-order journey is fully testable in preview mode: a reel adds an item to the local bag, checkout calculates subtotal, delivery, and taxes, and Place order creates a local order record for the Orders view.

The preview checkout intentionally does not charge a card or call a delivery provider. The next production adapter should replace `createLocalOrder()` with an authenticated `POST /api/orders` call, a payment-provider authorization, and webhook-driven order status updates. The UI already has the service boundary needed for that replacement.
