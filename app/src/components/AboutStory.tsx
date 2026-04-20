'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

/* ─── Data ──────────────────────────────────────────────────────── */

const VALUES = [
  {
    num: '01',
    word: 'Authenticity',
    text: 'Every piece we sell is genuine mid-century — sourced, verified, and selected for its design heritage and provenance.',
  },
  {
    num: '02',
    word: 'Craftsmanship',
    text: 'We restore with reverence. Original materials, traditional techniques, and an obsessive attention to detail define our process.',
  },
  {
    num: '03',
    word: 'Integrity',
    text: 'We believe in transparency — honest descriptions, fair pricing, and standing behind every piece that leaves our workshop.',
  },
  {
    num: '04',
    word: 'Sustainability',
    text: 'Choosing vintage is choosing well. We extend the life of beautifully made objects, keeping craft alive and waste out of landfills.',
  },
]

const SECTIONS = [
  {
    label: 'Our Story',
    title: 'A curated furniture house\n& aspirational brand',
    body: [
      'Midcenturist is a curated furniture house, and aspirational brand, dedicated to sourcing, restoration and offering timeless, collectable and iconic Mid-century, Danish, and Retro furniture and décor elements.',
      'We source far and wide for artful and elegant iconic design furniture pieces and home décor elements, with strong design heritage, solid structure and potential for full restoration, ensuring that each of the pieces meet our standards for practicality, longevity, comfort, and visual impact.',
      'From statement couches, armchairs, dining room suites, lounge sets, sideboards, coffee tables, lighting, bedroom suites, to vases, our curated collection are pieces built for quality, durability, design significance and integrity, coupled with the beauty of mid-century modern designs.',
      'Our unique edge is our ability to balance environmental sustainability, simplicity, organic shapes, form and function, while blending warm woods, clean lines, sleek designs, eclectic touches and iconic silhouettes that feel both nostalgic yet forward looking.',
    ],
    image: '/images/suede%20couch/images/PHOTO-2026-04-15-18-49-00.jpg',
    imageAlt: 'Curated mid-century furniture showroom',
  },
  {
    label: 'Our Mission',
    title: 'Character-filled living\n& creative work spaces',
    body: [
      'To enable our customers to create character-filled living and creative work spaces that perfectly blend simplicity, functionality and form.',
    ],
    image: '/images/office%20couch/images%20(1)/PHOTO-2026-04-15-18-48-00.jpg',
    imageAlt: 'Restored mid-century modern couch',
  },
  {
    label: 'Our Philosophy',
    title: 'Honouring design pieces\nmade in the middle of the century',
    body: [
      'To honour design pieces made in the middle of the century, through thoughtfully restoring them for the future.',
      'We believe we are Mid-century Woodsmiths, purely because we profoundly believe in the enduring value of good mid-century designs.',
      'Our restorative craftsmanship reflects a deep respect for original materials and in the process, we breathe new life into mid-century iconic pieces, preserving their story and ensuring they remain functional pieces of art for generations to come.',
    ],
    image: '/images/folder%2030/images30/PHOTO-2026-04-15-18-51-53.jpg',
    imageAlt: 'Mid-century walnut dining set',
  },
]

/* ─── Component ─────────────────────────────────────────────────── */

export default function AboutStory() {
  return (
    <div className="bg-brand-white">
      <Hero />

      {/* Spacer between hero and content sections */}
      <div className="h-16 md:h-24" />

      <div className="space-y-16 md:space-y-24">
        {SECTIONS.map((section, i) => (
          <ContentSection key={section.label} section={section} index={i} />
        ))}
      </div>

      {/* Spacer before values */}
      <div className="h-16 md:h-24" />

      <ValuesGrid />
    </div>
  )
}

/* ─── Hero — full-bleed image with staggered text ───────────────── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative h-[85vh] min-h-[560px] overflow-hidden bg-brand-black">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <Image
          src="/images/chairs/images2/PHOTO-2026-04-15-18-51-17.jpg"
          alt="Mid-century modern interior"
          fill
          priority
          className="object-cover"
          style={{ filter: 'brightness(0.35)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(12,11,10,0.3) 0%, rgba(12,11,10,0.7) 100%)' }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28 px-8 md:px-16 lg:px-24 max-w-[1400px] mx-auto"
        style={{ y: textY, opacity }}
      >
        <motion.span
          className="label-caps text-white/40 mb-5 block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          About Midcenturist
        </motion.span>
        <h1 className="font-serif text-[clamp(2.8rem,7vw,6.5rem)] font-light text-white leading-[0.95] max-w-4xl overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Midcentury
          </motion.span>
          <motion.span
            className="block italic"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Woodsmiths
          </motion.span>
        </h1>
        <motion.div
          className="w-16 h-px bg-white/20 mt-10"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />
      </motion.div>
    </section>
  )
}

/* ─── Content Sections — image left, text right with scroll anim ── */

function ContentSection({
  section,
  index,
}: {
  section: (typeof SECTIONS)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-12%' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgScale = useTransform(scrollYProgress, [0, 0.6], [1.12, 1])
  const imgY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])
  const textX = useTransform(scrollYProgress, [0.1, 0.4], [60, 0])
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1])

  // Alternate background for visual rhythm
  const bg = index % 2 === 0 ? 'bg-brand-off' : 'bg-white'

  return (
    <section ref={ref} className={`relative overflow-hidden rounded-lg mx-4 md:mx-8 ${bg}`}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[0.85fr_1fr] gap-8 md:gap-12 items-center py-12 md:py-16 px-6 md:px-12 lg:px-16">
          {/* Image — always left, contained size */}
          <div className="relative overflow-hidden rounded-md aspect-[4/3] max-h-[480px]">
            <motion.div
              className="absolute inset-0"
              style={{ scale: imgScale, y: imgY }}
            >
              <Image
                src={section.image}
                alt={section.imageAlt}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Cinematic overlay gradient */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, rgba(12,11,10,0.08) 0%, transparent 60%)' }}
              aria-hidden="true"
            />

            {/* Section number — large, pinned bottom-left */}
            <motion.div
              className="absolute bottom-8 left-8 z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-serif text-[6rem] md:text-[8rem] text-white/[0.12] leading-none select-none">
                {String(index + 1).padStart(2, '0')}
              </span>
            </motion.div>
          </div>

          {/* Text — always right */}
          <motion.div
            className="flex flex-col justify-center px-6 py-10 md:px-8 lg:px-12 md:py-0"
            style={{ x: textX, opacity: textOpacity }}
          >
            {/* Label with accent line */}
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                className="w-8 h-px bg-brand-black/30"
                initial={{ scaleX: 0, originX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              />
              <span className="label-caps text-brand-muted">{section.label}</span>
            </motion.div>

            {/* Title with clip reveal */}
            <div className="overflow-hidden mb-10">
              <motion.h2
                className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] font-light text-brand-black leading-[1.15] whitespace-pre-line"
                initial={{ y: '110%' }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {section.title}
              </motion.h2>
            </div>

            {/* Body paragraphs */}
            <div className="space-y-6">
              {section.body.map((paragraph, pi) => (
                <motion.p
                  key={pi}
                  className="text-[0.85rem] text-brand-black/80 font-light leading-[2.1] tracking-[0.015em]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.55 + pi * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Bottom accent */}
            <motion.div
              className="w-10 h-px bg-brand-black/10 mt-12"
              initial={{ scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── Values Grid — 4-column with stagger reveal ────────────────── */

function ValuesGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  return (
    <section ref={ref} className="bg-brand-black py-28 md:py-40 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        {/* Header */}
        <div className="mb-20 md:mb-24">
          <motion.span
            className="label-caps text-white/30 block mb-4"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Our Values
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-light text-white leading-[1.15] max-w-xl"
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              What we stand for
            </motion.h2>
          </div>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0 border-t border-white/10">
          {VALUES.map((v, i) => (
            <ValueCard key={v.num} value={v} index={i} isInView={isInView} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ValueCard({
  value,
  index,
  isInView,
  progress,
}: {
  value: (typeof VALUES)[number]
  index: number
  isInView: boolean
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const hoverY = useTransform(progress, [0.3, 0.7], [15, -15])

  return (
    <motion.div
      className="border-b sm:border-b md:border-b-0 sm:odd:border-r md:border-r md:last:border-r-0 border-white/10 py-12 md:py-16 md:px-8 first:md:pl-0 last:md:pr-0 group"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Large number watermark */}
      <motion.span
        className="font-serif text-[5rem] md:text-[6rem] text-white/[0.03] block leading-none mb-4 select-none transition-colors duration-700 group-hover:text-white/[0.06]"
        style={{ y: hoverY }}
      >
        {value.num}
      </motion.span>

      {/* Accent line */}
      <motion.div
        className="w-6 h-px bg-white/20 mb-5"
        initial={{ scaleX: 0, originX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />

      <h3 className="font-serif text-xl md:text-2xl text-white font-light mb-4 italic tracking-wide">
        {value.word}
      </h3>
      <p className="text-[0.82rem] text-white/35 font-light leading-[2]">
        {value.text}
      </p>
    </motion.div>
  )
}


