"use client";

import Image from "next/image";
import Link from "next/link";
import { PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { exportCategories } from "@/data/site";

export default function TrendingCategoryScroller() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ left: 0, startX: 0 });
  const didDrag = useRef(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const scrollingCategories = useMemo(
    () => [...exportCategories, ...exportCategories],
    []
  );

  useEffect(() => {
    let animationFrame = 0;
    let previousTime = 0;

    function autoScroll(time: number) {
      const scroller = scrollerRef.current;

      if (scroller && !isInteracting && !isDragging) {
        const delta = previousTime ? time - previousTime : 0;
        scroller.scrollLeft += delta * 0.035;

        if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
          scroller.scrollLeft = 0;
        }
      }

      previousTime = time;
      animationFrame = requestAnimationFrame(autoScroll);
    }

    animationFrame = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationFrame);
  }, [isDragging, isInteracting]);

  function scrollByCard(direction: "left" | "right") {
    scrollerRef.current?.scrollBy({
      left: direction === "left" ? -420 : 420,
      behavior: "smooth",
    });
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    setIsDragging(true);
    setIsInteracting(true);
    didDrag.current = false;
    dragState.current = {
      left: scroller.scrollLeft,
      startX: event.clientX,
    };
    scroller.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current;

    if (!scroller || !isDragging) {
      return;
    }

    const distance = event.clientX - dragState.current.startX;
    didDrag.current = Math.abs(distance) > 6;
    scroller.scrollLeft = dragState.current.left - distance;
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    scrollerRef.current?.releasePointerCapture(event.pointerId);
    setIsDragging(false);
  }

  return (
    <section className="bg-white px-5 py-16 text-black sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-8 flex items-center justify-between gap-5 border-t border-black/10 pt-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#b58a52]">
              Trending Now
            </p>
            <h2 className="mt-2 text-4xl leading-none tracking-[-0.04em] sm:text-5xl">
              Shop by category.
            </h2>
          </div>

          <div className="hidden gap-3 sm:flex">
            <button
              type="button"
              onClick={() => scrollByCard("left")}
              aria-label="Scroll categories left"
              className="grid size-12 place-items-center rounded-full border border-black/10 bg-white text-2xl shadow-sm transition hover:bg-black hover:text-white"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => scrollByCard("right")}
              aria-label="Scroll categories right"
              className="grid size-12 place-items-center rounded-full border border-black/10 bg-white text-2xl shadow-sm transition hover:bg-black hover:text-white"
            >
              ›
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => {
            setIsInteracting(false);
            setIsDragging(false);
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:thin] ${
            isDragging ? "cursor-grabbing snap-none" : "cursor-grab"
          }`}
        >
          {scrollingCategories.map((category, index) => (
            <Link
              key={`${category.slug}-${index}`}
              href={`/products/${category.slug}`}
              draggable={false}
              onClick={(event) => {
                if (didDrag.current) {
                  event.preventDefault();
                  didDrag.current = false;
                }
              }}
              className="group w-[280px] shrink-0 snap-start sm:w-[330px] lg:w-[370px]"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-[#f4efe7]">
                <Image
                  src={category.image}
                  alt={category.imageAlt}
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 1024px) 330px, 370px"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/90 text-xl shadow-sm">
                  ♡
                </div>
              </div>

              <div className="pt-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-black/45">
                  {category.eyebrow}
                </p>
                <h3 className="mt-2 text-2xl leading-tight tracking-[-0.03em] text-black">
                  {category.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-black/55">
                  {category.summary}
                </p>
                <span className="mt-4 inline-flex text-xs font-black uppercase tracking-[0.16em] text-[#6b3f24]">
                  View Category
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
