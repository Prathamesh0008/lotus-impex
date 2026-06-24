"use client";

import Image from "next/image";
import Link from "next/link";
import { PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { exportProducts } from "@/data/products";

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

  const products = useMemo(() => [...exportProducts, ...exportProducts], []);

  function getProductDisplayMeta(index: number) {
    const rating = (4 + (index % 5) / 10).toFixed(1);
    const ratingCount = index % 2 === 0 ? "1.2k" : "798";
    const price = 499 + ((index * 47) % 700);
    const mrp = price + 900 + ((index * 23) % 700);
    const discount = Math.round(((mrp - price) / mrp) * 100);

    return { discount, mrp, price, rating, ratingCount };
  }

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
    const scroller = scrollerRef.current;

    if (!scroller) return;

    const scrollAmount = getCardScrollAmount(scroller);

    scroller.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  }

  function getCardScrollAmount(scroller: HTMLDivElement) {
    const firstCard = scroller.firstElementChild as HTMLElement | null;
    const gap = Number.parseFloat(window.getComputedStyle(scroller).columnGap) || 0;
    const cardWidth = firstCard?.getBoundingClientRect().width || scroller.clientWidth;

    return cardWidth + gap;
  }

  useEffect(() => {
    const interval = window.setInterval(() => {
      const scroller = scrollerRef.current;

      if (scroller && !isDragging && !isInteracting) {
        if (scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 8) {
          scroller.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scroller.scrollBy({
            left: getCardScrollAmount(scroller),
            behavior: "smooth",
          });
        }
      }
    }, 3200);

    return () => {
      window.clearInterval(interval);

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
    <section className="w-full max-w-full overflow-hidden bg-[#f4efe7] px-4 pb-3 sm:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-[1500px]">
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
          className={`grid auto-cols-[calc((100%_-_64px)_/_5)] grid-flow-col snap-x snap-mandatory gap-4 overflow-x-auto pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-xl:auto-cols-[calc((100%_-_48px)_/_4)] max-lg:auto-cols-[260px] max-sm:auto-cols-[100%] ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {products.map((product, index) => {
            const meta = getProductDisplayMeta(index);
            const imageSrc =
              product.image || fallbackImages[product.categorySlug] || "/product_category.jpg";
            const hasEmbeddedFrame = imageSrc.startsWith("/catalogue-women/");

            return (
              <article
                key={`${product.categorySlug}-${product.slug}-${index}`}
                className="group flex min-w-0 snap-start flex-col overflow-hidden bg-white shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition hover:shadow-[0_14px_32px_rgba(0,0,0,0.12)]"
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
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f6]">
                    <Image
                      src={imageSrc}
                      alt={product.imageAlt}
                      fill
                      sizes="(max-width: 640px) 72vw, (max-width: 1024px) 260px, 20vw"
                      className={`object-contain object-bottom transition duration-500 ${
                        hasEmbeddedFrame
                          ? "scale-[1.14] group-hover:scale-[1.15]"
                          : "group-hover:scale-[1.015]"
                      }`}
                    />
                    <span className="absolute bottom-2 left-2 rounded-sm bg-white/95 px-2 py-1 text-[11px] font-black text-[#282c3f] shadow-sm">
                      {meta.rating} <span className="text-[#14958f]">★</span> |{" "}
                      {meta.ratingCount}
                    </span>
                  </div>

                  <div className="px-3 pb-3 pt-3">
                    <p className="truncate text-[15px] font-black leading-5 text-[#282c3f]">
                      Lotus Impex
                    </p>
                    <h3 className="mt-1 truncate text-sm font-normal leading-5 text-[#535766]">
                      {product.shortName || product.name}
                    </h3>
                    <p className="mt-2 truncate text-sm font-black leading-5 text-[#282c3f]">
                      Rs. {meta.price}{" "}
                      <span className="text-xs font-normal text-[#7e818c] line-through">
                        Rs. {meta.mrp}
                      </span>{" "}
                      <span className="text-xs font-normal text-[#ff905a]">
                        ({meta.discount}% OFF)
                      </span>
                    </p>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  );
}
