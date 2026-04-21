import HeroSlider from '@/components/HeroSlider'
import ShowcaseDuo from '@/components/ShowcaseDuo'
import ProductCarousel from '@/components/ProductCarousel'
import MissionBand from '@/components/MissionBand'
import IGFeed from '@/components/IGFeed'
import Newsletter from '@/components/Newsletter'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { getProducts } from '@/lib/api'
import type { HeroSlide } from '@/types'

export const revalidate = 60

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    category: 'Living Room',
    eyebrow: 'Living Room',
    titleLine1: 'Teak.',
    titleLine2: 'Timeless.',
    titleLine2Italic: true,
    subtitle: 'Authentic Danish teak sideboards from the 1950s and 60s — the centrepiece of every mid-century interior.',
    ctaLabel: 'Shop Living Room',
    ctaHref: '/categories/living-room',
    imageUrl: '/images/chairs/images2/PHOTO-2026-04-15-18-51-17.jpg',
    noOverlay: true,
    featuredPieceName: 'Danish Teak Sideboard',
    featuredPiecePrice: 'R 14,500',
    featuredPieceYear: 1962,
  },
  {
    id: 'slide-2',
    category: 'Dining Room',
    eyebrow: 'Dining Room',
    titleLine1: 'Sit in',
    titleLine2: 'History.',
    titleLine2Italic: true,
    subtitle: 'Dining sets, sideboards and statement chairs from the golden age — restored and ready to live with you for another lifetime.',
    ctaLabel: 'Shop Dining Room',
    ctaHref: '/categories/dining-room',
    imageUrl: '/images/folder%2030/images30/PHOTO-2026-04-15-18-51-53.jpg',
    featuredPieceName: 'Walnut Dining Set',
    featuredPiecePrice: 'R 9,800',
    featuredPieceYear: 1955,
  },
  {
    id: 'slide-3',
    category: 'Décor Elements',
    eyebrow: 'Décor Elements',
    titleLine1: 'Details',
    titleLine2: 'matter.',
    titleLine2Italic: true,
    subtitle: 'Ceramics, sculptural vases and wall objects — curated with the same care as every piece of furniture we sell.',
    ctaLabel: 'Shop Décor',
    ctaHref: '/categories/decor-elements',
    imageUrl: '/images/folder%2030/images30/PHOTO-2026-04-15-18-52-11.jpg',
    featuredPieceName: 'Ceramic Vessel Set',
    featuredPiecePrice: 'R 1,950',
    featuredPieceYear: 1968,
  },
  {
    id: 'slide-4',
    category: 'Creative Workspace',
    eyebrow: 'Creative Workspace',
    titleLine1: 'Work in',
    titleLine2: 'style.',
    titleLine2Italic: true,
    subtitle: 'Desks, shelving and statement lamps — mid-century essentials for the modern creative office.',
    ctaLabel: 'Shop Workspace',
    ctaHref: '/categories/creative-workspace',
    imageUrl: '/images/chairs/images2/PHOTO-2026-04-15-18-51-17.jpg',
    featuredPieceName: 'Secretary Writing Desk',
    featuredPiecePrice: 'R 6,200',
    featuredPieceYear: 1964,
  },
]

export default async function HomePage() {
  // Fetch featured products and new arrivals from the API
  let featuredProducts: import('@/lib/api').Product[] = []
  let newInProducts: import('@/lib/api').Product[] = []

  try {
    const [featuredRes, newInRes] = await Promise.all([
      getProducts({ featured: true, limit: 8 }),
      getProducts({ badge: 'New In', limit: 8 }),
    ])
    featuredProducts = featuredRes.products
    newInProducts = newInRes.products
  } catch (e) {
    console.error('Failed to fetch homepage products', e)
  }

  return (
    <>
      {/* 1 — Hero */}
      <HeroSlider slides={HERO_SLIDES} />

      {/* 2 — Featured Products */}
      <section className="py-20 md:py-28 bg-brand-off border-t border-brand-off-d" aria-labelledby="explore-heading">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 px-8 md:px-20 mb-14">
          <div>
            <span className="label-caps text-brand-muted mb-3 block">Freshly Listed</span>
            <h2 id="explore-heading" className="font-serif text-[clamp(2rem,3vw,3rem)] font-light text-brand-black">
              Explore the Collection
            </h2>
          </div>
          <Link
            href="/shop"
            className="group/link inline-flex items-center gap-2.5 font-sans text-[0.56rem] tracking-[0.18em] uppercase text-brand-black font-light border-b border-brand-black/30 pb-[3px] hover:border-brand-black transition-colors duration-300"
          >
            View All Pieces
            <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5 transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        {featuredProducts.length > 0 ? (
          <ProductCarousel apiProducts={featuredProducts} />
        ) : (
          <p className="text-center text-brand-muted text-sm py-8">No featured products available right now.</p>
        )}
      </section>

      {/* 3 — Sold & Archive showcase */}
      <ShowcaseDuo />

      {/* 4 — New Arrivals */}
      {newInProducts.length > 0 && (
        <section className="py-20 md:py-28 bg-white border-t border-brand-rule" aria-labelledby="newin-heading">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 px-8 md:px-20 mb-14">
            <div>
              <span className="label-caps text-brand-muted mb-3 block">Just Added</span>
              <h2 id="newin-heading" className="font-serif text-[clamp(2rem,3vw,3rem)] font-light text-brand-black">
                New Arrivals
              </h2>
            </div>
            <Link
              href="/shop?sort=newest"
              className="group/link inline-flex items-center gap-2.5 font-sans text-[0.56rem] tracking-[0.18em] uppercase text-brand-black font-light border-b border-brand-black/30 pb-[3px] hover:border-brand-black transition-colors duration-300"
            >
              View All New
              <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5 transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
          <ProductCarousel apiProducts={newInProducts} />
        </section>
      )}

      {/* 5 — Brand statement */}
      <MissionBand />

      {/* 6 — Newsletter */}
      <Newsletter />

      {/* 7 — Instagram */}
      <IGFeed />
    </>
  )
}
