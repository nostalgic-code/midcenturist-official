import { Metadata } from 'next'
import AboutStory from '@/components/AboutStory'

export const metadata: Metadata = {
  title: 'About — Midcenturist SA',
  description:
    'Objects that carry decades of story. Learn about our mission, philosophy, and the world of mid-century modern design.',
}

export default function AboutPage() {
  return <AboutStory />
}
