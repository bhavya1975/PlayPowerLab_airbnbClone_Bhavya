# Phase 4 Plan: Location Map, Host Profile, Things to Know & Stays Nearby Carousel

## Goal
Implement the remaining listing details sections matching screenshots 1, 2, and 3:
1. **Fix Booking Card Sticky Container**: Ensure the discount banner ("Get 10% off...") and booking card are grouped together in the `sticky top-[108px]` column so they scroll as a unified block without overlapping.
2. **"Where you'll be" Location Map Section**: Interactive map visualization with location pin, zoom controls (+ / -), search button, "Candolim, Goa, India", and Neighbourhood highlights with "Show more >".
3. **"Meet your host" Profile Section**:
   - Host badge card with profile picture, verified pink check, 1,463 Reviews, 4.68 Rating, 2 Years hosting.
   - Co-hosts grid (Sharath, Aman Dev Pahwa, Maria Karen Priyanka, Simran, Pallavi, Sanyukta, Shruti, Amisha).
   - Host stats (Response rate: 100%, Responds within an hour), "Message host" CTA button, security disclaimer.
4. **"Things to know" Section**: 3 columns (Cancellation policy, House rules, Safety & property).
5. **"More stays nearby" Section**: Horizontal carousel with `1/2` pagination controls, listing cards (image, title, price, rating).

## Components to Build
| File | Purpose |
|---|---|
| `src/components/listing/LocationMapSection.tsx` | Map preview + Neighbourhood highlights |
| `src/components/listing/HostProfileSection.tsx` | Host card, Co-hosts grid, details & Message host CTA |
| `src/components/listing/ThingsToKnowSection.tsx` | 3-column policy & safety information |
| `src/components/listing/NearbyStaysCarousel.tsx` | Horizontal carousel of nearby listings with pagination |

## Verification Plan
- `npm run build` passes with zero TypeScript errors.
- Fix verified: Discount banner and booking card stick together smoothly.
- Map section, Host profile, Things to know, and Nearby stays carousel render pixel-perfect.
