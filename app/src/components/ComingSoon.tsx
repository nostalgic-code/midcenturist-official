'use client'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faScrewdriverWrench, faMagnifyingGlass, faStar } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import { useReveal } from '@/lib/useReveal'

const ITEMS = [
  {
    num: '01',
    statusIcon: faClock,
    status: 'Expected this week',
    name: 'G-Plan Teak Dining Set',
    price: 'From R 18,000',
  },
  {
    num: '02',
    statusIcon: faScrewdriverWrench,
    status: 'In restoration',
    name: 'Parker Knoll Armchair Pair',
    price: 'From R 11,500',
  },
  {
    num: '03',
    statusIcon: faMagnifyingGlass,
    status: 'Just sourced',
    name: 'Full Teak Wall Unit',
    price: 'From R 22,000',
  },
  {
    num: '04',
    statusIcon: faStar,
    status: 'Coming soon',
    name: 'Brass Sputnik Chandelier',
    price: 'From R 6,800',
  },
]

export default function ComingSoon() {
  const sectionRef = useReveal<HTMLElement>()

  return (
    <section ref={sectionRef} className="reveal-up py-28 px-8 md:px-20 bg-brand-off border-t border-brand-off-d" aria-labelledby="coming-soon-heading">
      <span className="label-caps text-brand-muted mb-3 block">
        On the Way
      </span>
      <h2 id="coming-soon-heading" className="font-serif text-[clamp(2rem,3vw,3rem)] font-light text-brand-black">
        Coming Soon
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-14 border border-brand-rule" role="list">
        {ITEMS.map((item, i) => (
          <div
            key={item.num}
            className={`stagger-child bg-white px-8 py-10 hover:bg-brand-cream transition-colors duration-500 group ${i < ITEMS.length - 1 ? 'border-r border-brand-rule' : ''}`}
            role="listitem"
          >
            <div className="font-serif text-[3rem] font-light text-brand-black/[0.04] leading-none mb-5 group-hover:text-brand-black/[0.08] transition-colors duration-500">
              {item.num}
            </div>
            <div className="flex items-center gap-1.5 label-caps text-brand-muted mb-2">
              <FontAwesomeIcon icon={item.statusIcon} className="w-3 h-3" aria-hidden="true" />
              {item.status}
            </div>
            <div className="font-serif text-[1.3rem] font-light text-brand-black leading-[1.3] mb-2">
              {item.name}
            </div>
            <div className="font-sans text-[0.82rem] tracking-[0.06em] text-brand-muted font-light mb-8">
              {item.price}
            </div>
            <button
              className="inline-flex items-center gap-1.5 font-sans text-[0.6rem] tracking-[0.16em] uppercase text-brand-muted border border-brand-rule px-4 py-2.5 font-light hover:text-brand-black hover:border-brand-black transition-all duration-300"
              aria-label={`Notify me when ${item.name} is available`}
            >
              <FontAwesomeIcon icon={faBell} className="w-3 h-3" aria-hidden="true" />
              Notify Me
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
