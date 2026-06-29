"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AddToEnquiryButton from "@/components/AddToEnquiryButton";
import type { ExportProduct } from "@/data/products";

type CatalogProductCardProps = {
  product: ExportProduct;
  index?: number;
  variant?: "default" | "myntra";
};

const fallbackImages: Record<string, string> = {
  "ladies-garments": "/content-women-shopping-mall.jpg",
  "mens-garments": "/fast-fashion.jpg",
  fabrics: "/product_category.jpg",
  accessories: "/online-marketing.jpg",
  footwear:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
  machinery: "/product_category.jpg",
  "general-goods": "/e-commerce.jpg",
};

export default function CatalogProductCard({
  product,
  index = 0,
  variant = "default",
}: CatalogProductCardProps) {
  const fallbackImage =
    fallbackImages[product.categorySlug] || "/product_category.jpg";
  const [imageSrc, setImageSrc] = useState(product.image || fallbackImage);
  const rating = (4 + (index % 5) / 10).toFixed(1);
  const ratingCount = index % 2 === 0 ? "1.2k" : "798";
  const price = 499 + ((index * 47) % 700);
  const mrp = price + 900 + ((index * 23) % 700);
  const discount = Math.round(((mrp - price) / mrp) * 100);
  const hasCatalogueFrame = imageSrc.startsWith("/catalogue-");

  if (variant === "myntra") {
    return (
      <article className="group min-w-0 self-start bg-white transition hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)]">
        <Link
          href={`/products/${product.categorySlug}/${product.slug}`}
          className="block cursor-pointer"
        >
          <div className="relative aspect-[3/4] overflow-hidden bg-white">
            <Image
              src={imageSrc}
              alt={product.imageAlt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 18vw"
              onError={() => setImageSrc(fallbackImage)}
              className={`object-bottom transition duration-500 ${
                hasCatalogueFrame
                  ? "object-cover group-hover:scale-[1.015]"
                  : "object-cover group-hover:scale-[1.015]"
              }`}
            />
            <div className="absolute bottom-2 left-2 rounded-sm bg-white/95 px-2 py-1 text-[11px] font-black text-[#282c3f] shadow-sm">
              {rating} <span className="text-[#14958f]">★</span> | {ratingCount}
            </div>
          </div>
        </Link>

        <div className="min-h-[118px] px-3 pb-3 pt-3">
          <Link
            href={`/products/${product.categorySlug}/${product.slug}`}
            className="cursor-pointer"
          >
            <p className="truncate text-[15px] font-black leading-5 text-[#282c3f]">
              Lotus Impex
            </p>
            <h3 className="mt-1 truncate text-sm font-semibold leading-5 text-[#535766]">
              {product.shortName || product.name}
            </h3>
            <p className="mt-2 truncate text-sm font-black leading-5 text-[#282c3f]">
              Rs. {price}{" "}
              <span className="text-xs font-normal text-[#7e818c] line-through">
                Rs. {mrp}
              </span>{" "}
              <span className="text-xs font-normal text-[#ff905a]">
                ({discount}% OFF)
              </span>
            </p>
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="group overflow-hidden bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10">
      <Link href={`/products/${product.categorySlug}/${product.slug}`}>
       <div className="relative aspect-[4/3] overflow-hidden bg-white">
          <Image
            src={imageSrc}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={() => setImageSrc(fallbackImage)}
            className="object-cover object-center opacity-55 blur-xl scale-110"
          />
          <Image
            src={imageSrc}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={() => setImageSrc(fallbackImage)}
          className="object-cover object-center transition duration-700"
          />

          <button
            type="button"
            aria-label="Save product"
            className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white text-lg text-transparent shadow-sm"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="absolute size-6 text-[#282c3f]"
            >
              <path
                d="M12 20.25S4.75 16.2 3.05 10.9C1.9 7.35 4.2 4.5 7.45 4.5c1.85 0 3.35 1 4.55 2.45C13.2 5.5 14.7 4.5 16.55 4.5c3.25 0 5.55 2.85 4.4 6.4C19.25 16.2 12 20.25 12 20.25Z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
            ♡
          </button>

          <div className="absolute left-4 top-4 rounded-full bg-black px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white">
            Export
          </div>
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/products/${product.categorySlug}/${product.slug}`}>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-black/40">
            {product.type}
          </p>

          <h3 className="mt-2 text-3xl uppercase leading-none text-black">
            {product.name}
          </h3>

          <p className="mt-3 text-sm leading-6 text-black/55">
            {product.summary}
          </p>
        </Link>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-[#f4efe7] p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/35">
              MOQ
            </p>
            <p className="mt-1 text-xs font-black text-black">
              {product.minOrder}
            </p>
          </div>

          <div className="rounded-2xl bg-[#f4efe7] p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/35">
              Lead Time
            </p>
            <p className="mt-1 text-xs font-black text-black">
              {product.leadTime}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <Link
            href={`/products/${product.categorySlug}/${product.slug}`}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-black/15 px-4 py-3 text-[11px] font-black uppercase tracking-[0.08em] text-black transition hover:bg-black hover:text-white"
          >
            Details
          </Link>

          <AddToEnquiryButton product={product} fullWidth />
        </div>
      </div>
    </article>
  );
}
