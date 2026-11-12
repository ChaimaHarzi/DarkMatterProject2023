import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

const description =
  'Dark Matter — Cosmic Architects. Web development, UX/UI design, branding, digital marketing, e-commerce and SEO.'

export const metadata: Metadata = {
  title: 'Dark Matter — Cosmic Architects',
  description,
  icons: { icon: '/logo1.png' },
  openGraph: {
    title: 'Dark Matter — Cosmic Architects',
    description,
    type: 'website',
    siteName: 'Dark Matter',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
