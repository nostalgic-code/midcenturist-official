import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faFacebookF, faTiktok, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'

export default function Topbar() {
  return (
    <div className="bg-brand-black h-[34px] flex items-center justify-between px-12 hidden md:flex">
      <div className="flex items-center gap-2 font-sans text-[0.56rem] tracking-[0.2em] uppercase text-white/32 font-light">
        <FontAwesomeIcon icon={faLocationDot} className="text-[0.6rem]" aria-hidden="true" />
        South Africa &nbsp;·&nbsp; Nationwide Delivery Available
      </div>
      <div className="flex items-center gap-4" role="list" aria-label="Social media">
        {[
          { icon: faInstagram, label: 'Instagram', href: 'https://instagram.com' },
          { icon: faFacebookF, label: 'Facebook', href: 'https://facebook.com' },
          { icon: faTiktok, label: 'TikTok', href: 'https://tiktok.com' },
          { icon: faXTwitter, label: 'X (Twitter)', href: 'https://x.com' },
          { icon: faEnvelope, label: 'Email', href: 'mailto:shop@midcenturist.co.za' },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith('mailto') ? undefined : '_blank'}
            rel={s.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            className="text-white/32 text-[0.7rem] hover:text-white transition-colors"
            aria-label={s.label}
            role="listitem"
          >
            <FontAwesomeIcon icon={s.icon} aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  )
}
