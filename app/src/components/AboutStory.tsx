'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

/* ─── Data ──────────────────────────────────────────────────────── */

const VALUES = [
  {
    num: '01',
    word: 'Source',
    text: 'We travel far and wide to find authentic mid-century pieces with strong design heritage and solid bones.',
  },
  {
    num: '02',
    word: 'Restore',
    text: 'Our craftsmanship honours each object\u2019s original intent — breathing new life without erasing character.',
  },
  {
    num: '03',
    word: 'Curate',
    text: 'Every piece is selected for its design integrity, historical significance, and condition. We deal in meaning.',
  },
]

const CATEGORIES = [
  { name: 'Living Room', slug: 'living-room', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80' },
  { name: 'Dining Room', slug: 'dining-room', image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80' },
  { name: 'Bedroom', slug: 'bedroom', image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80' },
  { name: 'D\u00e9cor', slug: 'decor-elements', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80' },
]

/* ─── Component ─────────────────────────────────────────────────── */

export default function AboutStory() {
  return (
    <div className="bg-brand-white">
      <Hero />
      <Origin />
      <ValueStrip />
      <Philosophy />
      <CategoryReel />
      <ClosingCTA />
    </div>
  )
}

/* ─── Hero — full-bleed image with parallax text ────────────────── */

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
          src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1600&q=85"
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
        <span className="label-caps text-white/40 mb-5 block">About Midcenturist</span>
        <h1 className="font-serif text-[clamp(2.8rem,7vw,6.5rem)] font-light text-white leading-[0.95] max-w-4xl">
          Objects that carry
          <br />
          <span className="italic">decades of story.</span>
        </h1>
        <div className="w-16 h-px bg-white/20 mt-10" aria-hidden="true" />
      </motion.div>
    </section>
  )
}

/* ─── Origin — split image + text with scroll reveal ────────────── */

function Origin() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.12, 1])
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1])
  const textY = useTransform(scrollYProgress, [0.1, 0.35], [60, 0])

  return (
    <section ref={ref} className="py-24 md:py-36">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&q=85"
                alt="Curated mid-century furniture"
                fill
                className="object-cover"
                style={{ filter: 'brightness(0.8)' }}
              />
            </motion.div>
            {/* Caption tag */}
            <div className="absolute bottom-6 left-6 z-10">
              <span className="label-caps text-white/50 bg-brand-black/60 backdrop-blur-sm px-4 py-2">
                Johannesburg, SA &mdash; Est. 2018
              </span>
            </div>
          </div>

          {/* Text */}
          <motion.div style={{ opacity: textOpacity, y: textY }}>
            <span className="label-caps text-brand-muted block mb-4">Our Story</span>
            <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-light text-brand-black leading-[1.15] mb-8">
              A curated destination for mid-century modern design
            </h2>
            <div className="space-y-5">
              <p className="text-[0.88rem] text-brand-black/60 font-light leading-[2] tracking-[0.01em]">
                Midcenturist began with a simple conviction: furniture should be more than
                functional &mdash; it should be meaningful. Each piece we offer has been lived with,
                admired, and made to last.
              </p>
              <p className="text-[0.88rem] text-brand-black/60 font-light leading-[2] tracking-[0.01em]">
                We source from the 1940s through the 1970s &mdash; an era defined by clean lines,
                organic forms, and the honest use of materials like teak, walnut, brass, and
                ceramic. Our role is to find these objects, restore them with care, and place them
                with people who see their value.
              </p>
              <p className="text-[0.88rem] text-brand-black/60 font-light leading-[2] tracking-[0.01em]">
                Based in South Africa, we serve a growing community of design-conscious individuals,
                interior designers, and collectors who share our appreciation for this golden era of
                design.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── Values — horizontal scroll-reveal strip ───────────────────── */

function ValueStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  return (
    <section ref={ref} className="bg-brand-black py-28 md:py-36 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        <span className="label-caps text-white/30 block mb-4">How We Work</span>
        <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-light text-white leading-[1.15] mb-20 max-w-xl">
          Every piece, handled with intention
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/10">
          {VALUES.map((v, i) => (
            <ValueCard key={v.num} value={v} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ValueCard({
  value,
  index,
  progress,
}: {
  value: (typeof VALUES)[number]
  index: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const start = 0.15 + index * 0.08
  const end = start + 0.15
  const opacity = useTransform(progress, [start, end], [0, 1])
  const y = useTransform(progress, [start, end], [40, 0])

  return (
    <motion.div
      className="border-b md:border-b-0 md:border-r last:border-r-0 border-white/10 py-12 md:py-16 md:px-10 first:md:pl-0 last:md:pr-0"
      style={{ opacity, y }}
    >
      <span className="font-serif text-[4rem] text-white/[0.05] block leading-none mb-6">
        {value.num}
      </span>
      <h3 className="font-serif text-2xl text-white font-light mb-4 italic">{value.word}</h3>
      <p className="text-[0.82rem] text-white/40 font-light leading-[2]">{value.text}</p>
    </motion.div>
  )
}

/* ─── Philosophy — cinematic quote with parallax ────────────────── */

function Philosophy() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const quoteOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1])
  const quoteScale = useTransform(scrollYProgress, [0.15, 0.35], [0.96, 1])
  const lineScaleX = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])

  return (
    <section ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=1600&q=85"
          alt="Mid-century workspace"
          fill
          className="object-cover"
          style={{ filter: 'brightness(0.15)' }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-[900px] mx-auto px-8 md:px-16 text-center"
        style={{ opacity: quoteOpacity, scale: quoteScale }}
      >
        <span className="label-caps text-white/25 mb-8 block">Philosophy</span>
        <motion.div
          className="w-12 h-px bg-white/15 mx-auto mb-10 origin-center"
          style={{ scaleX: lineScaleX }}
          aria-hidden="true"
        />
        <blockquote className="font-serif text-[clamp(1.5rem,3.5vw,2.8rem)] font-light text-white/70 leading-[1.45] italic">
          &ldquo;Good design is as little design as possible. Less, but better &mdash; because it
          concentrates on the essential aspects.&rdquo;
        </blockquote>
        <p className="mt-8 label-caps text-white/20">Dieter Rams</p>
        <motion.div
          className="w-12 h-px bg-white/15 mx-auto mt-10 origin-center"
          style={{ scaleX: lineScaleX }}
          aria-hidden="true"
        />
        <p className="mt-10 text-[0.88rem] text-white/35 font-light leading-[2] max-w-xl mx-auto">
          Mid-century modernism wasn&rsquo;t just an aesthetic. It was a philosophy rooted in the
          idea that good design should be accessible, functional, and lasting. Designers like Hans
          Wegner, Charles and Ray Eames, and Arne Jacobsen didn&rsquo;t just create furniture
          &mdash; they defined how people live with objects.
        </p>
      </motion.div>
    </section>
  )
}

/* ─── Category Reel — image cards with hover ────────────────────── */

function CategoryReel() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])
  const y = useTransform(scrollYProgress, [0.1, 0.3], [60, 0])

  return (
    <section ref={ref} className="py-24 md:py-36 bg-brand-off">
      <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        <motion.div style={{ opacity, y }}>
          <span className="label-caps text-brand-muted block mb-4">Browse by Room</span>
          <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] font-light text-brand-black leading-[1.15] mb-16">
            Explore our categories
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.slug} cat={cat} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryCard({
  cat,
  index,
  progress,
}: {
  cat: (typeof CATEGORIES)[number]
  index: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const start = 0.2 + index * 0.05
  const end = start + 0.12
  const opacity = useTransform(progress, [start, end], [0, 1])
  const y = useTransform(progress, [start, end], [30, 0])

  return (
    <motion.div style={{ opacity, y }}>
      <Link
        href={`/categories/${cat.slug}`}
        className="group relative block aspect-[3/4] overflow-hidden"
      >
        <Image
          src={cat.image}
          alt={cat.name}
          fill
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
          style={{ filter: 'brightness(0.5)' }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
          aria-hidden="true"
        />
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
          <h3 className="font-serif text-lg md:text-xl text-white font-light group-hover:translate-y-[-4px] transition-transform duration-500">
            {cat.name}
          </h3>
          <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="label-caps text-white/50">Explore</span>
            <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5 text-white/50" aria-hidden="true" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

/* ─── Closing CTA ───────────────────────────────────────────────── */

function ClosingCTA() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1])
  const y = useTransform(scrollYProgress, [0.1, 0.35], [40, 0])

  return (
    <section ref={ref} className="py-28 md:py-36">
      <motion.div
        className="max-w-3xl mx-auto px-8 md:px-16 text-center"
        style={{ opacity, y }}
      >
        <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] text-brand-black font-light mb-6">
          Start exploring
        </h2>
        <p className="text-[0.88rem] text-brand-black/50 font-light leading-[2] mb-12 max-w-lg mx-auto">
          Browse our curated collection of mid-century modern furniture and d&eacute;cor. Each piece
          is sourced, restored, and ready for your space.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="btn-primary inline-flex items-center justify-center gap-3 bg-brand-black text-white px-10 py-4 text-[0.6rem] uppercase tracking-widest-2 font-light"
          >
            <span>Shop All Pieces</span>
            <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" aria-hidden="true" />
          </Link>
          <Link
            href="/categories"
            className="inline-flex items-center justify-center px-10 py-4 border border-brand-black text-brand-black text-[0.6rem] uppercase tracking-widest-2 font-light hover:bg-brand-black hover:text-white transition-all duration-500"
          >
            Browse Categories
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
