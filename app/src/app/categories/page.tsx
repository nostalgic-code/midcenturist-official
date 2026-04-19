import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const CATEGORIES = [
  {
    slug: 'living-room',
    name: 'Living Room',
    tagline: 'Where stories begin',
    description: 'Sideboards, credenzas, coffee tables and lounge chairs.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=85',
  },
  {
    slug: 'dining-room',
    name: 'Dining Room',
    tagline: 'Gather around something real',
    description: 'Dining tables, chairs, sideboards and display cabinets.',
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=85',
  },
  {
    slug: 'bedroom',
    name: 'Bedroom',
    tagline: 'Rest in design',
    description: 'Dressers, bedside tables, wardrobes and vanities.',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=85',
  },
  {
    slug: 'decor-elements',
    name: 'Décor Elements',
    tagline: 'Details that define a space',
    description: 'Ceramics, sculptural vases, wall art, clocks and mirrors.',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=85',
  },
  {
    slug: 'creative-workspace',
    name: 'Creative Workspace',
    tagline: 'Work in style',
    description: 'Desks, shelving units, task lamps and office chairs.',
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&q=85',
  },
  {
    slug: 'outdoor',
    name: 'Outdoor',
    tagline: 'Extend the interior',
    description: 'Garden furniture, planters and patio pieces.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85',
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
          <span className="label-caps text-brand-muted block mb-3">Browse by Room</span>
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
