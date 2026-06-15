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

    setAdded(true);
  }

  if (added) {
    return (
      <Link
        href="/enquiry-basket"
        className={`inline-flex items-center justify-center rounded-full bg-[#c9a16b] px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-white ${
          fullWidth ? "w-full" : ""
        }`}
      >
        View Enquiry Basket
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={addToBasket}
      className={`inline-flex items-center justify-center rounded-full bg-black px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#6b3f24] ${
        fullWidth ? "w-full" : ""
      }`}
    >
      Add To Enquiry
    </button>
  );
}