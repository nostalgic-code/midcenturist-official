'use client'

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import { Cart, addToCart, updateCartItem, createCart, getCart, ApiError } from '@/lib/api'
import { getSessionId, setSessionId, clearCartStorage } from '@/lib/cart'

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
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Ensure we have a session — create cart on first visit, or fetch existing
  const ensureCart = useCallback(async (): Promise<string> => {
    const sessionId = getSessionId()
    if (sessionId) {
      // Try to fetch the existing cart
      try {
        const existing = await getCart(sessionId)
        setCart(existing)
        return sessionId
      } catch (err) {
        // 404 or 410 → cart is gone, create a new one
        if (err instanceof ApiError && (err.status === 404 || err.status === 410)) {
          clearCartStorage()
        } else {
          throw err
        }
      }
    }

    // No session or cart expired — create fresh
    const { session_id, cart: newCart } = await createCart()
    setSessionId(session_id)
    setCart(newCart)
    return session_id
  }, [])

  // Initialise on mount
  useEffect(() => {
    ensureCart().catch((e) => console.error('Failed to initialise cart', e))
  }, [ensureCart])

  const refreshCart = useCallback(async () => {
    const sessionId = getSessionId()
    if (!sessionId) return
    try {
      const updated = await getCart(sessionId)
      setCart(updated)
    } catch {
      // ignore — will be handled on next interaction
    }
  }, [])

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    setIsLoading(true)
    try {
      const sessionId = await ensureCart()
      const updated = await addToCart(sessionId, variantId, quantity)
      setCart(updated)
      setIsOpen(true)
    } catch (e) {
      console.error('Failed to add item', e)
      throw e
    } finally {
      setIsLoading(false)
    }
  }, [ensureCart])

  const updateItem = useCallback(async (itemId: string, quantity: number) => {
    const sessionId = getSessionId()
    if (!sessionId) return
    setIsLoading(true)
    try {
      const updated = await updateCartItem(sessionId, itemId, quantity)
      setCart(updated)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Remove = set quantity to 0
  const removeItem = useCallback(async (itemId: string) => {
    const sessionId = getSessionId()
    if (!sessionId) return
    setIsLoading(true)
    try {
      const updated = await updateCartItem(sessionId, itemId, 0)
      setCart(updated)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0

  return (
    <CartContext.Provider value={{
      cart, itemCount, isLoading, isOpen,
      openCart: () => { setIsOpen(true); refreshCart() },
      closeCart: () => setIsOpen(false),
      addItem, updateItem, removeItem, refreshCart,
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
