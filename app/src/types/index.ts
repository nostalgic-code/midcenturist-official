export interface ProductCardProps {
  id: string
  name: string
  era: string
  material: string
  year: number
  price: number
  originalPrice?: number
  imageUrl: string
  badge?: 'New In' | 'Last One' | 'Sold' | 'Sale'
  isSold?: boolean
}

export interface HeroSlide {
  id: string
  category: string
  eyebrow: string
  titleLine1: string
  titleLine2: string
  titleLine2Italic?: boolean
  subtitle: string
  ctaLabel: string
  ctaHref: string
  imageUrl: string
  noOverlay?: boolean
  featuredPieceName: string
  featuredPiecePrice: string
  featuredPieceYear: number
}

export interface HeroSliderProps {
  slides: HeroSlide[]
  autoPlayInterval?: number
}
