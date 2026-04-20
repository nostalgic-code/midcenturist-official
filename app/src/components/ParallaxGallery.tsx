'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const CATEGORIES = [
  {
    name: 'Living Room',
    slug: 'living-room',
    tagline: 'Where stories begin',
    image: '/images/suede%20couch/images/PHOTO-2026-04-15-18-49-00.jpg',
  },
  {
    name: 'Dining Room',
    slug: 'dining-room',
    tagline: 'Gather around something real',
    image: '/images/folder%2030/images30/PHOTO-2026-04-15-18-52-10.jpg',
  },
  {
    name: 'Bedroom',
    slug: 'bedroom',
    tagline: 'Rest in design',
    image: '/images/office%20couch/images%20(1)/PHOTO-2026-04-15-18-48-00.jpg',
  },
  {
    name: 'D\u00e9cor Elements',
    slug: 'decor-elements',
    tagline: 'Details that define a space',
    image: '/images/folder%2030/images30/PHOTO-2026-04-15-18-52-11.jpg',
  },
]

export default function ParallaxGallery() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section className="bg-brand-off overflow-hidden" ref={containerRef}>
      {/* Section header */}
      <div className="py-20 md:py-24 px-8 md:px-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="label-caps text-brand-muted mb-4 block">Browse by Room</span>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.5rem)] font-light text-brand-black leading-[1.05]">
              Find your room.
            </h2>
          </div>
          <Link
            href="/categories"
            className="group/link inline-flex items-center gap-2 label-caps text-brand-black border-b border-brand-black/20 pb-1 hover:border-brand-black transition-colors duration-300 w-fit"
          >
            All Categories
            <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5 transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Staggered masonry with parallax */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {CATEGORIES.map((cat, i) => (
          <ParallaxCard key={cat.slug} category={cat} index={i} />
        ))}
      </div>
    </section>
  )
}

function ParallaxCard({
  category,
  index,
}: {
  category: (typeof CATEGORIES)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Alternate parallax direction and speed
  const isOdd = index % 2 === 1
  const imageY = useTransform(scrollYProgress, [0, 1], isOdd ? ['-8%', '8%'] : ['8%', '-8%'])
  const contentOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1])
  const contentY = useTransform(scrollYProgress, [0.15, 0.35], [40, 0])

  return (
    <div
      ref={ref}
      className={`relative ${isOdd ? 'md:mt-24' : ''}`}
    >
      <Link
        href={`/categories/${category.slug}`}
        className="group block relative overflow-hidden"
        style={{ aspectRatio: '3/4' }}
      >
        {/* Parallax image */}
        <motion.div
          className="absolute inset-0"
          style={{ y: imageY, scale: 1.15 }}
        >
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-all duration-[1.4s] ease-out group-hover:scale-[1.04]"
            style={{ filter: 'brightness(0.6)' }}
          />
        </motion.div>

        {/* Gradient */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              'linear-gradient(to top, rgba(12,11,10,0.9) 0%, rgba(12,11,10,0.2) 50%, rgba(12,11,10,0.05) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-[2] p-8 md:p-12"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <span className="label-caps text-white/30 mb-3 block">{category.tagline}</span>
          <h3 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light text-white leading-tight mb-4">
            {category.name}
          </h3>
          <span className="inline-flex items-center gap-2 label-caps text-white/40 border-b border-white/15 pb-1 group-hover:text-white group-hover:border-white/40 transition-all duration-500">
            Explore
            <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </motion.div>
      </Link>
    </div>
  )
}
