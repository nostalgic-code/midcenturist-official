'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { createOrder, CreateOrderPayload, clearCart } from '@/lib/api'
import { getSessionId, clearCartStorage } from '@/lib/cart'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faCheck } from '@fortawesome/free-solid-svg-icons'

export default function CheckoutPage() {
  const { cart, closeCart } = useCart()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fulfillmentType, setFulfillmentType] = useState<'collection' | 'shipping'>('shipping')

  // Form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address_line1: '',
    city: '',
    province: '',
    postal_code: '',
    notes: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const sessionId = getSessionId()
      if (!sessionId || !cart) {
        throw new Error('Cart data missing')
      }

      const payload: CreateOrderPayload = {
        session_id: sessionId,
        fulfillment_type: fulfillmentType,
        billing_address: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
      }

      // Add shipping address if shipping
      if (fulfillmentType === 'shipping') {
        payload.shipping_address = {
          address_line1: formData.address_line1,
          city: formData.city,
          province: formData.province || undefined,
          postal_code: formData.postal_code || undefined,
        }
      }

      // Add notes if provided
      if (formData.notes) {
        payload.notes = formData.notes
      }

      const order = await createOrder(payload)
      // Clear cart on API side and locally
      try { await clearCart(sessionId) } catch { /* ignore */ }
      clearCartStorage()
      closeCart()
      router.push(`/order/${order.order_id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create order')
      setIsSubmitting(false)
    }
  }

  if (!cart) {
    return (
      <div className="min-h-screen bg-brand-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-brand-muted mb-4">Your cart is empty</p>
          <Link href="/" className="py-2 px-6 bg-brand-black text-white font-light uppercase tracking-widest-2 text-sm">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-brand-muted mb-4">Your cart is empty</p>
          <Link href="/" className="py-2 px-6 bg-brand-black text-white font-light uppercase tracking-widest-2 text-sm">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-white">
      <div className="max-w-5xl mx-auto px-8 md:px-12 py-12 md:py-16">
        {/* Back button */}
        <Link href="/" className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-black transition-colors duration-300 mb-10">
          <FontAwesomeIcon icon={faChevronLeft} className="w-2.5 h-2.5" />
          <span className="text-[0.6rem] uppercase tracking-widest-2 font-light">Back to shopping</span>
        </Link>

        <div className="mb-12">
          <span className="label-caps text-brand-muted block mb-3">Checkout</span>
          <h1 className="font-serif text-4xl md:text-[3rem] text-brand-black font-light">Complete Your Order</h1>
          <div className="rule mt-6 max-w-[80px]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="border-b border-brand-rule pb-8">
                <h2 className="font-serif text-xl text-brand-black mb-2">Contact Information</h2>
                <p className="text-[0.6rem] text-brand-muted uppercase tracking-widest-2 mb-6">Required details</p>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-rule text-sm font-light focus:outline-none focus:border-brand-black focus:bg-white transition-colors duration-300"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-rule text-sm font-light focus:outline-none focus:border-brand-black focus:bg-white transition-colors duration-300"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-rule text-sm font-light focus:outline-none focus:border-brand-black focus:bg-white transition-colors duration-300"
                  />
                </div>
              </div>

              {/* Fulfillment Type */}
              <div className="border-b border-brand-rule pb-8">
                <h2 className="font-serif text-xl text-brand-black mb-2">Fulfillment Method</h2>
                <p className="text-[0.6rem] text-brand-muted uppercase tracking-widest-2 mb-6">Choose how to receive your order</p>
                <div className="space-y-3">
                  <label className={`flex items-center p-5 border cursor-pointer transition-all duration-300 ${fulfillmentType === 'shipping' ? 'border-brand-black bg-brand-cream/30' : 'border-brand-rule hover:border-brand-black/30'}`}>
                    <input
                      type="radio"
                      name="fulfillment"
                      value="shipping"
                      checked={fulfillmentType === 'shipping'}
                      onChange={() => setFulfillmentType('shipping')}
                      className="w-4 h-4 accent-brand-black"
                    />
                    <div className="ml-4">
                      <p className="font-serif text-sm text-brand-black">Shipping</p>
                      <p className="text-[0.6rem] text-brand-muted uppercase tracking-widest-2 mt-0.5">Free on orders over R500</p>
                    </div>
                  </label>
                  <label className={`flex items-center p-5 border cursor-pointer transition-all duration-300 ${fulfillmentType === 'collection' ? 'border-brand-black bg-brand-cream/30' : 'border-brand-rule hover:border-brand-black/30'}`}>
                    <input
                      type="radio"
                      name="fulfillment"
                      value="collection"
                      checked={fulfillmentType === 'collection'}
                      onChange={() => setFulfillmentType('collection')}
                      className="w-4 h-4 accent-brand-black"
                    />
                    <div className="ml-4">
                      <p className="font-serif text-sm text-brand-black">Collection by Appointment</p>
                      <p className="text-[0.6rem] text-brand-muted uppercase tracking-widest-2 mt-0.5">Johannesburg-based warehouse</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Address/Details */}
              {fulfillmentType === 'shipping' ? (
                <div className="border-b border-brand-rule pb-8">
                  <h2 className="font-serif text-xl text-brand-black mb-2">Shipping Address</h2>
                  <p className="text-[0.6rem] text-brand-muted uppercase tracking-widest-2 mb-6">Where we&apos;ll deliver</p>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="address_line1"
                      placeholder="Street Address"
                      value={formData.address_line1}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-rule text-sm font-light focus:outline-none focus:border-brand-black focus:bg-white transition-colors duration-300"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-rule text-sm font-light focus:outline-none focus:border-brand-black focus:bg-white transition-colors duration-300"
                      />
                      <input
                        type="text"
                        name="province"
                        placeholder="Province"
                        value={formData.province}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-rule text-sm font-light focus:outline-none focus:border-brand-black focus:bg-white transition-colors duration-300"
                      />
                    </div>
                    <input
                      type="text"
                      name="postal_code"
                      placeholder="Postal Code"
                      value={formData.postal_code}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-rule text-sm font-light focus:outline-none focus:border-brand-black focus:bg-white transition-colors duration-300"
                    />
                  </div>
                </div>
              ) : (
                <div className="border-b border-brand-rule pb-8">
                  <h2 className="font-serif text-xl text-brand-black mb-6">Collection</h2>
                  <p className="text-sm text-brand-muted font-light leading-relaxed">
                    You&apos;ll collect from our Johannesburg-based warehouse. We&apos;ll contact you to arrange a time once your order is confirmed.
                  </p>
                </div>
              )}

              {/* Additional Notes */}
              <div className="pb-8">
                <h2 className="font-serif text-xl text-brand-black mb-6">Additional Notes</h2>
                <textarea
                  name="notes"
                  placeholder="Any special instructions or notes for your order..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-brand-cream/50 border border-brand-rule text-sm font-light focus:outline-none focus:border-brand-black focus:bg-white transition-colors duration-300 resize-none"
                />
              </div>

              {/* Error message */}
              {error && (
                <div className="p-4 bg-status-arch/10 border border-status-arch text-status-arch text-sm font-light">
                  {error}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-brand-black text-white font-light uppercase tracking-widest-2 text-[0.65rem] hover:opacity-90 active:scale-[0.99] transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-brand-off p-8">
              <h3 className="font-serif text-lg text-brand-black mb-2">Order Summary</h3>
              <div className="rule max-w-[60px] mb-6" />
              <div className="space-y-3 mb-6 border-b border-brand-rule pb-6">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-brand-black">
                      {item.product?.name} × {item.quantity}
                    </span>
                    <span className="text-brand-black font-serif">
                      R{item.line_total.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="font-serif text-lg text-brand-black">Total</span>
                <span className="font-serif text-2xl text-brand-black">
                  R{cart.total.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-brand-muted mt-4 uppercase tracking-widest-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-status-live" /> Payments disabled until gateway confirmed
              </p>
              <p className="text-xs text-brand-muted mt-2 uppercase tracking-widest-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-status-live" /> Order will be placed in pending status
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
