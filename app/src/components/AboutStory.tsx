'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

/* ─── Data ──────────────────────────────────────────────────────── */

const VALUES = [
  {
    word: 'Integrity',
    text: 'We believe in transparency and honesty.',
  },
  {
    word: 'Excellence',
    text: 'We pursue the highest standards in every restoration, ensuring each piece meets our exacting criteria for quality and beauty.',
  },
  {
    word: 'Craftsmanship',
    text: 'We restore with reverence. Original materials, traditional techniques, and an obsessive attention to detail define our process.',
  },
  {
    word: 'Africanism',
    text: 'We celebrate African design heritage, honouring the continent\'s rich artisanal traditions and creative spirit in every piece we curate.',
  },
]

const SECTIONS = [
  {
    label: 'Our Story',
    title: 'A curated midcentury\ncollectables house',
    body: [
      'Midcenturist is a curated midcentury collectables house, and aspirational brand, dedicated to sourcing, restoration and offering timeless, collectable and iconic Mid-century, Danish, and Retro furniture and décor elements.',
      'We source far and wide for artful and elegant iconic design furniture pieces and home décor elements, with strong design heritage, solid structure and potential for full restoration, ensuring that each of the pieces meet our standards for practicality, longevity, comfort, and visual impact.',
      'From statement couches, armchairs, dining room suites, lounge sets, sideboards, coffee tables, lighting, bedroom suites, to vases, our curated collection are pieces built for quality, durability, design significance and integrity, coupled with the beauty of mid-century modern designs.',
    ],
    image: '/images/folder%2030/images30/PHOTO-2026-04-15-18-51-53.jpg',
    imageAlt: 'Mid-century walnut dining set',
  },
  {
    label: 'Our Philosophy',
    title: 'Honouring design pieces\nmade in the middle of the century',
    body: [
      'To honour design pieces made in the middle of the century, through thoughtfully restoring them for the future.',
      'We believe we are Mid-century Woodsmiths, purely because we profoundly believe in the enduring value of good mid-century designs.',
      'Our restorative craftsmanship reflects a deep respect for original materials and in the process, we breathe new life into mid-century iconic pieces, preserving their story and ensuring they remain functional pieces of art for generations to come.',
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
]

/* ─── Component ─────────────────────────────────────────────────── */

export default function AboutStory() {
  return (
    <div className="bg-brand-white">
      <Hero />

      {/* Spacer */}
      <div className="h-10 md:h-16" />

      {/* Chapter navigation dots (sticky on desktop) */}
      <div className="relative">
        <ChapterNav />
        <div className="space-y-0">
          {SECTIONS.map((section, i) => (
            <StoryChapter key={section.label} section={section} index={i} total={SECTIONS.length} />
          ))}
        </div>
      </div>

      {/* Spacer before values */}
      <div className="h-10 md:h-16" />

      <ValuesGrid />
    </div>
  )
}

/* ─── Hero — full-bleed image with animated line + label ────────── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} className="relative h-[60vh] min-h-[380px] md:h-[75vh] md:min-h-[500px] overflow-hidden bg-brand-black">
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
        className="relative z-10 h-full flex flex-col justify-end pb-12 md:pb-28 px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto"
        style={{ y: textY, opacity }}
      >
        {/* Animated line + label (serif font matching hero headings) */}
        <motion.div
          className="flex items-center gap-4 mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="h-[1px] bg-white/40 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: 48 }}
          />
          <span className="label-caps text-white/60">About Midcenturist</span>
        </motion.div>

        <h1 className="font-serif text-[clamp(2.8rem,7vw,6.5rem)] font-light text-white leading-[0.95] max-w-4xl overflow-hidden">
          <motion.span
            className="block italic"
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
      </motion.div>
    </section>
  )
}

/* ─── Chapter Navigation — sticky side dots ─────────────────────── */

function ChapterNav() {
  return (
    <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-3">
      {SECTIONS.map((s, i) => (
        <a
          key={s.label}
          href={`#chapter-${i}`}
          className="group flex items-center gap-3"
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 label-caps text-brand-black/50 text-[0.65rem]">
            {s.label}
          </span>
          <span className="w-2 h-2 rounded-full border border-brand-black/20 group-hover:bg-brand-black/60 group-hover:border-brand-black/60 transition-all duration-300" />
        </a>
      ))}
    </div>
  )
}

/* ─── Story Chapter — modern storytelling section ───────────────── */

function StoryChapter({
  section,
  index,
  total,
}: {
  section: (typeof SECTIONS)[number]
  index: number
  total: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.08, 1])
  const imgY = useTransform(scrollYProgress, [0, 1], ['-2%', '2%'])
  const progressWidth = useTransform(scrollYProgress, [0, 0.6], ['0%', '100%'])

  /* Image right on even (0, 2), left on odd (1) */
  const imageRight = index % 2 === 0
  const bg = index === 1 ? 'bg-brand-off/50' : ''

  return (
    <section
      ref={ref}
      id={`chapter-${index}`}
      className={`relative scroll-mt-20 ${bg}`}
    >
      {/* Thin progress line at top */}
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 lg:px-24">
        <div className="h-[0.5px] bg-brand-black/[0.04] relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-brand-black/10"
            style={{ width: progressWidth }}
          />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 lg:px-24 py-10 md:py-20">
        {/* Chapter header — thin line + label (no number) */}
        <motion.div
          className="flex items-center gap-4 mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="h-[0.5px] bg-brand-black/15 origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: 32 }}
          />
          <span className="label-caps text-brand-muted">{section.label}</span>
        </motion.div>

        {/* Content grid — image right on even, left on odd */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 lg:gap-20 items-center">
          {/* Image with reveal */}
          <motion.div
            className={`relative overflow-hidden rounded-sm aspect-[4/3] max-h-[380px] md:max-h-[460px] ${imageRight ? 'lg:order-2' : ''}`}
            initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
            animate={isInView ? { opacity: 1, clipPath: 'inset(0 0% 0 0)' } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
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
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(12,11,10,0.06) 0%, transparent 40%)' }}
              aria-hidden="true"
            />
          </motion.div>

          {/* Text content */}
          <div className={`${imageRight ? 'lg:order-1' : ''}`}>
            {/* Title */}
            <div className="overflow-hidden mb-8">
              <motion.h2
                className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] font-light text-brand-black leading-[1.15] whitespace-pre-line"
                initial={{ y: '110%' }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {section.title}
              </motion.h2>
            </div>

            {/* Body paragraphs — staggered reveal */}
            <div className="space-y-5">
              {section.body.map((paragraph, pi) => (
                <motion.p
                  key={pi}
                  className="text-[0.85rem] text-brand-black/75 font-light leading-[2.1] tracking-[0.015em]"
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + pi * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Bottom accent line */}
            <motion.div
              className="w-8 h-[0.5px] bg-brand-black/10 mt-8"
              initial={{ scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* Final divider after last section */}
      {index === total - 1 && (
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 lg:px-24">
          <div className="h-[0.5px] bg-brand-black/[0.04]" />
        </div>
      )}
    </section>
  )
}

/* ─── Values Grid — boxed 4-column with stagger reveal ──────────── */

function ValuesGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="bg-brand-black py-16 md:py-28 lg:py-40 overflow-hidden cursor-white">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-16 lg:px-24">
        {/* Header with line */}
        <div className="mb-12 md:mb-20 lg:mb-24">
          <motion.div
            className="flex items-center gap-4 mb-5"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="h-[0.5px] bg-white/30 origin-left"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: 40 }}
            />
            <span className="label-caps text-white/30">Our Core Values</span>
          </motion.div>
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

        {/* 4-column boxed grid */}
        <div className="border border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {VALUES.map((v, i) => (
            <ValueCard key={v.word} value={v} index={i} isInView={isInView} />
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
}: {
  value: (typeof VALUES)[number]
  index: number
  isInView: boolean
}) {
  return (
    <motion.div
      className="border-b sm:border-b lg:border-b-0 last:border-b-0 sm:odd:border-r lg:border-r lg:last:border-r-0 border-white/10 py-8 px-5 sm:px-6 md:py-12 lg:py-14 lg:px-8 group"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Line + value name inline */}
      <div className="flex items-center gap-4 mb-5">
        <motion.div
          className="w-5 h-[0.5px] bg-white/20 shrink-0"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />
        <h3 className="font-serif text-xl md:text-2xl text-white font-light italic tracking-wide">
          {value.word}
        </h3>
      </div>
      <p className="text-[0.82rem] text-white/50 font-light leading-[2]">
        {value.text}
      </p>
    </motion.div>
  )
}


