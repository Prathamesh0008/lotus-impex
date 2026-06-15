"use client";

import Image from "next/image";
import Link from "next/link";
import AddToEnquiryButton from "@/components/AddToEnquiryButton";
import type { ExportProduct } from "@/data/products";

type CatalogProductCardProps = {
  product: ExportProduct;
};

export default function CatalogProductCard({ product }: CatalogProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-[22px] border border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10">
      <Link href={`/products/${product.categorySlug}/${product.slug}`}>
        <div className="relative h-[310px] overflow-hidden bg-[#f3f3f3]">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
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

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Link
            href={`/products/${product.categorySlug}/${product.slug}`}
            className="inline-flex items-center justify-center rounded-full border border-black/15 px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-black transition hover:bg-black hover:text-white"
          >
            Details
          </Link>

          <AddToEnquiryButton product={product} fullWidth />
        </div>
      </div>
    </article>
  );
}