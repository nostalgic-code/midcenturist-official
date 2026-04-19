'use client'

import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useReveal } from '@/lib/useReveal'

export default function VisionSection() {
  const sectionRef = useReveal<HTMLDivElement>()

  return (
    <section ref={sectionRef} className="reveal-up py-32 px-8 md:px-20 bg-white text-center border-t border-brand-rule border-b border-brand-rule relative overflow-hidden">
      {/* Subtle decorative element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-brand-rule/30 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-brand-rule/20 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10">
        <span className="label-caps text-brand-muted mb-3 block">
          Our Philosophy
        </span>
        <h2 className="font-serif text-[clamp(1.95rem,3vw,3.2rem)] font-light text-brand-black leading-[1.1]">
          To honour design pieces made<br />in the middle of the century,<br />through thoughtfully <em>restoring them<br />for the future.</em>
        </h2>
        <div className="rule w-12 mx-auto my-10" aria-hidden="true" />
        <p className="font-sans text-[0.92rem] text-brand-muted leading-[2.1] max-w-[620px] mx-auto mb-5 font-light tracking-[0.02em]">
          We believe we are Mid-century Woodsmiths, purely because we profoundly believe in the enduring value of good mid-century designs. Our restorative craftsmanship reflects a deep respect for original materials.
        </p>
        <p className="font-sans text-[0.92rem] text-brand-muted leading-[2.1] max-w-[620px] mx-auto mb-12 font-light tracking-[0.02em]">
          In the process, we breathe new life into mid-century iconic pieces, preserving their story and ensuring they remain functional pieces of art for generations to come.
        </p>
        <Link
          href="/shop"
          className="group/btn inline-flex items-center gap-2.5 bg-brand-black text-white font-sans text-[0.58rem] tracking-[0.2em] uppercase font-light px-8 py-4 hover:bg-brand-black/85 transition-all duration-400"
        >
          <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5" aria-hidden="true" />
          Shop the Collection
        </Link>
      </div>
    </section>
  )
}
