import React from 'react'
import Image from 'next/image'
import SliderContainer, { SliderItem } from './slider'

// TODO: replace the placeholder with the real partner logos.
const logos = Array.from({ length: 13 }, () => ({
  src: '/img-removebg-preview.png',
  alt: 'Partner logo',
}))

const LogoRow: React.FC = () => (
  // Each item is 150px wide + 2 × 16px margin.
  <SliderContainer className='' contentWidth={logos.length * 182} initialOffsetX={0}>
    {logos.map((logo, i) => (
      <SliderItem key={i} width={150}>
        <Image src={logo.src} width={150} height={50} alt={logo.alt} style={{ objectFit: 'contain' }} />
      </SliderItem>
    ))}
  </SliderContainer>
)

const ClientLogos: React.FC = () => (
  <>
    <LogoRow />
    <LogoRow />
  </>
)

export default ClientLogos
