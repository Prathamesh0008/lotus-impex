"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { exportCategories } from "@/data/site";

export default function HomeCategoryShowcase() {
  const router = useRouter();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ left: 0, startX: 0 });
  const didDrag = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const categories = useMemo(() => [...exportCategories, ...exportCategories], []);

  useEffect(() => {
    let animationFrame = 0;
    let previousTime = 0;

    function autoScroll(time: number) {
      const scroller = scrollerRef.current;

      if (scroller && !isDragging && !isInteracting) {
        const delta = previousTime ? time - previousTime : 0;
        scroller.scrollLeft += delta * 0.04;

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
    <section className="bg-[#f4efe7] px-5 py-10 sm:px-8 lg:px-10">
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
        className={`mx-auto flex max-w-[1500px] gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {categories.map((category, index) => (
          <Link
            key={`${category.slug}-${index}`}
            href={`/products/${category.slug}`}
            draggable={false}
            onClick={(event) => {
              if (didDrag.current) {
                event.preventDefault();
                didDrag.current = false;
                return;
              }

              event.preventDefault();
              router.push(`/products/${category.slug}`);
            }}
            className="group flex min-h-[280px] w-[260px] shrink-0 flex-col items-center rounded-[6px] border border-black/10 bg-[#f8f4ed] px-5 py-6 text-center shadow-sm transition hover:-translate-y-1 hover:border-black/25 hover:shadow-xl sm:w-[280px]"
          >
            <div className="grid min-h-[96px] w-full place-items-start">
              <p className="mx-auto mb-3 max-w-[150px] text-[10px] font-black uppercase leading-5 tracking-[0.26em] text-[#b58a52]">
                {category.eyebrow}
              </p>

              <h3 className="mx-auto max-w-[180px] text-[22px] font-semibold leading-[1.08] text-black [overflow-wrap:anywhere]">
                {category.title}
              </h3>
            </div>

            <div className="relative mx-auto my-5 size-20 overflow-hidden rounded-full border border-black/10 bg-white shadow-sm">
              <Image
                src={category.image}
                alt={category.imageAlt}
                fill
                sizes="80px"
                className="object-cover opacity-90 transition duration-500 group-hover:scale-110 group-hover:opacity-100"
              />
            </div>

            <div className="mt-auto w-full">
              <p className="mx-auto mb-4 max-w-[180px] text-[13px] font-medium leading-6 text-black/55">
                {category.summary}
              </p>

              <span
                className={`mx-auto grid size-9 place-items-center rounded-full text-base text-white transition group-hover:bg-[#b58a52] ${
                  index % exportCategories.length === 0
                    ? "bg-[#b58a52]"
                    : "bg-black"
                }`}
              >
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
