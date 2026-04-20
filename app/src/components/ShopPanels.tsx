'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useReveal } from '@/lib/useReveal'

const PANELS = [
  {
    href: '/shop/available',
    image: '/images/chairs/images2/PHOTO-2026-04-15-18-51-18.jpg',
    alt: 'Available Items',
    tag: 'Shop Now',
    title: 'Available\nPieces',
    subtitle: 'Browse everything currently in stock',
    cta: 'Shop Now',
  },
  {
    href: '/shop',
    image: '/images/folder%2030/images30/PHOTO-2026-04-15-18-52-05.jpg',
    alt: 'All Items',
    tag: 'Full Archive',
    title: 'Complete\nArchive',
    subtitle: 'Available and sold — our full archive',
    cta: 'View All',
  },
]

export default function ShopPanels() {
  const sectionRef = useReveal<HTMLDivElement>()

  return (
    <div ref={sectionRef} className="reveal-up grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-brand-off-d">
      {PANELS.map((panel) => (
        <Link
          key={panel.href}
          href={panel.href}
          className="relative overflow-hidden block group"
          style={{ aspectRatio: '4/5' }}
          aria-label={panel.title.replace('\n', ' ')}
        >
          <Image
            src={panel.image}
            alt={panel.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-all duration-[1.2s] ease-out-expo group-hover:scale-[1.06]"
            style={{ filter: 'brightness(0.7)' }}
          />
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{ background: 'linear-gradient(to top, rgba(12,11,10,0.88) 0%, rgba(12,11,10,0.15) 50%, rgba(12,11,10,0.04) 100%)' }}
            aria-hidden="true"
          />
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-10 md:p-14">
            <span className="inline-block bg-white text-brand-black font-sans text-[0.5rem] tracking-[0.18em] uppercase px-[0.8rem] py-[0.32rem] mb-5 font-light w-fit">
              {panel.tag}
            </span>
            <div className="font-serif text-[clamp(2.4rem,4vw,3.2rem)] font-light text-white leading-[1.05] mb-3 whitespace-pre-line">
              {panel.title}
            </div>
            <div className="font-sans text-[0.65rem] tracking-[0.1em] text-white/35 font-light mb-6">
              {panel.subtitle}
            </div>
            <span className="inline-flex items-center gap-2.5 font-sans text-[0.56rem] tracking-[0.18em] uppercase text-white/40 font-light border-b border-white/15 pb-[3px] w-fit group-hover:text-white group-hover:border-white/50 transition-all duration-500">
              {panel.cta}
              <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
