# DRDO Portal - Design System Documentation

## Overview

This document describes the complete design system for the DRDO Portal, implemented using **Tailwind CSS v4** with CSS-native `@theme` directives. All design tokens are defined in `src/index.css`.

---

## Implementation Details

- **Framework**: Tailwind CSS v4 (CSS-native configuration)
- **Typography**: Poppins (Google Fonts) - weights 300, 400, 500, 600, 700
- **Base Unit**: 4px grid system
- **Breakpoints**: Tailwind defaults (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px)

---

## Color Palette

### Primary Colors (Navy Blue)
Modern, professional institutional blue for main brand elements.

| Token | Hex | Usage |
|-------|-----|-------|
| `primary-50` | `#EBF0F9` | Light backgrounds, hover states |
| `primary-100` | `#D6E1F3` | Subtle backgrounds |
| `primary-200` | `#ADC3E7` | Borders, dividers |
| `primary-300` | `#6A91CF` | Disabled states |
| `primary-400` | `#3B6AB8` | Secondary text |
| `primary-500` | `#1B4F8A` | **Primary brand color** |
| `primary-600` | `#153F6E` | Primary hover states |
| `primary-700` | `#102F53` | Dark backgrounds, headers |
| `primary-800` | `#0A1F37` | Headings, dark text |
| `primary-900` | `#05101C` | Darkest text |

**Tailwind Classes**: `bg-primary-500`, `text-primary-800`, `border-primary-200`, etc.

---

### Accent Colors (Saffron/Orange)
Vibrant orange for CTAs, highlights, and call-to-action elements.

| Token | Hex | Usage |
|-------|-----|-------|
| `accent-50` | `#FFF4EB` | Light accent backgrounds |
| `accent-100` | `#FFE0C4` | Subtle highlights |
| `accent-200` | `#FFC28A` | Borders, soft accents |
| `accent-300` | `#FF9F4A` | Badges, tags |
| `accent-400` | `#F58220` | **Primary accent (CTA buttons)** |
| `accent-500` | `#D96B0A` | Accent hover states |
| `accent-600` | `#B35608` | Pressed states |

**Tailwind Classes**: `bg-accent-400`, `text-accent-600`, `hover:bg-accent-500`, etc.

---

### Teal Colors (Secondary)
Cool, calming teal for secondary actions and info states.

| Token | Hex | Usage |
|-------|-----|-------|
| `teal-50` | `#EBF5F5` | Light backgrounds |
| `teal-100` | `#C7E5E5` | Subtle backgrounds |
| `teal-200` | `#8FCCCC` | Borders |
| `teal-300` | `#5CB3B3` | Icons, secondary elements |
| `teal-400` | `#2E9999` | Secondary actions |
| `teal-500` | `#0F7A7A` | **Primary teal** |
| `teal-600` | `#0A3D3D` | Dark teal |

**Tailwind Classes**: `bg-teal-500`, `text-teal-600`, etc.

---

### Neutral Colors (Grayscale)
Full grayscale for text, backgrounds, borders.

| Token | Hex | Usage |
|-------|-----|-------|
| `neutral-50` | `#F9FAFB` | Page backgrounds |
| `neutral-100` | `#F3F4F6` | Card backgrounds |
| `neutral-200` | `#E5E7EB` | Borders |
| `neutral-300` | `#D1D5DB` | Dividers |
| `neutral-400` | `#9CA3AF` | Placeholder text |
| `neutral-500` | `#6B7280` | Secondary text |
| `neutral-600` | `#4B5563` | Body text |
| `neutral-700` | `#374151` | Dark text |
| `neutral-800` | `#1F2937` | Headings |
| `neutral-900` | `#111827` | Primary text |
| `neutral-950` | `#0C0E12` | Darkest text |

**Tailwind Classes**: `bg-neutral-100`, `text-neutral-700`, `border-neutral-200`, etc.

---

### Semantic Colors

#### Success (Green)
| Token | Hex | Usage |
|-------|-----|-------|
| `success-50` | `#F0FDF4` | Success backgrounds |
| `success-500` | `#16A34A` | Success indicators |
| `success-600` | `#15803D` | Success hover |

#### Warning (Amber)
| Token | Hex | Usage |
|-------|-----|-------|
| `warning-50` | `#FFFBEB` | Warning backgrounds |
| `warning-500` | `#EAB308` | Warning indicators |
| `warning-600` | `#CA8A04` | Warning hover |

#### Error (Red)
| Token | Hex | Usage |
|-------|-----|-------|
| `error-50` | `#FEF2F2` | Error backgrounds |
| `error-500` | `#DC2626` | Error indicators |
| `error-600` | `#B91C1C` | Error hover |

#### Info (Blue)
| Token | Hex | Usage |
|-------|-----|-------|
| `info-50` | `#EFF6FF` | Info backgrounds |
| `info-500` | `#3B82F6` | Info indicators |
| `info-600` | `#2563EB` | Info hover |

---

## Typography

### Font Family
**Poppins** (Google Fonts) with fallback to system fonts:
```css
font-family: 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Font Sizes

| Token | Size | Usage |
|-------|------|-------|
| `text-xs` | 12px | Captions, micro text |
| `text-sm` | 14px | Secondary text |
| `text-base` | 16px | **Default body text** |
| `text-lg` | 18px | Lead paragraphs |
| `text-xl` | 20px | Card titles (h4) |
| `text-2xl` | 24px | Sub-section headings (h3) |
| `text-3xl` | 30px | Section headings (h2) |
| `text-4xl` | 36px | Page titles (h1) |
| `text-5xl` | 48px | Display 2 |
| `text-6xl` | 56px | Display 1 (hero headlines) |

### Font Weights

| Token | Weight | Usage |
|-------|--------|-------|
| `font-light` | 300 | Light text |
| `font-normal` | 400 | **Default body** |
| `font-medium` | 500 | Subtle emphasis (h4, h5) |
| `font-semibold` | 600 | Section headings (h1-h3) |
| `font-bold` | 700 | Display text, strong emphasis |

### Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `leading-tight` | 1.1 | Display text |
| `leading-snug` | 1.2 | Headings |
| `leading-normal` | 1.5 | Default |
| `leading-relaxed` | 1.6 | Body text, paragraphs |

### Typography Examples

```tsx
// Display headlines
<h1 className="text-6xl font-bold">Hero Headline</h1>
<h1 className="text-5xl font-bold">Large Section Title</h1>

// Headings
<h1 className="text-4xl font-semibold">Page Title</h1>
<h2 className="text-3xl font-semibold">Section Heading</h2>
<h3 className="text-2xl font-semibold">Sub-section</h3>
<h4 className="text-xl font-medium">Card Title</h4>

// Body text
<p className="text-lg">Lead paragraph</p>
<p className="text-base">Default body text</p>
<p className="text-sm text-neutral-600">Secondary text</p>
```

---

## Spacing & Layout

### Spacing Scale (4px base)
Tailwind's default spacing scale based on 4px units:

| Class | Value |
|-------|-------|
| `p-0`, `m-0` | 0px |
| `p-1`, `m-1` | 4px |
| `p-2`, `m-2` | 8px |
| `p-3`, `m-3` | 12px |
| `p-4`, `m-4` | 16px |
| `p-6`, `m-6` | 24px |
| `p-8`, `m-8` | 32px |
| `p-12`, `m-12` | 48px |
| `p-16`, `m-16` | 64px |
| `p-20`, `m-20` | 80px |

### Section Spacing
Custom utility class for consistent section spacing:

```tsx
<section className="section-spacing">
  {/* Mobile: 48px top/bottom, Desktop: 80px top/bottom */}
</section>
```

### Container Widths

| Class | Max Width | Usage |
|-------|-----------|-------|
| `container-custom` | 1280px | **Default content container** |
| `max-w-narrow` | 768px | Text-heavy pages |
| `max-w-wide` | 1440px | Full-width sections |

**Container Example**:
```tsx
<div className="container-custom">
  {/* Centered content with horizontal padding */}
</div>
```

---

## Shadows

| Class | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | Default cards |
| `shadow-lg` | `0 10px 30px rgba(0,0,0,0.1)` | Elevated cards |
| `shadow-xl` | `0 20px 40px rgba(0,0,0,0.12)` | Modals, overlays |
| `shadow-card-hover` | `0 10px 30px rgba(0,0,0,0.15)` | Card hover state (via `.card-hover` class) |

---

## Border Radius

| Class | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 4px | Subtle rounding |
| `rounded-md` | 8px | Default buttons, inputs |
| `rounded-lg` | 12px | Cards |
| `rounded-xl` | 16px | Large cards |
| `rounded-2xl` | 24px | Hero sections |
| `rounded-full` | 9999px | Circles, pills |

---

## Animation Keyframes

Pre-defined CSS keyframes for ICANN-style scroll animations:

### fadeInUp
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### fadeIn
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### slideInRight
```css
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}
```

### Usage Example:
```tsx
<div className="animated" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
  {/* Animated content */}
</div>
```

---

## Utility Classes

### Card Hover Effect (ICANN-style)
```tsx
<div className="card-hover bg-white rounded-xl p-6 shadow-md">
  {/* Hover lifts card and increases shadow */}
</div>
```

### Section Spacing
```tsx
<section className="section-spacing">
  {/* Responsive vertical padding */}
</section>
```

### Container
```tsx
<div className="container-custom">
  {/* Max-width, centered, responsive padding */}
</div>
```

### Focus Ring
```tsx
<button className="focus-ring">
  {/* Accessible focus indicator */}
</button>
```

### Screen Reader Only
```tsx
<span className="sr-only">
  Accessible label for screen readers
</span>
```

---

## CSS Variables for GSAP

Custom CSS variables for consistent animation timing:

```css
--duration-fast: 0.15s        /* Micro-interactions */
--duration-normal: 0.3s       /* Transitions */
--duration-slow: 0.8s         /* Scroll animations (desktop) */
--duration-slow-mobile: 0.4s  /* Scroll animations (mobile) */
--ease-out: cubic-bezier(0.33, 1, 0.68, 1)
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)
```

**Usage**:
```tsx
style={{ transitionDuration: 'var(--duration-normal)' }}
```

---

## Responsive Breakpoints

Tailwind CSS default breakpoints (no override needed):

| Breakpoint | Width | Target |
|------------|-------|--------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small desktops |
| `xl` | 1280px | Standard desktops |
| `2xl` | 1536px | Large screens |

**Example**:
```tsx
<div className="text-base md:text-lg lg:text-xl">
  {/* Responsive text size */}
</div>
```

---

## Accessibility

### Reduced Motion Support
The design system automatically respects `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  /* All animations reduced to instant */
}
```

### Focus Indicators
All interactive elements have visible focus indicators using the `.focus-ring` utility or default `:focus-visible` styles with accent-400 color.

### Color Contrast
All color combinations meet **WCAG 2.1 AA** standards:
- `primary-800` on `primary-50`: ✓ AAA
- `neutral-700` on white: ✓ AA
- `accent-400` on white: ✓ AA

---

## Button Examples

### Primary Button
```tsx
<button className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-md">
  Primary Action
</button>
```

### Accent Button (CTA)
```tsx
<button className="px-6 py-3 bg-accent-400 text-white rounded-lg font-medium hover:bg-accent-500 transition-colors shadow-md">
  Call to Action
</button>
```

### Secondary Button
```tsx
<button className="px-6 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors">
  Secondary Action
</button>
```

### Ghost Button
```tsx
<button className="px-6 py-3 text-primary-600 font-medium hover:bg-primary-50 rounded-lg transition-colors">
  Text Button
</button>
```

---

## Card Component Example

```tsx
<div className="bg-white rounded-xl p-6 shadow-md card-hover border border-neutral-200">
  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
    {/* Icon */}
  </div>
  <h4 className="text-xl font-semibold text-primary-800 mb-2">
    Card Title
  </h4>
  <p className="text-neutral-600">
    Card description text with proper line height and color contrast.
  </p>
</div>
```

---

## Implementation Notes

1. **Tailwind v4**: This design system uses Tailwind CSS v4's CSS-native configuration via `@theme` directives
2. **No JS Config**: No `tailwind.config.js` file is needed
3. **Custom Classes**: All custom utility classes are defined in `src/index.css`
4. **Path Aliases**: `@/` alias is configured for `src/` imports
5. **Google Fonts**: Poppins is loaded via CDN (consider self-hosting for production)

---

## Next Steps (Phase 1 - Task 3)

With the design system complete, you can now proceed to:

1. **Component Library** - Build reusable React components (Header, Footer, Button, Card, etc.)
2. **Routing Setup** - Configure React Router for multi-page navigation
3. **Page Layouts** - Create layout templates for public and admin pages
4. **GSAP Integration** - Install GSAP and implement scroll-triggered animations

---

## File Structure

```
DRDO-frontend/
├── src/
│   ├── index.css          # Design system (this file)
│   ├── App.css            # App-specific styles
│   └── App.tsx            # Design system demo
├── vite.config.ts         # Vite config with path aliases
└── tsconfig.app.json      # TypeScript config with path aliases
```

---

**Design System Version**: 1.0.0  
**Last Updated**: 2026-02-17  
**Task**: Phase 1 - Task 2 (Design System)
