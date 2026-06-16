import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InternalLinkSection from "@/components/InternalLinkSection";
import ProductCard from "@/components/ProductCard";
import { exportCategories, siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Export Product Categories",
  description:
    "Explore Lotus Impex export categories including ladies garments, mens garments, fabrics, accessories, machinery and general goods.",
  alternates: {
    canonical: "/products",
  },
};

export default function ProductsPage() {
  return (
    <main className="bg-[#f4efe7] text-black">
      <section className="relative min-h-[560px] overflow-hidden bg-black">
        <Image
          src="/product_category.jpg"
          alt="Lotus Impex online product catalogue"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.72]"
        />

        <div className="absolute inset-0 image-overlay" />

        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-[1500px] items-end px-5 py-12 sm:px-8 lg:px-10">
          <div className="max-w-5xl">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.34em] text-white/65">
              Lotus Impex Catalogue
            </p>

            <h1 className="text-6xl font-black uppercase leading-[0.86] tracking-[-0.09em] text-white sm:text-7xl lg:text-8xl">
              Product Categories
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">
              Explore export-ready categories for garments, textiles,
              accessories, machinery and flexible general goods sourcing.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-black/45">
                Export Divisions
              </p>

              <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-black sm:text-6xl lg:text-7xl">
                Choose your sourcing category.
              </h2>
            </div>

            <p className="max-w-2xl text-lg leading-8 text-black/60 lg:ml-auto">
              {siteConfig.name} supports international buyers with requirement
              mapping, sourcing coordination, export packaging and documentation
              support.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {exportCategories.map((category, index) => (
              <ProductCard
                key={category.slug}
                category={category}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-white/45">
              Direct Enquiry
            </p>

            <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] sm:text-6xl">
              Need mixed category sourcing?
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-white/60">
              If your requirement includes multiple categories such as garments,
              fabrics, accessories and general goods, send one complete enquiry
              and we will structure it category-wise.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-[#c9a16b]"
            >
              Send Requirement
            </Link>
          </div>
        </div>
      </section>

      <InternalLinkSection />
    </main>
  );
}
