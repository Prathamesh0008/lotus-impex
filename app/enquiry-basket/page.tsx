"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type BasketItem = {
  slug: string;
  categorySlug: string;
  name: string;
  image: string;
  summary: string;
  minOrder: string;
  quantity?: number;
};

const STORAGE_KEY = "lotus_impex_enquiry_basket";
const CART_UPDATED_EVENT = "lotus-impex-cart-updated";
const ESTIMATE_PER_ITEM = 125;

function loadBasket() {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as BasketItem[]) : [];
}

function saveBasket(items: BasketItem[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export default function EnquiryBasketPage() {
  const [items, setItems] = useState<BasketItem[]>(loadBasket);

  const totals = useMemo(() => {
    const totalQuantity = items.reduce(
      (sum, item) => sum + (item.quantity ?? 1),
      0
    );

    return {
      totalQuantity,
      subtotal: totalQuantity * ESTIMATE_PER_ITEM,
      documentation: items.length > 0 ? 45 : 0,
    };
  }, [items]);

  const grandTotal = totals.subtotal + totals.documentation;

  function updateQuantity(slug: string, categorySlug: string, quantity: number) {
    const nextItems = items.map((item) =>
      item.slug === slug && item.categorySlug === categorySlug
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    );

    setItems(nextItems);
    saveBasket(nextItems);
  }

  function removeItem(slug: string, categorySlug: string) {
    const nextItems = items.filter(
      (item) => !(item.slug === slug && item.categorySlug === categorySlug)
    );

    setItems(nextItems);
    saveBasket(nextItems);
  }

  function clearBasket() {
    setItems([]);
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(CART_UPDATED_EVENT));
  }

  return (
    <main className="min-h-screen bg-[#f4efe7] px-5 py-12 text-black sm:px-8 lg:px-10">
      <section className="mx-auto max-w-[1500px]">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-[#b58a52]">
              Shopping Cart
            </p>

            <h1 className="text-6xl leading-[0.86] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
              Review Your Cart
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-black/60">
              Confirm selected export products, adjust quantity and continue to
              checkout for billing and payment details.
            </p>
          </div>

          {items.length > 0 ? (
            <button
              type="button"
              onClick={clearBasket}
              className="rounded-full border border-black/15 px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white"
            >
              Clear Cart
            </button>
          ) : null}
        </div>

        {items.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_390px]">
            <div className="grid gap-4">
              {items.map((item) => {
                const quantity = item.quantity ?? 1;

                return (
                  <article
                    key={`${item.categorySlug}-${item.slug}`}
                    className="grid gap-5 rounded-[8px] border border-black/10 bg-white p-4 shadow-sm sm:grid-cols-[170px_1fr]"
                  >
                    <Link
                      href={`/products/${item.categorySlug}/${item.slug}`}
                      className="relative h-44 overflow-hidden rounded-[8px] bg-black"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="170px"
                        className="object-cover"
                      />
                    </Link>

                    <div className="flex flex-col justify-between gap-5">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.22em] text-black/40">
                          MOQ: {item.minOrder}
                        </p>

                        <h2 className="mt-2 text-4xl leading-[0.9] tracking-[-0.05em] text-black">
                          {item.name}
                        </h2>

                        <p className="mt-3 text-sm leading-7 text-black/55">
                          {item.summary}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <div className="inline-flex items-center rounded-full border border-black/10 bg-[#f4efe7] p-1">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.slug,
                                item.categorySlug,
                                quantity - 1
                              )
                            }
                            className="grid size-9 place-items-center rounded-full bg-white text-lg font-black"
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            -
                          </button>
                          <span className="min-w-12 text-center text-sm font-black">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.slug,
                                item.categorySlug,
                                quantity + 1
                              )
                            }
                            className="grid size-9 place-items-center rounded-full bg-black text-lg font-black text-white"
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            +
                          </button>
                        </div>

                        <Link
                          href={`/products/${item.categorySlug}/${item.slug}`}
                          className="rounded-full border border-black/15 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-black transition hover:bg-black hover:text-white"
                        >
                          Details
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            removeItem(item.slug, item.categorySlug)
                          }
                          className="rounded-full bg-[#f4efe7] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-black/60 transition hover:bg-red-100 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside className="h-fit rounded-[8px] border border-black/10 bg-white p-6 shadow-sm lg:sticky lg:top-28">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#b58a52]">
                Order Summary
              </p>

              <h2 className="mt-3 text-5xl leading-[0.86] tracking-[-0.05em]">
                {items.length} Product{items.length > 1 ? "s" : ""}
              </h2>

              <div className="mt-6 grid gap-3 border-y border-black/10 py-5 text-sm font-bold">
                <div className="flex justify-between gap-4">
                  <span className="text-black/55">Total Quantity</span>
                  <span>{totals.totalQuantity}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-black/55">Estimated Subtotal</span>
                  <span>${totals.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-black/55">Documentation</span>
                  <span>${totals.documentation.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-5 flex items-end justify-between gap-4">
                <span className="text-xs font-black uppercase tracking-[0.22em] text-black/40">
                  Estimated Total
                </span>
                <span className="text-3xl font-black">
                  ${grandTotal.toLocaleString()}
                </span>
              </div>

              <p className="mt-4 text-xs leading-6 text-black/45">
                Final pricing depends on quantity, packing, destination,
                sampling and supplier confirmation.
              </p>

              <Link
                href="/checkout"
                className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-black px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#6b3f24]"
              >
                Checkout
              </Link>

              <Link
                href="/products"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-black/15 px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white"
              >
                Continue Shopping
              </Link>
            </aside>
          </div>
        ) : (
          <div className="rounded-[8px] border border-black/10 bg-white p-10 text-center shadow-sm">
            <h2 className="text-5xl leading-[0.9] tracking-[-0.05em]">
              Your Cart Is Empty
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-black/55">
              Browse product categories and add products to your cart before
              checkout.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-flex rounded-full bg-black px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#6b3f24]"
            >
              Browse Catalogue
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
