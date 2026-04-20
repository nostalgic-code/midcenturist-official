'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { motion, useScroll, useTransform } from 'framer-motion'

const PANELS = [
  {
    num: '01',
    eyebrow: 'We Source',
    title: 'Found,\nnot manufactured.',
    body: 'We travel far and wide to find authentic mid-century pieces with strong design heritage and solid bones. Every object has already proven itself across decades of use.',
    image: '/images/oldschool%20chairs/images%20(1)/PHOTO-2026-04-15-18-49-49.jpg',
    accent: 'Since 2018',
  },
  {
    num: '02',
    eyebrow: 'We Restore',
    title: 'Craft meets\nreverence.',
    body: 'Our restorative craftsmanship reflects a deep respect for original materials. Teak, walnut, brass, ceramic \u2014 we breathe new life into every joint and surface without erasing the character that time has given.',
    image: '/images/office%20couch/images%20(1)/PHOTO-2026-04-15-18-47-59.jpg',
    accent: 'By hand',
  },
  {
    num: '03',
    eyebrow: 'We Curate',
    title: 'Not a store.\nA collection.',
    body: 'Every piece is selected for its design integrity, historical significance, and condition. We don\u2019t deal in volume \u2014 we deal in meaning. Each object earns its place.',
    image: '/images/folder%2030/images30/PHOTO-2026-04-15-18-52-06.jpg',
    accent: 'One at a time',
  },
  {
    num: '04',
    eyebrow: 'Your Home',
    title: 'Where it all\ncomes together.',
    body: 'These aren\u2019t showroom props. They\u2019re pieces meant to be lived with, touched, used, and loved \u2014 for another fifty years and beyond.',
    image: '/images/suede%20couch/images/PHOTO-2026-04-15-18-49-01.jpg',
    accent: 'Ready for you',
    cta: { label: 'Shop the Collection', href: '/shop' },
  },
]

export default function HorizontalShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Map vertical scroll → horizontal translation (0% to -75% for 4 panels)
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%'])

  // Progress bar width
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    // Tall container creates the scroll distance; 4 panels × 100vh
    <div ref={containerRef} style={{ height: `${PANELS.length * 100}vh` }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden bg-brand-black">
        {/* Progress bar */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-white/20 z-30"
          style={{ width: progressWidth }}
          aria-hidden="true"
        />

        {/* Horizontal track */}
        <motion.div
          className="flex h-full"
          style={{ x, width: `${PANELS.length * 100}%` }}
        >
          {PANELS.map((panel, i) => (
            <PanelSlide key={panel.num} panel={panel} index={i} progress={scrollYProgress} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function PanelSlide({
  panel,
  index,
}: {
  panel: (typeof PANELS)[number]
  index: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  return (
    <div className="relative flex-shrink-0 w-screen h-full flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={panel.image}
          alt={panel.eyebrow}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ filter: 'brightness(0.3)' }}
          priority={index === 0}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(12,11,10,0.92) 0%, rgba(12,11,10,0.6) 50%, rgba(12,11,10,0.85) 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Content — always visible; horizontal scroll IS the reveal */}
      <div className="relative z-10 w-full px-10 md:px-20 lg:px-32">
        <div className="max-w-2xl">
          {/* Number + eyebrow */}
          <div className="flex items-center gap-6 mb-8">
            <span className="font-serif text-[5rem] md:text-[7rem] font-light text-white/[0.04] leading-none">
              {panel.num}
            </span>
            <div>
              <div className="w-10 h-px bg-white/20 mb-3" aria-hidden="true" />
              <span className="label-caps text-white/40">{panel.eyebrow}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-light text-white leading-[1.05] whitespace-pre-line mb-8">
            {panel.title}
          </h2>

          {/* Body */}
          <p className="font-sans text-[0.88rem] text-white/40 font-light leading-[2] max-w-md tracking-[0.01em] mb-8">
            {panel.body}
          </p>

          {/* Accent tag */}
          <span className="inline-block label-caps text-white/20 border border-white/10 px-4 py-2">
            {panel.accent}
          </span>

          {/* CTA on last panel */}
          {panel.cta && (
            <div className="mt-10">
              <Link
                href={panel.cta.href}
                className="group/cta inline-flex items-center gap-3 bg-white text-brand-black px-8 py-4 text-[0.6rem] uppercase tracking-widest-2 font-light hover:bg-brand-off transition-colors duration-500"
              >
                {panel.cta.label}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="w-3 h-3 transition-transform duration-300 group-hover/cta:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Panel divider line */}
      {index < PANELS.length - 1 && (
        <div className="absolute right-0 top-[15%] bottom-[15%] w-px bg-white/[0.06]" aria-hidden="true" />
      )}
    </div>
  )
}
