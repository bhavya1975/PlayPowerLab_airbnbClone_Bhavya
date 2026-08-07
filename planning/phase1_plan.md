# Phase 1 Implementation Plan: Project Setup, Scalable Architecture & Design System Tokens

## Goal & Objectives
Set up the foundation for the Airbnb single-page application clone using **Next.js 14/15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Lucide Icons**. Establish a scalable architecture adhering strictly to the **Open/Closed Principle (OCP)** and configure the design system tokens (`ui-pixel-perfect`).

---

## 1. Project Initialization & Dependencies
- Create Next.js App Router project in workspace root.
- Dependencies:
  - `framer-motion` (for smooth modal, search pill, and layout transitions)
  - `lucide-react` (for pixel-perfect Airbnb-style UI icons)
  - `clsx`, `tailwind-merge` (for dynamic utility class merging)

---

## 2. Scalable Open/Closed Principle Architecture Structure
To allow adding new features, pages, or replacing mock data with a real backend without modifying existing components:

```text
src/
├── app/
│   ├── layout.tsx             # Root layout with fonts, metadata, & global providers
│   ├── page.tsx               # Main single-page Airbnb clone entrypoint
│   └── globals.css            # Custom Tailwind layers, animations, scrollbars
├── components/
│   ├── ui/                    # Primitive reusable UI (Button, Modal, Pill, Counter, Badge)
│   ├── header/                # Header domain components (Header, Logo, CompactSearchPill, UserMenu)
│   ├── categories/            # Category filter bar & category pills
│   ├── listings/              # Listing card grid, ListingCard, ImageCarousel
│   ├── filters/               # Filters modal, PriceHistogram, FilterSection
│   └── map/                   # Interactive map view & floating toggle button
├── hooks/                     # Custom React hooks (useModal, useSearchFilter, useFocusTrap)
├── lib/
│   ├── constants/             # Design tokens, Airbnb colors, mock listing data
│   ├── design-system/         # Color palette, font weights, shadow tokens
│   ├── filters/               # OCP Strategy Pattern filter engine (PriceFilterStrategy, AmenityFilterStrategy)
│   ├── repositories/          # Interface abstractions (IListingRepository, MockListingRepository)
│   └── utils/                 # Utility functions (currency formatters, date formatters, cn helper)
└── types/                     # Domain interfaces (Listing, Category, FilterState, GuestCounts)
```

---

## 3. Design System Tokens & Global Styling (`ui-pixel-perfect` & `code-quality-and-structure`)
- **Colors**:
  - Airbnb Red: `#FF385C`
  - Dark Neutral: `#222222`
  - Subtitle Neutral: `#717171`
  - Border Neutral: `#DDDDDD`
  - Light Neutral / Hover: `#F7F7F7`
- **Typography & Shadows**:
  - Font: Inter / Circular modern sans-serif.
  - Custom tailwind shadows: `shadow-search` (`0 3px 12px rgba(0,0,0,0.1)`), `shadow-card-hover` (`0 6px 16px rgba(0,0,0,0.12)`).

---

## 4. Verification Plan
- Run `npm run build` to verify clean compilation with 0 TypeScript errors.
- Verify directory structure, exports, and design token integration.
