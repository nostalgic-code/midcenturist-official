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
  variant: {
    id: string
    price: number
    effective_price: number
    [key: string]: unknown
  } | null
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

export interface ShippingAddress {
  address_line1: string
  city: string
  province?: string
  postal_code?: string
}

export interface BillingAddress {
  name: string
  email: string
  phone: string
}

export interface CreateOrderPayload {
  session_id: string
  fulfillment_type: 'collection' | 'shipping'
  billing_address: BillingAddress
  shipping_address?: ShippingAddress
  notes?: string
}

export interface Order {
  order_number: string
  status: string
  fulfillment_type: 'collection' | 'shipping'
  total_amount: number
  customer_name: string | null
  fulfillment_address: Record<string, string> | null
  items: Array<{
    quantity: number
    price_at_purchase: number
    product_snapshot: { product_name: string; [key: string]: unknown }
  }>
}

export interface ProductListResponse {
  products: Product[]
  total: number
  page: number
  limit: number
  pages: number
}

// ─── API Error ────────────────────────────────────────────────────────────────

export class ApiError extends Error {
  status: number
  errors?: string[]
  available?: number

  constructor(status: number, message: string, errors?: string[], available?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
    this.available = available
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: 'Unknown error' }))
    throw new ApiError(
      res.status,
      body.error || `API error ${res.status}`,
      body.errors,
      body.available,
    )
  }

  return res.json()
}

// ─── Products ─────────────────────────────────────────────────────────────────

export interface ProductFilters {
  category?: string
  collection?: string
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
// POST /api/cart                          → create cart  (returns { session_id, cart })
// GET  /api/cart/:sessionId               → get cart
// POST /api/cart/:sessionId/items         → add item     { product_variant_id, quantity }
// PUT  /api/cart/:sessionId/items/:itemId → update qty   { quantity } (qty 0 removes)
// DELETE /api/cart/:sessionId             → clear cart

export async function createCart(): Promise<{ session_id: string; cart: Cart }> {
  return apiFetch<{ session_id: string; cart: Cart }>('/api/cart', { method: 'POST' })
}

export async function getCart(sessionId: string): Promise<Cart> {
  return apiFetch<Cart>(`/api/cart/${encodeURIComponent(sessionId)}`)
}

export async function addToCart(
  sessionId: string,
  productVariantId: string,
  quantity: number = 1
): Promise<Cart> {
  return apiFetch<Cart>(`/api/cart/${encodeURIComponent(sessionId)}/items`, {
    method: 'POST',
    body: JSON.stringify({ product_variant_id: productVariantId, quantity }),
  })
}

export async function updateCartItem(
  sessionId: string,
  itemId: string,
  quantity: number
): Promise<Cart> {
  return apiFetch<Cart>(`/api/cart/${encodeURIComponent(sessionId)}/items/${encodeURIComponent(itemId)}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  })
}

export async function clearCart(sessionId: string): Promise<void> {
  await apiFetch<void>(`/api/cart/${encodeURIComponent(sessionId)}`, { method: 'DELETE' })
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
  return apiFetch<Order>(`/api/orders/${encodeURIComponent(orderId)}`)
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

// ─── Reviews ──────────────────────────────────────────────────────────────────

export async function submitReview(data: {
  product_id: string
  reviewer_name: string
  rating: number
  comment?: string
}): Promise<{ message: string }> {
  return apiFetch('/api/reviews', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// ─── Health ───────────────────────────────────────────────────────────────────

export async function healthCheck(): Promise<{ status: string }> {
  return apiFetch('/api/health')
}
