"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const heroSlides = [
  {
    image: "/Banner_2.png",
    alt: "Lotus Impex fashion shopping sale",
    position: "center",
    eyebrow: "New Arrivals",
    title: "Curated shopping looks",
    offer: "Min. 60% Off",
    tone: "light",
  },
  {
    image: "/new_1.jpg",
    alt: "Women fashion collection",
    position: "center",
    eyebrow: "Season Sale",
    title: "Global fashion edits",
    offer: "40-80% Off",
    tone: "dark",
  },
  {
    image: "/new_2.jpg",
    alt: "Women seasonal fashion styles",
    position: "center",
    eyebrow: "Fresh Drop",
    title: "Premium fashion picks",
    offer: "Flat Rs.300 Off",
    tone: "light",
  },
  {
    image: "/new_5.jpg",
    alt: "Fashion shopping collection",
    position: "center",
    eyebrow: "New Arrivals",
    title: "Curated shopping looks",
    offer: "Min. 60% Off",
    tone: "light",
  },
];

export default function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0);
  const safeActiveSlide = activeSlide % heroSlides.length;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 3500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white pt-16 sm:pt-20 xl:pt-24">
      <div className="relative h-[240px] w-full overflow-hidden bg-[#f5f5f6] sm:h-[360px] md:h-[460px] lg:h-[560px] xl:h-[640px]">
        <div
          className="flex h-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${safeActiveSlide * 100}%)` }}
        >
          {heroSlides.map((slide, index) => (
            <div key={slide.image} className="relative h-full min-w-full">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
                style={{ objectPosition: slide.position }}
              />
              <div className="absolute inset-y-0 left-0 z-10 hidden w-full items-center justify-start bg-gradient-to-r from-[#f7d7dd]/90 via-white/20 to-transparent px-5 sm:px-8 lg:flex lg:px-14 xl:px-20">
                <div className="max-w-[285px] text-center text-black sm:max-w-sm lg:max-w-[520px]">
                  <p className="text-[10px] font-black uppercase tracking-[0.34em] opacity-80 sm:text-xs lg:text-sm">
                    {slide.eyebrow}
                  </p>
                  <h1 className="mt-3 font-serif text-4xl font-black uppercase leading-[0.92] tracking-normal sm:text-6xl lg:text-7xl xl:text-8xl">
                    {slide.title}
                  </h1>
                  <p className="mt-5 text-sm font-black uppercase sm:text-lg lg:text-xl">
                    {slide.offer}
                  </p>
                  <Link
                    href="/products"
                    className="mt-5 inline-flex min-h-10 items-center rounded-md bg-black px-6 text-xs font-black uppercase tracking-[0.12em] text-white shadow-lg transition hover:bg-[#c9a16b] hover:text-black sm:mt-7 sm:min-h-14 sm:px-9 sm:text-base"
                  >
                    Shop Now &gt;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 sm:bottom-6">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            aria-label={`Show banner ${index + 1}`}
            onClick={() => setActiveSlide(index)}
            className={`h-2 rounded-full transition-all ${
              safeActiveSlide === index
                ? "w-8 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.18)]"
                : "w-2 bg-white/65 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
