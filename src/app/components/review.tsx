import React, { ReactNode } from 'react'

interface Props {
    by: string
    children: ReactNode
}

const Review: React.FC<Props> = ({ children, by }) => (
    <figure className='flex flex-col items-center justify-center px-5 text-center md:px-10 lg:px-16'>
        <svg className='h-10 w-10 text-white/30' viewBox='0 0 32 32' fill='currentColor' aria-hidden='true'>
            <path d='M9.3 6C4.2 9.4 1.3 13.9 1.3 19.3c0 4.3 2.6 6.7 5.6 6.7 2.9 0 5-2.3 5-5 0-2.8-1.9-4.8-4.5-4.8-.5 0-1.1.1-1.2.1.6-2.9 3.3-6.3 6-8L9.3 6zm15.4 0c-5 3.4-7.9 7.9-7.9 13.3 0 4.3 2.6 6.7 5.6 6.7 2.8 0 5-2.3 5-5 0-2.8-2-4.8-4.6-4.8-.5 0-1 .1-1.1.1.5-2.9 3.3-6.3 5.9-8L24.7 6z' />
        </svg>
        <blockquote className='mt-6 text-xl leading-snug tracking-tight md:text-3xl md:leading-snug'>
            {children}
        </blockquote>
        <figcaption className='mt-8 text-sm uppercase tracking-[0.2em] text-white/50'>
            {by}
        </figcaption>
    </figure>
)
export default Review
