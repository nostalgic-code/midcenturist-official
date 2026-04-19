import { getProducts } from '@/lib/api'
import ProductGrid from '@/components/ProductGrid'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

export const revalidate = 60

interface ShopPageProps {
  searchParams: { page?: string; badge?: string }
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const page = Math.max(1, parseInt(searchParams.page || '1', 10) || 1)
  const badge = searchParams.badge as 'New In' | 'Last One' | 'Sale' | undefined
  const limit = 24

  let products: import('@/lib/api').Product[] = []
  let total = 0
  let pages = 1

  try {
    const data = await getProducts({ page, limit, badge: badge || undefined })
    products = data.products
    total = data.total
    pages = data.pages
  } catch (e) {
    console.error('Failed to fetch products', e)
  }

  const badgeFilters = [
    { label: 'All', value: undefined },
    { label: 'New In', value: 'New In' },
    { label: 'Last One', value: 'Last One' },
    { label: 'Sale', value: 'Sale' },
  ]

  return (
    <div className="min-h-screen bg-brand-white">
      {/* Header */}
      <div className="bg-brand-off border-b border-brand-rule relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-brand-rule/20 pointer-events-none" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-20 md:py-28 relative z-10">
          <span className="label-caps text-brand-muted mb-3 block">The Collection</span>
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light text-brand-black leading-[1.05] mb-3">
            {badge || 'All Pieces'}
          </h1>
          <div className="rule w-12 my-5" aria-hidden="true" />
          <p className="text-brand-muted uppercase tracking-widest-2 text-[0.6rem] font-light">
            {total} piece{total !== 1 ? 's' : ''} in the collection
          </p>
        </div>
      </div>

      {/* Badge Filters */}
      <div className="max-w-7xl mx-auto px-8 md:px-12 pt-12">
        <div className="flex flex-wrap gap-3">
          {badgeFilters.map((f) => {
            const isActive = (badge || undefined) === f.value
            const href = f.value ? `/shop?badge=${encodeURIComponent(f.value)}` : '/shop'
            return (
              <Link
                key={f.label}
                href={href}
                className={`px-5 py-2.5 text-[0.56rem] uppercase tracking-widest-2 font-light border transition-all duration-300 ${
                  isActive
                    ? 'bg-brand-black text-white border-brand-black'
                    : 'border-brand-rule text-brand-muted hover:border-brand-black hover:text-brand-black'
                }`}
              >
                {f.label}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-14">
        {products.length > 0 ? (
          <>
            <ProductGrid products={products} />

            {/* Pagination */}
            {pages > 1 && (
              <nav className="flex items-center justify-center gap-4 mt-20" aria-label="Pagination">
                {page > 1 ? (
                  <Link
                    href={`/shop?page=${page - 1}${badge ? `&badge=${encodeURIComponent(badge)}` : ''}`}
                    className="flex items-center gap-2 px-5 py-2.5 border border-brand-rule text-brand-black text-[0.56rem] uppercase tracking-widest-2 font-light hover:bg-brand-off hover:border-brand-black/20 transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faChevronLeft} className="w-2.5 h-2.5" />
                    Previous
                  </Link>
                ) : (
                  <span className="flex items-center gap-2 px-5 py-2.5 border border-brand-rule text-brand-muted text-[0.56rem] uppercase tracking-widest-2 font-light opacity-40">
                    <FontAwesomeIcon icon={faChevronLeft} className="w-2.5 h-2.5" />
                    Previous
                  </span>
                )}

                <span className="text-[0.56rem] text-brand-muted uppercase tracking-widest-2 font-light">
                  Page {page} of {pages}
                </span>

                {page < pages ? (
                  <Link
                    href={`/shop?page=${page + 1}${badge ? `&badge=${encodeURIComponent(badge)}` : ''}`}
                    className="flex items-center gap-2 px-5 py-2.5 border border-brand-rule text-brand-black text-[0.56rem] uppercase tracking-widest-2 font-light hover:bg-brand-off hover:border-brand-black/20 transition-all duration-300"
                  >
                    Next
                    <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5" />
                  </Link>
                ) : (
                  <span className="flex items-center gap-2 px-5 py-2.5 border border-brand-rule text-brand-muted text-[0.56rem] uppercase tracking-widest-2 font-light opacity-40">
                    Next
                    <FontAwesomeIcon icon={faChevronRight} className="w-2.5 h-2.5" />
                  </span>
                )}
              </nav>
            )}
          </>
        ) : (
          <div className="text-center py-28">
            <p className="font-serif text-2xl text-brand-black/20 mb-3">No pieces found</p>
            <p className="text-brand-muted uppercase tracking-widest-2 text-[0.6rem] font-light">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
