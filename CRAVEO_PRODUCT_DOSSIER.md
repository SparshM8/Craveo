# Craveo Product & Engineering Dossier

**Document status:** Pre-push product and engineering handoff  
**Product:** Craveo  
**Launch city:** Lucknow, India  
**Prepared by:** Manus AI  
**Repository:** `SparshM8/Craveo`  
**Current release posture:** Feature-complete prototype / pilot foundation; not yet production commerce or delivery infrastructure

## 1. Executive summary

Craveo is a **visual food-discovery and ordering platform**. It combines the practical utility of a food-delivery marketplace with the emotional pull of short-form video. A customer should be able to see a real dish, understand where it is available, compare transparent trust signals, open the restaurant, and move directly into an order.

The central product loop is:

> **Watch a real local food moment → understand the exact dish → trust it → add it to the bag → order it → review it.**

The current repository contains a polished consumer prototype, authenticated food-partner upload flow, backend food and review APIs, automated upload and browser tests, a Lucknow discovery foundation, and architecture/integration documentation. It deliberately uses starter catalog records and local preview checkout until official provider access, live data, payment, and delivery operations are configured.

Craveo should not be positioned as “another food-delivery app with reels.” Short-form food discovery is already emerging in the market. Swiggy has reportedly tested a reels-style restaurant discovery experience called Bites, and video-first food commerce is emerging internationally through shoppable food-video products [1] [2]. Craveo’s opportunity is to own the **trusted local content-to-order loop**: dish-level tagging, source-aware ratings, restaurant and customer content, availability freshness, verified reviews, and measurable conversion for restaurants.

## 2. Product story

Food delivery traditionally begins with an abstract decision: search a restaurant, scan a menu, compare a rating, and hope the item looks and tastes as expected. Craveo begins with a more human decision: **“That looks good. Where can I get it?”**

A restaurant owner can show how a kebab is plated, how biryani is opened, how a café feels during breakfast, or how a dessert is prepared. A customer can show a genuine reaction or recommend a local favorite. The video is not decoration; it is the first step in the purchase decision.

Craveo is being built to change the customer’s perspective from **searching through listings** to **discovering food through living local moments**. Restaurants gain a new demand channel. Customers gain more confidence before spending money. The city becomes a visual, searchable food map rather than a static directory.

## 3. Vision, mission, and product principles

### Vision

Make every city’s food culture discoverable, visual, trusted, and immediately actionable.

### Mission

Help people find food they will genuinely enjoy while helping local restaurants earn demand through authentic, orderable content.

### Product principles

| Principle | Product implication |
|---|---|
| **Visual first, transaction ready** | Every eligible reel should connect to a restaurant and preferably a specific purchasable menu item. |
| **Trust has provenance** | Google Maps, Zomato, Swiggy, and Craveo ratings must remain visibly separate. |
| **Local before generic** | Ranking should prioritize nearby, relevant, fresh, and actually available food. |
| **Authentic over polished** | Restaurant, customer, and creator content can coexist, but sponsorship and verification must be visible. |
| **One-tap path to order** | A reel must never become a dead end; it should expose the restaurant, menu item, price, and order path. |
| **Partners own their presence** | Restaurants should be able to claim, update, publish, and understand the performance of their listings. |
| **Build the data flywheel** | Views, dish opens, carts, orders, reviews, and repeat behavior should improve ranking and partner ROI. |

## 4. Customer and partner problems

### Customer problem

Customers often know the mood or craving—spicy, crispy, late-night, comforting, photogenic—but not the exact restaurant or dish. Static listings provide information but weak appetite and confidence. Ratings are difficult to compare because each platform uses a different audience, volume, and review context.

### Restaurant problem

Local restaurants need demand and visibility, but a listing alone does not communicate preparation quality, freshness, portion, ambience, or personality. Restaurant owners also need a measurable way to understand whether content drives menu opens and orders.

### Creator and community problem

Food creators and customers produce useful local discovery content, but that content is often disconnected from current menus, prices, availability, location, and a practical way to transact.

## 5. Target users

| User | Job to be done | Craveo value |
|---|---|---|
| **Hungry local** | “Show me something I will want right now.” | Visual discovery, nearby relevance, transparent ratings, fast order path |
| **Explorer** | “Help me discover a place I would not have searched for.” | Neighborhood feed, creator content, hidden gems, save/follow behavior |
| **Restaurant owner** | “Help more people see and order my signature dishes.” | Claimable page, video publishing, menu control, attribution and analytics |
| **Food creator** | “Let my local recommendation lead to a meaningful action.” | Dish tagging, attribution, creator identity, potential incentives |
| **Operations/admin team** | “Keep the city catalog accurate and trustworthy.” | Duplicate resolution, moderation, freshness alerts, provider conflict review |

## 6. What is currently built

### Consumer experience

The current frontend includes Home, Reels, Restaurant, Cart, Orders, Saved, and Lucknow discovery routes. The Home feed includes curated bites, category filters, search, likes, saves, detail modals, reviews, restaurant navigation, and graceful API fallback. The Reels surface connects visual content to restaurant and menu context. Restaurant pages include menu-style browsing, restaurant reels, rating/review content, and order actions. Cart and Orders provide a complete local preview journey.

### Lucknow discovery foundation

The new `/lucknow` surface includes a city hero, map-style coverage panel, neighborhood filters, cuisine filters, search, restaurant cards, source-separated rating shelves, starter catalog transparency, partner claim CTA, and links to reels and restaurant menus. Initial neighborhood coverage includes Gomti Nagar, Hazratganj, Aminabad, Chowk, Indira Nagar, Aliganj, Charbagh, and Ashiyana. Categories include Awadhi, kebabs, biryani, chaat, cafés, desserts, late-night food, vegetarian, and broader North Indian/Asian discovery.

### Authentication and partner publishing

The existing authenticated user and food-partner flows remain intact. Partner video uploads use the `mama` multipart field, pass through Multer, delegate to the storage service, and persist the returned URL. The form now validates file size, prevents duplicate submissions, shows progress/error states, and handles expired sessions safely.

### Backend capabilities

The backend includes food feed, like/save, food detail, review listing and creation, authenticated review protection, a review model, hardened cookie authentication, restaurant and menu-item schemas, geospatial restaurant indexing, and public catalog endpoints:

```text
GET  /api/catalog/restaurants
GET  /api/catalog/restaurants/:id
GET  /api/food
GET  /api/food/:foodId
GET  /api/food/:foodId/reviews
POST /api/food/:foodId/reviews
POST /api/food/:foodId/like
POST /api/food/:foodId/save
POST /api/food
```

The project is currently a **modular Express/MongoDB prototype**, not yet a complete production marketplace. Live payment, delivery dispatch, provider ingestion, customer location permissions, production moderation operations, and deployment secrets still need to be configured.

## 7. The Lucknow launch strategy

Lucknow should be treated as a city-wide discovery market with a smaller controlled fulfillment zone. The catalog can cover the major food areas, while actual Craveo-fulfilled orders begin in a reliable operating zone until support, cancellations, refunds, delivery capacity, and restaurant preparation times are proven.

| Coverage layer | Initial plan |
|---|---|
| **Neighborhoods** | Gomti Nagar/Vibhuti Khand, Hazratganj, Aminabad, Chowk, Indira Nagar, Aliganj/Mahanagar, Charbagh, Ashiyana, Rajajipuram, Jankipuram, Faizabad Road, and Sushant Golf City |
| **Food categories** | Awadhi, kebabs, biryani, chaat, street food, cafés, breakfast, bakery, desserts, vegetarian, late-night, family dining, North Indian, Chinese/Asian, and healthy/quick meals |
| **Discovery intents** | Near me, open now, under a budget, spicy, family dinner, late night, hidden gem, famous Lucknow food, and available within a target ETA |
| **Content formats** | Chef plating, kitchen preparation, customer reaction, ambience, fresh-batch drop, offer, menu explainer, local guide, and behind-the-scenes |

The first release should not pretend that starter records are live listings. Provider-backed records should include source IDs, last synchronization time, menu freshness, open status, delivery eligibility, rating provenance, and attribution requirements.

## 8. External integrations and content rights

The integration strategy must be permission-aware. Craveo should not scrape or rehost consumer platform data as a default.

| Source | Intended use | Required boundary |
|---|---|---|
| **YouTube** | Eligible public video discovery and playback | Store video ID and metadata; use official embeds/player APIs; do not download or rehost videos without rights. The official IFrame Player API supports embedded playback and event controls [3]. |
| **Google Places** | Place discovery, coordinates, hours, rating, review count, and selected reviews | Request permitted fields and show required author attribution when displaying Google reviews [4]. |
| **Zomato** | Formal restaurant/POS integration for menus, order updates, outlets, and restaurant operations | Use approved partner onboarding. The official developer platform is designed around restaurant/POS integrations rather than unrestricted consumer aggregation [5]. |
| **Swiggy** | Approved partner menu/order integration or fallback link | Confirm products, credentials, and contract terms through the official developer/partner process. |
| **Toing** | Potential ordering partner or deep-link fallback | The public Toing site presents a consumer delivery product but exposes no visible public developer documentation. Treat API access as an onboarding dependency [6]. |
| **Restaurant-owned media** | Primary supply of Craveo-owned/licensed reels | Give partners upload, tagging, moderation, disclosure, and performance tools. |
| **Customer media** | Authentic local discovery and reviews | Require consent, moderation, reports, takedowns, source labels, and verified-order status where possible. |

The provider architecture should use adapters so the core product does not change when an integration becomes available or unavailable:

```ts
interface PlaceProvider {
  searchNearby(input: NearbySearch): Promise<ExternalPlace[]>;
  getPlace(externalId: string): Promise<ExternalPlaceDetails>;
  getReviews?(externalId: string): Promise<ExternalReview[]>;
}

interface OrderingProvider {
  getMenu(ref: RestaurantRef): Promise<ExternalMenu>;
  createOrder(input: ExternalOrder): Promise<ExternalOrderResult>;
  getOrderStatus(ref: ExternalOrderRef): Promise<ExternalOrderStatus>;
}
```

## 9. Rating and trust model

Craveo must not blend provider ratings into one unexplained number. A restaurant should show a shelf similar to:

```text
Craveo diners       4.8 ★   126 reviews
Google Maps         4.5 ★   2.1K reviews
Zomato              4.4 ★   860 reviews
Swiggy              4.6 ★   1.3K reviews
```

The product should also expose: verified order, restaurant posted, customer posted, paid creator, last availability check, last price check, and source attribution. Craveo’s own rating must be calculated only from Craveo reviews. Provider ratings should remain provider ratings.

## 10. Technical architecture

### Current foundation

The repository currently uses a Vite/React frontend and an Express/MongoDB backend. Axios handles API access, cookies support authentication, Multer handles multipart upload parsing, ImageKit is the existing storage service, and Playwright plus Node’s built-in test runner cover key interactions and upload behavior.

### Recommended production shape

Begin with a modular monolith and split services only when workload or team boundaries require it.

| Workload | Recommended system |
|---|---|
| Video ingest | Signed upload URL or authenticated upload endpoint, object storage, asynchronous processing, moderation, poster generation |
| Video playback | HLS/CMAF renditions, CDN, poster image, adaptive playback, analytics events |
| Catalog and commerce | PostgreSQL/PostGIS for canonical restaurants, menus, carts, orders, and location queries; MongoDB may remain for the prototype migration period |
| Cache and ephemeral state | Redis for feed cache, rate limits, short-lived availability, and courier presence |
| Events | Durable order events plus an outbox pattern; WebSocket/SSE for customer-facing live status |
| Analytics | Event pipeline/warehouse for reel attribution, ranking, partner ROI, and retention |
| Operations | Admin surface for moderation, duplicate restaurant merges, provider conflicts, stale menu alerts, and support |

### Canonical entities

The core data model should contain users, restaurants, restaurant sources, locations, hours, menus, menu items, media assets, reels, likes, saves, provider reviews, Craveo reviews, carts, cart items, orders, order items, payments, deliveries, order events, outbox events, reports, moderation actions, and attribution events.

Restaurant records should own canonical identity while provider IDs remain attached references. Media records should store rights status and moderation status. Every reel should connect to a restaurant and, where possible, a menu item. Orders should use idempotency keys, transactional inventory/availability checks, and immutable event history.

## 11. Product roadmap

### Phase 0: Access, compliance, and data readiness

Confirm Google Maps/Places and YouTube credentials, investigate formal Zomato/Swiggy/Toing access, document attribution requirements, verify the exact provider contracts, and define the first fulfillment zone.

### Phase 1: Live Lucknow catalog

Replace starter records with canonical restaurants, source IDs, menu freshness, neighborhood taxonomy, geospatial search, open-now state, source rating shelves, and an operations import/merge tool.

### Phase 2: Visual discovery supply

Add restaurant claim, partner upload, dish tagging, customer creator uploads, rights consent, content disclosure, moderation queue, reports, takedowns, and YouTube embed support where permitted.

### Phase 3: Commerce foundation

Replace local checkout with persisted carts, restaurant-specific menus, payment-provider adapter, order creation, cancellation/refund states, restaurant acceptance, customer notifications, and deep-link/provider handoff where appropriate.

### Phase 4: Fulfillment and operations

Add delivery partner adapter, dispatch, courier location, ETA, support tools, failed-order handling, refunds, and delivery-zone controls. Start with a small operating zone in Lucknow.

### Phase 5: Growth and defensibility

Add follows, personalized ranking, creator profiles, restaurant analytics, incentive programs, offers, repeat ordering, campaign attribution, and city expansion playbooks.

## 12. North-star metric and success criteria

The north-star metric should be:

> **Completed orders per 1,000 qualified reel views, with customer satisfaction retained.**

A qualified reel view is a view with enough playback or interaction to plausibly represent discovery. Supporting metrics should include:

| Funnel stage | Metric |
|---|---|
| Content | Video start, completion rate, replay, share, save, report rate |
| Discovery | Restaurant opens, menu-item opens, map/list engagement, search-to-result success |
| Commerce | Add-to-cart rate, checkout conversion, payment success, cancellation rate |
| Fulfillment | Restaurant acceptance, preparation time, delivery ETA accuracy, support contacts |
| Trust | Review rate, verified-order review ratio, complaint rate, content takedown rate |
| Retention | Repeat order within 30 days, saved-restaurant return, creator/restaurant publishing frequency |
| Partner value | Orders attributable to reels, incremental conversion, content ROI, menu freshness |

The most important experiment is whether visual discovery produces **incremental, satisfied, repeat orders** compared with static restaurant discovery.

## 13. Monetization options

Craveo should avoid premature monetization complexity. The first model can be commission or transaction revenue from orders fulfilled through Craveo or a partner. Later options include sponsored restaurant content with clear disclosure, promoted dishes, restaurant SaaS analytics, creator campaigns, and premium placement.

Sponsored content must never silently distort trust scores. Paid placement should be labeled, and ranking should protect user relevance and content quality.

## 14. Risks and mitigations

| Risk | Severity | Mitigation |
|---|---:|---|
| Incumbents copy the reels interface | High | Build local content supply, attribution data, partner ROI, trust workflows, and operational density. |
| Unauthorized scraping or media reuse | High | Use official APIs, embeds, licenses, partner uploads, consent, attribution, and takedown processes. |
| Stale prices or unavailable dishes | High | Store freshness timestamps, availability checks, partner menu controls, and clear last-checked labels. |
| Low-quality or unsafe content | High | Moderation queue, reports, automated checks, human review, source labels, and account enforcement. |
| Marketplace cold start | High | Launch one city, onboard signature restaurants, seed creator partnerships, and focus on strong food clusters. |
| Delivery failures damage trust | High | Start with controlled fulfillment, explicit service zones, support operations, and partner handoff fallback. |
| Provider API dependency | Medium | Adapter interfaces, canonical internal data, retry/backoff, cache, and provider freshness status. |
| Fake reviews or paid manipulation | High | Verified-order markers, review limits, anomaly detection, disclosure, and separate provider scores. |
| Payment and privacy exposure | High | Use a compliant payment provider, avoid storing card data, encrypt secrets, audit access, and define retention. |

## 15. Product and compliance requirements

Before public launch, Craveo should have terms for restaurant and customer content, privacy disclosures, consent and takedown procedures, creator sponsorship disclosure, provider attribution, moderation policy, age-appropriate handling, grievance/support escalation, payment/refund policy, and data retention/deletion controls.

The platform must not imply that Google, Zomato, Swiggy, Toing, YouTube, or any restaurant endorses Craveo unless an approved commercial relationship exists. Provider ratings should be labeled by source. Demo records must never appear as live business listings in a production environment.

## 16. Definition of done for the next production milestone

The Lucknow pilot foundation is ready for real integration when:

1. A restaurant can claim its listing and verify ownership.
2. An approved provider or partner source can create/update a canonical restaurant record.
3. Every restaurant has a source ID, location, hours, menu freshness, and rating provenance.
4. A partner can upload a video, tag a menu item, disclose sponsorship, and submit it for moderation.
5. A customer can watch a reel, view a real dish, open the restaurant, add to cart, and reach a production payment or approved handoff.
6. An order has an idempotency key, status history, cancellation path, support path, and attribution to the discovery reel.
7. A customer can submit a review only after the defined review policy is satisfied, with verified-order status where available.
8. Admins can remove content, merge duplicate restaurants, correct provider conflicts, and suspend unsafe accounts.
9. The team can measure reel-to-order conversion and partner ROI by restaurant, creator, dish, neighborhood, and source.
10. Automated checks run on every pull request, and production secrets are configured outside the repository.

## 17. Repository and handoff notes

The selected repository is `https://github.com/SparshM8/Craveo` on branch `main`. The push set includes the current frontend, backend, Lucknow route and catalog foundation, automated tests, CI workflow, architecture notes, integration guide, rollout plan, market assessment, and this dossier.

The application currently runs as two projects:

```bash
cd frontend
npm install
npm run dev

cd backend
npm install
npm run dev
```

Validation commands:

```bash
cd frontend
npm run lint
npm run build
CHROME_BIN=/usr/bin/chromium npm run e2e

cd backend
npm test
```

Required production configuration must be supplied through deployment environment variables. Do not commit `.env` files, provider keys, payment secrets, JWT secrets, or storage credentials.

## 18. Immediate next actions after this push

The next engineering sprint should not start by scraping data. It should start by obtaining approved API/partner access, creating the canonical restaurant ingestion job, adding a restaurant claim flow, and replacing the starter Lucknow catalog with verified partner-owned records.

The next product sprint should run a concierge pilot with a small number of Lucknow restaurants. Measure whether a reel creates more qualified menu opens and completed orders than a static restaurant card. Use that evidence to decide which integration and fulfillment investments deserve priority.

The next operating sprint should define restaurant onboarding, creator content guidelines, moderation responsibilities, customer support, cancellations, refunds, and the first controlled delivery zone.

## References

[1]: https://www.medianama.com/2025/12/223-swiggys-short-video-feed-restaurant-visibility/ "MediaNama: Swiggy Bites short-video restaurant discovery report"

[2]: https://foodondemand.com/12222025/cookunity-offers-a-new-video-first-food-ordering-experience/ "Food On Demand: CookUnity and flavrs shoppable food-video report"

[3]: https://developers.google.com/youtube/iframe_api_reference "YouTube IFrame Player API Reference"

[4]: https://developers.google.com/maps/documentation/javascript/place-reviews "Google Maps Platform Place Reviews"

[5]: https://www.zomato.com/developer/integration/ "Zomato POS Integration API"

[6]: https://www.toingit.com/ "Toing public website"
