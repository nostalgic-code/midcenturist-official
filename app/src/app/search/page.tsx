'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { searchProducts, Product } from '@/lib/api'
import ProductGrid from '@/components/ProductGrid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-white flex items-center justify-center">
          <p className="text-brand-muted uppercase tracking-widest-2 text-sm animate-pulse">
            Loading...
          </p>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  )
}

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    if (initialQuery.length >= 2) {
      performSearch(initialQuery)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function performSearch(q: string) {
    if (q.length < 2) return
    setIsLoading(true)
    setSearched(true)
    try {
      const data = await searchProducts(q)
      setResults(data.products)
      setTotal(data.total)
    } catch {
      setResults([])
      setTotal(0)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(query)
    // Update URL without reload
    window.history.replaceState(null, '', `/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <div className="min-h-screen bg-brand-white">
      {/* Search Header */}
      <div className="relative bg-brand-off border-b border-brand-rule overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-20 md:py-28 relative z-10">
          <span className="label-caps text-brand-muted block mb-3">Find</span>
          <h1 className="font-serif text-4xl md:text-[3.4rem] text-brand-black font-light leading-tight mb-8">
            Search
          </h1>
          <form onSubmit={handleSubmit} className="flex max-w-xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, material, era..."
              className="flex-1 px-5 py-3.5 border border-brand-rule border-r-0 bg-white text-brand-black font-sans text-sm font-light focus:outline-none focus:border-brand-black transition-colors duration-300"
              minLength={2}
              autoFocus
            />
            <button
              type="submit"
              disabled={query.length < 2}
              className="px-6 py-3.5 bg-brand-black text-white hover:opacity-90 transition-opacity duration-300 disabled:opacity-40"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4" />
            </button>
          </form>
        </div>
        <div
          className="absolute -right-24 top-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-brand-black/[0.04]"
          aria-hidden="true"
        />
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-8 md:px-12 py-16 md:py-20">
        {isLoading ? (
          <div className="text-center py-20">
            <p className="text-brand-muted uppercase tracking-widest-2 text-sm animate-pulse">
              Searching...
            </p>
          </div>
        ) : searched ? (
          results.length > 0 ? (
            <>
              <p className="text-brand-muted uppercase tracking-widest-2 text-xs mb-8">
                {total} result{total !== 1 ? 's' : ''} for &ldquo;{searchParams.get('q') || query}&rdquo;
              </p>
              <ProductGrid products={results} />
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-brand-muted uppercase tracking-widest-2 text-sm mb-2">
                No results found
              </p>
              <p className="text-sm text-brand-muted font-light">
                Try a different search term — name, material, or era
              </p>
            </div>
          )
        ) : (
          <div className="text-center py-20">
            <p className="text-brand-muted uppercase tracking-widest-2 text-sm">
              Enter at least 2 characters to search
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
