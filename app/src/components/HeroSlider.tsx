'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useCursor } from '@/context/CursorProvider'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import type { HeroSliderProps } from '@/types'

export default function HeroSlider({ slides, autoPlayInterval = 6000 }: HeroSliderProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const router = useRouter()
  const { setHoverLabel } = useCursor()
  const progressRef = useRef<HTMLDivElement>(null)

  const goTo = useCallback(
    (index: number, dir?: number) => {
      const next = (index + slides.length) % slides.length
      setDirection(dir ?? (next > current ? 1 : -1))
      setCurrent(next)
    },
    [slides.length, current],
  )

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % slides.length)
    }, autoPlayInterval)
  }, [slides.length, autoPlayInterval])

  useEffect(() => {
    startAutoPlay()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [startAutoPlay])

  const handleManualNav = (index: number, dir?: number) => {
    goTo(index, dir)
    startAutoPlay()
  }

  const slide = slides[current]

  const imageVariants: Variants = {
    enter: (d: number) => ({
      scale: 1.1,
      opacity: 0,
      x: d > 0 ? '3%' : '-3%',
    }),
    center: {
      scale: 1,
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, ease: 'easeOut' },
    },
    exit: (d: number) => ({
      scale: 1.05,
      opacity: 0,
      x: d > 0 ? '-3%' : '3%',
      transition: { duration: 0.8, ease: 'easeInOut' },
    }),
  }

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, delay: 0.3 + i * 0.12, ease: 'easeOut' },
    }),
    exit: {
      opacity: 0,
      y: -30,
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
  }

  return (
    <section
      className="relative w-full overflow-hidden bg-brand-black"
      style={{ height: 'calc(100vh - 68px)', minHeight: '580px' }}
      aria-label="Hero slider"
      aria-roledescription="carousel"
    >
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={slide.id}
          custom={direction}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 cursor-pointer"
          onClick={() => router.push(slide.ctaHref)}
          onMouseEnter={() => setHoverLabel('Shop')}
          onMouseLeave={() => setHoverLabel(null)}
          aria-label={`Go to ${slide.category}`}
        >
          <Image
            src={slide.imageUrl}
            alt={slide.titleLine1 + ' ' + slide.titleLine2}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: 'brightness(0.55)' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(12,11,10,0.95) 0%, rgba(12,11,10,0.5) 30%, rgba(12,11,10,0.15) 55%, transparent 100%)',
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(12,11,10,0.4) 0%, transparent 30%, transparent 70%, rgba(12,11,10,0.3) 100%)',
            }}
            aria-hidden="true"
          />
        </motion.div>
      </AnimatePresence>

      {/* Bottom-left typography */}
      <div className="absolute bottom-14 left-8 md:left-16 max-w-[720px] z-10">
        <AnimatePresence mode="wait">
          <motion.div key={slide.id} initial="hidden" animate="visible" exit="exit">
            <motion.div custom={0} variants={textVariants} className="flex items-center gap-4 mb-5">
              <motion.div
                className="h-[1px] bg-white/40 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                style={{ width: 48 }}
              />
              <span className="label-caps text-white/60">{slide.eyebrow}</span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={textVariants}
              className="display-heading text-white"
              style={{ fontSize: 'clamp(3.8rem, 9vw, 9rem)' }}
            >
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
                >
                  {slide.titleLine1}
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className={`block ${slide.titleLine2Italic ? 'italic' : ''}`}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                >
                  {slide.titleLine2}
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              custom={3}
              variants={textVariants}
              className="mt-6 font-sans text-[0.82rem] text-white/40 font-light leading-[1.9] max-w-[480px] hidden md:block"
            >
              {slide.subtitle}
            </motion.p>

            <motion.div custom={4} variants={textVariants} className="mt-8 hidden md:block">
              <button
                onClick={() => router.push(slide.ctaHref)}
                className="group/cta inline-flex items-center gap-3 bg-white/[0.06] border border-white/15 px-8 py-4 text-white text-[0.6rem] uppercase tracking-widest-2 font-light backdrop-blur-sm hover:bg-white/[0.12] hover:border-white/30 transition-all duration-500"
                aria-label={slide.ctaLabel}
              >
                <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 transition-transform duration-300 group-hover/cta:translate-x-1" aria-hidden="true" />
                {slide.ctaLabel}
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Top-right featured piece tag */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id + '-tag'}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] as const } }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="absolute top-10 right-8 md:right-16 glass px-6 py-5 hidden md:block z-10"
        >
          <p className="text-[0.48rem] uppercase tracking-widest-2 text-white/40 font-light mb-2">Featured Piece</p>
          <p className="font-serif text-white text-[1.1rem] font-light leading-tight">{slide.featuredPieceName}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="font-serif text-white text-[1rem] font-light">{slide.featuredPiecePrice}</span>
            <span className="text-[0.48rem] text-white/30 uppercase tracking-widest font-light">c. {slide.featuredPieceYear}</span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Vertical nav dots */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10" role="tablist" aria-label="Slider navigation">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => handleManualNav(i)}
            className="group/dot flex items-center justify-center w-4"
            aria-label={`Go to slide ${i + 1}: ${s.titleLine1}`}
            aria-selected={i === current}
            role="tab"
          >
            <span
              className={`block rounded-full transition-all duration-500 ${
                i === current ? 'bg-white h-6 w-[3px]' : 'bg-white/20 h-[3px] w-[3px] group-hover/dot:bg-white/60'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Arrow buttons */}
      <div className="absolute right-24 bottom-14 z-10 hidden md:flex items-center gap-2">
        <button
          onClick={() => handleManualNav(current - 1, -1)}
          className="w-11 h-11 border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all duration-300"
          aria-label="Previous slide"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
        </button>
        <button
          onClick={() => handleManualNav(current + 1, 1)}
          className="w-11 h-11 border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all duration-300"
          aria-label="Next slide"
        >
          <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 z-10">
        <motion.div
          ref={progressRef}
          className="h-full bg-white/30"
          key={current}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: autoPlayInterval / 1000, ease: 'linear' }}
        />
      </div>

      {/* Slide counter — mobile */}
      <div className="absolute bottom-14 right-8 z-10 md:hidden">
        <span className="font-sans text-[0.56rem] text-white/30 tracking-widest-2">
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  )
}
