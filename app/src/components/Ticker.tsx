import React from 'react'

const ITEMS = [
  'Authentic Mid-Century',
  'Danish Modern',
  'Restored with Care',
  'Investment Pieces',
  'Timeless Design',
  'Sustainable Living',
  'Curated Collection',
  'Iconic Silhouettes',
]

export default function Ticker() {
  return (
    <div className="border-t border-b border-brand-rule bg-brand-cream py-4 overflow-hidden" aria-hidden="true">
      <div className="ticker-track flex items-center whitespace-nowrap">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="flex items-center mx-8">
            <span className="font-sans text-[0.56rem] tracking-[0.25em] uppercase text-brand-black/30 font-light">{item}</span>
            <span className="ml-8 w-1 h-1 rounded-full bg-brand-black/10" />
          </span>
        ))}
      </div>
    </div>
  )
}
