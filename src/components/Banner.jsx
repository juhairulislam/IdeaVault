'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  {
    image: '/banner-1.jpg',
    eyebrow: 'Launch Something Real',
    headline: 'Where Great Startup Ideas Begin',
    sub: 'Discover innovative ideas, validate concepts with real people, and turn thoughts into momentum.',
  },
  {
    image: '/banner-2.jpg',
    eyebrow: 'Shape Your Concept',
    headline: 'Get Feedback Before You Build',
    sub: 'Share your startup idea, receive insights from creators and thinkers, and refine your concept through discussion.',
  },
  {
    image: '/banner-3.jpg',
    eyebrow: "See What's Coming",
    headline: "Discover Tomorrow's Next Big Startups",
    sub: 'Explore trending concepts, uncover emerging opportunities, and connect with ambitious innovators worldwide.',
  },
];

const Banner = () => {
  const swiperRef = useRef(null);

  return (
    <div className="w-full relative group">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <section className="relative w-full min-h-[92vh] flex items-center overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.headline}
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

              <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-8 h-px bg-amber-400" />
                    <span className="text-amber-400 text-xs font-semibold tracking-[0.2em] uppercase"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {slide.eyebrow}
                    </span>
                  </div>

                  <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    {slide.headline}
                  </h1>

                  <div className="w-16 h-1 bg-amber-400 mb-6 rounded-full" />

                  <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {slide.sub}
                  </p>

                  <Link href="/idea"
                    className="inline-flex items-center gap-3 bg-amber-400 hover:bg-amber-300 text-black font-semibold text-sm tracking-wide px-8 py-4 rounded-full transition-colors duration-200 group/btn"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Explore Ideas
                    <svg className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>

      <button 
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-amber-400 hover:text-black text-amber-400 w-10 h-10 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
      >
        ❮
      </button>
      <button 
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-amber-400 hover:text-black text-amber-400 w-10 h-10 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
      >
        ❯
      </button>
    </div>
  );
};

export default Banner;