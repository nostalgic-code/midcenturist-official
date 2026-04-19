'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { useReveal } from '@/lib/useReveal'

const IG_TILES = [
  { src: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=300&q=80', price: 'R 14,500', sold: false },
  { src: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=300&q=80', price: 'R 9,800', sold: true },
  { src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80', price: 'R 22,000', sold: false },
  { src: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=300&q=80', price: 'R 1,950', sold: false },
  { src: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=300&q=80', price: 'R 4,200', sold: false },
  { src: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?w=300&q=80', price: 'R 8,500', sold: true },
]

export default function IGFeed() {
  const sectionRef = useReveal<HTMLElement>()

  return (
    <section ref={sectionRef} className="reveal-up bg-white py-28 px-8 md:px-20 border-t border-brand-rule" aria-labelledby="ig-heading">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
        <div>
          <span className="label-caps text-brand-muted mb-3 block">
            As Seen On Instagram
          </span>
          <h2 id="ig-heading" className="font-serif text-[clamp(2rem,3vw,3rem)] font-light text-brand-black">
            @midcenturist_sa
          </h2>
        </div>
        <a
          href="https://instagram.com/midcenturist_sa"
          target="_blank"
          rel="noopener noreferrer"
          className="group/ig inline-flex items-center gap-2.5 border border-brand-rule px-6 py-3 font-sans text-[0.56rem] tracking-[0.18em] uppercase font-light text-brand-black hover:bg-brand-black hover:text-white hover:border-brand-black transition-all duration-400"
        >
          <FontAwesomeIcon icon={faInstagram} className="w-3.5 h-3.5" aria-hidden="true" />
          Follow Us for New Stock
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-[2px]" role="list">
        {IG_TILES.map((tile, i) => (
          <Link
            key={i}
            href="https://instagram.com/midcenturist_sa"
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square overflow-hidden bg-brand-off group"
            aria-label={`Instagram post — ${tile.price}${tile.sold ? ' (Sold)' : ''}`}
            role="listitem"
          >
            <Image
              src={tile.src}
              alt=""
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
              className="object-cover transition-all duration-[600ms] ease-out-expo group-hover:scale-[1.08]"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/50 flex flex-col items-center justify-center transition-all duration-400">
              <FontAwesomeIcon icon={faInstagram} className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-2" />
              <span className="font-sans text-[0.64rem] tracking-[0.12em] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-light">
                {tile.price}
              </span>
            </div>
            {tile.sold && (
              <span className="absolute top-2 left-2 bg-brand-black/70 text-white font-sans text-[0.42rem] tracking-[0.16em] uppercase px-2 py-1 font-light">
                Sold
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
