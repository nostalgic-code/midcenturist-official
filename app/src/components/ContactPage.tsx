'use client'

import React, { useState } from 'react'
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
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-brand-off min-h-screen">
      {/* Hero */}
      <section className="relative bg-brand-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80')] bg-cover bg-center" style={{ filter: 'brightness(0.25)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 py-28 md:py-36">
          <motion.span
            className="block font-sans text-[0.6rem] uppercase tracking-[0.25em] text-white/40 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Get in Touch
          </motion.span>
          <motion.h1
            className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.05] max-w-[600px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            We&apos;d love to<br />hear from you.
          </motion.h1>
          <motion.p
            className="mt-5 font-sans text-[0.85rem] text-white/50 font-light leading-[1.8] max-w-[440px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Whether you have a question about a piece, need advice on restoration, or want to sell — reach out anytime.
          </motion.p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="max-w-7xl mx-auto px-8 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 lg:gap-24">
          {/* Left — Info */}
          <div>
            <motion.h2
              className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] font-light text-brand-black leading-[1.1] mb-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={fadeUp}
            >
              Contact Details
            </motion.h2>

            <div className="space-y-8 mb-12">
              {CONTACT_INFO.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-start gap-5"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i + 1}
                  variants={fadeUp}
                >
                  <div className="w-[44px] h-[44px] border border-brand-black/10 flex items-center justify-center shrink-0">
                    <FontAwesomeIcon icon={item.icon} className="w-4 h-4 text-brand-black/60" />
                  </div>
                  <div>
                    <span className="block font-sans text-[0.6rem] uppercase tracking-[0.2em] text-brand-black/40 mb-1">
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
              <span className="block font-sans text-[0.6rem] uppercase tracking-[0.2em] text-brand-black/40 mb-4">
                Follow Us
              </span>
              <div className="flex items-center gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[42px] h-[42px] border border-brand-black/10 flex items-center justify-center text-brand-black/40 hover:border-brand-black hover:text-brand-black transition-all duration-300"
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
            className="bg-white border border-brand-black/5 p-8 md:p-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-16">
                <div className="w-[60px] h-[60px] border border-brand-black/10 flex items-center justify-center mb-6">
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
                  Send us a message
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
                        className="w-full border border-brand-black/10 bg-transparent px-4 py-3 font-sans text-[0.85rem] font-light text-brand-black placeholder:text-brand-black/25 focus:border-brand-black/40 focus:outline-none transition-colors"
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
                        className="w-full border border-brand-black/10 bg-transparent px-4 py-3 font-sans text-[0.85rem] font-light text-brand-black placeholder:text-brand-black/25 focus:border-brand-black/40 focus:outline-none transition-colors"
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
                      className="w-full border border-brand-black/10 bg-transparent px-4 py-3 font-sans text-[0.85rem] font-light text-brand-black focus:border-brand-black/40 focus:outline-none transition-colors"
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
                      className="w-full border border-brand-black/10 bg-transparent px-4 py-3 font-sans text-[0.85rem] font-light text-brand-black placeholder:text-brand-black/25 focus:border-brand-black/40 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-black text-white py-4 font-sans text-[0.7rem] uppercase tracking-[0.2em] font-light hover:bg-brand-black/85 transition-colors duration-300"
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
      <section className="bg-brand-black text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-8 md:px-12 text-center">
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
