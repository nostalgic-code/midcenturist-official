'use client'

import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { motion, Variants } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faLocationDot, faClock } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faFacebookF, faTiktok, faXTwitter } from '@fortawesome/free-brands-svg-icons'

const CONTACT_INFO = [
  {
    icon: faPhone,
    label: 'Phone',
    value: '060 666 8000',
    href: 'tel:+27606668000',
  },
  {
    icon: faEnvelope,
    label: 'Email',
    value: 'shop@midcenturist.co.za',
    href: 'mailto:shop@midcenturist.co.za',
  },
  {
    icon: faLocationDot,
    label: 'Location',
    value: 'Johannesburg, South Africa',
    href: null,
  },
  {
    icon: faClock,
    label: 'Hours',
    value: 'Mon – Sat: 9am – 5pm',
    href: null,
  },
]

const SOCIALS = [
  { icon: faInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: faFacebookF, href: 'https://facebook.com', label: 'Facebook' },
  { icon: faTiktok, href: 'https://tiktok.com', label: 'TikTok' },
  { icon: faXTwitter, href: 'https://x.com', label: 'X' },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
}

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroImageRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useGSAP(
    () => {
      if (!heroRef.current || !heroImageRef.current) return

      const q = gsap.utils.selector(heroRef)

      gsap.fromTo(
        q('.hero-kicker, .hero-title, .hero-copy, .hero-actions'),
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.16,
          ease: 'power3.out',
        }
      )

      const moveX = gsap.quickTo(heroImageRef.current, 'x', { duration: 0.6, ease: 'power3.out' })
      const moveY = gsap.quickTo(heroImageRef.current, 'y', { duration: 0.6, ease: 'power3.out' })

      const onMouseMove = (event: MouseEvent) => {
        const x = (event.clientX / window.innerWidth - 0.5) * 24
        const y = (event.clientY / window.innerHeight - 0.5) * 24
        moveX(x)
        moveY(y)
      }

      window.addEventListener('mousemove', onMouseMove)

      return () => {
        window.removeEventListener('mousemove', onMouseMove)
      }
    },
    { scope: heroRef }
  )

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_500px_at_50%_-120px,rgba(226,215,197,0.46),transparent_65%),linear-gradient(180deg,#f5f1ea_0%,#ece5d9_100%)]">
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden bg-brand-black text-white">
        <div
          ref={heroImageRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/folder%2030/images30/PHOTO-2026-04-15-18-52-11.jpg')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,7,6,0.82)_0%,rgba(8,7,6,0.48)_42%,rgba(8,7,6,0.9)_100%)]" />
        <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[#b58a59]/20 blur-3xl" />
        <div className="absolute -left-20 top-12 h-72 w-72 rounded-full bg-[#d2b287]/20 blur-3xl" />

        <div className="relative z-10 max-w-7xl px-8 py-28 md:px-16 md:py-36">
          <div className="hero-kicker mb-6 flex items-center gap-3">
            <span className="h-[0.5px] w-8 bg-white/20" />
            <span className="label-caps text-white/60">
              Get in Touch
            </span>
          </div>

          <h1 className="hero-title font-serif text-[clamp(2.4rem,5.2vw,5.2rem)] font-light leading-[0.98] max-w-[760px]">
            Let&apos;s shape your next
            <br />
            interior story.
          </h1>

          <p className="hero-copy mt-6 max-w-[520px] font-sans text-[0.86rem] leading-[1.95] text-white/72 font-light">
            For acquisitions, restorations, sourcing requests, or private showroom appointments, our team will guide you with
            considered recommendations.
          </p>

          <div className="hero-actions mt-9 flex flex-wrap items-center gap-4">
            <a
              href="https://wa.me/27606668000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center border border-white/30 px-8 py-3 font-sans text-[0.66rem] uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-white hover:text-brand-black"
            >
              WhatsApp Concierge
            </a>
            <a
              href="mailto:shop@midcenturist.co.za"
              className="inline-flex items-center border border-transparent px-2 py-3 font-sans text-[0.66rem] uppercase tracking-[0.22em] text-white/75 transition-colors duration-300 hover:text-white"
            >
              shop@midcenturist.co.za
            </a>
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="max-w-7xl mx-auto px-8 py-20 md:px-12 md:py-28">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-24 items-start">
          {/* Left — Info */}
          <div>
            <div className="space-y-6 mb-12">
              {CONTACT_INFO.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="group flex items-start gap-5 border border-brand-black/8 bg-white/70 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-black/20"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i + 1}
                  variants={fadeUp}
                >
                  <div className="w-[46px] h-[46px] border border-brand-black/15 bg-white flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:border-brand-black/35">
                    <FontAwesomeIcon icon={item.icon} className="w-4 h-4 text-brand-black/70" />
                  </div>
                  <div>
                    <span className="block font-sans text-[0.6rem] uppercase tracking-[0.22em] text-brand-black/40 mb-1">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-sans text-[0.92rem] text-brand-black font-light hover:underline underline-offset-4 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="font-sans text-[0.92rem] text-brand-black font-light">
                        {item.value}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Socials */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={5}
              variants={fadeUp}
            >
              <span className="block font-sans text-[0.6rem] uppercase tracking-[0.22em] text-brand-black/40 mb-4">
                Follow Us
              </span>
              <div className="flex items-center gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[42px] h-[42px] border border-brand-black/15 bg-white/70 flex items-center justify-center text-brand-black/50 hover:border-brand-black hover:text-brand-black transition-all duration-300"
                    aria-label={s.label}
                  >
                    <FontAwesomeIcon icon={s.icon} className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Form */}
          <motion.div
            className="relative overflow-hidden border border-brand-black/10 bg-white/85 p-8 md:p-12 backdrop-blur-sm"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#c89f6f]/20 blur-2xl" />

            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-16">
                <div className="w-[60px] h-[60px] border border-brand-black/20 bg-brand-off/40 flex items-center justify-center mb-6">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="font-serif text-[1.6rem] font-light text-brand-black mb-3">
                  Message Sent
                </h3>
                <p className="font-sans text-[0.82rem] text-brand-black/50 font-light max-w-[320px] leading-[1.8]">
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-[clamp(1.4rem,2.5vw,2rem)] font-light text-brand-black mb-2">
                  Send your enquiry
                </h3>
                <p className="font-sans text-[0.78rem] text-brand-black/40 font-light mb-8">
                  Fill in the form and we&apos;ll respond as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block font-sans text-[0.6rem] uppercase tracking-[0.2em] text-brand-black/40 mb-2">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border border-brand-black/12 bg-white/80 px-4 py-3 font-sans text-[0.85rem] font-light text-brand-black placeholder:text-brand-black/25 focus:border-brand-black/40 focus:outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-sans text-[0.6rem] uppercase tracking-[0.2em] text-brand-black/40 mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border border-brand-black/12 bg-white/80 px-4 py-3 font-sans text-[0.85rem] font-light text-brand-black placeholder:text-brand-black/25 focus:border-brand-black/40 focus:outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-sans text-[0.6rem] uppercase tracking-[0.2em] text-brand-black/40 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full border border-brand-black/12 bg-white/80 px-4 py-3 font-sans text-[0.85rem] font-light text-brand-black focus:border-brand-black/40 focus:outline-none transition-colors"
                    >
                      <option value="">Select a topic</option>
                      <option value="general">General Enquiry</option>
                      <option value="product">Product Question</option>
                      <option value="restoration">Restoration Services</option>
                      <option value="sell">Sell a Piece</option>
                      <option value="order">Order Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-sans text-[0.6rem] uppercase tracking-[0.2em] text-brand-black/40 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full border border-brand-black/12 bg-white/80 px-4 py-3 font-sans text-[0.85rem] font-light text-brand-black placeholder:text-brand-black/25 focus:border-brand-black/40 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-black text-white py-4 font-sans text-[0.7rem] uppercase tracking-[0.2em] font-light transition-all duration-300 hover:bg-[#1f1a15]"
                  >
                    Send Message
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Map / CTA Band */}
      <section className="relative overflow-hidden bg-[#15120f] text-white py-16 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(700px_240px_at_50%_0%,rgba(200,159,111,0.18),transparent_62%)]" />
        <div className="relative max-w-7xl mx-auto px-8 md:px-12 text-center">
          <motion.p
            className="font-sans text-[0.6rem] uppercase tracking-[0.25em] text-white/30 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Visit Our Showroom
          </motion.p>
          <motion.h2
            className="font-serif text-[clamp(1.8rem,3.5vw,3rem)] font-light leading-[1.1] mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Johannesburg, South Africa
          </motion.h2>
          <motion.p
            className="font-sans text-[0.82rem] text-white/40 font-light max-w-[440px] mx-auto leading-[1.8] mb-8"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Viewings by appointment. Call or WhatsApp us to book a time to see pieces in person.
          </motion.p>
          <motion.a
            href="https://wa.me/27606668000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-white/20 px-10 py-4 font-sans text-[0.68rem] uppercase tracking-[0.2em] font-light text-white hover:bg-white hover:text-brand-black transition-all duration-300"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            WhatsApp Us
          </motion.a>
        </div>
      </section>
    </div>
  )
}
