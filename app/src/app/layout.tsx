import type { Metadata } from 'next'
import './globals.css'
import CursorProvider from '@/context/CursorProvider'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import CartSlideOver from '@/components/CartSlideOver'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Midcenturist SA — Objects that carry decades of story',
  description:
    'Mid-century modern furniture and home décor. Curated, restored, and ready for your space.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          <CursorProvider>
            <Navbar />
            <CartSlideOver />
            <main>{children}</main>
            <Footer />
          </CursorProvider>
        </CartProvider>
      </body>
    </html>
  )
}
