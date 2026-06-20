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
        className={`inline-flex min-h-11 items-center justify-center whitespace-nowrap ${
          tone === "myntra"
            ? "rounded-[4px] bg-[#c9a16b] px-6 py-4 text-sm text-white hover:bg-[#b88d55]"
            : "rounded-full bg-[#c9a16b] px-4 py-3 text-[11px] tracking-[0.08em] text-black hover:bg-white"
        } font-black uppercase transition ${
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
      className={`inline-flex min-h-11 items-center justify-center whitespace-nowrap ${
        tone === "myntra"
          ? "rounded-[4px] bg-[#c9a16b] px-6 py-4 text-sm hover:bg-[#b88d55]"
          : "rounded-full bg-black px-4 py-3 text-[11px] tracking-[0.08em] hover:bg-[#6b3f24]"
      } font-black uppercase text-white transition disabled:cursor-not-allowed disabled:bg-black/35 ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {disabled ? disabledLabel : "Add To Cart"}
    </button>
  );
}

