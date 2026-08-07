---
name: code-quality-and-structure
description: Maintain clean React/Next.js component modularity, strict TypeScript types, reusable UI patterns, and zero console errors.
---

# Code Quality & Structure Skill Guide

This skill establishes strict guidelines for modular Next.js / React application architecture, clean TypeScript patterns, maintainable state management, and error-free execution.

## Architectural Principles

### 1. Component Modularity & Organization
- **Single Responsibility Principle**: Each component file should do one thing well (e.g., separating layout components from logic-heavy feature hooks).
- **Directory Structure**:
  ```text
  src/
  ├── app/                  # Next.js App Router (pages & layouts)
  ├── components/           # UI Components
  │   ├── ui/               # Atomic, primitive UI components (Button, Modal, Input, Badge)
  │   ├── header/           # Header-specific subcomponents (Navbar, SearchBar, UserMenu)
  │   └── listings/         # Feature components (ListingCard, ListingGrid, CategoryFilter)
  ├── hooks/                # Reusable custom React hooks (useModal, useSearch, useDebounce)
  ├── lib/                  # Utilities, helper functions, and API clients
  ├── types/                # Centralized TypeScript interface & type definitions
  ```

### 2. Strict TypeScript Discipline
- **Zero `any` Policy**: Avoid `any` types. Define explicit types or interfaces for all props, API payloads, state objects, and custom hook returns.
- **Discriminated Unions**: Use discriminated unions for complex UI states (e.g., `type FetchState<T> = { status: 'idle' } | { status: 'loading' } | { status: 'success'; data: T } | { status: 'error'; error: Error }`).
- **Exported Component Props**: Always explicitly define and export `interface ComponentNameProps`.

### 3. Reusable UI Patterns
- **Composition over Inheritance**: Pass React components via `children` or custom render props rather than bloating single components with complex conditional flags.
- **Controlled vs. Uncontrolled**: Default to controlled state for form elements and modal visibility, allowing parent callers to manage state easily when needed.

---

## Clean Code & Zero Console Errors

### 1. Keying & Rendering Guidelines
- **Unique List Keys**: Never use array indices (`key={index}`) when rendering dynamic lists. Use unique IDs (e.g., `key={listing.id}`).
- **Conditional Rendering**: Avoid `boolean && <Component />` when `boolean` could evaluate to `0` or `NaN`. Use explicit booleans (`Boolean(count) && ...` or `count > 0 ? ... : null`).

### 2. Memory Leaks & Hydration Integrity
- **Effect Cleanup**: Always return cleanup functions in `useEffect` when setting event listeners, timers (`setTimeout`/`setInterval`), or subscriptions.
- **Hydration Mismatches (SSR / Client Sync)**: Ensure dynamic client-side values (e.g., `window.innerWidth`, current timestamp, `localStorage`) are initialized inside `useEffect` or client-only guards to prevent Next.js hydration warnings.

### 3. Error Boundaries & Fallbacks
- Wrap component trees or dynamic chunks in React Error Boundaries to gracefully catch runtime UI errors without crashing the application.
- Log error tracebacks cleanly and provide user-friendly retry fallbacks.
