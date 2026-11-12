"use client"
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import ClassNames from 'embla-carousel-class-names'
import Autoplay from 'embla-carousel-autoplay'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'
import styles from "../carousel.module.css"

interface ContextValue {
   embla: UseEmblaCarouselType[1]
   selectedIndex: number
}
interface Props {
   className?: string
   children: ReactNode
   /** Accessible name of the carousel, e.g. "Testimonials". */
   label?: string
}
export const CarouselContext = React.createContext<ContextValue>({
   embla: undefined,
   selectedIndex: -1,
})

const prefersReducedMotion = () =>
   typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const Carousel: React.FC<Props> = ({ children, className = '', label = 'Carousel' }) => {
   const [selectedIndex, setSelectedIndex] = useState(0)
   const [snapCount, setSnapCount] = useState(0)
   // Create plugins once so Embla doesn't re-initialise on every render.
   const [plugins] = useState(() =>
      prefersReducedMotion()
         ? [ClassNames()]
         : [ClassNames(), Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })]
   )
   const [viewportRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', skipSnaps: false }, plugins)

   const onSelect = useCallback(() => {
      if (!emblaApi) return
      setSelectedIndex(emblaApi.selectedScrollSnap())
   }, [emblaApi])

   const onInit = useCallback(() => {
      if (!emblaApi) return
      setSnapCount(emblaApi.scrollSnapList().length)
   }, [emblaApi])

   useEffect(() => {
      if (!emblaApi) return
      onInit()
      onSelect()
      emblaApi.on('select', onSelect).on('reInit', onInit).on('reInit', onSelect)
      return () => {
         emblaApi.off('select', onSelect).off('reInit', onInit).off('reInit', onSelect)
      }
   }, [emblaApi, onSelect, onInit])

   const navBtn =
      'flex h-11 w-11 items-center justify-center border border-white/30 transition-colors hover:border-white hover:bg-white hover:text-black'

   return (
      <CarouselContext.Provider value={{ embla: emblaApi, selectedIndex }}>
         <div role="region" aria-roledescription="carousel" aria-label={label} className={className}>
            <div ref={viewportRef} className={`${styles.viewport} w-full overflow-hidden`}>
               <div className={`${styles.container} flex`}>{children}</div>
            </div>

            {snapCount > 1 && (
               <div className="mt-12 flex items-center justify-center gap-6">
                  <button type="button" className={navBtn} onClick={() => emblaApi?.scrollPrev()} aria-label="Previous slide">
                     <HiArrowLeft aria-hidden="true" />
                  </button>
                  <div className="flex gap-2">
                     {Array.from({ length: snapCount }, (_, i) => (
                        <button
                           key={i}
                           type="button"
                           onClick={() => emblaApi?.scrollTo(i)}
                           aria-label={`Go to slide ${i + 1}`}
                           aria-current={i === selectedIndex}
                           className={`h-1.5 transition-all duration-300 ${i === selectedIndex ? 'w-8 bg-white' : 'w-4 bg-white/30 hover:bg-white/60'}`}
                        />
                     ))}
                  </div>
                  <button type="button" className={navBtn} onClick={() => emblaApi?.scrollNext()} aria-label="Next slide">
                     <HiArrowRight aria-hidden="true" />
                  </button>
               </div>
            )}
         </div>
      </CarouselContext.Provider>
   )
}
export default Carousel
