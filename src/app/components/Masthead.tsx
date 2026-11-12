"use client";
import React, { useContext, useEffect, useRef } from 'react';
import Link from 'next/link';
import { HiArrowDown, HiArrowRight } from 'react-icons/hi';
import { ScrollContext } from '../utils/scroll-observer';

const Masthead: React.FC = () => {
   const refContainer = useRef<HTMLDivElement>(null)
   const refVideo = useRef<HTMLVideoElement>(null)
   const { scrollY } = useContext(ScrollContext)

   let progress = 0
   const { current: elContainer } = refContainer
   if (elContainer) {
      progress = Math.min(1, scrollY / elContainer.clientHeight)
   }

   // Respect users who asked the OS to reduce motion: keep the first video frame still.
   useEffect(() => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
      const apply = () => {
         const v = refVideo.current
         if (!v) return
         if (mq.matches) v.pause()
         else v.play().catch(() => {})
      }
      apply()
      mq.addEventListener('change', apply)
      return () => mq.removeEventListener('change', apply)
   }, [])

   return (
      <div
         ref={refContainer}
         className='sticky top-0 -z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black'
         style={{ transform: `translateY(-${progress * 20}vh)` }}
      >
         <video
            ref={refVideo}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            className='absolute inset-0 h-full w-full object-cover'
         >
            <source src="/masthead-bg.webm" type="video/webm" />
            <source src="/masthead-bg.m4v" type="video/mp4" />
         </video>

         {/* Legibility overlay: darkens edges, keeps the center luminous. */}
         <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/80' aria-hidden="true" />

         <div
            className='relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-20 text-center text-white'
            style={{ opacity: Math.max(0, 1 - progress * 1.2) }}
         >
            <span className='eyebrow fade-up text-white/80' style={{ animationDelay: '100ms' }}>
               Digital agency<span className='hidden sm:inline'>&nbsp;· Nabeul, Tunisia</span>
            </span>
            <h1 className='fade-up mt-6 text-5xl font-bold tracking-tighter drop-shadow-[0_5px_3px_rgba(0,0,0,0.4)] sm:text-6xl xl:text-8xl' style={{ animationDelay: '200ms' }}>
               Dark Matter
            </h1>
            <p className='fade-up mt-5 max-w-xl text-xl font-semibold tracking-tight text-white/90 drop-shadow-[0_5px_3px_rgba(0,0,0,0.4)] sm:text-2xl xl:text-3xl' style={{ animationDelay: '320ms' }}>
               Cosmic Architects — Holding Galaxies Together.
            </p>
            <div className='fade-up mt-10 flex flex-col gap-4 sm:flex-row' style={{ animationDelay: '460ms' }}>
               <Link href="#contact" className='btn-light group'>
                  Start a project
                  <HiArrowRight className='transition-transform duration-200 group-hover:translate-x-1' aria-hidden="true" />
               </Link>
               <Link href="#services" className='btn-ghost-light'>
                  Explore our services
               </Link>
            </div>
         </div>

         {/* Wrapper carries the scroll-linked opacity; the link carries the entrance animation. */}
         <div className='relative z-10 mb-8 md:mb-10' style={{ opacity: Math.max(0, 1 - progress * 2) }}>
            <Link
               href="#services"
               className='fade-up flex flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-white/70 transition-colors hover:text-white'
               style={{ animationDelay: '700ms' }}
               aria-label="Scroll to services"
            >
               Scroll
               <HiArrowDown className='animate-scroll-hint h-5 w-5' aria-hidden="true" />
            </Link>
         </div>
      </div>
   )
}
export default Masthead
