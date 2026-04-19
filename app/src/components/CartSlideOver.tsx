'use client'

import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faArrowRight, faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

export default function CartSlideOver() {
  const { cart, isOpen, closeCart, updateItem, removeItem, isLoading } = useCart()
  const router = useRouter()

  const handleCheckout = () => {
    closeCart()
    router.push('/checkout')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[300] bg-black/30 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Slide-over panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 h-full z-[301] w-full max-w-md bg-white flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-brand-rule shrink-0">
              <div>
                <h2 className="font-serif text-2xl text-brand-black">Your Bag</h2>
                {cart && cart.items.length > 0 && (
                  <p className="text-[0.55rem] uppercase tracking-widest-2 text-brand-muted mt-1">
                    {cart.items.length} item{cart.items.length !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
              <button
                onClick={closeCart}
                className="w-10 h-10 flex items-center justify-center hover:bg-brand-off transition-colors duration-300"
                aria-label="Close cart"
              >
                <FontAwesomeIcon icon={faXmark} className="w-5 h-5 text-brand-black" />
              </button>
            </div>

            {/* Items list */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-0">
              {cart && cart.items.length > 0 ? (
                cart.items.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex gap-4 border-b border-brand-rule/50 py-6 first:pt-0"
                  >
                    {/* Product image */}
                    <div className="relative w-[72px] h-[90px] bg-brand-off overflow-hidden shrink-0">
                      {item.product?.primary_image ? (
                        <Image
                          src={item.product.primary_image.url}
                          alt={item.product?.name || 'Product'}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[0.5rem] text-brand-muted uppercase tracking-widest-2">
                          No image
                        </div>
                      )}
                    </div>

                    {/* Item details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        {item.product && (
                          <Link
                            href={`/products/${item.product.slug}`}
                            onClick={closeCart}
                            className="font-serif text-sm text-brand-black hover:opacity-60 transition-opacity duration-300 truncate block"
                          >
                            {item.product.name}
                          </Link>
                        )}
                        <p className="text-[0.6rem] text-brand-muted uppercase tracking-widest-2 mt-1">
                          R{item.variant?.effective_price?.toLocaleString() || '0'} each
                        </p>
                      </div>

                      {/* Quantity controls & remove */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-brand-rule">
                          <button
                            onClick={() => updateItem(item.id, Math.max(1, item.quantity - 1))}
                            disabled={isLoading || item.quantity <= 1}
                            className="w-7 h-7 flex items-center justify-center hover:bg-brand-off transition-colors duration-200 disabled:opacity-30"
                            aria-label="Decrease quantity"
                          >
                            <FontAwesomeIcon icon={faMinus} className="w-2 h-2" />
                          </button>
                          <span className="w-8 text-center text-xs font-light">{item.quantity}</span>
                          <button
                            onClick={() => updateItem(item.id, item.quantity + 1)}
                            disabled={isLoading}
                            className="w-7 h-7 flex items-center justify-center hover:bg-brand-off transition-colors duration-200 disabled:opacity-30"
                            aria-label="Increase quantity"
                          >
                            <FontAwesomeIcon icon={faPlus} className="w-2 h-2" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          disabled={isLoading}
                          className="p-1.5 hover:bg-status-arch/10 transition-colors duration-200 disabled:opacity-50"
                          aria-label="Remove from cart"
                        >
                          <FontAwesomeIcon icon={faTrash} className="w-3 h-3 text-brand-muted hover:text-status-arch transition-colors" />
                        </button>
                      </div>
                    </div>

                    {/* Line total */}
                    <div className="text-right shrink-0 self-start pt-0.5">
                      <p className="font-serif text-sm text-brand-black">
                        R{item.line_total.toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center">
                  <p className="font-serif text-lg text-brand-black mb-2">Your bag is empty</p>
                  <p className="text-[0.6rem] uppercase tracking-widest-2 text-brand-muted">
                    Continue browsing to add pieces
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart && cart.items.length > 0 && (
              <div className="border-t border-brand-rule px-8 py-6 space-y-4 shrink-0 bg-brand-off/30">
                {/* Total */}
                <div className="flex justify-between items-baseline">
                  <span className="text-[0.6rem] uppercase tracking-widest-2 text-brand-muted">Subtotal</span>
                  <span className="font-serif text-xl text-brand-black">
                    R{cart.total.toLocaleString()}
                  </span>
                </div>

                {/* Checkout button */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-brand-black text-white font-light uppercase tracking-widest-2 text-[0.6rem] hover:opacity-90 active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5" />
                </button>

                {/* Continue shopping */}
                <button
                  onClick={closeCart}
                  className="w-full py-3 border border-brand-rule text-brand-black font-light uppercase tracking-widest-2 text-[0.6rem] hover:bg-brand-off transition-colors duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
