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
    image: "/Banner_2.png ",
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
    <section className="relative min-h-[620px] overflow-hidden bg-black">
      {heroSlides.map((item, index) => (
        <Image
          key={item.image}
          src={item.image}
          alt={item.title}
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ${
            activeSlide === index ? "opacity-70" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 z-10 bg-black/45" />

      <div className="relative z-20 mx-auto flex min-h-[620px] max-w-[1500px] items-center px-5 sm:px-8 lg:px-10">
        <div className="max-w-4xl">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.35em] text-white/70">
            {slide.label}
          </p>

          <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-white sm:text-7xl lg:text-8xl">
            {slide.title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
            Lotus Impex connects global buyers with reliable Indian sourcing,
            export coordination and quality-focused product supply.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-[#c9a16b]"
            >
              Explore Products
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-white/30 px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black"
            >
              Send Enquiry
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveSlide(index)}
            className={`h-2.5 rounded-full transition-all ${
              activeSlide === index ? "w-10 bg-white" : "w-2.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
