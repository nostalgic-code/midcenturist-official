import { getProduct, getProducts } from '@/lib/api'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import ProductDetailClient from './product-detail-client'

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const { products } = await getProducts({ limit: 48 })
    return products.map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const product = await getProduct(params.slug)
    return {
      title: `${product.name} — Midcenturist SA`,
      description: product.description || `${product.name}. Year: ${product.year}. Era: ${product.era}`,
    }
  } catch {
    return {
      title: 'Product Not Found — Midcenturist SA',
    }
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  let product
  try {
    product = await getProduct(params.slug)
  } catch {
    notFound()
  }

  return (
    <div className="min-h-screen bg-brand-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-8 md:px-12 pt-8">
        <nav className="flex items-center gap-2 text-[0.52rem] uppercase tracking-widest-2 text-brand-muted font-light">
          <a href="/" className="hover:text-brand-black transition-colors">Home</a>
          <span className="text-brand-rule">/</span>
          <a href="/shop" className="hover:text-brand-black transition-colors">Shop</a>
          <span className="text-brand-rule">/</span>
          <span className="text-brand-black/50">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-8 md:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-20">
          {/* Image Gallery */}
          <div className="flex flex-col gap-3 sticky top-24 self-start">
            {product.images && product.images.length > 0 ? (
              <>
                <div className="relative w-full aspect-[4/5] bg-brand-off overflow-hidden group">
                  <Image
                    src={product.images[0].url}
                    alt={product.images[0].alt_text || product.name}
                    fill
                    className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.03]"
                    priority
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="flex gap-2">
                    {product.images.map((img) => (
                      <div
                        key={img.id}
                        className="relative w-20 h-20 bg-brand-off overflow-hidden cursor-pointer hover:opacity-70 transition-opacity duration-300 border border-transparent hover:border-brand-black/20"
                      >
                        <Image
                          src={img.url}
                          alt={img.alt_text || product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="w-full aspect-[4/5] bg-brand-off flex items-center justify-center">
                <p className="text-brand-muted font-light text-sm">No image available</p>
              </div>
            )}
          </div>

          {/* Product Details */}
          <ProductDetailClient product={product} />
        </div>

      </div>
    </div>
  )
}
