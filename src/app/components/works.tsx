"use client";
import Image from 'next/image';
import React from 'react';
import dynamic from 'next/dynamic';
import { TileBackground, TileContent } from './tile';
import { WorkBackground, WorkContainer, WorkLeft, WorkLink, WorkRight } from './work';

// Tiles read window size/scroll position, so they are only rendered client-side.
const Tile = dynamic(() => import('./tile').then((module) => module.Tile), { ssr: false });
const TileWrapper = dynamic(() => import('./tile').then((module) => module.TileWrapper), { ssr: false });

const imageProps = {
  width: 840,
  height: 1620,
  sizes: '(min-width: 768px) 448px, 100vw',
  style: { width: '100%', height: 'auto' },
} as const;

const Works = () => {
  return (
    <TileWrapper numOfPages={3}>
      <TileBackground><WorkBackground /></TileBackground>
      <TileContent>
        <Tile
          page={0}
          renderContent={({ progress }) => (
            <WorkContainer>
              <WorkLeft progress={progress}>
                <div>We built</div>
                <div className='text-4xl md:text-5xl font-semibold tracking-tighter'><WorkLink href="https://pinkpanda.io/">Pink Panda</WorkLink>&apos;s app</div>
              </WorkLeft>
              <WorkRight progress={progress}>
                <Image src="/pinkpanda.webp" alt="Pink Panda" {...imageProps} />
              </WorkRight>
            </WorkContainer>
          )}
        />
        <Tile
          page={1}
          renderContent={({ progress }) => (
            <WorkContainer>
              <WorkLeft progress={progress}>
                <div>We made</div>
                <div className='text-4xl md:text-5xl font-semibold tracking-tighter'>Steakwallet faster.</div>
              </WorkLeft>
              <WorkRight progress={progress}>
                <Image src="/page1.png" alt="Steakwallet" {...imageProps} />
              </WorkRight>
            </WorkContainer>
          )}
        />
        <Tile
          page={2}
          renderContent={({ progress }) => (
            <WorkContainer>
              <WorkLeft progress={progress}>
                <div>We helped</div>
                <div className='text-4xl md:text-5xl font-semibold tracking-tighter'>Showtime ship faster.</div>
              </WorkLeft>
              <WorkRight progress={progress}>
                <Image src="/showtime.webp" alt="Showtime" {...imageProps} />
              </WorkRight>
            </WorkContainer>
          )}
        />
      </TileContent>
    </TileWrapper>
  );
};

export default Works;
