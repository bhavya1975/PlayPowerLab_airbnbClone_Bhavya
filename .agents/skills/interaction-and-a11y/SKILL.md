---
name: interaction-and-a11y
description: Focus on accessible modal overlays, focus management, keyboard controls (ArrowLeft, ArrowRight, Escape), and smooth CSS/Framer Motion transitions.
---

# Interaction & Accessibility (a11y) Skill Guide

This skill specifies rules and patterns for building fully accessible, keyboard-navigable, visually engaging, and motion-smooth components in React and Next.js applications.

## Accessibility (a11y) Fundamentals

### 1. Modal Overlays & Dialogs
- **ARIA Attributes**:
  - Main modal wrapper must include `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title-id"`, and `aria-describedby="modal-desc-id"`.
  - Backdrop overlays must render `aria-hidden="true"`.
- **Focus Management**:
  - **Trap Focus**: Use a focus trap (e.g., `focus-trap-react` or custom ref-based trap) when modal opens so keyboard tabbing remains strictly inside the modal context.
  - **Initial Focus**: Automatically place focus on the primary action button or close icon when opened (`ref.current?.focus()`).
  - **Return Focus**: Store the element that triggered the modal (`document.activeElement`) and restore focus to it when the modal closes.
- **Body Scroll Locking**: Prevent page background scroll when modals or side-drawers are active (`document.body.style.overflow = 'hidden'`).

### 2. Keyboard Navigation Standards
- **Escape Key Handling**:
  - Global listener attached on mount:
    ```tsx
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);
    ```
- **Arrow Keys Navigation (Carousels & Tabs)**:
  - `ArrowLeft` / `ArrowRight`: Navigate previous / next image in photo carousels or active tab items.
  - Set `tabIndex={0}` on active tab/card and `tabIndex={-1}` on inactive tabs for standard roving `tabindex`.
- **Space & Enter**:
  - Custom button-like components (`<div>`, `<span>`) MUST include `role="button"`, `tabIndex={0}`, and handle `onKeyDown` for `Enter` and `' '` (Spacebar).

### 3. Screen Reader Optimization
- **Interactive Elements**: All icon-only buttons (e.g., close modal `X`, wishlist `Heart`, carousel `Chevron`) MUST include descriptive `aria-label` tags (e.g., `aria-label="Close modal"`).
- **Live Regions**: Dynamic filter updates or search result count changes should use `aria-live="polite"`.

---

## Smooth Animations & Framer Motion

### 1. Transition Guidelines
- **Modal Pop/Fade**:
  ```tsx
  import { motion, AnimatePresence } from 'framer-motion';

  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {/* Content */}
      </motion.div>
    )}
  </AnimatePresence>
  ```
- **Drawer / Bottom Sheet Slide**:
  - `initial={{ y: '100%' }}` `animate={{ y: 0 }}` `exit={{ y: '100%' }}` `transition={{ type: 'spring', damping: 25, stiffness: 200 }}`.

### 2. Reduced Motion Support
- Respect user preference for reduced motion (`prefers-reduced-motion: reduce`).
- In Framer Motion, use `useReducedMotion()` hook or CSS `@media (prefers-reduced-motion: reduce)` to disable layout animations and heavy scaling.
