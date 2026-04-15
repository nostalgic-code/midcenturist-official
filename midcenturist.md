# Midcenturist Frontend Documentation

## Project Overview

**Midcenturist** is a premium mid-century modern furniture e-commerce platform designed to showcase authentic Danish and vintage furniture pieces from the 1950s and 1960s. The frontend is built as a sophisticated, high-performance Next.js application with a focus on elegant design, seamless interactivity, and exceptional user experience.

### Core Vision

The platform positions itself as a curator of authentic mid-century pieces, celebrating the timeless appeal of design from the golden age of modernism. The brand emphasizes authenticity, historical value, and the narrative behind each piece.

---

## Technology Stack

### Frontend Framework & Core Technologies

- **Next.js 14.2.35** — React-based full-stack framework with App Router for optimized routing and SSR
- **React 18** — UI rendering and component architecture
- **TypeScript 5** — Static type checking for robust code
- **Tailwind CSS 3.4** — Utility-first CSS framework for styling
- **PostCSS 8** — CSS transformation and preprocessing

### UI & Icon Libraries

- **FontAwesome 7.2** — Comprehensive icon system (solid, regular, brand variants)
- **React FontAwesome** — React integration for FontAwesome icons

### Authentication & Security

- **NextAuth 4.24.13** — Authentication framework for user sessions
- **bcryptjs 3.0.3** — Password hashing and encryption

### Type System

Custom TypeScript interfaces defined in `src/types/index.ts` for:
- Hero slides
- Product card data
- Navigation structures
- Theme variations

---

## Core Features & Functionality

### 1. **Hero Slider (Full-Viewport Experience)**

The hero section is the centerpiece of the homepage, featuring an auto-rotating carousel of product categories.

**Features:**
- **Auto-play rotation** with 6-second intervals between slides
- **Manual navigation** with previous/next arrows (visible on hover)
- **Smooth transitions** between slides with grayscale image effects
- **4 primary category slides:**
  - Sideboards & Storage (Teak focus)
  - Seating (Lounge chairs, armchairs)
  - Lighting (Atomic pendants, tripod lamps)
  - Home Décor (Ceramics, sculptural pieces)

**Interactive Elements:**
- Featured piece information displayed per slide (name, year, price)
- Category-specific call-to-action buttons
- Clickable background transitions to category pages
- Custom cursor integration showing "Shop" label on hover

**Animations:**
- Grayscale to desaturated color transition on hover
- Smooth arrow fade-in/out
- Image brightness darkening (0.68) with gradient overlay

### 2. **Navigation System**

#### Top Navigation Bar (Topbar)
- Minimal header with logo and basic branding
- Responsive hamburger menu for mobile

#### Main Navbar
**Components:**
- Left section: Logo/home link
- Center section: Primary navigation links
  - Home, About, Categories, Collections, Journal
- Right section: Search icon, Wishlist heart, Shopping bag (cart count)
- Desktop dropdown for categories with icons

**Interactive Features:**
- Active link indicator (dot below active nav item)
- Underline animation on nav links (`nav-link-underline`)
- Category dropdown menu with sub-categories and icons
- Mobile drawer with collapsible category menu
- Search icon functionality ready for integration
- Cart counter display

**Styling:**
- Ultra-light font weight (200) for elegant minimalism
- Uppercase letter spacing (0.25em–0.3em)
- Color transitions on hover (brand-black/70 → brand-black)

### 3. **Ticker (Infinite Marquee)**

A continuously scrolling information banner across the site.

**Content Items:**
- "New Arrivals Weekly"
- "Nationwide Delivery"
- "Every Piece Authenticated"
- "Collection by Appointment"
- "Layby Available"
- "Follow @midcenturist_sa"

**Animations:**
- Seamless infinite scroll using CSS keyframes (`@keyframes tick`)
- 38-second loop duration
- Separator dots between items
- Semi-transparent white text on black background

### 4. **Product Carousel (Horizontal Scrolling)**

Interactive carousel for browsing product collections.

**Features:**
- **Drag-to-scroll** functionality with momentum (1.2x walk multiplier)
- **Previous/next arrow buttons** for manual navigation
- **Smooth scroll** behavior with 300px jumps
- **Gap spacing** between cards (5 units)
- **Product cards** display:
  - High-quality product image
  - Product name and era
  - Material composition
  - Year of manufacture
  - Price (with optional original price for discounts)
  - "New In" or other status badges

**Responsive Layout:**
- Horizontal scrolling on mobile/tablet
- Responsive padding (8px on mobile, 80px on desktop)

### 5. **Editorial Introduction**

Custom component for brand storytelling and value proposition messaging. Sets the editorial tone for the brand narrative.

### 6. **Shop Panels (Category Grid)**

Visual grid showcasing the four main product categories with:
- Category images
- Category names
- Distinct visual treatments per category
- Links to category pages

### 7. **Vision Section**

Hero messaging component that communicates the brand's core philosophy and positioning in the market.

### 8. **Why Buy Section**

Trust-building component highlighting key differentiators:
- Authenticity guarantees
- Quality restoration
- Expert curation
- Delivery/logistics assurance
- Warranty information

### 9. **Newsletter Signup**

Email capture form for:
- Building subscriber lists
- Marketing communication
- Product announcements
- Exclusive previews

**Features:**
- Email input validation
- Consent checkbox
- CTA button
- Success/error messaging

### 10. **Instagram Feed (IGFeed)**

Integration for displaying curated Instagram posts to:
- Provide social proof
- Showcase lifestyle imagery
- Link to social media channel
- Add dynamic content

### 11. **Coming Soon Section**

Placeholder for upcoming features:
- Indicates future functionality
- Maintains engagement with planned features

### 12. **Footer**

Comprehensive footer with:
- Multiple footer sections (About, Shop, Support, Connect)
- Newsletter signup CTA
- Social media links
- Legal links (Privacy, Terms)
- Contact information
- Copyright notice

---

## Design System & Theme

### Color Palette

**Primary Colors:**
- `brand-black`: `#0c0b0a` — Deep charcoal, primary text and accents
- `brand-white`: `#ffffff` — Clean white, primary background
- `brand-off`: `#f6f4f1` — Off-white, secondary backgrounds
- `brand-off-d`: `#eeebe6` — Slightly darker off-white, borders

**Semantic Colors:**
- `brand-muted`: `#8c8882` — Greyed tone for secondary text
- `brand-rule`: `rgba(12,11,10,0.08)` — Subtle divider lines

**Status Colors:**
- `status-live`: `#16a34a` — Green for active/in stock
- `status-draft`: `#ca8a04` — Amber for pending
- `status-sold`: `#8c8882` — Grey for sold out
- `status-arch`: `#dc2626` — Red for archived

### Typography System

**Font Families:**

1. **Sans-Serif Stack:** Century Gothic → Josefin Sans → fallback sans
   - Used for body text, navigation, UI elements
   - Ultra-light weight (200) for elegant minimalism
   - Custom letter-spacing classes up to 0.3em for upscale feel

2. **Serif Stack:** Cormorant Garamond → Georgia → fallback serif
   - Used for headlines, product titles, italic accents
   - Elegant proportions for premium positioning
   - Multiple weights (300, 400, 500) for hierarchy

**Font Weights:**
- Light (200) — Primary body text, navigation
- Regular (300–400) — Secondary text, labels
- Medium (500) — Emphasis, highlights

**Letter Spacing:**
- `tracking-widest-2`: 0.25em — Standard uppercase spacing
- `tracking-widest-3`: 0.3em — Extra-wide for premium headers

### Responsive Breakpoints

- Mobile: < 768px
- Tablet/Medium: ≥ 768px (md prefix in Tailwind)
- Desktop: ≥ 1024px (lg prefix in Tailwind)

---

## Animation & Interaction System

### 1. **Custom Cursor (Dual-Ring System)**

A sophisticated custom cursor replaces the default system cursor for desktop users.

**Visual Design:**
- **Dot:** 6px × 6px solid black circle at cursor position
- **Ring:** Circular outline around cursor
  - Default size: 36px, transparent with 1px border
  - Hovered size: 72px, solid black background with white text label

**Behavior:**
- **Dot tracking:** Immediate response to mouse movement
- **Ring animation:** Smooth follow using `requestAnimationFrame` with 0.12 lerp interpolation
- **Expansion on hover:** Ring enlarges and fills with label text on interactive elements
- **Label display:** Shows contextual action labels ("Shop", etc.)
- **Touch device detection:** Falls back to system cursor on touch devices

**Performance:**
- GPU-accelerated with `will-change: transform`
- Uses `requestAnimationFrame` for smooth 60fps animation
- Non-blocking pointer events (pointer-events: none)

### 2. **Navigation Link Underline Animation**

Smooth scale animation for nav link underlines.

```css
.nav-link-underline {
  transform: scaleX(0);
  transition: transform 0.25s ease;
}
.nav-link:hover .nav-link-underline {
  transform: scaleX(1);
}
```

**Effect:** Underlines animate from left to right on hover with 250ms duration.

### 3. **Image Greyscale Hover Reveal**

Sophisticated image hover effect used throughout.

```css
.img-grey {
  filter: grayscale(100%);
  transition: filter 0.35s ease, transform 0.6s ease;
}
.img-grey:hover {
  filter: grayscale(60%);  /* Desaturated color reveal */
}
```

**Effect:** Images transition from full grayscale to 60% grayscale on hover with staggered timing.

### 4. **Ticker Infinite Scroll Animation**

Seamless marquee using CSS keyframes.

```css
@keyframes tick {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.ticker-track {
  animation: tick 38s linear infinite;
}
```

**Effect:** Content slides continuously left with 38-second loop duration. Seamless because content is duplicated.

### 5. **Hero Slider Transitions**

- Auto-advance carousel with 6-second interval
- Smooth image fade/zoom on slide change
- Grayscale image with brightness reduction (0.68)
- Gradient overlay transitioning from dark (bottom) to transparent (top)

### 6. **Carousel Drag Interaction**

Product carousel responds to mouse drag with:
- Dynamic cursor feedback ("grab" ↔ "grabbing")
- Momentum-based scrolling (1.2x walk multiplier)
- Drag detection threshold (> 4px movement)
- Smooth scroll behavior on arrow navigation

### 7. **Element Scale & Expand Animations**

Various components use subtle scale transitions:
- Button hover states
- Card focus/hover effects
- Modal/drawer open/close
- Smooth size transitions with `transition-[width,height]`

---

## Custom Features & Interactions

### 1. **Cursor Context Provider**

**Location:** `src/context/CursorProvider.tsx`

Global state management for custom cursor behavior using React Context API.

**API:**
```typescript
interface CursorContextValue {
  setHoverLabel: (label: string | null) => void
}
```

**Usage:**
```typescript
const { setHoverLabel } = useCursor()
// On hover:
onMouseEnter={() => setHoverLabel('Shop')}
onMouseLeave={() => setHoverLabel(null)}
```

**Benefits:**
- Centralized cursor state management
- Reusable custom cursor across entire app
- Dynamic label updates based on user interaction

### 2. **Auto-Play Carousel with Manual Override**

Hero slider features intelligent auto-play:
- Automatically cycles through slides every 6 seconds
- Manual navigation resets auto-play timer
- Smooth interval management with cleanup
- Carousel accessibility with ARIA roles

### 3. **Responsive Image Handling**

- Next.js Image optimization with fill layout
- Responsive srcset generation with `sizes` prop
- Lazy loading with priority on hero images
- Grayscale filtering for atmospheric effect

### 4. **Glass Morphism Effect**

Frosted glass utility for modern UI elements:

```css
.glass {
  background: rgba(255, 255, 255, 0.08);
  border: 0.5px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}
```

Used for overlays, modals, and premium UI elements.

---

## Styling & CSS Architecture

### Tailwind CSS Customization

**Extended Theme:**
- Custom color palette (brand colors + status colors)
- Extended font families (Century Gothic, Josefin Sans, Cormorant)
- Custom letter-spacing utilities (widest-2, widest-3)
- Responsive variants for all utilities

### Global Styles (`globals.css`)

**Key Styling Rules:**

1. **Cursor Management**
   - All elements use `cursor: none` for custom cursor
   - Touch devices fall back to `cursor: auto`

2. **Font Foundation**
   - Body uses Century Gothic/Josefin Sans
   - Font weight 200 for light aesthetic
   - Overflow-x hidden to prevent scrollbars

3. **Navigation Animations**
   - .nav-link-underline with scaleX animation
   - Active indicator styling

4. **Image Effects**
   - .img-grey for greyscale hover reveals
   - Grouped hover states for card interactions

5. **Carousel Optimization**
   - Scrollbar hiding with webkit overrides
   - Touch scrolling optimization

### No-Tailwind CSS

Reserved for:
- Complex animations (keyframes definition)
- Global resets
- Custom utilities (glass morphism)
- Vendor-specific rules

---

## Accessibility Features

### ARIA Implementation

**Semantic HTML:**
- Proper heading hierarchy (h1, h2, h3)
- Landmark regions (main, nav, footer)
- List semantics for collections

**ARIA Attributes:**
- `role="carousel"` on hero slider
- `aria-roledescription="carousel"` for screen readers
- `aria-current="page"` on active nav links
- `aria-label` for icon buttons and interactive areas
- `aria-hidden="true"` on decorative elements

**Focus Management:**
- Proper tab order through navigation
- Focus-visible states on interactive elements
- Keyboard navigation support for dropdowns

### Color & Contrast

- High contrast primary text (#0c0b0a on #ffffff)
- WCAG AA compliant color combinations
- Secondary text reduced with careful opacity (brand-black/70)

### Responsive Text

- Readable font sizes across viewports
- Scaled line heights for accessibility
- Touch-friendly interactive element sizing (min 44px)

---

## Page Structure & Layout

### Hero Section
- Full viewport height (calc(100vh - 68px), min 580px)
- Absolute positioning for layered elements
- Gradient overlay foundation

### Main Content Sections
- Max-width containers with responsive padding
- Horizontal scroll carousels with snap points
- Grid layouts for category showcases
- Vertical stacking on mobile

### Footer
- Multi-column layout on desktop
- Single-column stack on mobile
- Sticky positioning option available

---

## Performance Optimizations

### Image Optimization

- Next.js Image component with automatic optimization
- WebP format with fallbacks
- Responsive srcset via sizes prop
- Lazy loading with priority on critical images
- Grayscale filter applied server-side via CSS

### CSS & Animation Performance

- GPU acceleration with `will-change` transforms
- Efficient requestAnimationFrame usage
- CSS-based animations over JS-based
- Minimal reflow/repaint operations
- Debounced event handlers

### Resource Loading

- Font preloading (Google Fonts)
- FontAwesome icons as SVG (lightweight)
- Tailwind CSS tree-shaking
- Dynamic imports for heavy components

---

## Responsive Design Strategy

### Mobile-First Approach

1. **Base styles:** Mobile/small viewport defaults
2. **Breakpoints:** md (768px), lg (1024px) expansions
3. **Responsive utilities:** md:, lg: prefixes throughout

### Key Responsive Changes

- **Navigation:** Hamburger menu on mobile, full nav on desktop
- **Padding/margins:** 8px mobile, 20-80px desktop
- **Typography:** Reduced sizes on mobile, full hierarchy on desktop
- **Layout:** Single column mobile, multi-column desktop
- **Carousel:** Drag on mobile, arrows + drag on desktop

---

## Component Architecture

### File Organization

```
src/
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout wrapper
│   ├── page.tsx             # Homepage content
│   └── fonts/              # Custom font files
├── components/              # Reusable UI components
│   ├── HeroSlider.tsx       # Full-height carousel
│   ├── Navbar.tsx           # Navigation bar
│   ├── ProductCarousel.tsx  # Horizontal scroll carousel
│   ├── ProductCard.tsx      # Individual product display
│   ├── Ticker.tsx          # Marquee banner
│   ├── EditorialIntro.tsx   # Brand storytelling
│   ├── ShopPanels.tsx       # Category grid
│   ├── VisionSection.tsx    # Brand philosophy
│   ├── WhyBuy.tsx          # Trust builders
│   ├── Newsletter.tsx       # Email signup
│   ├── IGFeed.tsx          # Instagram integration
│   ├── ComingSoon.tsx       # Feature placeholder
│   ├── Footer.tsx          # Footer section
│   └── [other components]
├── context/                 # React Context
│   └── CursorProvider.tsx   # Custom cursor state
├── types/                   # TypeScript interfaces
│   └── index.ts            # Type definitions
└── lib/                     # Utilities & constants
    └── constants.ts         # Navigation, categories, etc.
```

### Component Patterns

**Use Client Components:**
- Almost all components are 'use client'
- State management, event handlers require client rendering
- Custom cursor provider is client-side

**Type Safety:**
- All components have TypeScript interfaces
- Props validation through types
- Type-safe navigation and routing

---

## Navigation & Routing

### Next.js App Router

- File-based routing in `app/` directory
- Dynamic routes for categories and products
- Programmatic navigation with `useRouter()`
- Pathname detection with `usePathname()`

### Navigation Links

**Primary Routes:**
- `/` — Homepage
- `/categories/[category]` — Category pages
- `/about` — About/mission page
- `/journal` — Editorial/blog content
- `/collections` — Curated collections

**External Links:**
- Instagram profile
- Email contact
- Cart/shopping functionality

---

## Code Patterns & Best Practices

### React Hooks Usage

- `useState` for component state
- `useRef` for DOM access and animation tracking
- `useCallback` for memoized callbacks
- `useEffect` for lifecycle management
- `usePathname()`, `useRouter()` for routing
- `useCursor()` custom hook for cursor context

### Performance Patterns

```typescript
// Memoized callbacks to prevent unnecessary re-renders
const goTo = useCallback((index: number) => { ... }, [slides.length])

// Cleanup for intervals and animations
useEffect(() => {
  const interval = setInterval(...)
  return () => clearInterval(interval)
}, [dependency])

// Ref-based animation optimization
const rafRef = useRef<number | null>(null)
rafRef.current = requestAnimationFrame(animate)
```

### Event Handling

- Click-outside detection for dropdowns
- Mouse tracking with minimal overhead
- Touch device detection and fallback
- Keyboard navigation for menus

---

## Browser Compatibility

### Supported Browsers

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

### CSS Features Used

- CSS Grid and Flexbox
- CSS Transforms and Transitions
- CSS Animations (keyframes)
- CSS Filter effects
- CSS Backdrop filter (glass morphism)
- CSS Custom Properties (if used in future)

### JavaScript Features

- ES2020+ (async/await, optional chaining, nullish coalescing)
- requestAnimationFrame API
- Intersection Observer (potential future use)
- ResizeObserver (potential future use)

---

## Future Enhancements & Roadmap

**Planned Features:**
- Product detail pages with gallery
- Shopping cart persistence
- User authentication & accounts
- Wishlist functionality
- Search & filtering
- Product reviews
- Blog/journal content system
- Email campaign integration
- Analytics & tracking
- A/B testing for CTA optimization

**Technical Improvements:**
- Implement Intersection Observer for lazy loading
- Add service worker for offline support
- Optimize bundle size with code splitting
- Implement Image CDN for faster delivery
- Add dark mode toggle
- Enhanced mobile experience with touch optimizations

---

## Summary

The Midcenturist frontend is a premium, carefully crafted e-commerce experience that prioritizes:

1. **Elegance** — Minimalist design with sophisticated typography
2. **Performance** — Optimized images, animations, and code
3. **Interactivity** — Custom cursor, smooth animations, responsive interactions
4. **Accessibility** — ARIA attributes, semantic HTML, keyboard navigation
5. **Brand Alignment** — Every element reinforces the mid-century modern aesthetic

The architecture is built for scalability, with clear component organization, type safety, and responsive design that works seamlessly across all devices. The codebase prioritizes code quality, maintainability, and developer experience.