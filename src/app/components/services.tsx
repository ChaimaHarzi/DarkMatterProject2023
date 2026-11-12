import React from 'react'
import type { IconType } from 'react-icons'
import { HiCode, HiColorSwatch, HiSparkles, HiSpeakerphone, HiShoppingCart, HiTrendingUp } from 'react-icons/hi'
import QuoteLink from './quote-link'

const services: { title: string; description: string; icon: IconType }[] = [
  {
    title: 'Web Development',
    icon: HiCode,
    description:
      'Fast, accessible and scalable websites and web apps built with modern frameworks — engineered to perform from launch day to global scale.',
  },
  {
    title: 'UX/UI Design',
    icon: HiColorSwatch,
    description:
      'Research-driven interfaces that feel effortless. We map user journeys, prototype quickly and craft polished designs your users will love.',
  },
  {
    title: 'Branding',
    icon: HiSparkles,
    description:
      'Distinctive identities that stand out — from logo and visual language to tone of voice — so your brand is recognised and remembered.',
  },
  {
    title: 'Digital Marketing',
    icon: HiSpeakerphone,
    description:
      'Leveraging cutting-edge strategies to enhance online presence, drive targeted traffic, and maximize ROI through personalized marketing solutions.',
  },
  {
    title: 'E-commerce Solutions',
    icon: HiShoppingCart,
    description:
      'Providing scalable e-commerce platforms to enable businesses to streamline operations, enhance customer experiences, and drive online sales growth.',
  },
  {
    title: 'SEO Optimization',
    icon: HiTrendingUp,
    description:
      'Implementing best practices to boost search engine rankings, increase organic traffic, and improve visibility across all major search engines.',
  },
]

const Services: React.FC = () => (
  <section id="services" className="bg-white py-24 md:py-32">
    <div className="mx-auto max-w-7xl px-5 md:px-10">
      <div className="max-w-4xl">
        <span className="eyebrow">What we do</span>
        <p className="mt-6 text-2xl leading-tight tracking-tighter md:text-4xl">
          <strong>We offer our expertise in accelerating project development.</strong>{' '}
          <span className="text-black/60">
            Our team of seasoned engineers excels in creating unparalleled user experiences, harmoniously building
            ambitious projects that exceed boundaries to deliver exceptional apps at a swift pace.
          </span>
        </p>
      </div>

      <div className="mt-20 flex items-end justify-between gap-6 border-b-2 border-black pb-6">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Services</h2>
        <span className="text-sm text-black/50">{String(services.length).padStart(2, '0')} disciplines</span>
      </div>

      <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {services.map(({ title, description, icon: Icon }, i) => (
          <li key={title}>
            <article className="group relative flex h-full flex-col border-2 border-black bg-white p-7 shadow-[-10px_10px_0_rgba(0,0,0,0.9)] transition-all duration-300 ease-out hover:-translate-x-1 hover:translate-y-1 hover:shadow-[-5px_5px_0_rgba(0,0,0,0.9)]">
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center bg-black text-white transition-transform duration-300 group-hover:-rotate-6">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="font-mono text-sm text-black/40">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="mt-6 text-xl font-bold tracking-tight">{title}</h3>
              <p className="mt-3 leading-relaxed text-black/70">{description}</p>
              <QuoteLink service={title} />
            </article>
          </li>
        ))}
      </ul>
    </div>
  </section>
)

export default Services
