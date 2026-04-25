import HeroSlider from '@/components/HeroSlider'
import ShowcaseDuo from '@/components/ShowcaseDuo'
import ProductCard from '@/components/ProductCard'
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
    titleLine1: 'Spaces with',
    titleLine2: 'Character.',
    titleLine2Italic: true,
    subtitle: 'Mid-century sofas, teak sideboards and curated objects — living rooms with decades of soul, ready for yours.',
    ctaLabel: 'Shop Living Room',
    ctaHref: '/categories/living-room',
    imageUrl: '/images/landingpage5.jpg',
    objectContain: true,
    featuredPieceName: 'Danish Teak Sideboard',
    featuredPiecePrice: 'R 14,500',
    featuredPieceYear: 1962,
  },
  {
    id: 'slide-2',
    category: 'Dining Room',
    eyebrow: 'Dining Room',
    titleLine1: 'Dine in',
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
    titleLine1: 'Texture',
    titleLine2: '& Colour.',
    titleLine2Italic: true,
    subtitle: 'Sculptural ceramics, hand-thrown vessels and wall objects — the finishing touch that makes a room unmistakably yours.',
    ctaLabel: 'Shop Décor',
    ctaHref: '/categories/decor-elements',
    imageUrl: '/images/decorelements/4.jpg',
    objectContain: true,
    featuredPieceName: 'Ceramic Vessel Set',
    featuredPiecePrice: 'R 1,950',
    featuredPieceYear: 1968,
  },
  {
    id: 'slide-4',
    category: 'Creative Workspace',
    eyebrow: 'Creative Workspace',
    titleLine1: 'Work in',
    titleLine2: 'Style.',
    titleLine2Italic: true,
    subtitle: 'Desks, shelving and statement lamps — mid-century essentials for the modern creative office.',
    ctaLabel: 'Shop Workspace',
    ctaHref: '/categories/creative-workspace',
    imageUrl: '/images/workspaceimages/5.jpg',
    noOverlay: true,
    objectContain: true,
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
      getProducts({ limit: 4 }),
      getProducts({ limit: 4, page: 2 }),
    ])
    featuredProducts = featuredRes.products
    newInProducts = newInRes.products.length > 0 ? newInRes.products : featuredRes.products
  } catch (e) {
    console.error('Failed to fetch homepage products', e)
  }

  return (
    <>
      {/* 1 — Hero */}
      <HeroSlider slides={HERO_SLIDES} />

      {/* 2 — 3-panel showcase: Sold Pieces / Archive / New Arrivals */}
      <ShowcaseDuo />

      {/* 3 — Explore our products */}
      <section className="py-20 md:py-28 bg-white border-t border-gray-100" aria-labelledby="explore-heading">
          <div className="px-8 md:px-16 lg:px-20">
            <div className="text-center mb-12">
              <h2 id="explore-heading" className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] font-light text-brand-black mb-4">
                Explore our products
              </h2>
              <p className="font-sans text-sm text-brand-muted font-light max-w-md mx-auto leading-relaxed">
                Shop some of our favourite and most loved pieces, from living room, dining, and bedroom furniture.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-14">
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 font-sans text-[0.6rem] tracking-[0.22em] uppercase bg-brand-black text-white px-10 py-4 hover:bg-brand-black/80 transition-colors duration-300"
              >
                Shop Catalogue
                <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

      {/* 4 — Our best sellers */}
      <section className="py-20 md:py-28 bg-brand-off border-t border-brand-off-d" aria-labelledby="bestsellers-heading">
          <div className="px-8 md:px-16 lg:px-20">
            <div className="text-center mb-12">
              <h2 id="bestsellers-heading" className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] font-light text-brand-black mb-4">
                Our best sellers
              </h2>
              <p className="font-sans text-sm text-brand-muted font-light max-w-md mx-auto leading-relaxed">
                Explore our curated collection of mid-century pieces for an exquisite living space. Shop today.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {newInProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-14">
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 font-sans text-[0.6rem] tracking-[0.22em] uppercase bg-brand-black text-white px-10 py-4 hover:bg-brand-black/80 transition-colors duration-300"
              >
                Shop Catalogue
                <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

      {/* 5 — Newsletter */}
      <Newsletter />

      {/* 6 — Instagram */}
      <IGFeed />
    </>
  )
}
