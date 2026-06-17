"use client";

import Image from "next/image";
import Link from "next/link";
import { PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { exportProducts } from "@/data/products";
import { exportCategories } from "@/data/site";

const fallbackImages: Record<string, string> = {
  "ladies-garments": "/content-women-shopping-mall.jpg",
  "mens-garments": "/fast-fashion.jpg",
  fabrics: "/product_category.jpg",
  accessories: "/online-marketing.jpg",
  machinery: "/product_category.jpg",
  "general-goods": "/e-commerce.jpg",
};

export default function HomeProductScroller() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ left: 0, startX: 0 });
  const didDrag = useRef(false);
  const restartTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  const categoryNames = useMemo(
    () =>
      new Map(
        exportCategories.map((category) => [category.slug, category.shortTitle])
      ),
    []
  );
  const products = useMemo(() => [...exportProducts, ...exportProducts], []);

  function pauseThenRestart() {
    setIsInteracting(true);

    if (restartTimer.current) {
      clearTimeout(restartTimer.current);
    }

    restartTimer.current = setTimeout(() => {
      setIsInteracting(false);
    }, 3000);
  }

  function scrollByCard(direction: "left" | "right") {
    pauseThenRestart();
    scrollerRef.current?.scrollBy({
      left: direction === "right" ? 340 : -340,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    let animationFrame = 0;
    let previousTime = 0;

    function autoScroll(time: number) {
      const scroller = scrollerRef.current;

      if (scroller && !isDragging && !isInteracting) {
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

    return () => {
      cancelAnimationFrame(animationFrame);

      if (restartTimer.current) {
        clearTimeout(restartTimer.current);
      }
    };
  }, [isDragging, isInteracting]);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    pauseThenRestart();
    setIsDragging(true);
    didDrag.current = false;

    dragState.current = {
      left: scroller.scrollLeft,
      startX: event.clientX,
    };

    scroller.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current;
    if (!scroller || !isDragging) return;

    const distance = event.clientX - dragState.current.startX;
    didDrag.current = Math.abs(distance) > 6;
    scroller.scrollLeft = dragState.current.left - distance;
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    scrollerRef.current?.releasePointerCapture(event.pointerId);
    setIsDragging(false);
    pauseThenRestart();
  }

  return (
    <section className="bg-[#f4efe7] px-5 pb-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#b58a52]">
              All Products
            </p>
            <h2 className="max-w-3xl text-3xl leading-tight text-black sm:text-4xl lg:text-5xl">
              Export catalogue products ready for enquiry.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard("left")}
              aria-label="Scroll products left"
              className="grid size-11 place-items-center rounded-full border border-black/10 bg-white text-sm font-black text-black shadow-sm transition hover:bg-black hover:text-white"
            >
              &larr;
            </button>
            <button
              type="button"
              onClick={() => scrollByCard("right")}
              aria-label="Scroll products right"
              className="grid size-11 place-items-center rounded-full bg-black text-sm font-black text-white shadow-[0_12px_28px_rgba(0,0,0,0.16)] transition hover:bg-[#6b3f24]"
            >
              &rarr;
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          onMouseEnter={pauseThenRestart}
          onMouseLeave={pauseThenRestart}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`flex gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {products.map((product, index) => {
            const categoryName =
              categoryNames.get(product.categorySlug) || "Export";
            const imageSrc =
              product.image || fallbackImages[product.categorySlug] || "/product_category.jpg";

            return (
              <article
                key={`${product.categorySlug}-${product.slug}-${index}`}
                className="group flex w-[260px] shrink-0 flex-col overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-[0_14px_34px_rgba(0,0,0,0.07)] transition hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(0,0,0,0.12)] sm:w-[300px]"
              >
                <Link
                  href={`/products/${product.categorySlug}/${product.slug}`}
                  draggable={false}
                  onClick={(event) => {
                    if (didDrag.current) {
                      event.preventDefault();
                      didDrag.current = false;
                    }
                  }}
                  className="block"
                >
                  <div className="relative h-[210px] overflow-hidden bg-black">
                    <Image
                      src={imageSrc}
                      alt={product.imageAlt}
                      fill
                      sizes="(max-width: 640px) 260px, 300px"
                      className="object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-black">
                      {categoryName}
                    </span>
                  </div>

                  <div className="p-5 pb-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#b58a52]">
                      {product.type}
                    </p>
                    <h3 className="mt-2 text-xl leading-tight text-black">
                      {product.shortName || product.name}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-black/55">
                      {product.summary}
                    </p>
                  </div>
                </Link>

                <div className="p-5 pt-4">
                  <Link
                    href={`/products/${product.categorySlug}/${product.slug}`}
                    draggable={false}
                    onPointerDown={(event) => event.stopPropagation()}
                    className="flex items-center justify-between border-t border-black/10 pt-4"
                  >
                    <span className="text-xs font-black uppercase tracking-[0.16em] text-black">
                      View Product
                    </span>
                    <span className="grid size-9 place-items-center rounded-full bg-black text-xs font-black text-white transition group-hover:bg-[#6b3f24]">
                      Go
                    </span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
