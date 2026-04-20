'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faPaperPlane, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { subscribeNewsletter } from '@/lib/api'
import { useReveal } from '@/lib/useReveal'

export default function Newsletter() {
  const sectionRef = useReveal<HTMLElement>()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    area: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const payload = {
        email: formData.email,
        first_name: formData.firstName || undefined,
        last_name: formData.lastName || undefined,
        phone: formData.phone || undefined,
        area: formData.area || undefined,
        source: 'footer' as const,
      }
      await subscribeNewsletter(payload)
      setSuccess(true)
      setFormData({ firstName: '', lastName: '', email: '', phone: '', area: '' })
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to subscribe. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const inputClasses = "px-4 py-[0.88rem] border border-brand-rule bg-brand-cream/50 text-brand-black font-sans text-[0.72rem] font-light tracking-[0.06em] outline-none focus:border-brand-black/40 focus:bg-white transition-all duration-300 placeholder:text-brand-muted/60 disabled:opacity-50"

  return (
    <section
      ref={sectionRef}
      className="reveal-up grid grid-cols-1 md:grid-cols-2 border-t border-brand-rule"
      aria-labelledby="newsletter-heading"
    >
      {/* Image side */}
      <div className="relative overflow-hidden min-h-[340px] md:min-h-[520px] group">
        <Image
          src="/images/folder%2030/images30/PHOTO-2026-04-15-18-52-10.jpg"
          alt="Stay in the loop — mid-century modern newsletter"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover zoom-on-scroll"
        />
        {/* Overlay text */}
        <div className="absolute inset-0 bg-brand-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <span className="font-serif text-white text-[clamp(1.5rem,3vw,2.5rem)] font-light italic">Never miss a piece</span>
        </div>
      </div>

      {/* Form side */}
      <div className="bg-white flex flex-col justify-center px-8 py-16 md:px-20 md:py-22 border-t md:border-t-0 md:border-l border-brand-rule">
        <span className="label-caps text-brand-muted mb-3 block">
          Stay in the Loop
        </span>
        <h2
          id="newsletter-heading"
          className="font-serif text-[clamp(2rem,3vw,3rem)] font-light text-brand-black leading-[1.1]"
        >
          First to see<br />new arrivals.
        </h2>
        <p className="font-sans text-[0.78rem] text-brand-muted leading-[1.95] max-w-[380px] font-light tracking-[0.02em] mt-4">
          Please follow us on social media for new stock updates — or join our list. New pieces drop every week and the best ones go fast.
        </p>

        {success ? (
          <div className="mt-8 p-5 bg-status-live/5 border border-status-live/30">
            <p className="text-sm text-status-live font-light flex items-center gap-2">
              <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4" /> Thanks for subscribing!
            </p>
          </div>
        ) : (
          <form className="grid grid-cols-2 gap-3 mt-8" onSubmit={handleSubmit} aria-label="Newsletter subscription form">
            <input className={`col-span-1 ${inputClasses}`} type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First name" aria-label="First name" disabled={isLoading} />
            <input className={`col-span-1 ${inputClasses}`} type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last name" aria-label="Last name" disabled={isLoading} />
            <input className={`col-span-1 ${inputClasses}`} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email address" aria-label="Email address" required disabled={isLoading} />
            <input className={`col-span-1 ${inputClasses}`} type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Contact number" aria-label="Contact number" disabled={isLoading} />
            <input className={`col-span-2 ${inputClasses}`} type="text" name="area" value={formData.area} onChange={handleChange} placeholder="Area / City" aria-label="Area or City" disabled={isLoading} />
            <button
              type="submit"
              disabled={isLoading}
              className="col-span-2 bg-brand-black text-white font-sans text-[0.58rem] tracking-[0.2em] uppercase font-light py-4 flex items-center justify-center gap-2.5 hover:bg-brand-black/85 transition-all duration-400 disabled:opacity-50"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="w-3 h-3" aria-hidden="true" />
              {isLoading ? 'Subscribing...' : 'Subscribe to New Arrivals'}
            </button>
            {error && <p className="col-span-2 text-sm text-status-arch">{error}</p>}
            <p className="col-span-2 font-sans text-[0.52rem] text-brand-muted/60 tracking-[0.08em] font-light flex items-center gap-1.5 mt-1">
              <FontAwesomeIcon icon={faLock} className="w-2.5 h-2.5" aria-hidden="true" />
              No spam. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
