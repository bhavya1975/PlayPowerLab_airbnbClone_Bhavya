# Phase 3 Plan: Amenities, Calendar, Reviews & Rating Sections

## Goal
Build all listing detail sections visible in the screenshots:
1. **"What this place offers"** — 2-column amenity grid with icons, unavailable items struck-through, "Show all X amenities" button
2. **"5 nights in Candolim"** — Dual-month interactive date picker calendar
3. **Guest Favourite Rating Hero** — Large 4.95 rating with laurel decoration, "Guest favourite" tagline, rating breakdown bars, and category ratings (Cleanliness, Accuracy, Check-in, Communication, Location, Value)
4. **Review Keyword Chips** — Horizontal scrollable chips (Comfort 6, Accuracy 5, etc.)
5. **Review Cards Grid** — 2-column grid of guest review cards (avatar, name, tenure, stars, date, text, "Show more")
6. **"Show all 19 reviews"** button

## Sections Layout
```
Where you'll sleep  (already built - needs living room card + bedroom card fix)
────────────────────────────────────────
What this place offers
  Kitchen            Wifi
  Dedicated workspace  Free parking on premises
  Pool               Hot tub
  Pets allowed       Exterior security cameras on property
  ~~Carbon monoxide alarm~~  ~~Smoke alarm~~
  [Show all 50 amenities]
────────────────────────────────────────
5 nights in Candolim
  18 Oct 2026 – 23 Oct 2026
  [Oct 2026 ← ] [→ Nov 2026]
  [Clear dates]
────────────────────────────────────────
        🏆 4.95 🏆
        Guest favourite
        This home is a guest favourite based on ratings, reviews and reliability
        How reviews work
  Overall rating | Cleanliness 5.0 | Accuracy 5.0 | Check-in 5.0 | Communication 5.0 | Location 4.8 | Value 4.8
────────────────────────────────────────
  [Comfort 6] [Accuracy 5] [Hot tub 5] [Condition 4] [Hospitality 8] [Cleanliness 4] [Amenities 2]
  
  Amit · 2mo on Airbnb          Aheesh · 3yr on Airbnb
  ★★★★★ 1 week ago              ★★★★★ 2 weeks ago
  "Very helpful..."              "We had a wonderful stay..." [Show more]
  
  Samiksha · 8mo                Vedant · 4yr
  ...                            ... [Show more]
  
  Vaibhav S · 3yr              Mohd · 5yr
  ...                            ...
  
  [Show all 19 reviews]
```

## Components to Create
| File | Purpose |
|---|---|
| `src/components/listing/AmenitiesSection.tsx` | Amenities grid + "Show all" button |
| `src/components/listing/CalendarSection.tsx` | 2-month date picker calendar |
| `src/components/listing/ReviewsSection.tsx` | Rating hero, category ratings, chips, review cards |

## Verification
- `npm run build` passes
- Calendar month navigation works (prev/next arrows)
- Selected date range shows highlighted in calendar
- Strikethrough on unavailable amenities
