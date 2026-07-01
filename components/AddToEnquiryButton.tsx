"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
  label?: string;
  redirectTo?: string;
};

const STORAGE_KEY = "lotus_impex_enquiry_basket";
const CART_UPDATED_EVENT = "lotus-impex-cart-updated";

type BasketItem = Pick<
  ExportProduct,
  "slug" | "categorySlug" | "name" | "image" | "summary" | "minOrder"
> & {
  quantity?: number;
  selectedSize?: string;
  addedAt?: string;
};

export default function AddToEnquiryButton({
  product,
  fullWidth = false,
  tone = "default",
  disabled = false,
  disabledLabel = "Add To Bag",
  selectedSize,
  label,
  redirectTo,
}: AddToEnquiryButtonProps) {
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const addedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (addedTimerRef.current) {
        clearTimeout(addedTimerRef.current);
      }
    };
  }, []);

  function addToBasket() {
    const existingRaw = window.localStorage.getItem(STORAGE_KEY);
    const existing = existingRaw ? (JSON.parse(existingRaw) as BasketItem[]) : [];

    const existingIndex = existing.findIndex(
      (item) =>
        item.slug === product.slug &&
        item.categorySlug === product.categorySlug &&
        item.selectedSize === selectedSize
    );

    const nextItems =
      existingIndex >= 0
        ? existing.map((item, index) =>
            index === existingIndex
              ? { ...item, quantity: (item.quantity ?? 1) + 1 }
              : item
          )
        : [
            ...existing,
        {
          ...product,
          quantity: 1,
          selectedSize,
          addedAt: new Date().toISOString(),
        },
          ];

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));

    window.dispatchEvent(new Event(CART_UPDATED_EVENT));
    setAdded(true);
    if (addedTimerRef.current) {
      clearTimeout(addedTimerRef.current);
    }
    addedTimerRef.current = setTimeout(() => {
      setAdded(false);
    }, 1400);

    if (redirectTo) {
      router.push(redirectTo);
    }
  }

  return (
    <button
      type="button"
      onClick={addToBasket}
      disabled={disabled}
      className={`inline-flex min-h-9 items-center justify-center whitespace-nowrap ${
        tone === "myntra"
          ? "rounded-[10px] bg-[#D4AF36] px-4 py-2 text-xs font-black text-black shadow-sm transition hover:bg-[#D4AF36] disabled:bg-[#D4AF36] sm:rounded-[4px]"
          : "rounded-full bg-[#c9a16b] px-6 py-3 text-xs font-bold tracking-[0.1em] text-black transition hover:bg-[#d4b38a] disabled:bg-gray-300"
      } uppercase disabled:cursor-not-allowed ${
        fullWidth ? "w-full" : ""
      }`}
    >
      {tone === "myntra" && !disabled ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="mr-2 size-5"
        >
          <path
            d="M6.5 8.5h11l-.8 11h-9.4l-.8-11Z"
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
          <path
            d="M9 8.5V7a3 3 0 0 1 6 0v1.5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.8"
          />
        </svg>
      ) : null}
      {added
        ? "Added To Bag"
        : tone === "myntra"
          ? label ?? "Add To Bag"
          : disabled
            ? disabledLabel
            : label ?? "Add To Cart"}
    </button>
  );
}
