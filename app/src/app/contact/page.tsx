import { Metadata } from 'next'
import ContactPage from '@/components/ContactPage'

export const metadata: Metadata = {
  title: 'Contact Us — Midcenturist SA',
  description:
    'Get in touch with Midcenturist SA. We would love to hear from you about mid-century modern furniture, restorations, or any enquiries.',
}

export default function Contact() {
  return <ContactPage />
}
