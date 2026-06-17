"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import CatalogProductCard from "@/components/CatalogProductCard";
import { exportCategories, type ExportCategory } from "@/data/site";
import type { ExportProduct } from "@/data/products";

type ProductCategoryClientProps = {
  category: ExportCategory;
  products: ExportProduct[];
};

export default function ProductCategoryClient({
  category,
  products,
}: ProductCategoryClientProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sort, setSort] = useState("featured");

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const searchMatch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.summary.toLowerCase().includes(search.toLowerCase()) ||
        product.availableOptions.some((option) =>
          option.toLowerCase().includes(search.toLowerCase())
        );

      const typeMatch = typeFilter === "all" || product.type === typeFilter;

      return searchMatch && typeMatch;
    });

    if (sort === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "lead-time") {
      result = [...result].sort((a, b) => a.leadTime.localeCompare(b.leadTime));
    }

    return result;
  }, [products, search, typeFilter, sort]);

  return (
    <main className="bg-[#f4efe7] text-black">
      {/* TOP CATALOG HEADER */}
      <section className="border-b border-black/10 bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        <div className="mx-auto max-w-[1500px] px-5 py-5 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-black text-black/45">
              <Link href="/" className="transition hover:text-black">
                Home
              </Link>
              <span className="text-black/25">/</span>
              <Link href="/products" className="transition hover:text-black">
                Products
              </Link>
              <span className="text-black/25">/</span>
              <span className="text-black">{category.title}</span>
            </div>

            <Link
              href="/enquiry-basket"
              className="rounded-full bg-black px-6 py-3 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition hover:bg-[#6b3f24] hover:shadow-[0_16px_36px_rgba(107,63,36,0.22)]"
            >
              Enquiry Basket
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN CATALOG LAYOUT */}
      <section className="mx-auto grid max-w-[1500px] gap-7 px-5 py-8 sm:px-8 lg:grid-cols-[292px_1fr] lg:px-10">
        {/* SIDEBAR */}
        <aside className="h-fit overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_18px_45px_rgba(0,0,0,0.08)] lg:sticky lg:top-28">
          <div className="border-b border-black/10 px-5 py-5">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
              Categories
            </p>
            <p className="mt-2 text-sm font-bold text-black/55">
              Export catalogue
            </p>
          </div>

          <div className="grid gap-2 p-5">
            {exportCategories.map((item) => {
              const active = item.slug === category.slug;

              return (
                <Link
                  key={item.slug}
                  href={`/products/${item.slug}`}
                  className={`group flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-black transition ${
                    active
                      ? "bg-black text-white shadow-[0_12px_28px_rgba(0,0,0,0.18)]"
                      : "bg-[#f4efe7] text-black/65 hover:bg-black hover:text-white"
                  }`}
                >
                  <span>{item.title}</span>
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition ${
                      active
                        ? "bg-[#c9a16b]"
                        : "bg-black/15 group-hover:bg-[#c9a16b]"
                    }`}
                  />
                </Link>
              );
            })}
          </div>
        </aside>

        {/* CONTENT */}
        <div className="min-w-0">
          {/* CATEGORY BANNER */}
          <div className="relative mb-7 min-h-[380px] overflow-hidden rounded-[30px] border border-white/45 bg-black shadow-[0_24px_60px_rgba(0,0,0,0.16)]">
            <Image
              src={category.image}
              alt={category.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 75vw"
              className="object-cover opacity-72"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

            <div className="relative z-10 flex min-h-[380px] max-w-4xl flex-col justify-end p-6 sm:p-9 lg:p-12">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <p className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-white/75 backdrop-blur">
                  {category.eyebrow}
                </p>
                <span className="rounded-full border border-[#c9a16b]/35 bg-[#c9a16b]/15 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#f1d3a6] backdrop-blur">
                  {products.length} Products
                </span>
              </div>

              <h1 className="max-w-3xl text-white">
                {category.title}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/76">
                {category.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {category.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white/78 backdrop-blur"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* SUBCATEGORY STRIP */}
          <div className="mb-6 rounded-[28px] border border-black/10 bg-white p-5 shadow-[0_16px_40px_rgba(0,0,0,0.07)]">
            <div className="mb-5 flex items-end justify-between gap-4">
              <h2 className="text-black">
                Shop By Product Type
              </h2>

              <span className="rounded-full bg-[#f4efe7] px-3 py-1 text-xs font-black text-black/45">
                {category.items.length} types
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {category.items.map((item) => {
                const active = typeFilter === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTypeFilter(active ? "all" : item)}
                    className={`group flex min-h-[72px] items-center justify-between rounded-2xl border px-5 py-4 text-left transition hover:-translate-y-0.5 hover:bg-black hover:text-white hover:shadow-[0_14px_32px_rgba(0,0,0,0.14)] ${
                      active
                        ? "border-black bg-black text-white shadow-[0_14px_32px_rgba(0,0,0,0.16)]"
                        : "border-black/10 bg-[#f4efe7] text-black"
                    }`}
                  >
                    <p className="text-sm font-black">{item}</p>
                    <span
                      className={`h-2 w-2 rounded-full transition ${
                        active
                          ? "bg-[#c9a16b]"
                          : "bg-black/20 group-hover:bg-[#c9a16b]"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* SEARCH + SORT */}
          <div className="mb-7 rounded-[28px] border border-black/10 bg-white p-4 shadow-[0_16px_40px_rgba(0,0,0,0.07)]">
            <div className="grid gap-3 lg:grid-cols-[1fr_220px]">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={`Search ${category.title.toLowerCase()} products...`}
                className="rounded-2xl border border-black/10 bg-[#f4efe7] px-5 py-4 text-sm font-bold text-black outline-none transition placeholder:text-black/35 focus:border-black focus:bg-white focus:shadow-[0_0_0_4px_rgba(201,161,107,0.18)]"
              />

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="rounded-2xl border border-black/10 bg-[#f4efe7] px-5 py-4 text-sm font-bold text-black outline-none transition focus:border-black focus:bg-white focus:shadow-[0_0_0_4px_rgba(201,161,107,0.18)]"
              >
                <option value="featured">Sort: Featured</option>
                <option value="name">Sort: Name</option>
                <option value="lead-time">Sort: Lead Time</option>
              </select>
            </div>
          </div>

          {/* PRODUCT GRID */}
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4 border-b border-black/10 pb-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
                All Products
              </p>
              <h2 className="mt-2 text-black">
                {category.title}
              </h2>
            </div>

            <p className="rounded-full bg-white px-4 py-2 text-sm font-black text-black/50 shadow-sm">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <CatalogProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-black/10 bg-white p-10 text-center shadow-[0_16px_40px_rgba(0,0,0,0.07)]">
              <h3>
                No Products Found
              </h3>
              <p className="mt-4 text-sm leading-7 text-black/55">
                Try removing filters or searching with another product name.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
