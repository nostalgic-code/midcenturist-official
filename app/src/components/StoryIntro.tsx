'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const LINES = [
  { text: 'You don\u2019t just buy furniture.', emphasis: false },
  { text: 'You choose to live with history.', emphasis: true },
  { text: 'Every curve, every grain, every joint\u2009\u2014', emphasis: false },
  { text: 'a conversation between maker and material', emphasis: false },
  { text: 'that\u2019s lasted over half a century.', emphasis: true },
]

export default function StoryIntro() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  return (
    <section
      ref={containerRef}
      className="relative bg-brand-black overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Subtle grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")' }}
        aria-hidden="true"
      />

      {/* Decorative line */}
      <motion.div
        className="absolute left-1/2 top-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
        style={{
          height: '100%',
          opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.3, 0.3, 0]),
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 md:px-16 py-32">
        {/* Eyebrow */}
        <motion.span
          className="label-caps text-white/20 mb-12 block"
          style={{
            opacity: useTransform(scrollYProgress, [0.05, 0.15], [0, 1]),
            y: useTransform(scrollYProgress, [0.05, 0.15], [20, 0]),
          }}
        >
          Welcome to Midcenturist
        </motion.span>

        {/* Main story lines */}
        <div className="max-w-4xl text-center space-y-2 md:space-y-3">
          {LINES.map((line, i) => {
            const start = 0.08 + i * 0.1
            const end = start + 0.12
            return (
              <StoryLine
                key={i}
                text={line.text}
                emphasis={line.emphasis}
                scrollProgress={scrollYProgress}
                start={start}
                end={end}
              />
            )
          })}
        </div>

        {/* Closing invitation */}
        <motion.div
          className="mt-16 text-center"
          style={{
            opacity: useTransform(scrollYProgress, [0.55, 0.65], [0, 1]),
            y: useTransform(scrollYProgress, [0.55, 0.65], [30, 0]),
          }}
        >
          <div className="w-px h-12 bg-white/10 mx-auto mb-8" aria-hidden="true" />
          <p className="font-sans text-[0.7rem] text-white/25 font-light tracking-[0.15em] uppercase">
            Scroll to explore our world
          </p>
        </motion.div>
      </div>
    </section>
  )
}

function StoryLine({
  text,
  emphasis,
  scrollProgress,
  start,
  end,
}: {
  text: string
  emphasis: boolean
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress']
  start: number
  end: number
}) {
  const opacity = useTransform(scrollProgress, [start, end], [0, 1])
  const y = useTransform(scrollProgress, [start, end], [40, 0])
  const blur = useTransform(scrollProgress, [start, end], [8, 0])

  return (
    <motion.p
      className={`font-serif leading-[1.2] ${
        emphasis
          ? 'text-[clamp(2rem,5vw,4.5rem)] text-white italic'
          : 'text-[clamp(1.6rem,4vw,3.5rem)] text-white/50'
      }`}
      style={{
        opacity,
        y,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
    >
      {text}
    </motion.p>
  )
}
