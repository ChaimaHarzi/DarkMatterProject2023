"use client"
import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HiOutlineMenuAlt4, HiX } from 'react-icons/hi'
import { NAV_LINKS } from '@/lib/nav'

interface Props {
  /** Always show the solid background (used on pages without a hero). */
  solid?: boolean
}

const Header: React.FC<Props> = ({ solid = false }) => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (solid) return
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [solid])

  // Lock page scroll and allow Escape to close while the mobile menu is open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const close = useCallback(() => setOpen(false), [])
  const isSolid = solid || scrolled || open

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 text-white transition-[background-color,border-color,backdrop-filter] duration-300 ${
        isSolid ? 'border-b border-white/10 bg-black/95 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-10" aria-label="Main">
        <Link href="/" className="flex items-center gap-3" onClick={close}>
          <Image src="/logo1.png" alt="" width={40} height={40} priority className="h-9 w-9 md:h-10 md:w-10" />
          <span className="text-lg font-bold tracking-tight">Dark Matter</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="relative py-1 text-sm font-medium text-white/80 transition-colors hover:text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/#contact" className="btn-light !px-5 !py-2.5 text-sm">
              Start a project
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="-mr-2 p-2 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <HiX className="h-7 w-7" /> : <HiOutlineMenuAlt4 className="h-7 w-7" />}
        </button>
      </nav>
    </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise become
          the containing block of this fixed overlay and collapse it. */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-black text-white transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
      >
        <ul className="flex flex-col gap-2 px-5 pt-8">
          {NAV_LINKS.map((l, i) => (
            <li
              key={l.href}
              className={`transition-all duration-500 ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }}
            >
              <Link
                href={l.href}
                onClick={close}
                tabIndex={open ? 0 : -1}
                className="flex items-baseline gap-4 border-b border-white/10 py-5 text-4xl font-semibold tracking-tighter"
              >
                <span className="text-sm font-normal text-white/40">0{i + 1}</span>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="px-5 pt-10">
          <Link href="/#contact" onClick={close} tabIndex={open ? 0 : -1} className="btn-light w-full">
            Start a project
          </Link>
        </div>
      </div>
    </>
  )
}

export default Header
