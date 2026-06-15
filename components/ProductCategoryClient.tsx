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
  const [applicationFilter, setApplicationFilter] = useState("all");
  const [sort, setSort] = useState("featured");

  const allApplications = useMemo(() => {
    const values = products.flatMap((product) => product.applications);
    return Array.from(new Set(values));
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const searchMatch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.summary.toLowerCase().includes(search.toLowerCase()) ||
        product.availableOptions.some((option) =>
          option.toLowerCase().includes(search.toLowerCase())
        );

      const applicationMatch =
        applicationFilter === "all" ||
        product.applications.includes(applicationFilter);

      return searchMatch && applicationMatch;
    });

    if (sort === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "lead-time") {
      result = [...result].sort((a, b) => a.leadTime.localeCompare(b.leadTime));
    }

    return result;
  }, [products, search, applicationFilter, sort]);

  return (
    <main className="bg-[#f4efe7] text-black">
      {/* TOP CATALOG HEADER */}
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-[1500px] px-5 py-5 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-black/45">
              <Link href="/" className="hover:text-black">
                Home
              </Link>
              <span>/</span>
              <Link href="/products" className="hover:text-black">
                Products
              </Link>
              <span>/</span>
              <span className="text-black">{category.title}</span>
            </div>

            <Link
              href="/enquiry-basket"
              className="rounded-full bg-black px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#6b3f24]"
            >
              Enquiry Basket
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN CATALOG LAYOUT */}
      <section className="mx-auto grid max-w-[1500px] gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[280px_1fr] lg:px-10">
        {/* SIDEBAR */}
        <aside className="h-fit rounded-[28px] border border-black/10 bg-white p-5 shadow-sm lg:sticky lg:top-28">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-black/40">
            Categories
          </p>

          <div className="grid gap-2">
            {exportCategories.map((item) => {
              const active = item.slug === category.slug;

              return (
                <Link
                  key={item.slug}
                  href={`/products/${item.slug}`}
                  className={`rounded-2xl px-4 py-3 text-sm font-black transition ${
                    active
                      ? "bg-black text-white"
                      : "bg-[#f4efe7] text-black/65 hover:bg-black hover:text-white"
                  }`}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          <div className="mt-8 border-t border-black/10 pt-6">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-black/40">
              Filter By Use
            </p>

            <div className="grid gap-2">
              <button
                type="button"
                onClick={() => setApplicationFilter("all")}
                className={`rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                  applicationFilter === "all"
                    ? "bg-black text-white"
                    : "bg-[#f4efe7] text-black/60 hover:bg-black hover:text-white"
                }`}
              >
                All Uses
              </button>

              {allApplications.map((application) => (
                <button
                  key={application}
                  type="button"
                  onClick={() => setApplicationFilter(application)}
                  className={`rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                    applicationFilter === application
                      ? "bg-black text-white"
                      : "bg-[#f4efe7] text-black/60 hover:bg-black hover:text-white"
                  }`}
                >
                  {application}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* CONTENT */}
        <div className="min-w-0">
          {/* CATEGORY BANNER */}
          <div className="relative mb-6 min-h-[360px] overflow-hidden rounded-[32px] bg-black">
            <Image
              src={category.image}
              alt={category.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 75vw"
              className="object-cover opacity-70"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />

            <div className="relative z-10 flex min-h-[360px] max-w-3xl flex-col justify-end p-6 sm:p-10">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-white/60">
                {category.eyebrow}
              </p>

              <h1 className="text-6xl uppercase leading-[0.85] tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
                {category.title}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/70">
                {category.description}
              </p>
            </div>
          </div>

          {/* SUBCATEGORY STRIP */}
          <div className="mb-6 rounded-[28px] border border-black/10 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-sm font-black uppercase tracking-[0.18em] text-black">
                Shop By Product Type
              </h2>

              <span className="text-xs font-bold text-black/40">
                {category.items.length} types
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {category.items.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-black/10 bg-[#f4efe7] px-4 py-4 transition hover:bg-black hover:text-white"
                >
                  <p className="text-sm font-black">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SEARCH + SORT */}
          <div className="mb-6 rounded-[28px] border border-black/10 bg-white p-4 shadow-sm">
            <div className="grid gap-3 lg:grid-cols-[1fr_220px]">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={`Search ${category.title.toLowerCase()} products...`}
                className="rounded-2xl border border-black/10 bg-[#f4efe7] px-5 py-4 text-sm font-bold text-black outline-none transition placeholder:text-black/35 focus:border-black focus:bg-white"
              />

              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="rounded-2xl border border-black/10 bg-[#f4efe7] px-5 py-4 text-sm font-bold text-black outline-none transition focus:border-black focus:bg-white"
              >
                <option value="featured">Sort: Featured</option>
                <option value="name">Sort: Name</option>
                <option value="lead-time">Sort: Lead Time</option>
              </select>
            </div>
          </div>

          {/* PRODUCT GRID */}
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
                All Products
              </p>
              <h2 className="mt-2 text-4xl uppercase tracking-[-0.04em] text-black sm:text-5xl">
                {category.title}
              </h2>
            </div>

            <p className="text-sm font-bold text-black/50">
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
            <div className="rounded-[28px] border border-black/10 bg-white p-10 text-center">
              <h3 className="text-4xl uppercase tracking-[-0.05em]">
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