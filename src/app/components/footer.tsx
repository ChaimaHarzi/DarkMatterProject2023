import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { NAV_LINKS } from '@/lib/nav'

const linkCls = 'text-white/60 transition-colors hover:text-white'

const Footer: React.FC = () => {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[2fr_1fr_1fr] md:px-10 md:py-20">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/logo1.png" width={44} height={44} alt="" />
            <span className="text-xl font-bold tracking-tight">Dark Matter</span>
          </Link>
          <p className="mt-5 max-w-xs leading-relaxed text-white/60">
            Cosmic Architects — Holding Galaxies Together.
          </p>
          <Link href="/#contact" className="btn-light mt-8 !px-5 !py-2.5 text-sm">
            Start a project
          </Link>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Explore</h2>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Get in touch</h2>
          <ul className="mt-5 space-y-3">
            <li>
              <a href="mailto:hello@darkmatter.com" className={linkCls}>
                hello@darkmatter.com
              </a>
            </li>
            <li className="text-white/60">Nabeul, Korba — Tunisia</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <p>© {year} Dark Matter. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className={linkCls}>
              Imprint
            </Link>
            <Link href="/privacy" className={linkCls}>
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
