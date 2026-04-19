'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const STATEMENTS = [
  {
    num: '01',
    word: 'Sustainable.',
    text: 'Vintage is the most sustainable furniture choice. These pieces have already endured decades \u2014 they\u2019ll endure decades more.',
  },
  {
    num: '02',
    word: 'Valuable.',
    text: 'A carefully curated mid-century piece isn\u2019t just furniture. It\u2019s an investment that appreciates in value, meaning, and character over time.',
  },
  {
    num: '03',
    word: 'Restored.',
    text: 'Every piece is meticulously cleaned, lightly restored and refinished \u2014 back as close as possible to its former glory, with all its story intact.',
  },
]

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="bg-white">
      {/* Section header */}
      <div className="py-20 px-8 md:px-20 border-b border-brand-rule">
        <span className="label-caps text-brand-muted mb-4 block">Why Vintage</span>
        <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-brand-black leading-[1.05] max-w-xl">
          Furniture that means<br /><em>something.</em>
        </h2>
      </div>

      {/* Statement blocks */}
      {STATEMENTS.map((s, i) => (
        <ManifestoBlock key={s.num} statement={s} index={i} isLast={i === STATEMENTS.length - 1} />
      ))}
    </section>
  )
}

function ManifestoBlock({
  statement,
  isLast,
}: {
  statement: (typeof STATEMENTS)[number]
  index: number
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const clipProgress = useTransform(scrollYProgress, [0.1, 0.4], [0, 100])
  const textY = useTransform(scrollYProgress, [0.1, 0.4], [60, 0])
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1])
  const numberX = useTransform(scrollYProgress, [0.1, 0.4], [-30, 0])

  return (
    <div
      ref={ref}
      className={`relative grid grid-cols-1 md:grid-cols-[auto_1fr] items-start ${
        !isLast ? 'border-b border-brand-rule' : ''
      }`}
    >
      {/* Number column */}
      <motion.div
        className="hidden md:flex items-start justify-center px-10 pt-20 pb-20"
        style={{
          opacity: textOpacity,
          x: numberX,
        }}
      >
        <span className="font-serif text-[8rem] font-light text-brand-black/[0.04] leading-none select-none">
          {statement.num}
        </span>
      </motion.div>

      {/* Content */}
      <div className="px-8 md:px-0 md:pr-20 py-16 md:py-20">
        <motion.div
          style={{
            opacity: textOpacity,
            y: textY,
          }}
        >
          {/* Big word */}
          <motion.h3
            className="font-serif text-[clamp(3rem,8vw,7rem)] font-light text-brand-black leading-[0.95] mb-6 italic"
            style={{
              clipPath: useTransform(
                clipProgress,
                (v) => `inset(0 ${100 - v}% 0 0)`,
              ),
            }}
          >
            {statement.word}
          </motion.h3>

          {/* Description */}
          <p className="font-sans text-[0.92rem] text-brand-muted font-light leading-[2.1] max-w-lg tracking-[0.01em]">
            {statement.text}
          </p>

          {/* Decorative line */}
          <motion.div
            className="mt-8 h-px bg-brand-black/10 origin-left"
            style={{
              scaleX: useTransform(scrollYProgress, [0.15, 0.5], [0, 1]),
              maxWidth: 120,
            }}
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </div>
  )
}
