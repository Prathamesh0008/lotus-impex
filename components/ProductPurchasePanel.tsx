"use client";

import { useState } from "react";
import AddToEnquiryButton from "@/components/AddToEnquiryButton";
import WishlistLoginButton from "@/components/WishlistLoginButton";
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

export default function ProductPurchasePanel({
  product,
  inStock,
  availableSizes,
  allSizes,
}: ProductPurchasePanelProps) {
  const [selectedSize, setSelectedSize] = useState("");

  const addDisabled = !inStock || !selectedSize;
  const disabledLabel = !inStock ? "Add To Bag" : "Select Size";

  return (
    <>
      <div className="mt-8">
        <div className="flex items-center gap-8">
          <p className="text-base font-black uppercase text-[#282c3f]">
            Select Size
          </p>
          <button
            type="button"
            className="text-sm font-black uppercase text-[#ff3f6c]"
          >
            Size Chart &gt;
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {allSizes.map((size) => {
            const available = availableSizes.includes(size);
            const selected = selectedSize === size;
            const lowStockLabel =
              available && size === "M"
                ? "3 left"
                : available && size === "XXL"
                  ? "1 left"
                  : "";

            return (
              <button
                key={size}
                type="button"
                disabled={!available}
                aria-pressed={selected}
                title={available ? `${size} available` : `${size} not available`}
                onClick={() => setSelectedSize(size)}
                className={`relative grid size-12 place-items-center rounded-full border text-base font-black transition ${
                  selected
                    ? "border-[#282c3f] bg-[#282c3f] text-white"
                    : available
                      ? "border-black/20 hover:border-[#ff3f6c] hover:text-[#ff3f6c]"
                      : "cursor-not-allowed border-black/10 bg-[#f5f5f6] text-black/25 line-through"
                }`}
              >
                {size}
                {lowStockLabel ? (
                  <span className="absolute -bottom-1 rounded-sm bg-[#ff905a] px-2 py-0.5 text-[10px] font-black leading-none text-white">
                    {lowStockLabel}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_240px]">
        <AddToEnquiryButton
          product={product}
          fullWidth
          tone="myntra"
          selectedSize={selectedSize}
          disabled={addDisabled}
          disabledLabel={disabledLabel}
          label="Add To Bag"
          redirectTo="/checkout"
        />
        <WishlistLoginButton label />
      </div>

      <div className="mt-8 border-t border-black/10 pt-7">
        <div className="flex items-center gap-3 text-base font-black uppercase text-[#282c3f]">
          <span>Delivery Options</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          >
            <path d="M3 7h11v10H3z" />
            <path d="M14 10h3l3 3v4h-6z" />
            <circle cx="7" cy="19" r="1.5" />
            <circle cx="17" cy="19" r="1.5" />
          </svg>
        </div>
        <label className="mt-4 flex max-w-sm items-center overflow-hidden rounded-[6px] border border-[#d4d5d9] bg-white">
          <span className="sr-only">Enter pincode</span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Enter pincode"
            className="min-h-12 min-w-0 flex-1 px-4 text-base outline-none placeholder:text-[#7e818c]"
          />
          <button
            type="button"
            className="px-4 text-sm font-black text-[#ff3f6c]"
          >
            Check
          </button>
        </label>
        <div className="mt-3 space-y-3 text-base leading-6 text-[#282c3f]">
          <p>Please enter PIN code to check delivery time &amp; Pay on Delivery Availability</p>
          <p>100% Original Products</p>
          <p>Pay on delivery might be available</p>
          <p>
            Items like innerwear, socks, certain accessories and some high-value
            fragile items do not come under our return policy
          </p>
        </div>
      </div>
    </>
  );
}
