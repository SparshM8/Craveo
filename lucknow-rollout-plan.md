# Craveo Lucknow rollout plan

## Executive recommendation

Lucknow should become Craveo’s first city-wide content-and-commerce market, but the launch must be **source-aware and permission-aware**. The goal is not to copy every video and listing from every platform. The goal is to build the best local visual food catalog by combining licensed or embedded content, official place data, restaurant-owned catalog data, Craveo customer content, and clear ordering paths.

> **Product promise:** Find the food moment you want in Lucknow, see the real dish and the real place, understand the trust signals, and order it without a dead end.

## 1. Lucknow coverage model

Instead of treating Lucknow as one flat city, create a coverage grid. Each restaurant belongs to a neighborhood, service zone, cuisine cluster, and delivery radius. This makes the feed useful even before Craveo has complete city-wide logistics.

| Coverage layer | Initial taxonomy |
|---|---|
| City zones | Gomti Nagar and Vibhuti Khand; Hazratganj; Indira Nagar; Aliganj and Mahanagar; Aminabad and Chowk; Charbagh and central Lucknow; Alambagh; Ashiyana; Rajajipuram; Jankipuram; Faizabad Road; Sushant Golf City |
| Food categories | Awadhi and kebabs; biryani; chaat and street food; cafés and breakfast; bakery and desserts; North Indian; Chinese and Asian; vegetarian; late-night; family dining; healthy and quick meals |
| Content types | Restaurant kitchen; chef plating; customer reaction; ambience; fresh-batch drop; offer; behind-the-scenes; menu explainer; local food guide |
| Discovery intents | “Near me”; “under ₹300”; “open now”; “delivery in 30 minutes”; “spicy”; “family dinner”; “late night”; “hidden gem”; “famous Lucknow food” |

The first technical catalog can cover all zones using public place discovery and restaurant onboarding, while the first operational order zone should remain smaller until fulfillment, support, cancellations, and refunds are reliable.

## 2. Integration policy: what we can and cannot collect

| Source | Use in Craveo | Safe implementation boundary |
|---|---|---|
| YouTube | Discover eligible public restaurant or creator videos and play them in Craveo’s reel experience | Store the video ID, channel, title, thumbnail, embed URL, and consent/license status. Use the official IFrame Player API for playback; do not download or rehost videos without rights. [1] |
| Google Maps / Places | Restaurant discovery, address, coordinates, overall rating, review count, selected reviews, hours, and attribution | Use Places API fields that Craveo is authorized to request. When displaying Google reviews, show required author attribution and distinguish Google’s rating from Craveo reviews. [2] |
| Zomato | Restaurant/POS partner integration, menu/order synchronization, or deep-link handoff where contractually available | The official developer platform is built around restaurant POS integration for order management, menu management, outlet management, and analytics. Treat access as formal partner onboarding, not unrestricted scraping. [3] |
| Swiggy | Menu/order/restaurant integration only if Swiggy grants the required partner access | The official developer portal exists, but access products and terms must be confirmed through its onboarding. Do not scrape the consumer app or copy its catalog as a default strategy. [4] |
| Restaurant-owned content | Primary source of high-quality, orderable videos and menus | Give restaurants a simple upload tool, dish tagging, moderation status, availability, disclosure, and attributed performance analytics. |
| Craveo customers | Authentic reviews, reactions, and local discovery content | Allow uploads only with consent, moderation, source labels, order verification where possible, and takedown/report controls. |

The phrase “collect all videos” should be converted into **“index permitted videos and host owned/licensed videos.”** YouTube embeds can give Craveo a discovery experience without taking custody of someone else’s media. Restaurant partners and customers should be the main source for videos Craveo is allowed to process, transcode, moderate, and serve through its own CDN.

## 3. Source-aware rating design

Never collapse ratings from different providers into one unexplained number. A restaurant page should show a rating shelf like this:

```text
Craveo diners       4.8 ★   126 reviews
Google Maps         4.5 ★   2.1K reviews
Zomato              4.4 ★   860 reviews
Swiggy              4.6 ★   1.3K reviews
```

The database stores the source, external place/listing ID, score, count, review URL, fetched time, and attribution requirements. Craveo’s own rating is calculated only from Craveo reviews. Provider ratings should be displayed as provider ratings and refreshed according to each provider’s caching and display rules.

A trust panel should also show **verified order**, **restaurant posted**, **customer posted**, **paid creator**, **last availability check**, and **price last checked**. This is more valuable than a single blended star number because it tells a customer what the score actually means.

## 4. Canonical data architecture

The core rule is that Craveo owns a canonical restaurant and dish record, while integrations attach external references to it.

```sql
restaurants (
  id uuid primary key,
  name text not null,
  slug text unique not null,
  address jsonb not null,
  location geography(point, 4326) not null,
  neighborhood text not null,
  cuisines text[] not null,
  status text not null,
  open_now boolean not null,
  delivery_radius_m integer,
  created_at timestamptz not null,
  updated_at timestamptz not null
)

restaurant_sources (
  id uuid primary key,
  restaurant_id uuid references restaurants(id),
  provider text not null,
  external_place_id text not null,
  listing_url text,
  rating numeric(2,1),
  rating_count integer,
  hours jsonb,
  raw_snapshot jsonb,
  last_synced_at timestamptz not null,
  unique(provider, external_place_id)
)

menu_items (
  id uuid primary key,
  restaurant_id uuid references restaurants(id),
  name text not null,
  description text,
  price_minor integer not null,
  currency char(3) not null default 'INR',
  available boolean not null default true,
  image_url text,
  source text not null,
  updated_at timestamptz not null
)

media_assets (
  id uuid primary key,
  owner_user_id uuid references users(id),
  provider text not null,
  external_media_id text,
  storage_key text,
  embed_url text,
  poster_url text,
  rights_status text not null,
  moderation_status text not null,
  duration_ms integer,
  created_at timestamptz not null
)

reels (
  id uuid primary key,
  media_asset_id uuid references media_assets(id),
  restaurant_id uuid references restaurants(id),
  menu_item_id uuid references menu_items(id),
  source_type text not null,
  disclosure_label text not null,
  availability_snapshot jsonb,
  published_at timestamptz
)

provider_reviews (
  id uuid primary key,
  restaurant_id uuid references restaurants(id),
  provider text not null,
  external_review_id text,
  rating smallint,
  body text,
  author_name text,
  author_uri text,
  language_code text,
  published_at timestamptz,
  attribution_required boolean not null,
  last_synced_at timestamptz not null
)
```

Add `orders`, `order_items`, `payments`, `deliveries`, `order_events`, `reviews`, `reel_events`, and `outbox_events` from the production architecture. Use PostGIS for nearby restaurants, Redis for feed and live delivery state, and object storage/CDN for Craveo-owned media.

## 5. Integration architecture

Implement each external platform as an adapter behind one internal contract:

```ts
interface PlaceProvider {
  searchNearby(input: NearbySearch): Promise<ExternalPlace[]>;
  getPlace(externalId: string): Promise<ExternalPlaceDetails>;
  getReviews?(externalId: string): Promise<ExternalReview[]>;
}

interface VideoProvider {
  search(input: VideoSearch): Promise<ExternalVideo[]>;
  getEmbed(videoId: string): ExternalEmbed;
}

interface OrderingProvider {
  getMenu(restaurantRef: RestaurantRef): Promise<ExternalMenu>;
  createOrder(input: ExternalOrder): Promise<ExternalOrderResult>;
  getOrderStatus(orderRef: ExternalOrderRef): Promise<ExternalOrderStatus>;
}
```

The first adapters should be `GooglePlacesAdapter`, `YouTubeAdapter`, `RestaurantDirectAdapter`, and a `DeepLinkOrderingAdapter`. Add Zomato and Swiggy only after formal partner access is approved. This means the rest of the application does not change when a provider becomes available or unavailable.

Use scheduled synchronization for place metadata and menus, with exponential backoff and a provider-specific freshness timestamp. Do not let a provider outage block feed browsing or checkout for restaurants that have their own current catalog.

## 6. Product surfaces to build

### Consumer app

The Home screen should combine an interactive Lucknow map/list discovery surface with a visual reel feed. The Reels screen should show a video, restaurant, dish, source label, current price, availability, delivery estimate, rating shelf, and **Order this bite** action. The restaurant page should show all menus, restaurant reels, source-aware ratings, verified Craveo reviews, hours, and ordering options.

### Restaurant partner console

A partner should be able to claim or create a restaurant, upload a reel, tag the dish, set availability, update menu prices, disclose sponsorship, see moderation status, and view content-to-order analytics. Partner publishing is the strongest path to content Craveo can legally own and keep current.

### Customer creator flow

A customer can upload a reaction or recommendation, select the restaurant and dish, and optionally attach an order for verification. The platform should show whether the content is a verified purchase, restaurant-sponsored, or unverified community content. Reports, takedowns, duplicate detection, and moderation must be part of the first release.

### Operations console

Admins need a merge tool for duplicate restaurant records, provider conflict review, media moderation, restaurant verification, menu freshness alerts, review reports, and order/support status. A city-wide catalog without an operations surface will become inaccurate quickly.

## 7. Staged execution plan

| Stage | Build | Exit condition |
|---|---|---|
| 0. Access and compliance | Confirm API accounts, billing, terms, attribution, and the exact meaning of “Toing” | Every integration has an approved access path and stored credentials plan |
| 1. Lucknow catalog | Import permitted place metadata, create canonical restaurants, neighborhood/cuisine taxonomy, source rating shelf, and map/list UI | A user can find restaurants across all target zones and see rating provenance |
| 2. Visual discovery | Add YouTube embeds where permitted, restaurant uploads, Craveo-owned media, full-screen reels, dish tagging, and source labels | Every published reel has a restaurant and preferably a purchasable dish |
| 3. Commerce slice | Build menus, cart, test checkout, restaurant-direct/deep-link adapters, order records, and cancellation states | A user can move from any eligible reel to a valid order path |
| 4. Trust and measurement | Add verified-order reviews, moderation, content reports, price/availability freshness, and reel-to-order attribution | Craveo can measure completed orders and explain why a content item is trustworthy |
| 5. Partner growth | Add restaurant claim, upload dashboard, menu management, analytics, and creator incentives | Restaurants publish repeatedly because Craveo generates measurable demand |
| 6. Delivery operations | Add payment provider, delivery partner, courier app, dispatch, ETA, live tracking, refunds, and support workflows | Orders are reliably fulfilled within the initial operating zone |

## 8. Metrics for Lucknow

The primary metric is **completed orders per 1,000 qualified reel views**, segmented by restaurant, creator, source, neighborhood, and dish. Supporting metrics are video completion, restaurant opens, menu-item opens, add-to-cart rate, checkout conversion, cancellation rate, review rate, repeat order within 30 days, menu freshness, restaurant upload frequency, and provider data freshness.

The key market test is not whether people watch videos. It is whether visual discovery creates **incremental, satisfied, repeat orders** compared with static restaurant discovery.

## 9. Decisions required before implementation

1. Confirm whether the first ordering mode is test checkout, restaurant-direct ordering, or deep-link handoff.
2. Confirm whether the user means a specific “Toing” platform and provide its URL or exact name.
3. Obtain or plan access for Google Maps Platform, YouTube Data API, and any approved Zomato/Swiggy partner APIs.
4. Decide whether Craveo will launch as a city-wide catalog with a smaller first fulfillment zone, or attempt city-wide delivery from day one. The recommended answer is city-wide discovery with a smaller controlled fulfillment zone.

## References

[1]: https://developers.google.com/youtube/iframe_api_reference "YouTube IFrame Player API Reference"

[2]: https://developers.google.com/maps/documentation/javascript/place-reviews "Google Maps Platform Place Reviews"

[3]: https://www.zomato.com/developer/integration/ "Zomato POS Integration API"

[4]: https://developers.swiggy.com/ "Swiggy Developer Portal"

## Toing decision update

Toing’s public site presents it as a food-delivery service focused on low menu prices and free delivery, with links to its consumer apps and support. No public developer/API documentation was visible on the public website, so Craveo should not assume that Toing exposes a catalog or checkout API. Source: https://www.toingit.com/

**Recommended ordering strategy:** launch Craveo with city-wide Lucknow discovery and a smaller controlled fulfillment zone. Use Craveo-owned restaurant/menu data for the canonical catalog. Add ordering adapters in this order: restaurant-direct/test checkout first, formal Toing partner integration if access is granted, then formal Zomato/Swiggy partner integrations if approved. Use deep links only as a fallback. Do not scrape consumer apps or copy their protected catalog/video assets.
