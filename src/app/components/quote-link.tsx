"use client"
import React from 'react'
import { HiArrowRight } from 'react-icons/hi'

export const SELECT_SERVICE_EVENT = 'darkmatter:select-service'

/** Scrolls to the contact form and pre-selects the given service. */
const QuoteLink: React.FC<{ service: string }> = ({ service }) => (
  <a
    href="#contact"
    onClick={() => window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: service }))}
    className="group/link mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold"
    aria-label={`Request a quote for ${service}`}
  >
    <span className="border-b border-black/30 pb-0.5 transition-colors group-hover/link:border-black">Request a quote</span>
    <HiArrowRight className="transition-transform duration-200 group-hover/link:translate-x-1" aria-hidden="true" />
  </a>
)

export default QuoteLink
