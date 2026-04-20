import { getCategoryProducts, Product } from '@/lib/api'
import { notFound } from 'next/navigation'
import ProductGrid from '@/components/ProductGrid'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

export const revalidate = 60

// ─── Per-category content ────────────────────────────────────────────────────

interface CategoryMeta {
  name: string
  tagline: string
  description: string
  heroImage: string
}

const CATEGORY_CONTENT: Record<string, CategoryMeta> = {
  'living-room': {
    name: 'Living Room',
    tagline: 'Where stories begin',
    description:
      'Sideboards, credenzas, coffee tables and lounge chairs — the heart of mid-century living. Each piece has been sourced for its design integrity and restored to a standard that lets you live with it for another lifetime.',
    heroImage: '/images/suede%20couch/images/PHOTO-2026-04-15-18-49-00.jpg',
  },
  'dining-room': {
    name: 'Dining Room',
    tagline: 'Gather around something real',
    description:
      'Dining tables, chairs, sideboards and display cabinets from the 1950s through the 1970s. Teak, rosewood and walnut — designed for daily use and built to last generations.',
    heroImage: '/images/folder%2030/images30/PHOTO-2026-04-15-18-51-53.jpg',
  },
  'bedroom': {
    name: 'Bedroom',
    tagline: 'Rest in design',
    description:
      'Dressers, bedside tables, wardrobes and vanities that bring warmth, craft and quiet elegance to the most personal room in your home.',
    heroImage: '/images/office%20couch/images%20(1)/PHOTO-2026-04-15-18-48-00.jpg',
  },
  'decor-elements': {
    name: 'Décor Elements',
    tagline: 'Details that define a space',
    description:
      'Ceramics, sculptural vases, wall art, clocks and mirrors — the finishing touches that turn a room into a curated interior. Every object hand-picked for character and craftsmanship.',
    heroImage: '/images/folder%2030/images30/PHOTO-2026-04-15-18-52-11.jpg',
  },
  'creative-workspace': {
    name: 'Creative Workspace',
    tagline: 'Work in style',
    description:
      'Desks, shelving units, task lamps and office chairs from the golden age of Scandinavian design. Functional, beautiful and built for focus.',
    heroImage: '/images/chairs/images2/PHOTO-2026-04-15-18-51-17.jpg',
  },
  'outdoor': {
    name: 'Outdoor',
    tagline: 'Extend the interior',
    description:
      'Garden furniture, planters and patio pieces that bring mid-century sensibility outdoors. Weather-tested, design-forward, and ready for your space.',
    heroImage: '/images/chairs/images2/PHOTO-2026-04-15-18-51-18.jpg',
  },
}

// All valid slugs for static generation
const VALID_SLUGS = Object.keys(CATEGORY_CONTENT)

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const meta = CATEGORY_CONTENT[params.slug]
  if (!meta) {
    return { title: 'Category Not Found — Midcenturist SA' }
  }
  return {
    title: `${meta.name} — Midcenturist SA`,
    description: meta.description,
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const meta = CATEGORY_CONTENT[params.slug]

  // If the slug doesn't match any known category, 404
  if (!meta) {
    notFound()
  }

  // Fetch products — graceful fallback to empty
  let products: Product[] = []
  let apiCategoryName = meta.name

  try {
    const data = await getCategoryProducts(params.slug)
    products = data.products
    apiCategoryName = data.category.name
  } catch {
    // API may not have this category yet — show page anyway
  }

  return (
    <div className="min-h-screen bg-brand-white">
      {/* Hero Banner */}
      <div className="relative overflow-hidden" style={{ minHeight: '380px' }}>
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.4s] ease-out-expo"
          style={{
            backgroundImage: `url(${meta.heroImage})`,
            filter: 'brightness(0.5)',
          }}
          aria-hidden="true"
        />
        {/* Side vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/40 to-transparent" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 py-24 md:py-32 flex flex-col justify-end">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-[0.5px] w-8 bg-white/35" />
            <span className="label-caps text-white/50">{meta.tagline}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-[3.6rem] text-white font-light mb-4 leading-tight">
            {apiCategoryName}
          </h1>
          <p className="max-w-xl text-sm text-white/70 font-light leading-relaxed">
            {meta.description}
          </p>
        </div>
      </div>

      {/* Product count bar */}
      <div className="border-b border-brand-rule bg-brand-off">
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-4 flex items-center justify-between">
          <p className="text-brand-muted uppercase tracking-widest-2 text-[0.6rem]">
            {products.length} piece{products.length !== 1 ? 's' : ''} available
          </p>
          <Link
            href="/shop"
            className="text-[0.6rem] uppercase tracking-widest-2 font-light text-brand-muted hover:text-brand-black transition-colors flex items-center gap-2"
          >
            View all pieces
            <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5" />
          </Link>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-16 md:py-24">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-brand-black mb-3">Coming Soon</p>
            <p className="text-brand-muted text-sm font-light max-w-md mx-auto leading-relaxed">
              We&apos;re curating pieces for this collection. Follow us on social media for updates, or browse our full shop.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-brand-black text-white text-[0.6rem] uppercase tracking-widest-2 font-light hover:opacity-90 transition-opacity"
            >
              Browse All Pieces
              <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
