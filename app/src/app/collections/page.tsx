import { getCollections } from '@/lib/api'
import Link from 'next/link'

export const revalidate = 300

export default async function CollectionsPage() {
  let collections: import('@/lib/api').Collection[] = []

  try {
    const data = await getCollections()
    collections = data.collections.filter((c) => c.is_active)
  } catch (e) {
    console.error('Failed to fetch collections', e)
  }

  return (
    <div className="min-h-screen bg-brand-white">
      {/* Header */}
      <div className="relative bg-brand-off border-b border-brand-rule overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-20 md:py-28 relative z-10">
          <span className="label-caps text-brand-muted block mb-3">Explore</span>
          <h1 className="font-serif text-4xl md:text-[3.4rem] text-brand-black font-light leading-tight mb-4">
            Collections
          </h1>
          <div className="rule mt-4 max-w-[100px]" />
          <p className="mt-6 text-sm text-brand-black/50 font-light max-w-md leading-relaxed">
            Curated groupings of our finest pieces, assembled around themes, eras, and design movements.
          </p>
        </div>
        <div
          className="absolute -right-24 top-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full border border-brand-black/[0.04]"
          aria-hidden="true"
        />
      </div>

      {/* Collections Grid */}
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-20 md:py-24">
        {collections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-rule">
            {collections.map((col) => (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className="group block bg-brand-white p-10 md:p-12 hover:bg-brand-cream transition-colors duration-500"
              >
                <h2 className="font-serif text-2xl text-brand-black mb-3 group-hover:opacity-70 transition-opacity duration-300">
                  {col.name}
                </h2>
                {col.description && (
                  <p className="text-sm text-brand-muted font-light leading-relaxed mb-6">
                    {col.description}
                  </p>
                )}
                <span className="inline-block text-[0.55rem] uppercase tracking-widest-2 font-light text-brand-black border-b border-brand-rule pb-0.5 group-hover:border-brand-black transition-colors duration-300">
                  View Collection
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-brand-muted uppercase tracking-widest-2 text-sm">
              No collections available
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
