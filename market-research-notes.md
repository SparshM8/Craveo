# Craveo market research notes

## Verified market signals

1. MediaNama reported in December 2025 that Swiggy began rolling out “Bites,” a vertical short-video feed inside Dineout in Delhi NCR, Mumbai, and Bengaluru. The feed displays restaurant clips in a reels-style viewer and includes restaurant name, cuisine, rating, price range, location, offers, and a Book Now action. It also supports likes and shares. The report says the feature mixes Swiggy-produced or curated clips with restaurant uploads, while upload eligibility, moderation, ranking, commercial terms, and disclosure rules were not clearly explained.

Source: https://www.medianama.com/2025/12/223-swiggys-short-video-feed-restaurant-visibility/

2. Food On Demand reported in December 2025 that CookUnity acquired flavrs, described as a shoppable-video platform for food discovery. The experience links each video to real-time menus, nutrition information, and user preferences so subscribers can move from inspiration to purchase. This supports the broader market signal that video-first food commerce is emerging beyond India.

Source: https://foodondemand.com/12222025/cookunity-offers-a-new-video-first-food-ordering-experience/

## Implication for Craveo

The broad idea—short-form food video connected to restaurant discovery or ordering—is already present in the market and should not be positioned as an untouched category. Craveo’s opportunity is to build a better, more trusted, more local and more creator-native execution: combine customer and restaurant videos, attach every reel to a specific purchasable dish, show transparent labels, and make real-time local availability and delivery part of the video experience. The strongest defensibility would come from the content-to-order data loop, creator and restaurant supply, trust/moderation, and local personalization rather than from the existence of reels alone.

3. Eternal’s official investor-relations site confirms that Zomato operates a large food-ordering and delivery business, but the page itself did not expose customer metrics in the extracted text. Source: https://eternal.com/investor-relations/

4. Swiggy’s official Q4 FY2025 shareholder letter is a 40-page investor document. Search indexing reported food-delivery GOV growth of 17.6% year over year and monthly transacting users of 15.1 million in Q4 FY2025; the browser extraction exposed the PDF page list but not the text layer. Use the source as a primary reference, but avoid relying on the indexed numbers unless independently verified in the PDF. Source: https://www.swiggy.com/corporate/wp-content/uploads/2025/05/Q4-FY2025-Shareholder-letter.pdf

## Lucknow integration findings

5. YouTube's official IFrame Player API supports embedding and controlling video playback in an iframe, including play/pause and state-change listeners. Craveo should store the YouTube video ID and embed approved videos rather than downloading/rehosting them without rights. Source: https://developers.google.com/youtube/iframe_api_reference

6. Google Maps Platform Place Reviews supports requesting `reviews` and `rating` fields. Displayed reviews include rating, text, publish time, text language, and author attribution; Google requires author attribution when a review is displayed. Source: https://developers.google.com/maps/documentation/javascript/place-reviews

7. Zomato's official developer platform is focused on POS integrations for restaurant clients, including order management, menu management, outlet management, order updates, and analytics. This points to formal restaurant/POS onboarding rather than an unrestricted consumer aggregation API. Source: https://www.zomato.com/developer/integration/

8. Swiggy's official developer portal exists, but the browser-rendered page was a JavaScript loading shell and did not expose public documentation or access terms. Treat Swiggy integration as a partner/onboarding dependency until the user has approved credentials and the portal confirms the permitted products. Source: https://developers.swiggy.com/

## Toing findings

9. Toing’s public site positions it as a food-delivery service with low menu prices, free delivery, and app downloads. Its page links to Google Play, Apple App Store, privacy/terms pages, and Swiggy-hosted support, but no public developer/API documentation was visible in the page content or links. Treat Toing as a potential ordering/deep-link or formal partner integration, not a catalog API, until Swiggy/Toing provides access. Source: https://www.toingit.com/
