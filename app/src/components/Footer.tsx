'use client'

import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCouch, faBox, faLightbulb, faTable, faStar, faTag,
  faBolt, faClock, faCheck, faBan, faPercent,
  faCircleInfo, faWrench, faCertificate, faHandshake,
  faTruck, faCalendar, faRotateLeft, faPhone, faCircleQuestion, faTree,
  faUtensils, faBed, faBriefcase,
} from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faFacebookF, faTiktok, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { FOOTER_LINKS, SOCIAL_LINKS } from '@/lib/constants'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { useReveal } from '@/lib/useReveal'

const ICON_MAP: Record<string, IconDefinition> = {
  'fa-couch': faCouch,
  'fa-box': faBox,
  'fa-lightbulb': faLightbulb,
  'fa-table': faTable,
  'fa-star': faStar,
  'fa-tag': faTag,
  'fa-bolt': faBolt,
  'fa-clock': faClock,
  'fa-check': faCheck,
  'fa-ban': faBan,
  'fa-percent': faPercent,
  'fa-circle-info': faCircleInfo,
  'fa-wrench': faWrench,
  'fa-certificate': faCertificate,
  'fa-handshake': faHandshake,
  'fa-truck': faTruck,
  'fa-calendar': faCalendar,
  'fa-rotate-left': faRotateLeft,
  'fa-phone': faPhone,
  'fa-circle-question': faCircleQuestion,
  'fa-tree': faTree,
  'fa-utensils': faUtensils,
  'fa-bed': faBed,
  'fa-briefcase': faBriefcase,
}

const SOCIAL_ICON_MAP: Record<string, IconDefinition> = {
  'fa-brands fa-instagram': faInstagram,
  'fa-brands fa-facebook-f': faFacebookF,
  'fa-brands fa-tiktok': faTiktok,
  'fa-brands fa-x-twitter': faXTwitter,
  'fa-regular fa-envelope': faEnvelope,
}

export default function Footer() {
  const footerRef = useReveal<HTMLElement>(0.05)

  return (
    <footer ref={footerRef} className="reveal-up bg-brand-black text-white" aria-label="Site footer">
      {/* Top section — social icons */}
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 pt-20 pb-16 border-b border-white/8">
        <div className="flex items-center gap-2" role="list" aria-label="Social media links">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[34px] h-[34px] border border-white/10 flex items-center justify-center text-white/30 hover:border-white/40 hover:text-white transition-all duration-300"
              aria-label={s.label}
              role="listitem"
            >
              <FontAwesomeIcon icon={SOCIAL_ICON_MAP[s.icon]} className="w-3 h-3" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      {/* Four-column link grid */}
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-white/8">
        {(Object.entries(FOOTER_LINKS) as [string, { label: string; href: string; icon: string }[]][]).map(
          ([section, links]) => (
            <div key={section}>
              <h3 className="label-caps text-white/40 mb-5">
                {section}
              </h3>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group/flink flex items-center gap-2.5 text-[0.78rem] text-white/30 font-light hover:text-white/70 transition-colors duration-300"
                    >
                      {ICON_MAP[link.icon] && (
                        <FontAwesomeIcon
                          icon={ICON_MAP[link.icon]}
                          className="w-[12px] h-[12px] text-white/15 shrink-0 group-hover/flink:text-white/40 transition-colors duration-300"
                          aria-hidden="true"
                        />
                      )}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ),
        )}
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1200px] mx-auto px-8 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="font-sans text-[0.64rem] text-white/20 font-light tracking-wider">
          © 2026 Midcenturist SA. All rights reserved.
        </p>
        <p className="font-sans text-[0.64rem] text-white/20 font-light tracking-wider">
          Powered by Astro Technologies
        </p>
      </div>
    </footer>
  )
}
