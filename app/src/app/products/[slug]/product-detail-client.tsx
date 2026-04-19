'use client'

import { useState } from 'react'
import { Product, ProductVariant, submitReview } from '@/lib/api'
import { useCart } from '@/context/CartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarSolid, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link'

export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || ({} as ProductVariant)
  )
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem, isLoading } = useCart()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleAddToCart = async () => {
    try {
      setError(null)
      setSuccess(false)
      await addItem(selectedVariant.id, quantity)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add to cart')
    }
  }

  const isSold = product.status === 'sold' || product.status === 'archived'
  const isAvailable = selectedVariant?.is_available && !isSold

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div>
        {product.badge && (
          <span
            className={`inline-block text-xs uppercase tracking-widest-2 font-light px-3 py-1 mb-4 rounded-full ${
              product.badge === 'Sale'
                ? 'bg-status-arch text-white'
                : product.badge === 'New In'
                  ? 'bg-status-live text-white'
                  : 'bg-status-draft text-white'
            }`}
          >
            {product.badge}
          </span>
        )}
        <h1 className="font-serif text-4xl md:text-5xl text-brand-black mb-2">{product.name}</h1>
        {product.category && (
          <Link
            href={`/categories/${product.category.slug}`}
            className="text-xs uppercase tracking-widest-2 text-brand-muted hover:text-brand-black transition-colors"
          >
            {product.category.name}
          </Link>
        )}
      </div>

      {/* Price */}
      <div className="mt-8 pb-8 border-b border-brand-rule">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-3xl text-brand-black">
            R{selectedVariant?.effective_price?.toLocaleString()}
          </span>
          {selectedVariant?.on_sale && selectedVariant?.price !== selectedVariant?.effective_price && (
            <span className="font-serif text-lg line-through text-brand-muted">
              R{selectedVariant?.price?.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className="mt-8 pb-8 border-b border-brand-rule">
          <h3 className="text-xs uppercase tracking-widest-2 font-light text-brand-muted mb-3">
            About This Piece
          </h3>
          <p className="text-sm text-brand-black font-light leading-[1.9] tracking-[0.02em]">
            {product.description}
          </p>
        </div>
      )}

      {/* Details */}
      {(product.era || product.material || product.year || product.condition) && (
        <div className="mt-8 pb-8 border-b border-brand-rule">
          <h3 className="text-xs uppercase tracking-widest-2 font-light text-brand-muted mb-4">
            Details
          </h3>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-3">
            {product.era && (
              <div>
                <dt className="text-[0.6rem] text-brand-muted uppercase tracking-widest-2">Era</dt>
                <dd className="text-sm text-brand-black mt-0.5">{product.era}</dd>
              </div>
            )}
            {product.year && (
              <div>
                <dt className="text-[0.6rem] text-brand-muted uppercase tracking-widest-2">Year</dt>
                <dd className="text-sm text-brand-black mt-0.5">{product.year}</dd>
              </div>
            )}
            {product.material && (
              <div>
                <dt className="text-[0.6rem] text-brand-muted uppercase tracking-widest-2">Material</dt>
                <dd className="text-sm text-brand-black mt-0.5">{product.material}</dd>
              </div>
            )}
            {product.condition && (
              <div>
                <dt className="text-[0.6rem] text-brand-muted uppercase tracking-widest-2">Condition</dt>
                <dd className="text-sm text-brand-black mt-0.5">{product.condition}</dd>
              </div>
            )}
          </dl>
        </div>
      )}

      {/* Variants */}
      {product.variants.length > 1 && (
        <div className="mt-8 pb-8 border-b border-brand-rule">
          <h3 className="text-xs uppercase tracking-widest-2 font-light text-brand-muted mb-4">
            Options
          </h3>
          <div className="flex flex-wrap gap-3">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={`px-4 py-2 border rounded-sm text-sm transition-all ${
                  selectedVariant.id === variant.id
                    ? 'border-brand-black bg-brand-black text-white'
                    : 'border-brand-rule hover:border-brand-black'
                }`}
                disabled={!variant.is_available}
              >
                {variant.name || `Option ${product.variants.indexOf(variant) + 1}`}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & Add to Cart */}
      <div className="mt-8 pb-8 border-b border-brand-rule">
        {isAvailable ? (
          <>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-brand-rule rounded-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-sm hover:bg-brand-off transition-colors"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="px-4 py-2 text-sm border-l border-r border-brand-rule min-w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(selectedVariant?.stock_qty || 10, quantity + 1))
                  }
                  className="px-4 py-2 text-sm hover:bg-brand-off transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-brand-muted">
                {selectedVariant?.stock_qty} available
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="w-full py-4 bg-brand-black text-white font-light uppercase tracking-widest-2 text-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
            >
              {isLoading ? 'Adding...' : 'Add to cart'}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-status-arch/10 border border-status-arch text-status-arch text-sm rounded-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mt-4 p-3 bg-status-live/10 border border-status-live text-status-live text-sm rounded-sm">
                Added to cart! View your bag or continue shopping.
              </div>
            )}
          </>
        ) : (
          <div className="py-4 px-4 bg-brand-off/50 rounded-sm text-center">
            <p className="text-sm text-brand-muted">{isSold ? 'Sold out' : 'Not available'}</p>
          </div>
        )}
      </div>

      {/* Wishlist & Info */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="py-2 px-4 border border-brand-rule hover:border-brand-black transition-colors rounded-sm flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faHeartRegular} className="text-sm" />
          <span className="text-xs uppercase tracking-widest-2 font-light">
            {isWishlisted ? 'In wishlist' : 'Add to wishlist'}
          </span>
        </button>
        <span className="text-xs text-brand-muted uppercase tracking-widest-2">
          SKU: {selectedVariant?.sku || 'N/A'}
        </span>
      </div>

      {/* Shipping Info */}
      <div className="mt-12 space-y-3 text-xs text-brand-muted uppercase tracking-widest-2">
        <p className="flex items-center gap-2"><FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-status-live" /> Free shipping on orders over R500</p>
        <p className="flex items-center gap-2"><FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-status-live" /> Authentic, fully restored pieces</p>
        <p className="flex items-center gap-2"><FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-status-live" /> Collection by appointment available</p>
      </div>

      {/* Reviews Section */}
      <div className="mt-16 pt-8 border-t border-brand-rule">
        <h3 className="text-xs uppercase tracking-widest-2 font-light text-brand-muted mb-6">
          Reviews {product.reviews && product.reviews.length > 0 && `(${product.reviews.length})`}
        </h3>

        {/* Existing reviews */}
        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-6 mb-10">
            {product.reviews.map((review) => (
              <div key={review.id} className="border-b border-brand-rule/50 pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FontAwesomeIcon
                        key={star}
                        icon={star <= review.rating ? faStarSolid : faStarRegular}
                        className="w-3 h-3 text-brand-black"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-light text-brand-muted">
                    {review.reviewer_name}
                  </span>
                </div>
                {review.comment && (
                  <p className="text-sm text-brand-black font-light leading-relaxed">
                    {review.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-brand-muted font-light mb-8">No reviews yet.</p>
        )}

        {/* Review form */}
        <ReviewForm productId={product.id} />
      </div>
    </div>
  )
}

function ReviewForm({ productId }: { productId: string }) {
  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [hoverRating, setHoverRating] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setFormError(null)

    try {
      await submitReview({
        product_id: productId,
        reviewer_name: name,
        rating,
        comment: comment || undefined,
      })
      setSubmitted(true)
      setName('')
      setRating(5)
      setComment('')
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to submit review')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="p-4 bg-status-live/10 border border-status-live rounded-sm">
        <p className="text-sm text-status-live font-light">
          Thank you! Your review has been submitted and will appear once approved.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmitReview} className="space-y-4">
      <h4 className="font-serif text-lg text-brand-black">Leave a Review</h4>

      {/* Star rating */}
      <div>
        <label className="text-xs uppercase tracking-widest-2 text-brand-muted font-light block mb-2">
          Rating
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-0.5"
              aria-label={`${star} star${star > 1 ? 's' : ''}`}
            >
              <FontAwesomeIcon
                icon={star <= (hoverRating || rating) ? faStarSolid : faStarRegular}
                className="w-5 h-5 text-brand-black transition-colors"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Name */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        required
        className="w-full px-4 py-3 border border-brand-rule rounded-sm text-sm focus:outline-none focus:border-brand-black"
      />

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Your review (optional)"
        rows={3}
        className="w-full px-4 py-3 border border-brand-rule rounded-sm text-sm focus:outline-none focus:border-brand-black resize-none"
      />

      {formError && (
        <div className="p-3 bg-status-arch/10 border border-status-arch text-status-arch text-sm rounded-sm">
          {formError}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting || !name}
        className="px-6 py-3 bg-brand-black text-white font-light uppercase tracking-widest-2 text-xs hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {submitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  )
}
