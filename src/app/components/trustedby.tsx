import React from 'react'
import ClientLogos from './client-logos'
import Testimonials from './testimonials'

const TrustedBy: React.FC = () => {
  return (
    <section id="partners" aria-labelledby="partners-title">
      <div className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 text-center md:px-10">
          <h2 id="partners-title" className="eyebrow justify-center">
            Our partners
          </h2>
        </div>
        {/* Edge fade so logos glide in and out instead of being cut off. */}
        <div className="mt-12 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="opacity-70 grayscale transition-opacity duration-300 hover:opacity-100">
            <ClientLogos />
          </div>
        </div>
        <div className="mx-auto mt-24 max-w-4xl px-5 text-center md:mt-32 md:px-10">
          <p className="text-3xl font-semibold leading-tight tracking-tighter md:text-5xl">
            We prioritize clear communication and transparent development.
          </p>
        </div>
      </div>
      <div className="bg-black py-20 text-white md:py-28">
        <Testimonials />
      </div>
    </section>
  )
}
export default TrustedBy
