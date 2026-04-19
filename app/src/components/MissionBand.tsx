'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function MissionBand() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const quoteOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.7, 0.85], [0, 1, 1, 0])
  const quoteScale = useTransform(scrollYProgress, [0.15, 0.35], [0.95, 1])
  const lineScaleX = useTransform(scrollYProgress, [0.2, 0.45], [0, 1])
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-brand-black"
      style={{ minHeight: '70vh' }}
    >
      {/* Parallax background texture */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          y: bgY,
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-center justify-center min-h-[70vh] px-8 md:px-16 py-24">
        <motion.div
          className="text-center max-w-[900px]"
          style={{ opacity: quoteOpacity, scale: quoteScale }}
        >
          <span className="label-caps text-white/20 mb-8 block">Our Mission</span>

          <motion.div
            className="w-16 h-px bg-white/15 mx-auto mb-10 origin-center"
            style={{ scaleX: lineScaleX }}
            aria-hidden="true"
          />

          <blockquote className="font-serif text-[clamp(1.5rem,3.5vw,2.8rem)] font-light text-white/70 leading-[1.45] italic">
            &ldquo;To enable our customers to create character-filled living and creative work spaces
            that perfectly blend simplicity, functionality and form.&rdquo;
          </blockquote>

          <motion.div
            className="w-16 h-px bg-white/15 mx-auto mt-10 mb-8 origin-center"
            style={{ scaleX: lineScaleX }}
            aria-hidden="true"
          />

          <p className="label-caps text-white/15">
            Midcenturist &mdash; Est. 2018
          </p>
        </motion.div>
      </div>
    </section>
  )
}
