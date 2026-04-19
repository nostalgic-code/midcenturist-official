'use client'

import React, { useRef, useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import ProductCard from './ProductCard'
import type { ProductCardProps } from '@/types'
import type { Product } from '@/lib/api'

interface ProductCarouselProps {
  products?: ProductCardProps[]
  apiProducts?: Product[]
}

export default function ProductCarousel({ products, apiProducts }: ProductCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const [dragged, setDragged] = useState(false)

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true
    startX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0)
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0
    setDragged(false)
    if (trackRef.current) trackRef.current.style.cursor = 'grabbing'
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x = e.pageX - (trackRef.current?.offsetLeft ?? 0)
    const walk = (x - startX.current) * 1.2
    if (Math.abs(walk) > 4) setDragged(true)
    if (trackRef.current) trackRef.current.scrollLeft = scrollLeft.current - walk
  }, [])

  const onMouseUp = useCallback(() => {
    isDragging.current = false
    if (trackRef.current) trackRef.current.style.cursor = 'grab'
  }, [])

  const scroll = (dir: 1 | -1) => {
    if (!trackRef.current) return
    trackRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  return (
    <div className="relative group/carousel">
      {/* Scroll track */}
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto pb-4 px-8 md:px-20 select-none hide-scrollbar"
        style={{ cursor: 'grab', WebkitOverflowScrolling: 'touch' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        aria-label="Product carousel — scroll horizontally"
      >
        {apiProducts
          ? apiProducts.map((p) => (
              <div
                key={p.id}
                className="shrink-0 w-[260px] sm:w-[290px]"
                style={{ pointerEvents: dragged ? 'none' : 'auto' }}
              >
                <ProductCard product={p} />
              </div>
            ))
          : (products || []).map((p) => (
              <div
                key={p.id}
                className="shrink-0 w-[260px] sm:w-[290px]"
                style={{ pointerEvents: dragged ? 'none' : 'auto' }}
              >
                <ProductCard {...p} />
              </div>
            ))
        }
      </div>

      {/* Arrow buttons — elegant hover reveal */}
      <button
        onClick={() => scroll(-1)}
        className="absolute left-3 top-[38%] -translate-y-1/2 w-10 h-10 bg-white/95 backdrop-blur-sm border border-brand-rule flex items-center justify-center text-brand-black hover:bg-brand-black hover:text-white hover:border-brand-black transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 hidden md:flex z-10"
        aria-label="Scroll left"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
      </button>
      <button
        onClick={() => scroll(1)}
        className="absolute right-3 top-[38%] -translate-y-1/2 w-10 h-10 bg-white/95 backdrop-blur-sm border border-brand-rule flex items-center justify-center text-brand-black hover:bg-brand-black hover:text-white hover:border-brand-black transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 hidden md:flex z-10"
        aria-label="Scroll right"
      >
        <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
      </button>

      {/* Fade edges */}
      <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-brand-off to-transparent pointer-events-none z-[5]" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-brand-off to-transparent pointer-events-none z-[5]" aria-hidden="true" />
    </div>
  )
}
