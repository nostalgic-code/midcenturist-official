'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const PANELS = [
  {
    label: 'Sold Pieces',
    title: 'Pieces with\na story.',
    tagline: 'Appreciate what has found its home',
    image: '/images/oldschool%20chairs/images%20(1)/PHOTO-2026-04-15-18-49-49.jpg',
    href: '/shop?status=sold',
    cta: 'View Sold',
  },
  {
    label: 'Archive',
    title: 'Rare finds\n& one-offs.',
    tagline: 'Curated pieces awaiting their moment',
    image: '/images/suede%20chairs/images/PHOTO-2026-04-15-18-50-41.jpg',
    href: '/shop?status=archived',
    cta: 'Browse Archive',
  },
]

export default function ShowcaseDuo() {
  return (
    <section className="border-t border-brand-rule">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {PANELS.map((panel, i) => (
          <Panel key={panel.label} panel={panel} index={i} />
        ))}
      </div>
    </section>
  )
}

function Panel({
  panel,
  index,
}: {
  panel: (typeof PANELS)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const contentY = useTransform(scrollYProgress, [0.1, 0.4], [30, 0])
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.36], [0, 1])

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden${index === 0 ? ' md:border-r border-brand-rule' : ''}`}
      style={{ height: '540px' }}
    >
      <Link href={panel.href} className="group absolute inset-0 block">
        {/* Parallax image */}
        <motion.div className="absolute inset-0 scale-[1.12]" style={{ y: imageY }}>
          <Image
            src={panel.image}
            alt={panel.label}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
            style={{ filter: 'brightness(0.55)' }}
          />
        </motion.div>

        {/* Gradient */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(to top, rgba(12,11,10,0.88) 0%, rgba(12,11,10,0.3) 50%, rgba(12,11,10,0.1) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-[2] p-8 md:p-12"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          {/* Label */}
          <div className="flex items-center gap-3 mb-5">
            <span className="h-[0.5px] w-8 bg-white/30 block" aria-hidden="true" />
            <span className="label-caps text-white/50">{panel.label}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-light text-white leading-[1.12] whitespace-pre-line mb-3">
            {panel.title}
          </h3>

          {/* Tagline */}
          <p className="font-sans text-[0.72rem] text-white/40 font-light tracking-[0.04em] mb-7 leading-relaxed">
            {panel.tagline}
          </p>

          {/* CTA */}
          <span className="inline-flex items-center gap-2.5 label-caps text-white/50 border-b border-white/15 pb-[3px] group-hover:text-white group-hover:border-white/50 transition-all duration-500">
            {panel.cta}
            <FontAwesomeIcon
              icon={faArrowRight}
              className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </motion.div>
      </Link>
    </div>
  )
}
