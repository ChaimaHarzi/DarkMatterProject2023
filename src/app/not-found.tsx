import type { Metadata } from 'next'
import Link from 'next/link'
import Header from './components/header'
import Footer from './components/footer'

export const metadata: Metadata = {
  title: 'Page not found | Dark Matter',
}

export default function NotFound() {
  return (
    <div className="bg-black text-white">
      <Header solid />
      <main id="main" className="flex min-h-screen flex-col items-center justify-center px-5 pt-20 text-center">
        <span className="eyebrow text-white/60">Error 404</span>
        <h1 className="mt-6 bg-gradient-to-b from-white to-white/20 bg-clip-text text-8xl font-bold tracking-tighter text-transparent md:text-[10rem]">
          Lost in space
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">
          The page you&apos;re looking for has drifted beyond the observable universe.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/" className="btn-light">
            Back to home
          </Link>
          <Link href="/#contact" className="btn-ghost-light">
            Contact us
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
