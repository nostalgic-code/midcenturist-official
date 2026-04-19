'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useReveal } from '@/lib/useReveal'

export default function EditorialIntro() {
  const sectionRef = useReveal<HTMLDivElement>()

  return (
    <div ref={sectionRef} className="reveal-up grid grid-cols-1 md:grid-cols-2 border-t border-brand-rule group">
      {/* Image */}
      <div className="relative overflow-hidden bg-brand-off min-h-[420px] md:min-h-[640px]">
        <Image
          src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=900&q=85"
          alt="Our shop — curated mid-century modern furniture"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover img-grey zoom-on-scroll"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden="true" />
      </div>

      {/* Text */}
      <div className="bg-white flex flex-col justify-center px-8 py-16 md:px-[5.5rem] md:py-24 border-t md:border-t-0 md:border-l border-brand-rule">
        <span className="label-caps text-brand-muted mb-3 block">
          About Midcenturist
        </span>
        <h2 className="font-serif text-[clamp(2rem,3vw,3.2rem)] font-light leading-[1.12] text-brand-black mb-7">
          A curated furniture house<br />dedicated to <em>timeless design</em>
        </h2>
        <div className="rule w-12 mb-7" aria-hidden="true" />
        <p className="font-sans text-[0.92rem] leading-[2.1] text-brand-muted font-light tracking-[0.02em] mb-4 max-w-[420px]">
          Midcenturist is a curated furniture house, and aspirational brand, dedicated to sourcing, restoration and offering timeless, collectable and iconic Mid-century, Danish, and Retro furniture and décor elements.
        </p>
        <p className="font-sans text-[0.92rem] leading-[2.1] text-brand-muted font-light tracking-[0.02em] mb-4 max-w-[420px]">
          We source far and wide for artful and elegant iconic design furniture pieces with strong design heritage, solid structure and potential for full restoration.
        </p>
        <p className="font-sans text-[0.92rem] leading-[2.1] text-brand-muted font-light tracking-[0.02em] mb-10 max-w-[420px]">
          Items can be viewed by appointment — send us an{' '}
          <a href="mailto:shop@midcenturist.co.za" className="text-brand-black font-light underline underline-offset-[3px] hover:opacity-60 transition-opacity">
            email
          </a>{' '}
          and we&apos;d be happy to arrange a visit.
        </p>
        <Link
          href="/shop"
          className="group/link inline-flex items-center gap-2.5 font-sans text-[0.6rem] tracking-[0.18em] uppercase text-brand-black font-light border-b border-brand-black/30 pb-[4px] w-fit hover:border-brand-black transition-colors duration-300"
        >
          <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden="true" />
          Browse the Collection
        </Link>
      </div>
    </div>
  )
}
