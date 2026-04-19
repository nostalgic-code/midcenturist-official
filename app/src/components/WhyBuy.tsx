'use client'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeaf, faGem, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
import { useReveal } from '@/lib/useReveal'

const CARDS = [
  {
    num: '01',
    icon: faLeaf,
    title: 'Sustainable Living',
    body: 'Reduce, reuse and repurpose — vintage is the most sustainable furniture choice available. These pieces have already endured decades of use and will continue to serve for years to come.',
  },
  {
    num: '02',
    icon: faGem,
    title: 'Investment Value',
    body: 'Each vintage item carries its own unique charm and story — making it more than furniture. A carefully curated piece is a future investment that only appreciates in value over time.',
  },
  {
    num: '03',
    icon: faWandMagicSparkles,
    title: 'Lovingly Restored',
    body: 'Every piece is meticulously cleaned, lightly restored and refinished to preserve its integrity — back as close as possible to its former glory. We care for each piece as if it were our own.',
  },
]

export default function WhyBuy() {
  const sectionRef = useReveal<HTMLElement>()
  const cardsRef = useReveal<HTMLDivElement>(0.05)

  return (
    <section ref={sectionRef} className="reveal-up py-32 px-8 md:px-20 bg-white" aria-labelledby="why-heading">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-24 items-start mb-20">
        <div>
          <span className="label-caps text-brand-muted mb-3 block">
            A Sustainable Approach
          </span>
          <h2
            id="why-heading"
            className="font-serif text-[clamp(2rem,3vw,3rem)] font-light text-brand-black leading-[1.1]"
          >
            Why Buy<br />Vintage<br /><em>Furniture?</em>
          </h2>
        </div>
        <p className="font-sans text-[0.92rem] text-brand-muted leading-[2.1] font-light tracking-[0.02em] self-center max-w-[560px]">
          Buying pre-loved furniture extends its product life. Most of our pieces are more than 40 years old and will last at least another 40+. Vintage furniture is beautiful, timeless, unique, valuable, well designed, high quality, full of character and a future investment.
        </p>
      </div>

      {/* Cards grid */}
      <div ref={cardsRef} className="reveal-up grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-brand-rule" role="list">
        {CARDS.map((card) => (
          <div
            key={card.num}
            className="stagger-child bg-white px-10 py-14 hover:bg-brand-cream transition-colors duration-500 group"
            role="listitem"
          >
            <div className="font-serif text-[4rem] font-light text-brand-black/[0.04] leading-none mb-6 transition-colors duration-500 group-hover:text-brand-black/[0.08]">
              {card.num}
            </div>
            <div className="w-12 h-12 border border-brand-rule flex items-center justify-center mb-7 group-hover:bg-brand-black group-hover:border-brand-black transition-all duration-400">
              <FontAwesomeIcon
                icon={card.icon}
                className="w-[18px] h-[18px] text-brand-black/70 group-hover:text-white transition-colors duration-400"
                aria-hidden="true"
              />
            </div>
            <h3 className="font-serif text-[1.5rem] font-normal text-brand-black mb-4">{card.title}</h3>
            <p className="font-sans text-[0.88rem] text-brand-muted leading-[2] font-light tracking-[0.02em]">
              {card.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
