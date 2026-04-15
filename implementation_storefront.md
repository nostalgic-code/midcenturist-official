# Midcenturist Storefront — API Implementation Guide

**API Base URL:** `https://midcenturist-api.onrender.com`  
**Storefront repo:** `midcenturist-storefront`  
**Status:** API is live on Render. Payments disabled until gateway is confirmed.

---

## Quick-start environment setup

Create `.env.local` in the root of the storefront repo:

```env
NEXT_PUBLIC_API_URL=https://midcenturist-api.onrender.com
```

For local development against your local Flask server:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## What you can build and test right now

| Feature | API Status | Storefront Status |
|---|---|---|
| List all products | ✅ Live | Build `ProductGrid` → `GET /api/products` |
| Product detail page | ✅ Live | Build `/products/[slug]` → `GET /api/products/:slug` |
| Search | ✅ Live | Build search UI → `GET /api/products/search?q=` |
| Category pages | ✅ Live | Build `/categories/[slug]` → `GET /api/categories/:slug/products` |
| Collections | ✅ Live | Build `/collections/[slug]` → `GET /api/collections/:slug/products` |
| Cart (add/update/remove) | ✅ Live | Build `CartContext` + `CartSlideOver` |
| Checkout form | ✅ Live | Build form → `POST /api/orders` |
| Order confirmation page | ✅ Live | Build `/order/[id]` → `GET /api/orders/:id` |
| Newsletter signup | ✅ Live | Wire existing `Newsletter.tsx` |
| Payments | ⛔ Disabled | Do not build yet — gateway not confirmed |

---

## Step 1 — Remove packages that don't belong on the storefront

The storefront currently has `next-auth` and `bcryptjs` installed. These are CMS-only packages. Remove them:

```bash
npm uninstall next-auth bcryptjs @types/bcryptjs
```

Then delete any auth-related files that were created on the storefront (they should only exist in the CMS repo).

---

## Step 2 — Create `src/lib/api.ts`

This is the single file through which all API calls are made. No component should ever call `fetch()` directly.

```typescript
// src/lib/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://midcenturist-api.onrender.com'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProductImage {
  id: string
  url: string
  alt_text: string | null
  sort_order: number
  is_primary: boolean
}

export interface ProductVariant {
  id: string
  product_id: string
  name: string | null
  price: number
  sale_price: number | null
  effective_price: number
  on_sale: boolean
  sku: string | null
  stock_qty: number
  is_available: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  parent_id: string | null
  product_count?: number
  children?: Category[]
}

export interface Collection {
  id: string
  name: string
  slug: string
  description: string | null
  is_active: boolean
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  era: string | null
  material: string | null
  year: number | null
  condition: 'Excellent' | 'Very Good' | 'Good' | 'Restored' | null
  status: 'live' | 'draft' | 'sold' | 'archived'
  badge: 'New In' | 'Last One' | 'Sale' | null
  is_featured: boolean
  is_unique: boolean
  category: Category | null
  variants: ProductVariant[]
  images: ProductImage[]
  primary_image: ProductImage | null
  created_at: string
  updated_at: string
  reviews?: Review[]
}

export interface Review {
  id: string
  reviewer_name: string
  rating: number
  comment: string | null
  created_at: string
}

export interface CartItem {
  id: string
  quantity: number
  variant: ProductVariant | null
  product: {
    id: string
    name: string
    slug: string
    primary_image: ProductImage | null
  } | null
  line_total: number
}

export interface Cart {
  id: string
  session_id: string
  expires_at: string
  items: CartItem[]
  total: number
}

export interface BillingAddress {
  name: string
  email: string
  phone: string
  address_line1?: string
  city?: string
  province?: string
  postal_code?: string
}

export interface CreateOrderPayload {
  session_id: string
  fulfillment_type: 'collection' | 'shipping'
  billing_address: BillingAddress
  shipping_address?: BillingAddress
  collection_address?: { address: string }
  notes?: string
}

export interface Order {
  id: string
  order_number: string
  status: string
  fulfillment_type: 'collection' | 'shipping'
  total_amount: number
  customer_name: string | null
  fulfillment_address: object | null
  items: Array<{
    quantity: number
    price_at_purchase: number
    line_total: number
    product_snapshot: Record<string, unknown>
  }>
}

export interface ProductListResponse {
  products: Product[]
  total: number
  page: number
  limit: number
  pages: number
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Unknown error' }))
    throw new Error(error.error || `API error ${res.status}`)
  }

  return res.json()
}

// ─── Products ─────────────────────────────────────────────────────────────────

export interface ProductFilters {
  category?: string      // category slug
  collection?: string    // collection slug
  featured?: boolean
  badge?: 'New In' | 'Last One' | 'Sale'
  page?: number
  limit?: number
}

export async function getProducts(filters: ProductFilters = {}): Promise<ProductListResponse> {
  const params = new URLSearchParams()
  if (filters.category) params.set('category', filters.category)
  if (filters.collection) params.set('collection', filters.collection)
  if (filters.featured) params.set('featured', 'true')
  if (filters.badge) params.set('badge', filters.badge)
  if (filters.page) params.set('page', String(filters.page))
  if (filters.limit) params.set('limit', String(filters.limit))

  const query = params.toString()
  return apiFetch<ProductListResponse>(`/api/products${query ? `?${query}` : ''}`)
}

export async function getProduct(slug: string): Promise<Product> {
  return apiFetch<Product>(`/api/products/${slug}`)
}

export async function searchProducts(q: string): Promise<{ products: Product[]; total: number; query: string }> {
  return apiFetch(`/api/products/search?q=${encodeURIComponent(q)}`)
}

// ─── Categories & Collections ─────────────────────────────────────────────────

export async function getCategories(): Promise<{ categories: Category[] }> {
  return apiFetch('/api/categories')
}

export async function getCategoryProducts(
  slug: string
): Promise<{ category: Category; products: Product[]; total: number }> {
  return apiFetch(`/api/categories/${slug}/products`)
}

export async function getCollections(): Promise<{ collections: Collection[] }> {
  return apiFetch('/api/collections')
}

export async function getCollectionProducts(
  slug: string
): Promise<{ collection: Collection; products: Product[]; total: number }> {
  return apiFetch(`/api/collections/${slug}/products`)
}

// ─── Cart ─────────────────────────────────────────────────────────────────────

// ⚠️  IMPORTANT — Cart URL structure difference vs blueprint
//
// The live API uses a different URL structure from the blueprint spec.
// Blueprint:  POST /api/cart/:sessionId/items
// Live API:   POST /api/cart/items  (session_id in body)
//
// These functions match what is ACTUALLY live on Render.
// If the API URLs change to the blueprint spec, update these to match.

export async function createCart(): Promise<Cart> {
  // POST /api/cart with a generated session_id in the body
  // The API returns the cart + session_id
  const sessionId = generateSessionId()
  return apiFetch<Cart>('/api/cart', {
    method: 'POST',
    body: JSON.stringify({ session_id: sessionId }),
  })
}

export async function getCart(sessionId: string): Promise<Cart> {
  // The live API takes session_id in query or body — verify with a test call
  // If GET /api/cart?session_id= doesn't work, use POST /api/cart
  return apiFetch<Cart>(`/api/cart?session_id=${sessionId}`)
}

export async function addToCart(
  sessionId: string,
  productVariantId: string,
  quantity: number = 1
): Promise<Cart> {
  return apiFetch<Cart>('/api/cart/items', {
    method: 'POST',
    body: JSON.stringify({ session_id: sessionId, product_variant_id: productVariantId, quantity }),
  })
}

export async function updateCartItem(
  itemId: string,
  quantity: number
): Promise<Cart> {
  return apiFetch<Cart>(`/api/cart/items/${itemId}`, {
    method: 'PATCH',
    body: JSON.stringify({ quantity }),
  })
}

export async function removeCartItem(itemId: string): Promise<Cart> {
  return apiFetch<Cart>(`/api/cart/items/${itemId}`, { method: 'DELETE' })
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export async function createOrder(payload: CreateOrderPayload): Promise<{
  order_id: string
  order_number: string
  total_amount: number
  status: string
}> {
  return apiFetch('/api/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function getOrder(orderId: string): Promise<Order> {
  return apiFetch<Order>(`/api/orders/${orderId}`)
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

export async function subscribeNewsletter(data: {
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  area?: string
  source?: string
}): Promise<{ message: string }> {
  return apiFetch('/api/newsletter/subscribe', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateSessionId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}
```

---

## Step 3 — Create `src/lib/cart.ts`

Manages the `session_id` in `localStorage`. The cart state itself lives in `CartContext` (React state). This file handles the persistence layer only.

```typescript
// src/lib/cart.ts

const SESSION_KEY = 'midcenturist_session_id'
const CART_ID_KEY = 'midcenturist_cart_id'

export function getSessionId(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(SESSION_KEY)
}

export function setSessionId(id: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(SESSION_KEY, id)
}

export function getStoredCartId(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(CART_ID_KEY)
}

export function setStoredCartId(id: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_ID_KEY, id)
}

export function clearCartStorage(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem(CART_ID_KEY)
}
```

---

## Step 4 — Create `src/context/CartContext.tsx`

```typescript
// src/context/CartContext.tsx
'use client'

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import { Cart, CartItem, addToCart, updateCartItem, removeCartItem, createCart } from '@/lib/api'
import { getSessionId, setSessionId, getStoredCartId, setStoredCartId } from '@/lib/cart'

interface CartContextValue {
  cart: Cart | null
  itemCount: number
  isLoading: boolean
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (variantId: string, quantity?: number) => Promise<void>
  updateItem: (itemId: string, quantity: number) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Initialise cart on first load
  useEffect(() => {
    async function initCart() {
      const sessionId = getSessionId()
      if (!sessionId) {
        // First visit — create a new cart
        try {
          const newCart = await createCart()
          setSessionId(newCart.session_id)
          setStoredCartId(newCart.id)
          setCart(newCart)
        } catch (e) {
          console.error('Failed to initialise cart', e)
        }
      }
      // If sessionId exists, cart is loaded on demand when slide-over opens
    }
    initCart()
  }, [])

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    const sessionId = getSessionId()
    if (!sessionId) return

    setIsLoading(true)
    try {
      const updated = await addToCart(sessionId, variantId, quantity)
      setCart(updated)
      setIsOpen(true) // open slide-over after adding
    } catch (e) {
      console.error('Failed to add item', e)
      throw e
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateItem = useCallback(async (itemId: string, quantity: number) => {
    setIsLoading(true)
    try {
      const updated = await updateCartItem(itemId, quantity)
      setCart(updated)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const removeItem = useCallback(async (itemId: string) => {
    setIsLoading(true)
    try {
      const updated = await removeCartItem(itemId)
      setCart(updated)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0

  return (
    <CartContext.Provider value={{
      cart, itemCount, isLoading, isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem, updateItem, removeItem,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
```

---

## Step 5 — Wire CartProvider into root layout

```typescript
// src/app/layout.tsx
import { CartProvider } from '@/context/CartContext'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
```

---

## Step 6 — Static page data fetching

Use Next.js 14 `generateStaticParams` + ISR for product and category pages.

### `/app/products/[slug]/page.tsx`

```typescript
import { getProduct, getProducts } from '@/lib/api'
import { notFound } from 'next/navigation'

// Revalidate every 60 seconds — price/stock changes propagate quickly
export const revalidate = 60

export async function generateStaticParams() {
  const { products } = await getProducts({ limit: 48 })
  return products.map((p) => ({ slug: p.slug }))
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  let product
  try {
    product = await getProduct(params.slug)
  } catch {
    notFound()
  }

  return (
    <div>
      <h1>{product.name}</h1>
      {/* Build your product detail UI here */}
    </div>
  )
}
```

### `/app/categories/[slug]/page.tsx`

```typescript
import { getCategories, getCategoryProducts } from '@/lib/api'

export const revalidate = 300 // 5 minutes

export async function generateStaticParams() {
  const { categories } = await getCategories()
  return categories.map((c) => ({ slug: c.slug }))
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { category, products } = await getCategoryProducts(params.slug)

  return (
    <div>
      <h1>{category.name}</h1>
      {/* product grid */}
    </div>
  )
}
```

---

## Step 7 — Wire the Newsletter component

Your `Newsletter.tsx` component already exists. Connect it to the API:

```typescript
// In Newsletter.tsx — replace the form submit handler with:
import { subscribeNewsletter } from '@/lib/api'

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()
  setLoading(true)
  try {
    await subscribeNewsletter({
      email,
      first_name: firstName,
      source: 'footer',
    })
    setSuccess(true)
  } catch (err) {
    setError('Something went wrong. Please try again.')
  } finally {
    setLoading(false)
  }
}
```

---

## Step 8 — Checkout page

```typescript
// src/app/checkout/page.tsx
'use client'
import { useCart } from '@/context/CartContext'
import { createOrder, CreateOrderPayload } from '@/lib/api'
import { getSessionId, clearCartStorage } from '@/lib/cart'
import { useRouter } from 'next/navigation'

export default function CheckoutPage() {
  const { cart } = useCart()
  const router = useRouter()

  async function handleCheckout(formData: CreateOrderPayload) {
    const sessionId = getSessionId()
    if (!sessionId || !cart) return

    try {
      const order = await createOrder({ ...formData, session_id: sessionId })
      // Payments are disabled — order goes straight to pending status
      // Redirect to confirmation page
      router.push(`/order/${order.order_id}`)
      clearCartStorage()
    } catch (err) {
      // Show error to user
    }
  }

  return (
    <div>
      {/* Checkout form — name, email, phone, fulfillment type (collection/shipping) */}
      {/* No payment UI yet — payments disabled until gateway is confirmed */}
      {/* Show order total from cart.total */}
    </div>
  )
}
```

---

## Step 9 — Order confirmation page

```typescript
// src/app/order/[id]/page.tsx
import { getOrder } from '@/lib/api'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic' // never cache — always fresh order status

export default async function OrderConfirmationPage({ params }: { params: { id: string } }) {
  let order
  try {
    order = await getOrder(params.id)
  } catch {
    notFound()
  }

  return (
    <div>
      <h1>Order confirmed</h1>
      <p>Order number: {order.order_number}</p>
      <p>Status: {order.status}</p>
      <p>Total: R{order.total_amount.toLocaleString()}</p>
      {/* Show items from order.items */}
    </div>
  )
}
```

---

## API behaviour notes — things to be aware of

### Cart URL mismatch vs blueprint

The live API cart endpoints are slightly different from the original blueprint spec. When you make your first cart-related API test call, verify these URLs work:

```bash
# Test: create a cart
curl -X POST https://midcenturist-api.onrender.com/api/cart \
  -H "Content-Type: application/json" \
  -d '{"session_id": "test-123"}'

# Test: add an item (you'll need a real variant UUID from your DB)
curl -X POST https://midcenturist-api.onrender.com/api/cart/items \
  -H "Content-Type: application/json" \
  -d '{"session_id": "test-123", "product_variant_id": "uuid-here", "quantity": 1}'
```

If the endpoints respond correctly, the `lib/api.ts` above will work as-is. If the URLs have changed, update `addToCart`, `updateCartItem`, `removeCartItem` accordingly.

### Products always need at least one variant

Prices live on variants, not on products. When rendering a product card, always read the price from `product.variants[0].effective_price`. Do not use `product.price` — it's deprecated and will be removed.

```typescript
// Correct
const price = product.variants[0]?.effective_price ?? 0

// Wrong — deprecated field, ignore it
const price = (product as any).price
```

### Sold products return 410

If a user navigates to a sold or archived product's URL, the API returns `410 Gone`. Handle this in your product page:

```typescript
// In generateStaticParams, only include live products
// But still handle 410 gracefully if a product sells during the visitor's session
```

---

## What needs to be added to the API before payments can be built

When the client decides on a payment gateway, these changes are needed on the API side:

| What | Why |
|---|---|
| `POST /api/payments/payfast/initiate` | Returns signed form data for PayFast redirect |
| `POST /api/payments/payfast/webhook` (currently `/notify`) | URL mismatch — rename for consistency |
| `POST /api/payments/yoco/initiate` | Charges the Yoco token from frontend popup |
| `POST /api/payments/yoco/webhook` (currently `/callback`) | URL mismatch — rename for consistency |

Do not build any payment UI until the gateway is confirmed and these endpoints are live and tested in sandbox mode.

---

## What's missing that needs to be added to the storefront

| Page / component | Priority | Notes |
|---|---|---|
| `/products/[slug]` — product detail page | High | ISR, image gallery, variant selector, add-to-cart button |
| `CartSlideOver` component | High | Slide-in panel, item list, total, checkout button |
| `/checkout` page | High | Billing form, fulfillment choice (collection/shipping), no payment UI yet |
| `/order/[id]` — confirmation page | High | Show order number, status, items |
| `/categories/[slug]` — wired to API | High | Currently stub — connect `getCategoryProducts` |
| Add-to-cart on `ProductCard` | High | Use `useCart().addItem(variantId)` |
| Cart count on `Navbar` | Medium | Use `useCart().itemCount` |
| Search modal / page | Medium | `searchProducts(q)` is ready |
| `/collections/[slug]` page | Medium | Same pattern as category page |
| Error boundaries on fetch failures | Medium | 404/410 handling on product pages |
| `IsFeed.tsx` — wire to real IG posts | Low | Needs Instagram token — Sprint 2 |
