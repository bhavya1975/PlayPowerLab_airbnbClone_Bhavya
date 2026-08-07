# Master 5-Phase Implementation Plan: Airbnb Clone

## Overview
This plan breaks down the development of the high-fidelity, scalable Airbnb clone into **5 distinct execution phases**. The application is designed as a single-page Airbnb clone with modular, scalable architecture adhering to the **Open/Closed Principle (OCP)**, strict TypeScript types, full keyboard accessibility (a11y), smooth Framer Motion interactions, and pixel-perfect visual fidelity.

---

## Architectural Principles & Scalability Strategy

To ensure the application is scalable, maintainable, and easily extendable with new pages, features, or backend APIs:

1. **Open/Closed Principle (OCP)**:
   - **Repository Pattern / Strategy Pattern for Data & Search**: Data services (listings, categories, search filtering) are abstracted behind interface contracts (`ListingRepository`, `FilterStrategy`). Adding new filter types (e.g., eco-friendly, price ranges) or switching from local mock data to a REST/GraphQL API requires zero modification to core UI components.
   - **Pluggable Filter Engine**: Filter criteria are registered dynamically via a pipeable query builder rather than nested `if-else` blocks.
2. **Component Composition & Modular Directory Structure**:
   - Primitive UI components (`components/ui/`) strictly handle visual presentation.
   - Domain components (`components/listings/`, `components/header/`, `components/filters/`) compose primitives with feature logic.
   - State hooks (`hooks/`) manage modal visibility, keyboard focus, search params, and filtering independently.
3. **Skill Alignment**:
   - `ui-pixel-perfect`: Exact Airbnb color tokens (`#FF385C`), font weights, spacing scales, card aspect ratios, and hover transitions.
   - `interaction-and-a11y`: Focus traps, `aria-*` tags, keyboard navigation (`ArrowLeft`/`ArrowRight`, `Escape`, `Tab`), smooth Framer Motion dialogs.
   - `code-quality-and-structure`: Modular folder layout, strict TypeScript interfaces (no `any`), unique keys, hydration safety.
   - `system-architecture-designer`: High-availability patterns, decoupled API contract ready for real backend services.

---

## 5-Phase Breakdown

```
  ┌────────────────────────────────────────────────────────┐
  │ Phase 1: Setup, Scalable Architecture & Design System │
  └───────────────────────────┬────────────────────────────┘
                              │
                              ▼
  ┌────────────────────────────────────────────────────────┐
  │ Phase 2: Header Bar & Interactive Search Experience   │
  └───────────────────────────┬────────────────────────────┘
                              │
                              ▼
  ┌────────────────────────────────────────────────────────┐
  │ Phase 3: Category Filter Bar & Interactive Grid       │
  └───────────────────────────┬────────────────────────────┘
                              │
                              ▼
  ┌────────────────────────────────────────────────────────┐
  │ Phase 4: Filters Modal Overlay & Accessibility Polish │
  └───────────────────────────┬────────────────────────────┘
                              │
                              ▼
  ┌────────────────────────────────────────────────────────┐
  │ Phase 5: Map View Toggle, Skeleton States & Final QA  │
  └───────────────────────────┬────────────────────────────┘
```

---

### Phase 1: Project Setup, Scalable Architecture & Core Design System
- **Goal**: Initialize the Next.js App Router project with TypeScript, Tailwind CSS, Framer Motion, and Lucide Icons. Establish core architecture, data contracts, and design system tokens.
- **Key Deliverables**:
  - `src/types/`: Domain interfaces (`Listing`, `Category`, `FilterState`, `GuestCounts`, `DateRange`).
  - `src/lib/data/`: Extensible mock data repository adhering to OCP interface contracts (`IListingRepository`).
  - `src/lib/design-system/`: Design system tokens (Airbnb red `#FF385C`, text colors `#222222`, `#717171`, border `#DDDDDD`, custom shadows).
  - Setup base layout and global styles.

---

### Phase 2: Header Bar & Interactive Search Experience
- **Goal**: Build the responsive Header, Navigation bar, and the multi-step expandable Search Pill & Dropdown modals.
- **Key Deliverables**:
  - `Header` component (Logo, Navigation links, "Become a Host" / Globe icon, User Menu trigger).
  - Compact Search Pill (`Anywhere | Any week | Add guests`) with smooth Framer Motion transition into expanded Search Bar.
  - Multi-tab Expanded Search Bar (Stays / Experiences) with dynamic interactive popovers:
    - **Where**: Search location autocomplete dropdown.
    - **Check-in / Check-out**: Interactive calendar date selector.
    - **Who**: Guest Counter popover (Adults, Children, Infants, Pets) with increment/decrement buttons and min/max limits.
  - Accessible `UserMenu` overlay with keyboard focus management (`Escape` key, backdrop click).

---

### Phase 3: Category Filter Bar & Interactive Listing Grid
- **Goal**: Implement the horizontal scrollable Category Filter bar and the main responsive Listing Card Grid with interactive image carousels.
- **Key Deliverables**:
  - `CategoryFilterBar`: Horizontal carousel of categories (e.g., Icons, Beachfront, Cabins, Mansions, Pools) with left/right scroll arrows and active category highlights.
  - "Filters" trigger button with filter count badge.
  - `ListingCard`:
    - Responsive Grid layout (`1-col` on mobile up to `6-col` on ultra-wide).
    - Multi-image carousel inside each card with hover prev/next chevrons, pagination indicator dots, and touch swipe.
    - Wishlist Heart toggle with heart-beat animation.
    - Title, star rating, distance/location, date range, price per night, and "Total before taxes" toggle integration.

---

### Phase 4: Filters Modal Overlay & Accessibility Polish
- **Goal**: Build the comprehensive "Filters" modal dialog and apply accessibility polish across all interactive elements.
- **Key Deliverables**:
  - `FiltersModal`:
    - Range slider & visual price histogram.
    - Type of place selectors (Entire place, Room, Shared room).
    - Bedrooms, Beds, Bathrooms pill selectors (`Any`, `1`, `2`, `3`, `4`, `5+`).
    - Property types, amenities checkboxes, booking options (Instant Book, Self check-in).
    - Footer with "Clear all" and "Show X listings" dynamic CTA.
  - Accessibility & Interaction Polish:
    - Focus trap inside `FiltersModal` and `SearchModal`.
    - Full keyboard navigation (`ArrowLeft`/`ArrowRight` for carousels & tabs, `Escape` to close modals).
    - `aria-modal="true"`, `aria-label`, `aria-expanded`, and body scroll locks.

---

### Phase 5: Map View Toggle, Skeleton States & Final QA
- **Goal**: Build the floating Map/List toggle button, interactive Map view placeholder/layout, loading skeleton states, and verify against all workspace skills.
- **Key Deliverables**:
  - Floating bottom-center "Show map" / "Show list" toggle button with smooth morph animation.
  - Map View layout component with interactive map pins and listing price popovers.
  - Skeleton loading components (`ListingCardSkeleton`, `CategorySkeleton`) for seamless loading states.
  - Full audit verifying `ui-pixel-perfect`, `interaction-and-a11y`, `code-quality-and-structure`, and `system-architecture-designer` compliance.

---

## User Review & Verification Workflow
For each phase:
1. I will write the detailed phase plan in `planning/phaseX_plan.md`.
2. You will review the plan and provide any additional feedback or screenshots.
3. Upon your approval, I will implement the code for that phase, run build and lint checks, and present the completed work for validation.
