"use client";

import Image from "next/image";
import Link from "next/link";
import { PointerEvent, useEffect, useRef, useState } from "react";
import { exportCategories } from "@/data/site";

const AUTO_DELAY = 4200;
const DRAG_THRESHOLD = 50;
const visibleCategories = exportCategories.filter(
  (category) => category.slug !== "footwear"
);

export default function FeaturedCollectionsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const dragStart = useRef(0);

  useEffect(() => {
    if (isInteracting) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % visibleCategories.length);
    }, AUTO_DELAY);

    return () => window.clearInterval(timer);
  }, [isInteracting]);

  function goToSlide(index: number) {
    const nextIndex =
      (index + visibleCategories.length) % visibleCategories.length;
    setActiveIndex(nextIndex);
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    dragStart.current = event.clientX;
    setIsInteracting(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    const distance = event.clientX - dragStart.current;

    if (Math.abs(distance) > DRAG_THRESHOLD) {
      goToSlide(activeIndex + (distance < 0 ? 1 : -1));
    }

    setIsInteracting(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function stopButtonPointerEvent(event: PointerEvent<HTMLButtonElement>) {
    event.stopPropagation();
  }

  return (
    <div
      className="relative overflow-hidden rounded-[10px] border border-black/10 bg-white shadow-sm"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => setIsInteracting(false)}
    >
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {visibleCategories.map((category, index) => (
          <div
            key={category.slug}
            className="grid min-h-[430px] w-full shrink-0 xl:grid-cols-[1.08fr_0.92fr]"
          >
            <div className="relative min-h-[240px] overflow-hidden bg-black sm:min-h-[300px] xl:min-h-[430px]">
              <Image
                src={category.image}
                alt={category.imageAlt}
                fill
                priority={index === 0}
                sizes="(max-width: 1280px) 100vw, 55vw"
                className="object-cover object-center opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/10" />
            </div>

            <div className="relative flex min-h-[300px] flex-col items-center justify-center bg-[#f4efe7] px-5 py-8 text-center sm:min-h-[330px] sm:px-10 sm:py-10">
              <p className="mb-4 text-[10px] font-black uppercase tracking-[0.24em] text-[#b58a52] sm:text-[11px] sm:tracking-[0.3em]">
                {category.eyebrow}
              </p>

              <h2 className="max-w-xl text-3xl leading-tight text-black sm:text-4xl">
                {category.title}
              </h2>

              <p className="mt-5 max-w-md text-sm leading-7 text-black/55">
                {category.summary}
              </p>

              <Link
                href="/products"
                onPointerDown={(event) => event.stopPropagation()}
                className="mt-7 inline-flex min-h-12 items-center justify-center bg-black px-10 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-[#6b3f24]"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous collection"
        onPointerDown={stopButtonPointerEvent}
        onPointerUp={stopButtonPointerEvent}
        onPointerCancel={stopButtonPointerEvent}
        onClick={(event) => {
          event.stopPropagation();
          setIsInteracting(false);
          goToSlide(activeIndex - 1);
        }}
        className="absolute left-5 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-2xl text-black shadow-sm transition hover:bg-black hover:text-white"
      >
        ‹
      </button>

      <button
        type="button"
        aria-label="Next collection"
        onPointerDown={stopButtonPointerEvent}
        onPointerUp={stopButtonPointerEvent}
        onPointerCancel={stopButtonPointerEvent}
        onClick={(event) => {
          event.stopPropagation();
          setIsInteracting(false);
          goToSlide(activeIndex + 1);
        }}
        className="absolute right-5 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-2xl text-black shadow-sm transition hover:bg-black hover:text-white"
      >
        ›
      </button>
    </div>
  );
}
