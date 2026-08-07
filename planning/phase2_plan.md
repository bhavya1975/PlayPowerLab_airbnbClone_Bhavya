# Phase 2 Plan: Header Bar, Sticky Navigation & Listing Page Sections

## Goal
Build the complete header system with:
1. **Sticky top header** — Logo, Compact Search Pill (Anywhere | Anytime | Add guests), and User Action Menu (Become a Host, Globe, Hamburger+Avatar menu)
2. **Secondary sticky subheader** — visible when scrolling a listing detail (Photos | Amenities | Reviews | Location tabs + price/reserve bar on right)

## Components to Build

### Header Layer (`src/components/header/`)
| File | Purpose |
|---|---|
| `Header.tsx` | Root sticky header container, manages compact vs expanded scroll state |
| `Logo.tsx` | SVG Airbnb flamingo + wordmark |
| `CompactSearchPill.tsx` | Three-segment pill (Anywhere / Anytime / Add guests) + pink search button |
| `UserMenu.tsx` | "Become a host", Globe icon, Avatar+Hamburger dropdown |
| `UserMenuDropdown.tsx` | Dropdown overlay (Sign up, Log in, divider, Become a host, Help) |

### Secondary Subheader Layer (`src/components/header/`)
| File | Purpose |
|---|---|
| `ListingSubHeader.tsx` | Sticky subheader (Photos, Amenities, Reviews, Location tabs + price/Reserve on right) — shown while scrolling listing detail |

## UX & Accessibility Specifications
- Header is `position: sticky; top: 0; z-index: 50` with white background and bottom shadow
- Compact Search Pill: `rounded-full border border-[#DDDDDD]` with 3 clickable segments separated by `|` dividers and ends with pink `bg-[#FF385C]` circle search button
- Segments have hover state: `hover:bg-[#F7F7F7] rounded-full`
- UserMenu dropdown closes on `Escape` key and backdrop click
- Globe + Hamburger+Avatar are circle icon buttons: `rounded-full border border-[#DDDDDD] hover:shadow-md`
- Sub-header (Photos / Amenities / Reviews / Location) uses roving `tabIndex` for keyboard navigation
- All icon-only buttons have `aria-label` attributes

## Layout Structure
```
┌────────────────────────── sticky top header ──────────────────────────────┐
│  [Logo]      [Anywhere | Anytime | Add guests 🔍]    [Become a host 🌐 ☰👤]│
└───────────────────────────────────────────────────────────────────────────┘
                         ↓ on listing page scroll ↓
┌──────── sticky sub-header (Photos | Amenities | Reviews | Location) ──────┐
│  [Photos] [Amenities] [Reviews] [Location]       ₹28,499 for 5 nights [Reserve]│
└───────────────────────────────────────────────────────────────────────────┘
```

## Verification Plan
- `npm run build` passes with 0 TypeScript errors
- Header sticks at top during scroll
- Sub-header becomes visible only after scrolling past the photo gallery
- Keyboard: `Escape` closes UserMenu dropdown
- Responsive: pill truncates gracefully on mobile
