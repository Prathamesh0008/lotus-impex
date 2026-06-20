"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const heroSlides = [
  {
    label: "Fashion Export",
    title: "Garments For Global Buyers",
    image: "/fast-fashion.jpg",
  },
  {
    label: "Textile Sourcing",
    title: "Premium Fabrics For International Markets",
    image: "/Banner_2.png",
  },
  {
    label: "Global Trade",
    title: "Trusted Export Partner From India",
    image: "/Banner_1.png",
  },
];

export default function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  const slide = heroSlides[activeSlide];

  return (
    <section className="relative w-full max-w-full overflow-hidden bg-black">
      {heroSlides.map((item, index) => (
        <Image
          key={item.image}
          src={item.image}
          alt={item.title}
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-1000 sm:object-center ${
            activeSlide === index ? "opacity-70" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 z-10 bg-black/45" />

      <div className="relative z-20 mx-auto flex min-h-[460px] w-full max-w-[1500px] items-center px-4 py-10 sm:min-h-[560px] sm:px-8 xl:min-h-[620px] xl:px-10">
        <div className="w-full max-w-4xl">
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.28em] text-white/70 sm:mb-5 sm:text-xs sm:tracking-[0.35em]">
            {slide.label}
          </p>

          <h1 className="max-w-4xl text-[2.35rem] font-black uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl xl:text-7xl">
            {slide.title}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:mt-6 sm:text-lg sm:leading-8">
            Lotus Impex connects global buyers with reliable Indian sourcing,
            export coordination and quality-focused product supply.
          </p>

          <div className="mt-7 grid gap-3 sm:mt-8 sm:flex sm:flex-wrap">
            <Link
              href="/products"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-center text-xs font-black uppercase tracking-[0.14em] text-black transition hover:bg-[#c9a16b] sm:px-7 sm:py-4 sm:text-sm sm:tracking-[0.16em]"
            >
              Explore Products
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-6 py-3 text-center text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-white hover:text-black sm:px-7 sm:py-4 sm:text-sm sm:tracking-[0.16em]"
            >
              Send Enquiry
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
