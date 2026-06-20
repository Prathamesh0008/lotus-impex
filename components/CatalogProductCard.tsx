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

  if (variant === "myntra") {
    return (
      <article className="group bg-white">
        <Link
          href={`/products/${product.categorySlug}/${product.slug}`}
          className="block"
        >
          <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f6]">
            <Image
              src={imageSrc}
              alt={product.imageAlt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 20vw"
              onError={() => setImageSrc(fallbackImage)}
              className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute bottom-2 left-2 rounded-sm bg-white/95 px-2 py-1 text-xs font-black text-black shadow-sm">
              {rating} <span className="text-[#14958f]">★</span> | {ratingCount}
            </div>
          </div>
        </Link>

        <div className="pt-3">
          <Link href={`/products/${product.categorySlug}/${product.slug}`}>
            <p className="truncate text-base font-black text-[#282c3f]">
              Lotus Impex
            </p>
            <h3 className="mt-1 truncate text-sm font-normal text-[#535766]">
              {product.shortName || product.name}
            </h3>
            <p className="mt-2 text-sm font-black text-[#282c3f]">
              Rs. {price}{" "}
              <span className="font-normal text-[#7e818c] line-through">
                Rs. {mrp}
              </span>{" "}
              <span className="font-normal text-[#ff905a]">
                ({discount}% OFF)
              </span>
            </p>
          </Link>

          <div className="mt-3">
            <AddToEnquiryButton product={product} fullWidth tone="myntra" />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10">
      <Link href={`/products/${product.categorySlug}/${product.slug}`}>
        <div className="relative h-[310px] overflow-hidden bg-[#f3f3f3]">
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
            className="object-contain object-center transition duration-700"
          />

          <button
            type="button"
            aria-label="Save product"
            className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white text-lg shadow-sm"
          >
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

          <h3 className="mt-2 text-2xl uppercase leading-[0.95] tracking-[-0.04em] text-black">
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
