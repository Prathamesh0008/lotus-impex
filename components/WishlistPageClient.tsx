"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AddToEnquiryButton from "@/components/AddToEnquiryButton";
import type { ExportProduct } from "@/data/products";

const WISHLIST_STORAGE_KEY = "lotus_impex_wishlist";
const WISHLIST_UPDATED_EVENT = "lotus-impex-wishlist-updated";

type WishlistItem = Pick<
  ExportProduct,
  "slug" | "categorySlug" | "name" | "image" | "summary" | "minOrder"
> & {
  addedAt?: string;
};

function readWishlist() {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as WishlistItem[];
  } catch {
    window.localStorage.removeItem(WISHLIST_STORAGE_KEY);
    return [];
  }
}

export default function WishlistPageClient() {
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    function updateWishlist() {
      setItems(readWishlist());
    }

    updateWishlist();
    window.addEventListener("storage", updateWishlist);
    window.addEventListener(WISHLIST_UPDATED_EVENT, updateWishlist);

    return () => {
      window.removeEventListener("storage", updateWishlist);
      window.removeEventListener(WISHLIST_UPDATED_EVENT, updateWishlist);
    };
  }, []);

  function removeItem(target: WishlistItem) {
    const nextItems = items.filter(
      (item) =>
        item.slug !== target.slug || item.categorySlug !== target.categorySlug
    );
    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(nextItems));
    window.dispatchEvent(new Event(WISHLIST_UPDATED_EVENT));
    setItems(nextItems);
  }

  return (
    <main className="min-h-screen bg-white px-4 pb-14 pt-28 text-[#282c3f] sm:px-8 lg:px-10 lg:pt-32">
      <section className="mx-auto max-w-[1300px]">
        <div className="border-b border-black/10 pb-6">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c9a16b]">
            Saved Products
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
            Wishlist
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="mx-auto mt-16 max-w-md text-center">
            <h2 className="text-2xl font-black">Your wishlist is empty.</h2>
            <p className="mt-4 text-base leading-7 text-[#535766]">
              Save products from the product detail page and they will appear here.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-[4px] bg-black px-8 text-sm font-black uppercase text-white transition hover:bg-[#c9a16b] hover:text-black"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <article
                key={`${item.categorySlug}-${item.slug}`}
                className="overflow-hidden border border-black/10 bg-white"
              >
                <Link href={`/products/${item.categorySlug}/${item.slug}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="aspect-[3/4] w-full bg-[#f5f5f6] object-cover object-center"
                  />
                </Link>
                <div className="grid gap-4 p-4">
                  <div>
                    <h2 className="line-clamp-2 text-base font-black">
                      {item.name}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#535766]">
                      {item.summary}
                    </p>
                  </div>
                  <AddToEnquiryButton
                    product={item}
                    fullWidth
                    tone="myntra"
                    label="Add To Bag"
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(item)}
                    className="min-h-11 border border-black/15 px-5 text-sm font-black uppercase text-[#282c3f] transition hover:border-black hover:bg-black hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
