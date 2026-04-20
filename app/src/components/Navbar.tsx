'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faBagShopping,
  faBars,
  faXmark,
  faChevronDown,
  faChevronRight,
  faCouch,
  faBox,
  faLightbulb,
  faTable,
  faBed,
  faStar,
  faTag,
  faUtensils,
  faBriefcase,
  faTree,
} from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { CATEGORIES, NAV_LINKS } from '@/lib/constants'
import { useCart } from '@/context/CartContext'
import { getCategories } from '@/lib/api'
import { motion, AnimatePresence } from 'framer-motion'

const CATEGORY_ICONS = {
  'fa-couch': faCouch,
  'fa-box': faBox,
  'fa-lightbulb': faLightbulb,
  'fa-table': faTable,
  'fa-bed': faBed,
  'fa-star': faStar,
  'fa-tag': faTag,
  'fa-utensils': faUtensils,
  'fa-briefcase': faBriefcase,
  'fa-tree': faTree,
}

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const [mobileCatOpen, setMobileCatOpen] = useState(false)
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({})
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { itemCount, openCart } = useCart()

  useEffect(() => {
    let cancelled = false
    const fetchCounts = (attempt = 1) => {
      getCategories()
        .then(({ categories }) => {
          if (cancelled) return
          const counts: Record<string, number> = {}
          for (const cat of categories) {
            counts[cat.slug] = cat.product_count ?? 0
          }
          setCategoryCounts(counts)
        })
        .catch(() => {
          if (!cancelled && attempt < 3) {
            setTimeout(() => fetchCounts(attempt + 1), 3000)
          }
        })
    }
    fetchCounts()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCategoryOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const NavLink = ({ label, href }: { label: string; href: string }) => {
    const active = isActive(href)
    return (
      <Link
        href={href}
        className={`nav-link relative pb-[18px] text-[0.6rem] uppercase tracking-widest-2 transition-colors duration-300 ${
          active ? 'font-normal text-brand-black' : 'font-light text-brand-black/60 hover:text-brand-black'
        }`}
        aria-current={active ? 'page' : undefined}
      >
        {active && (
          <span className="absolute left-1/2 -translate-x-1/2 bottom-[14px] w-[3px] h-[3px] rounded-full bg-brand-black" aria-hidden="true" />
        )}
        {label}
        <span
          className={`nav-link-underline absolute bottom-0 left-0 w-full h-[1px] bg-brand-black origin-left ${active ? 'active' : ''}`}
          aria-hidden="true"
        />
      </Link>
    )
  }

  return (
    <>
      <header
        className={`sticky top-0 z-[200] w-full transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-brand-rule shadow-[0_1px_20px_rgba(0,0,0,0.04)]'
            : 'bg-white/97 backdrop-blur-[12px] border-b border-brand-rule'
        }`}
        role="banner"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-[72px] flex items-center relative">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 z-10 group" aria-label="Midcenturist SA home">
            <Image
              src="/logo/logo-removebg-preview.png"
              alt="Midcenturist SA"
              width={580}
              height={156}
              className="h-[170px] w-[340px] object-contain"
              priority
            />
          </Link>

          {/* Nav links — centred */}
          <nav className="hidden md:flex items-center gap-9 absolute left-1/2 -translate-x-1/2" aria-label="Main navigation">
            <NavLink label="Home" href="/" />
            <NavLink label="About" href="/about" />

            {/* Categories dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setCategoryOpen(true)}
              onMouseLeave={() => setCategoryOpen(false)}
            >
              <button
                className={`nav-link relative pb-[18px] text-[0.6rem] uppercase tracking-widest-2 flex items-center gap-1.5 transition-colors duration-300 ${
                  pathname.startsWith('/categories')
                    ? 'font-normal text-brand-black'
                    : 'font-light text-brand-black/60 hover:text-brand-black'
                }`}
                aria-haspopup="true"
                aria-expanded={categoryOpen}
                onClick={() => setCategoryOpen(!categoryOpen)}
              >
                {pathname.startsWith('/categories') && (
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-[14px] w-[3px] h-[3px] rounded-full bg-brand-black" aria-hidden="true" />
                )}
                Categories
                <FontAwesomeIcon icon={faChevronDown} className={`text-[0.4rem] mt-[1px] transition-transform duration-300 ${categoryOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                <span
                  className={`nav-link-underline absolute bottom-0 left-0 w-full h-[1px] bg-brand-black origin-left ${
                    pathname.startsWith('/categories') ? 'active' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {categoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[290px] bg-white border border-brand-rule shadow-[0_12px_40px_rgba(0,0,0,0.08)] py-2"
                    role="menu"
                  >
                    {CATEGORIES.map((cat, i) => (
                      <motion.div
                        key={cat.href}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          href={cat.href}
                          className="flex items-center px-5 py-2.5 text-[0.58rem] uppercase tracking-widest font-light hover:bg-brand-off hover:pl-6 transition-all duration-200 group/item"
                          role="menuitem"
                        >
                          <FontAwesomeIcon
                            icon={CATEGORY_ICONS[cat.icon as keyof typeof CATEGORY_ICONS] ?? faTag}
                            className="w-3 h-3 text-brand-black/30 mr-3 shrink-0 group-hover/item:text-brand-black/60 transition-colors"
                            aria-hidden="true"
                          />
                          <span className="flex-1">{cat.label}</span>
                          <span className="text-brand-muted ml-2 text-[0.5rem]">{categoryCounts[cat.href.split('/').pop()!] ?? cat.count}</span>
                        </Link>
                      </motion.div>
                    ))}
                    <div className="border-t border-brand-rule mt-1 pt-1">
                      <Link
                        href="/categories"
                        className="flex items-center justify-center px-5 py-2.5 text-[0.55rem] uppercase tracking-widest font-light text-brand-muted hover:text-brand-black transition-colors"
                        role="menuitem"
                      >
                        View All Categories
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink label="Contact Us" href="/contact" />
          </nav>

          {/* Action icons */}
          <div className="ml-auto flex items-center gap-5 z-10">
            <button
              className="text-brand-black/50 hover:text-brand-black transition-colors duration-300"
              aria-label="Search"
              onClick={() => router.push('/search')}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="w-[14px] h-[14px]" />
            </button>
            <button
              className="text-brand-black/50 hover:text-brand-black transition-colors duration-300"
              aria-label="Wishlist"
            >
              <FontAwesomeIcon icon={faHeartRegular} className="w-[14px] h-[14px]" />
            </button>
            <button
              onClick={openCart}
              className="relative text-brand-black/50 hover:text-brand-black transition-colors duration-300"
              aria-label={`Cart, ${itemCount} items`}
            >
              <FontAwesomeIcon icon={faBagShopping} className="w-[14px] h-[14px]" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2.5 w-[16px] h-[16px] rounded-full bg-brand-black text-white text-[0.42rem] flex items-center justify-center font-sans"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            <button
              className="md:hidden text-brand-black ml-1"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
            >
              <FontAwesomeIcon icon={faBars} className="w-[17px] h-[17px]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-[300] md:hidden" aria-modal="true" role="dialog" aria-label="Navigation menu">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-brand-black/50 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 right-0 h-full w-[320px] bg-white flex flex-col"
            >
              <div className="flex items-center justify-between px-6 h-[72px] border-b border-brand-rule">
                <span className="font-sans text-[0.6rem] tracking-widest-2 uppercase font-light">Menu</span>
                <button onClick={() => setDrawerOpen(false)} aria-label="Close menu">
                  <FontAwesomeIcon icon={faXmark} className="w-[17px] h-[17px]" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-0" aria-label="Mobile navigation">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      className={`py-4 block text-[0.7rem] uppercase tracking-widest-2 border-b border-brand-rule/40 font-light transition-colors ${
                        isActive(link.href) ? 'font-normal text-brand-black' : 'text-brand-black/60'
                      }`}
                      onClick={() => setDrawerOpen(false)}
                      aria-current={isActive(link.href) ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Categories */}
                <div className="border-b border-brand-rule/40">
                  <button
                    className="w-full flex items-center justify-between py-4 text-[0.7rem] uppercase tracking-widest-2 font-light text-brand-black/60"
                    onClick={() => setMobileCatOpen(!mobileCatOpen)}
                    aria-expanded={mobileCatOpen}
                  >
                    Categories
                    <FontAwesomeIcon
                      icon={mobileCatOpen ? faChevronDown : faChevronRight}
                      className={`text-[0.55rem] transition-transform duration-300 ${mobileCatOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence>
                    {mobileCatOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-3 flex flex-col gap-0.5 pl-3">
                          {CATEGORIES.map((cat) => (
                            <Link
                              key={cat.href}
                              href={cat.href}
                              className="flex items-center py-2.5 text-[0.62rem] uppercase tracking-widest font-light text-brand-black/50 hover:text-brand-black transition-colors"
                              onClick={() => setDrawerOpen(false)}
                            >
                              <FontAwesomeIcon
                                icon={CATEGORY_ICONS[cat.icon as keyof typeof CATEGORY_ICONS] ?? faTag}
                                className="w-3 h-3 mr-2.5 text-brand-black/25"
                                aria-hidden="true"
                              />
                              <span className="flex-1">{cat.label}</span>
                              <span className="text-brand-muted text-[0.5rem]">{categoryCounts[cat.href.split('/').pop()!] ?? cat.count}</span>
                            </Link>
                          ))}
                          <Link
                            href="/categories"
                            className="py-2.5 text-[0.58rem] uppercase tracking-widest font-light text-brand-muted hover:text-brand-black text-center transition-colors"
                            onClick={() => setDrawerOpen(false)}
                          >
                            View All Categories
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
