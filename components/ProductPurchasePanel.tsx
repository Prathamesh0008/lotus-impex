"use client";

import { useState } from "react";
import AddToEnquiryButton from "@/components/AddToEnquiryButton";
import type { ExportProduct } from "@/data/products";

type ProductPurchasePanelProps = {
  product: Pick<
    ExportProduct,
    "slug" | "categorySlug" | "name" | "image" | "summary" | "minOrder"
  >;
  inStock: boolean;
  availableSizes: string[];
  allSizes: string[];
};

const WISHLIST_STORAGE_KEY = "lotus_impex_wishlist";

function isProductWishlisted(slug: string) {
  if (typeof window === "undefined") return false;

  try {
    const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    const items = raw ? (JSON.parse(raw) as { slug: string }[]) : [];
    return items.some((item) => item.slug === slug);
  } catch {
    return false;
  }
}

export default function ProductPurchasePanel({
  product,
  inStock,
  availableSizes,
  allSizes,
}: ProductPurchasePanelProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [wishlisted, setWishlisted] = useState(() =>
    isProductWishlisted(product.slug)
  );

  function toggleWishlist() {
    const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    const items = raw ? (JSON.parse(raw) as typeof product[]) : [];
    const exists = items.some((item) => item.slug === product.slug);
    const nextItems = exists
      ? items.filter((item) => item.slug !== product.slug)
      : [...items, product];

    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(nextItems));
    setWishlisted(!exists);
  }

  const addDisabled = !inStock || !selectedSize;
  const disabledLabel = !inStock ? "Out Of Stock" : "Select Size";

  return (
    <>
      <div className="mt-8">
        <div className="flex items-center gap-8">
          <p className="text-base font-black uppercase text-[#282c3f]">
            Select Size
          </p>
          <button
            type="button"
            onClick={() => setShowSizeChart((value) => !value)}
            className="text-sm font-black uppercase text-[#c9a16b]"
          >
            Size Chart &gt;
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {allSizes.map((size) => {
            const available = availableSizes.includes(size);
            const selected = selectedSize === size;

            return (
              <button
                key={size}
                type="button"
                disabled={!available}
                aria-pressed={selected}
                title={available ? `${size} available` : `${size} not available`}
                onClick={() => setSelectedSize(size)}
                className={`grid size-14 place-items-center rounded-full border text-sm font-black transition ${
                  selected
                    ? "border-[#c9a16b] bg-[#c9a16b] text-white"
                    : available
                      ? "border-black/20 hover:border-[#c9a16b] hover:text-[#c9a16b]"
                      : "cursor-not-allowed border-black/10 bg-[#f5f5f6] text-black/25 line-through"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-sm font-semibold text-black/55">
          {inStock ? "Available now: " : "Currently unavailable"}
          <span className="text-[#282c3f]">
            {availableSizes.length > 0 ? availableSizes.join(", ") : "No sizes"}
          </span>
        </p>

        {showSizeChart ? (
          <div className="mt-4 overflow-hidden border border-black/10">
            {[
              ["XS", "Chest 34-36 in"],
              ["S", "Chest 36-38 in"],
              ["M", "Chest 38-40 in"],
              ["L", "Chest 40-42 in"],
              ["XL", "Chest 42-44 in"],
              ["XXL", "Chest 44-46 in"],
            ].map(([size, fit]) => (
              <div
                key={size}
                className="grid grid-cols-[80px_1fr] border-b border-black/10 px-4 py-3 text-sm last:border-b-0"
              >
                <span className="font-black text-[#282c3f]">{size}</span>
                <span className="text-black/60">{fit}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
        <AddToEnquiryButton
          product={product}
          fullWidth
          tone="myntra"
          selectedSize={selectedSize}
          disabled={addDisabled}
          disabledLabel={disabledLabel}
        />

        <button
          type="button"
          onClick={toggleWishlist}
          className={`inline-flex min-h-11 items-center justify-center rounded-[4px] border px-6 py-4 text-sm font-black uppercase tracking-[0.04em] transition ${
            wishlisted
              ? "border-[#c9a16b] bg-[#fff4e8] text-[#6b3f24]"
              : "border-black/20 text-[#282c3f] hover:border-black"
          }`}
        >
          {wishlisted ? "Wishlisted" : "Wishlist"}
        </button>
      </div>
    </>
  );
}
