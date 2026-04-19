'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { useCursor } from '@/context/CursorProvider'
import { useCart } from '@/context/CartContext'
import { Product } from '@/lib/api'
import { motion, AnimatePresence } from 'framer-motion'

const BADGE_STYLES: Record<string, string> = {
  'New In': 'bg-brand-black text-white',
  'Last One': 'bg-brand-off-d text-brand-black',
  'Sale': 'bg-brand-black text-white',
}

interface ProductCardProps {
  id?: string
  name?: string
  era?: string
  material?: string
  year?: number
  price?: number
  originalPrice?: number
  imageUrl?: string
  badge?: string
  isSold?: boolean
  product?: Product
}

export default function ProductCard({
  product,
  id: _id,
  name,
  era,
  material,
  year: _year,
  price,
  originalPrice,
  imageUrl,
  badge,
  isSold = false,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const { setHoverLabel } = useCursor()
  const { addItem } = useCart()

  if (product) {
    const displayName = product.name
    const displayEra = product.era || ''
    const displayMaterial = product.material || ''
    const displayPrice = product.variants[0]?.effective_price ?? 0
    const displayOriginalPrice = product.variants[0]?.price !== product.variants[0]?.effective_price
      ? product.variants[0]?.price
      : undefined
    const displayImage = product.primary_image?.url || product.images[0]?.url || ''
    const displayBadge = product.badge === 'Last One' || product.status === 'sold' ? 'Last One' : product.badge
    const displaySold = product.status === 'sold' || product.status === 'archived'
    const isAvailable = product.variants[0]?.is_available && !displaySold

    const handleAddToCart = async (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      if (!product.variants[0] || !isAvailable) return
      setIsAdding(true)
      try {
        await addItem(product.variants[0].id, 1)
        setShowNotification(true)
        setTimeout(() => setShowNotification(false), 2000)
      } catch (err) {
        console.error('Failed to add to cart:', err)
      } finally {
        setIsAdding(false)
      }
    }

    return (
      <Link href={`/products/${product.slug}`}>
        <article
          className="group flex flex-col cursor-pointer"
          onMouseEnter={() => { setHovered(true); setHoverLabel('View') }}
          onMouseLeave={() => { setHovered(false); setHoverLabel(null) }}
          aria-label={`${displayName}, ${displayEra} ${displayMaterial}, R${displayPrice}`}
        >
          <div className="relative w-full overflow-hidden bg-brand-off" style={{ aspectRatio: '3/4' }}>
            <Image
              src={displayImage}
              alt={`${displayName} — ${displayEra} ${displayMaterial}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-all duration-[800ms] ease-out-expo group-hover:scale-[1.06]"
              loading="lazy"
            />

            {/* Subtle hover overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-brand-black/20 to-transparent transition-opacity duration-500"
              style={{ opacity: hovered ? 1 : 0 }}
              aria-hidden="true"
            />

            {/* Badge */}
            {displayBadge && (
              <div className={`absolute top-3 left-3 px-2.5 py-1 text-[0.42rem] uppercase tracking-widest-2 font-light ${BADGE_STYLES[displayBadge] ?? 'bg-brand-off text-brand-black'}`}>
                {displayBadge}
              </div>
            )}

            {/* Action buttons */}
            <div className={`absolute top-3 right-3 flex flex-col gap-1.5 transition-all duration-400 ease-out-expo ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}>
              <button
                className="w-[32px] h-[32px] bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors duration-200"
                aria-label={`Add ${displayName} to wishlist`}
                onClick={(e) => e.preventDefault()}
              >
                <FontAwesomeIcon icon={faHeartRegular} className="w-3 h-3 text-brand-black" />
              </button>
              <button
                className="w-[32px] h-[32px] bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors duration-200"
                aria-label={`Zoom ${displayName}`}
                onClick={(e) => e.preventDefault()}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} className="w-3 h-3 text-brand-black" />
              </button>
            </div>

            {/* Add to Cart */}
            {!displaySold && (
              <button
                onClick={handleAddToCart}
                disabled={isAdding || !isAvailable}
                className={`absolute bottom-0 left-0 right-0 bg-brand-black/95 backdrop-blur-sm flex items-center justify-center gap-2.5 py-3.5 transition-all duration-400 ease-out-expo disabled:opacity-50 ${
                  hovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
              >
                <FontAwesomeIcon icon={faBagShopping} className="w-3 h-3 text-white" aria-hidden="true" />
                <span className="font-sans text-white text-[0.5rem] uppercase tracking-widest-2 font-light">
                  {isAdding ? 'Adding...' : 'Add to Cart'}
                </span>
              </button>
            )}

            {/* Notification */}
            <AnimatePresence>
              {showNotification && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-status-live text-white text-[0.6rem] px-4 py-2 whitespace-nowrap tracking-wider font-light"
                >
                  Added to cart
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info strip */}
          <div className="mt-4 grid gap-1" style={{ gridTemplateColumns: '1fr auto' }}>
            <div className="min-w-0">
              <p className="text-[0.48rem] uppercase tracking-widest-2 text-brand-muted/70 font-light truncate">
                {displayEra} · {displayMaterial}
              </p>
              <h3 className="font-serif text-[1.08rem] font-light text-brand-black leading-tight mt-1 truncate group-hover:text-brand-black/80 transition-colors">
                {displayName}
              </h3>
            </div>
            <div className="text-right shrink-0 ml-3">
              {displaySold ? (
                <span className="font-serif text-[1.05rem] font-light text-brand-muted">Sold</span>
              ) : (
                <>
                  <span className="font-serif text-[1.1rem] font-light text-brand-black">
                    R{displayPrice.toLocaleString()}
                  </span>
                  {displayOriginalPrice && (
                    <p className="text-[0.48rem] text-brand-muted line-through font-light mt-0.5">
                      R{displayOriginalPrice.toLocaleString()}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </article>
      </Link>
    )
  }

  // Legacy code path
  const effectiveBadge = isSold ? 'Sold' : badge

  return (
    <article
      className="group flex flex-col"
      onMouseEnter={() => { setHovered(true); setHoverLabel('View') }}
      onMouseLeave={() => { setHovered(false); setHoverLabel(null) }}
      aria-label={`${name}, ${era}, ${material}, R${price}`}
    >
      <div className="relative w-full overflow-hidden bg-brand-off" style={{ aspectRatio: '3/4' }}>
        <Image
          src={imageUrl || ''}
          alt={`${name} — ${era} ${material}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-all duration-[800ms] ease-out-expo group-hover:scale-[1.06]"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/20 to-transparent transition-opacity duration-500" style={{ opacity: hovered ? 1 : 0 }} aria-hidden="true" />

        {effectiveBadge && (
          <div className={`absolute top-3 left-3 px-2.5 py-1 text-[0.42rem] uppercase tracking-widest-2 font-light ${BADGE_STYLES[effectiveBadge] ?? 'bg-brand-off text-brand-black'}`}>
            {effectiveBadge}
          </div>
        )}

        <div className={`absolute top-3 right-3 flex flex-col gap-1.5 transition-all duration-400 ease-out-expo ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}>
          <button className="w-[32px] h-[32px] bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors" aria-label={`Add ${name} to wishlist`}>
            <FontAwesomeIcon icon={faHeartRegular} className="w-3 h-3 text-brand-black" />
          </button>
          <button className="w-[32px] h-[32px] bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors" aria-label={`Zoom ${name}`}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="w-3 h-3 text-brand-black" />
          </button>
        </div>

        {!isSold && (
          <div
            className={`absolute bottom-0 left-0 right-0 bg-brand-black/95 backdrop-blur-sm flex items-center justify-center gap-2.5 py-3.5 transition-all duration-400 ease-out-expo ${hovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
          >
            <FontAwesomeIcon icon={faBagShopping} className="w-3 h-3 text-white" aria-hidden="true" />
            <span className="font-sans text-white text-[0.5rem] uppercase tracking-widest-2 font-light">Add to Cart</span>
          </div>
        )}
      </div>

      <div className="mt-4 grid gap-1" style={{ gridTemplateColumns: '1fr auto' }}>
        <div className="min-w-0">
          <p className="text-[0.48rem] uppercase tracking-widest-2 text-brand-muted/70 font-light truncate">{era} · {material}</p>
          <h3 className="font-serif text-[1.08rem] font-light text-brand-black leading-tight mt-1 truncate">{name}</h3>
        </div>
        <div className="text-right shrink-0 ml-3">
          {isSold ? (
            <span className="font-serif text-[1.05rem] font-light text-brand-muted">Sold</span>
          ) : (
            <>
              <span className="font-serif text-[1.1rem] font-light text-brand-black">R{price?.toLocaleString() || '0'}</span>
              {originalPrice && <p className="text-[0.48rem] text-brand-muted line-through font-light mt-0.5">R{originalPrice.toLocaleString()}</p>}
            </>
          )}
        </div>
      </div>
    </article>
  )
}
