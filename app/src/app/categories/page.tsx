import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const CATEGORIES = [
  {
    slug: 'living-room',
    name: 'Living Room',
    tagline: 'Where stories begin',
    description: 'Sideboards, credenzas, coffee tables and lounge chairs.',
    image: '/images/suede%20couch/images/PHOTO-2026-04-15-18-49-00.jpg',
  },
  {
    slug: 'dining-room',
    name: 'Dining Room',
    tagline: 'Gather around something real',
    description: 'Dining tables, chairs, sideboards and display cabinets.',
    image: '/images/folder%2030/images30/PHOTO-2026-04-15-18-51-53.jpg',
  },
  {
    slug: 'bedroom',
    name: 'Bedroom',
    tagline: 'Rest in design',
    description: 'Dressers, bedside tables, wardrobes and vanities.',
    image: '/images/office%20couch/images%20(1)/PHOTO-2026-04-15-18-48-00.jpg',
  },
  {
    slug: 'decor-elements',
    name: 'Décor Elements',
    tagline: 'Details that define a space',
    description: 'Ceramics, sculptural vases, wall art, clocks and mirrors.',
    image: '/images/folder%2030/images30/PHOTO-2026-04-15-18-52-11.jpg',
  },
  {
    slug: 'creative-workspace',
    name: 'Creative Workspace',
    tagline: 'Work in style',
    description: 'Desks, shelving units, task lamps and office chairs.',
    image: '/images/chairs/images2/PHOTO-2026-04-15-18-51-17.jpg',
  },
  {
    slug: 'outdoor',
    name: 'Outdoor',
    tagline: 'Extend the interior',
    description: 'Garden furniture, planters and patio pieces.',
    image: '/images/chairs/images2/PHOTO-2026-04-15-18-51-18.jpg',
  },
]

export const metadata = {
  title: 'Categories — Midcenturist SA',
  description: 'Browse our curated categories of mid-century modern furniture and décor.',
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-brand-white">
      {/* Header */}
      <div className="relative bg-brand-off border-b border-brand-rule overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-20 md:py-28 relative z-10">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-[0.5px] w-8 bg-brand-black/8" />
            <span className="label-caps text-brand-muted">Browse by Room</span>
          </div>
          <h1 className="font-serif text-4xl md:text-[3.4rem] text-brand-black font-light leading-tight">
            Categories
          </h1>
          <div className="rule mt-6 max-w-[100px]" />
          <p className="mt-6 text-sm text-brand-black/50 font-light max-w-md leading-relaxed">
            Explore our curated rooms — each filled with authenticated mid-century pieces, restored and ready for your space.
          </p>
        </div>
        {/* Decorative circle */}
        <div
          className="absolute -right-24 top-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full border border-brand-black/[0.04]"
          aria-hidden="true"
        />
      </div>

      {/* Category grid */}
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-brand-rule">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="relative overflow-hidden block group bg-white"
              style={{ aspectRatio: '4/5' }}
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                style={{
                  backgroundImage: `url(${cat.image})`,
                  filter: 'brightness(0.7)',
                }}
                aria-hidden="true"
              />
              {/* Gradient */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(12,11,10,0.85) 0%, rgba(12,11,10,0.08) 55%)' }}
                aria-hidden="true"
              />
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                <span className="text-[0.5rem] tracking-widest-2 uppercase text-white/50 font-light mb-2">
                  {cat.tagline}
                </span>
                <h2 className="font-serif text-[2rem] md:text-[2.4rem] font-light text-white leading-tight mb-2">
                  {cat.name}
                </h2>
                <p className="text-[0.7rem] text-white/50 font-light mb-5 max-w-[260px]">
                  {cat.description}
                </p>
                <span className="inline-flex items-center gap-2 text-[0.55rem] tracking-[0.16em] uppercase text-white/50 font-light border-b border-white/20 pb-[2px] w-fit group-hover:text-white group-hover:border-white transition-colors">
                  Explore
                  <FontAwesomeIcon icon={faArrowRight} className="w-2.5 h-2.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
