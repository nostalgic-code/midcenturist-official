# Midcenturist SA — E-Commerce UI Components

You are a senior full-stack engineer assigned to build the core UI components for the **Midcenturist SA** mid-century modern furniture and home décor e-commerce store.

---

## 💼 Objective

Build the following responsive UI components — a **Navbar**, a **Product Card**, a **Hero Slider**, and a **Footer** — based on the Midcenturist SA brand. These components will be used across the entire storefront and must follow consistent styling, responsive layout, and adhere to the application's design system.

---

## 🏷️ Brand Identity

| Property | Value |
|---|---|
| Brand name | Midcenturist SA |
| Tagline | Objects that carry decades of story |
| Tone | Premium, editorial, minimal, black & white |
| Primary font | Century Gothic, fallback: `'Josefin Sans', sans-serif` |
| Display / heading font | `'Cormorant Garamond', Georgia, serif` |
| Colour palette | Pure black `#0c0b0a`, white `#ffffff`, off-white `#f6f4f1`, subtle off `#eeebe6`, muted text `#8c8882` |
| Icon library | Font Awesome 6 Free (via CDN or `@fortawesome/react-fontawesome`) |
| Image treatment | All product images rendered in greyscale (`filter: grayscale(100%)`) with colour revealed on hover |

---

## 🧰 Tech Stack & Structure

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (extend config to include brand colours and fonts)
- **Icons:** Font Awesome 6 via `@fortawesome/react-fontawesome` + `@fortawesome/free-solid-svg-icons` + `@fortawesome/free-brands-svg-icons`
- **Routing:** Next.js `useRouter` and `usePathname` for active nav detection
- **Assets:** All images from `public/` folder

### Folder Structure

```
/src
├── components/
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   ├── HeroSlider.tsx
│   ├── Footer.tsx
├── types/
│   └── index.ts
├── app/
│   ├── globals.css
│   └── layout.tsx
/public/
├── logo/
│   └── m-logo.svg
├── images/
│   └── (product images go here)
```

---

## ✅ Tasks

### 1. Navbar (`Navbar.tsx`)

**Layout:** Logo anchored left · Nav links centred · Action icons right

- **Logo (left):** The standalone `M` monogram in a 44×44px bordered square using Cormorant Garamond. Next to it the wordmark "Midcenturist SA" in Century Gothic at 0.6rem with wide letter-spacing. Both pulled from `public/logo/`. Clicking navigates to `/`
- **Nav links (centre):** Use `position: absolute; left: 50%; transform: translateX(-50%)` to keep links perfectly centred regardless of logo/icon widths. Links: `Home`, `About`, `Categories` (with dropdown), `Contact Us`
- **Categories dropdown:** Opens on hover. Items: Seating (48), Sideboards & Storage (32), Lighting (29), Coffee & Side Tables (21), Bedroom (17), Home Décor (91), On Sale (14). Each item has a Font Awesome icon prefix and a piece count right-aligned
- **Active page indicator:** Use Next.js `usePathname()` to detect the current route. The active link gets: a full-width 1.5px black underline pinned to the bottom of the nav, font-weight bumped from 300 to 400, and a 3px black dot just above the underline. All three signals fire together
- **Action icons (right):** Search (`fa-magnifying-glass`), Wishlist (`fa-regular fa-heart`), Cart (`fa-bag-shopping`) with a 14px black circular badge showing item count
- **Mobile:** Collapses to a hamburger menu at `md` breakpoint. Drawer slides in from the right. All links accessible. Dropdown expands inline in the drawer
- **Sticky:** `position: sticky; top: 0; z-index: 200` with `backdrop-filter: blur(12px)` and `bg-white/97`
- **Custom cursor:** The entire app hides the default cursor. A small 6px black dot follows the mouse instantly. A 36px ring trails with a slight lag using `requestAnimationFrame`. On hoverable elements (product cards, image panels) the ring expands to 72px filled black with white label text ("View", "Shop"). Implement as a `CursorProvider` context wrapped in `layout.tsx`

---

### 2. Product Card (`ProductCard.tsx`)

**Props interface:**

```typescript
interface ProductCardProps {
  id: string
  name: string
  era: string
  material: string
  year: number
  price: number
  originalPrice?: number
  imageUrl: string
  badge?: 'New In' | 'Last One' | 'Sold' | 'Sale'
  isSold?: boolean
}
```

- **Image container:** `aspect-ratio: 3/4`. Image rendered with `filter: grayscale(100%)` transitioning to `grayscale(60%)` on hover. `object-fit: cover`. Use Next.js `<Image />` component with `fill` prop
- **Overlay (appears on hover):** Semi-transparent black overlay at 12% opacity. Top-right: wishlist (`fa-regular fa-heart`) and zoom (`fa-magnifying-glass`) action buttons in 30×30px white squares, sliding in from top with opacity transition. Badge top-left if present
- **Add to Cart bar:** Slides up from the bottom of the image on hover. Full-width, black background, white text, Century Gothic 0.52rem uppercase with wide letter-spacing. Includes `fa-bag-shopping` icon. Hidden on sold items
- **Info strip below image:** CSS grid `1fr auto`. Left: era/material line in 0.5rem muted uppercase, product name in Cormorant Garamond 1.05rem. Right: price in Cormorant Garamond 1.1rem. If `originalPrice` exists show it struck through in muted colour on a second line
- **Sold state:** Badge shows "Sold" in muted background. No Add to Cart bar. Price replaced with "Sold" in muted colour
- **Hover on the card:** Image slightly scales up (`scale(1.05)`), greyscale reduces, actions appear

---

### 3. Hero Slider (`HeroSlider.tsx`)

**Props interface:**

```typescript
interface HeroSlide {
  id: string
  category: string
  eyebrow: string
  titleLine1: string
  titleLine2: string
  titleLine2Italic?: boolean
  subtitle: string
  ctaLabel: string
  ctaHref: string
  imageUrl: string
  featuredPieceName: string
  featuredPiecePrice: string
  featuredPieceYear: number
}

interface HeroSliderProps {
  slides: HeroSlide[]
  autoPlayInterval?: number // default 6000ms
}
```

- **Full bleed image:** Image fills 100% width and height. `filter: grayscale(100%) brightness(0.68)`. A gradient overlay darkens the bottom 65% for text legibility
- **Typography (bottom-left):** Eyebrow line in 0.6rem uppercase with a 28px horizontal rule prefix. Headline in Cormorant Garamond at `clamp(4.5rem, 9vw, 9rem)` weight 300, line-height 0.9. Two lines, second line optionally italic. Subtitle in Century Gothic 0.76rem muted white below
- **CTA button (bottom-right):** Frosted glass style — `background: rgba(255,255,255,0.08)`, `border: 0.5px solid rgba(255,255,255,0.3)`, `backdrop-filter: blur(8px)`. Arrow icon prefix. Hover brightens background slightly
- **Featured piece tag (top-right):** Frosted glass card with `border-top: 1.5px solid rgba(255,255,255,0.5)`. Shows label, piece name, price and year
- **Navigation dots:** Vertical stack on the far right. Inactive: 4px circle at 22% white opacity. Active: 20px tall pill shape, full white. Smooth transition
- **Arrow buttons:** Appear on hover over the slider. Frosted glass squares. Prev left, next slightly inset from right (to avoid overlapping dots)
- **Auto-play:** Advances every 6 seconds. Resets on manual navigation. `useEffect` with `clearInterval` cleanup
- **Clicking a slide** navigates to the category page via `router.push(ctaHref)`
- **Height:** `calc(100vh - 106px)` (accounts for topbar + nav). Min-height 580px
- **Mobile:** Reduce headline size, hide featured piece tag, simplify bottom layout to stacked column

---

### 4. Footer (`Footer.tsx`)

- **Top section — centred logo block:** M monogram in bordered square, brand name in wide-spaced uppercase below, then a row of 5 social icon links: Instagram (`fa-brands fa-instagram`), Facebook (`fa-brands fa-facebook-f`), TikTok (`fa-brands fa-tiktok`), X (`fa-brands fa-x-twitter`), Email (`fa-regular fa-envelope`). Each social icon in a 32×32px bordered square, colour transitions to white on hover
- **Four-column link grid:**
  - Categories: Seating, Sideboards & Storage, Lighting, Coffee & Side Tables, Home Décor, On Sale
  - Shop: New Arrivals, Coming Soon, Available Items, Sold Items, On Sale
  - Info: About Us, Restoration Process, Authenticity, Sell a Piece
  - Support: Shipping & Collection, Layby Terms, Returns Policy, Contact Us, FAQ
  - Each link prefixed with a relevant Font Awesome icon at 13px, 45% opacity
- **Footer bottom bar:** Copyright left `© 2026 Midcenturist SA. All rights reserved.` · "Powered by Astro Technologies" right. Both in 0.54rem, 12% white opacity
- **Background:** Black `#0c0b0a`. All text in white at varying opacities. Hairline `rgba(255,255,255,0.07)` border separates sections
- **Mobile:** Single column. Logo centred. Links stack vertically

---

## 🎨 Tailwind Config Extensions

Add the following to `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'brand-black':  '#0c0b0a',
        'brand-white':  '#ffffff',
        'brand-off':    '#f6f4f1',
        'brand-off-d':  '#eeebe6',
        'brand-muted':  '#8c8882',
        'brand-rule':   'rgba(12,11,10,0.08)',
      },
      fontFamily: {
        sans:    ['"Century Gothic"', '"Josefin Sans"', 'sans-serif'],
        serif:   ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        'widest-2': '0.25em',
        'widest-3': '0.3em',
      },
    },
  },
  plugins: [],
}

export default config
```

---

## 🌐 globals.css

```css
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;200;300&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  cursor: none; /* Custom cursor handles this */
}

body {
  font-family: 'Century Gothic', 'Josefin Sans', sans-serif;
  font-weight: 200;
  background-color: #ffffff;
  color: #0c0b0a;
  overflow-x: hidden;
}

/* Active nav underline animation */
.nav-link-underline {
  transform: scaleX(0);
  transition: transform 0.25s ease;
}
.nav-link-underline.active,
.nav-link:hover .nav-link-underline {
  transform: scaleX(1);
}

/* Greyscale image hover reveal */
.img-grey {
  filter: grayscale(100%);
  transition: filter 0.35s ease, transform 0.6s ease;
}
.img-grey:hover,
.group:hover .img-grey {
  filter: grayscale(60%);
}

/* Frosted glass utility */
.glass {
  background: rgba(255, 255, 255, 0.08);
  border: 0.5px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}
```

---

## 📦 Output Requirements

- `src/components/Navbar.tsx` — sticky, logo-left, links-centre, icons-right, active state, categories dropdown, mobile drawer
- `src/components/ProductCard.tsx` — typed props, greyscale hover, add to cart bar, sold state
- `src/components/HeroSlider.tsx` — full bleed, auto-play, dots, arrows, frosted glass tag
- `src/components/Footer.tsx` — centred logo, 4-column grid, social icons, responsive
- `src/types/index.ts` — all shared TypeScript interfaces
- `tailwind.config.ts` — brand colours, fonts, spacing extended
- `src/app/globals.css` — base styles, font imports, utility classes

---

## 📝 Notes

- **Mobile-first** responsiveness is critical — the majority of SA shoppers browse on mobile
- **Performance:** Use Next.js `<Image />` with `priority` on hero images, `lazy` on product cards
- **Accessibility:** All interactive elements must have `aria-label`. Nav must be keyboard navigable. Colour contrast must pass WCAG AA
- **No placeholder logic** — wire up `onClick`, `href`, and `router.push` properly using Next.js App Router conventions
- **Custom cursor** must be disabled on touch devices (`@media (pointer: coarse)`)
- **Century Gothic** is a system font — always include `'Josefin Sans'` as the immediate fallback in the font stack
- Keep all components **pure UI** — no API calls inside components. Data is passed via props
- Follow the **DRY principle** — shared types live in `src/types/index.ts`, shared constants in `src/lib/constants.ts`




edit pictures 
featured piece 
image represent each category 

delay slider (holdoff)

representative image  midcentury woodsmiths
 

 replace about page with woodsmiths 



 1. landing page - 


image for each category  

decor elements. ---- with images. 
 

 plain white



2.  products available 


about us image - midcentury woodsmiths 

image for about us - 

designs with an s 

same background same size 


values to replace black space 4 


smaller images


















