---
name: ui-pixel-perfect
description: Enforce pixel-perfect alignment, exact Tailwind colors/typography, precise padding/margins, and exact UI mirroring for the Airbnb clone.
---

# UI Pixel Perfect Skill Guide

This skill enforces strict pixel-perfect visual fidelity, exact design-system token alignment, and clean Tailwind CSS implementation when building or refining user interfaces, specifically tailored for high-precision UI mirroring like an Airbnb clone.

## Core Design System & Tokens

### 1. Palette & Colors
- **Brand Primary (Airbnb Red/Rose)**: `#FF385C` (`bg-[#FF385C]`, `text-[#FF385C]`, `hover:bg-[#E00B41]`)
- **Dark Neutral (Headings & Primary Text)**: `#222222` (`text-[#222222]`)
- **Medium Neutral (Secondary Text & Subheaders)**: `#717171` (`text-[#717171]`)
- **Light Neutral (Borders & Dividers)**: `#DDDDDD` (`border-[#DDDDDD]`, `bg-[#DDDDDD]`)
- **Background Neutral (Cards & Hover States)**: `#F7F7F7` (`bg-[#F7F7F7]`, `hover:bg-[#F7F7F7]`)
- **Pure White**: `#FFFFFF` (`bg-white`)
- **Shadows**:
  - Soft Card Hover: `shadow-[0_6px_16px_rgba(0,0,0,0.12)]`
  - Floating Modal / Search Bar: `shadow-[0_3px_12px_rgba(0,0,0,0.08)]` or `shadow-[0_6px_20px_rgba(0,0,0,0.2)]`

### 2. Typography & Hierarchy
- **Font Family**: Modern sans-serif stack (`font-sans`, Circular UI / Inter fallback).
- **Title / Hero**: `text-2xl` to `text-3xl` (`font-semibold` / `font-bold`), tracking tight (`tracking-tight`).
- **Section Headers**: `text-xl` to `text-2xl` (`font-semibold`).
- **Body / Subtitles**: `text-sm` (`font-normal` or `font-medium`), line height `leading-5` or `leading-6`.
- **Micro / Badges**: `text-xs` (`font-semibold` or `font-medium`), `text-[#717171]`.

### 3. Spacing & Layout Precision
- **Container Margins**: `px-4 sm:px-8 md:px-12 lg:px-20 max-w-[2520px] mx-auto` for responsive page containers.
- **Grid Layouts**:
  - Categories / Filter Bar: `flex items-center gap-8 overflow-x-auto scrollbar-none`.
  - Listing Cards Grid: `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6`.
- **Padding & Radii**:
  - Buttons & Badges: Pill shaped (`rounded-full`) or rounded rectangular (`rounded-xl` / `rounded-2xl`).
  - Search Header Pill: `rounded-full border border-[#DDDDDD] p-2 shadow-sm hover:shadow-md transition duration-200`.

## Implementation Checklist

- [ ] **Exact Dimensions**: Use precise Tailwind spacing classes (`p-4`, `py-3`, `px-6`, `gap-3`) or explicit arbitrary values (`h-[48px]`, `w-[320px]`) when mirroring reference layouts.
- [ ] **Flex Alignment**: Always specify both primary and cross-axis alignment (`flex items-center justify-between` or `flex flex-col items-start justify-center`).
- [ ] **Image Aspect Ratios**: Use fixed aspect ratios for listing images (`aspect-square` or `aspect-[20/19]`), with `object-cover` and `rounded-xl`.
- [ ] **Icon Alignment**: Standardize icon sizes (e.g., `w-4 h-4` or `w-5 h-5`) and align inline with text (`flex items-center gap-1.5`).
- [ ] **Border Consistency**: Standardize border widths (`border` = `1px`) and border colors (`border-[#DDDDDD]` or `border-gray-200`).
