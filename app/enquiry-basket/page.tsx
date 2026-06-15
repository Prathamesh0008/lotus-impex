"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type BasketItem = {
  slug: string;
  categorySlug: string;
  name: string;
  image: string;
  summary: string;
  minOrder: string;
};

const STORAGE_KEY = "lotus_impex_enquiry_basket";

export default function EnquiryBasketPage() {
  const [items, setItems] = useState<BasketItem[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    setItems(raw ? JSON.parse(raw) : []);
  }, []);

  function removeItem(slug: string, categorySlug: string) {
    const nextItems = items.filter(
      (item) => !(item.slug === slug && item.categorySlug === categorySlug)
    );

    setItems(nextItems);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
  }

  function clearBasket() {
    setItems([]);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <main className="min-h-screen bg-[#f4efe7] px-5 py-12 text-black sm:px-8 lg:px-10">
      <section className="mx-auto max-w-[1500px]">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-black/45">
              Export Enquiry
            </p>

            <h1 className="text-6xl uppercase leading-[0.86] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
              Enquiry Basket
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-black/60">
              Products added here are not purchased online. This is a shortlist
              for sending an export enquiry to Lotus Impex.
            </p>
          </div>

          {items.length > 0 ? (
            <button
              type="button"
              onClick={clearBasket}
              className="rounded-full border border-black/15 px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white"
            >
              Clear Basket
            </button>
          ) : null}
        </div>

        {items.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="grid gap-4">
              {items.map((item) => (
                <article
                  key={`${item.categorySlug}-${item.slug}`}
                  className="grid gap-5 rounded-[28px] border border-black/10 bg-white p-4 shadow-sm sm:grid-cols-[170px_1fr]"
                >
                  <Link
                    href={`/products/${item.categorySlug}/${item.slug}`}
                    className="relative h-44 overflow-hidden rounded-[22px] bg-black"
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

                      <h2 className="mt-2 text-4xl uppercase leading-[0.9] tracking-[-0.05em] text-black">
                        {item.name}
                      </h2>

                      <p className="mt-3 text-sm leading-7 text-black/55">
                        {item.summary}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/products/${item.categorySlug}/${item.slug}`}
                        className="rounded-full border border-black/15 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-black transition hover:bg-black hover:text-white"
                      >
                        View Product
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
              ))}
            </div>

            <aside className="h-fit rounded-[28px] border border-black/10 bg-white p-6 shadow-sm lg:sticky lg:top-28">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
                Enquiry Summary
              </p>

              <h2 className="mt-3 text-5xl uppercase leading-[0.86] tracking-[-0.05em]">
                {items.length} Product{items.length > 1 ? "s" : ""}
              </h2>

              <div className="mt-6 grid gap-3">
                {items.map((item) => (
                  <div
                    key={`${item.categorySlug}-${item.slug}-summary`}
                    className="rounded-2xl bg-[#f4efe7] px-4 py-3 text-sm font-bold text-black/65"
                  >
                    {item.name}
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-black px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#6b3f24]"
              >
                Proceed To Enquiry
              </Link>

              <Link
                href="/products"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-black/15 px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white"
              >
                Add More Products
              </Link>
            </aside>
          </div>
        ) : (
          <div className="rounded-[32px] border border-black/10 bg-white p-10 text-center shadow-sm">
            <h2 className="text-5xl uppercase leading-[0.9] tracking-[-0.05em]">
              No Products Added
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-black/55">
              Browse product categories and add products to your enquiry basket.
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