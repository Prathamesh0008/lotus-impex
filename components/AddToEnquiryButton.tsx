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
};

const STORAGE_KEY = "lotus_impex_enquiry_basket";
const CART_UPDATED_EVENT = "lotus-impex-cart-updated";

export default function AddToEnquiryButton({
  product,
  fullWidth = false,
}: AddToEnquiryButtonProps) {
  const [added, setAdded] = useState(false);

  function addToBasket() {
    const existingRaw = window.localStorage.getItem(STORAGE_KEY);
    const existing = existingRaw ? JSON.parse(existingRaw) : [];

    const alreadyExists = existing.some(
      (item: { slug: string; categorySlug: string }) =>
        item.slug === product.slug && item.categorySlug === product.categorySlug
    );

    if (!alreadyExists) {
      const nextItems = [
        ...existing,
        {
          ...product,
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
        className={`inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full bg-[#c9a16b] px-4 py-3 text-[11px] font-black uppercase tracking-[0.08em] text-black transition hover:bg-white ${
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
      className={`inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full bg-black px-4 py-3 text-[11px] font-black uppercase tracking-[0.08em] text-white transition hover:bg-[#6b3f24] ${
        fullWidth ? "w-full" : ""
      }`}
    >
      Add To Cart
    </button>
  );
}
