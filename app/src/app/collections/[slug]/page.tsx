import { getCollections, getCollectionProducts } from '@/lib/api'
import { notFound } from 'next/navigation'
import ProductGrid from '@/components/ProductGrid'

export const revalidate = 300

export async function generateStaticParams() {
  try {
    const { collections } = await getCollections()
    return collections.map((c) => ({ slug: c.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const { collection } = await getCollectionProducts(params.slug)
    return {
      title: `${collection.name} — Midcenturist SA`,
      description: collection.description || `Browse the ${collection.name} collection`,
    }
  } catch {
    return {
      title: 'Collection Not Found — Midcenturist SA',
    }
  }
}

export default async function CollectionPage({ params }: { params: { slug: string } }) {
  let data
  try {
    data = await getCollectionProducts(params.slug)
  } catch {
    notFound()
  }

  const { collection, products } = data

  return (
    <div className="min-h-screen bg-brand-white">
      {/* Collection Header */}
      <div className="relative bg-brand-off border-b border-brand-rule overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-20 md:py-28 relative z-10">
          <span className="label-caps text-brand-muted block mb-3">Collection</span>
          <h1 className="font-serif text-4xl md:text-[3.4rem] text-brand-black font-light leading-tight mb-4">
            {collection.name}
          </h1>
          {collection.description && (
            <p className="text-sm text-brand-black/50 font-light max-w-xl leading-relaxed mb-4">
              {collection.description}
            </p>
          )}
          <div className="rule mt-4 max-w-[80px]" />
          <p className="mt-6 text-brand-muted uppercase tracking-widest-2 text-[0.6rem]">
            {products.length} piece{products.length !== 1 ? 's' : ''} in this collection
          </p>
        </div>
        <div
          className="absolute -right-24 top-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-brand-black/[0.04]"
          aria-hidden="true"
        />
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-20 md:py-24">
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center py-20">
            <p className="text-brand-muted uppercase tracking-widest-2 text-sm">
              No products available in this collection
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
