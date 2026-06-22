"use client";

import { useState } from "react";
import Link from "next/link";
import type { ExportProduct } from "@/data/products";

type AddToEnquiryButtonProps = {
  product: Pick<
    ExportProduct,
    "slug" | "categorySlug" | "name" | "image" | "summary" | "minOrder"
  >;
  fullWidth?: boolean;
  tone?: "default" | "myntra";
  disabled?: boolean;
  disabledLabel?: string;
  selectedSize?: string;
};

const STORAGE_KEY = "lotus_impex_enquiry_basket";
const CART_UPDATED_EVENT = "lotus-impex-cart-updated";

export default function AddToEnquiryButton({
  product,
  fullWidth = false,
  tone = "default",
  disabled = false,
  disabledLabel = "Out Of Stock",
  selectedSize,
}: AddToEnquiryButtonProps) {
  const [added, setAdded] = useState(false);

  function addToBasket() {
    const existingRaw = window.localStorage.getItem(STORAGE_KEY);
    const existing = existingRaw ? JSON.parse(existingRaw) : [];

    const alreadyExists = existing.some(
      (item: { slug: string; categorySlug: string; selectedSize?: string }) =>
        item.slug === product.slug &&
        item.categorySlug === product.categorySlug &&
        item.selectedSize === selectedSize
    );

    if (!alreadyExists) {
      const nextItems = [
        ...existing,
        {
          ...product,
          selectedSize,
          addedAt: new Date().toISOString(),
        },
      ];

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
    }

    window.dispatchEvent(new Event(CART_UPDATED_EVENT));
    setAdded(true);
  }

  if (added) {
    return (
      <Link
        href="/enquiry-basket"
        className={`inline-flex min-h-12 items-center justify-center whitespace-nowrap ${
          tone === "myntra"
            ? "rounded-md bg-[#c9a16b] px-8 py-3 text-sm font-bold text-white transition hover:bg-[#b88d55]"
            : "rounded-full bg-[#c9a16b] px-6 py-3 text-xs font-bold tracking-[0.1em] text-black transition hover:bg-[#d4b38a]"
        } uppercase ${
          fullWidth ? "w-full" : ""
        }`}
      >
        View Cart
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={addToBasket}
      disabled={disabled}
      className={`inline-flex min-h-12 items-center justify-center whitespace-nowrap ${
        tone === "myntra"
          ? "rounded-md bg-[#c9a16b] px-8 py-3 text-sm font-bold text-white transition hover:bg-[#b88d55] disabled:bg-gray-400"
          : "rounded-full bg-[#c9a16b] px-6 py-3 text-xs font-bold tracking-[0.1em] text-black transition hover:bg-[#d4b38a] disabled:bg-gray-300"
      } uppercase disabled:cursor-not-allowed ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {disabled ? disabledLabel : "Add To Cart"}
    </button>
  );
}

