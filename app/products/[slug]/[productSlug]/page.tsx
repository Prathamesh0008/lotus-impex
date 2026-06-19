import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToEnquiryButton from "@/components/AddToEnquiryButton";
import CatalogProductCard from "@/components/CatalogProductCard";
import ProductImageGallery from "@/components/ProductImageGallery";
import { exportCategories, siteConfig } from "@/data/site";
import {
  exportProducts,
  getProductBySlugs,
  getProductsByCategory,
} from "@/data/products";

type PageProps = {
  params: Promise<{
    slug: string;
    productSlug: string;
  }>;
};

export function generateStaticParams() {
  return exportProducts.map((product) => ({
    slug: product.categorySlug,
    productSlug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, productSlug } = await params;
  const product = getProductBySlugs(slug, productSlug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} Export`,
    description: product.summary,
    alternates: {
      canonical: `/products/${product.categorySlug}/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} Export | Lotus Impex`,
      description: product.summary,
      url: `${siteConfig.url}/products/${product.categorySlug}/${product.slug}`,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.imageAlt,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug, productSlug } = await params;
  const category = exportCategories.find((item) => item.slug === slug);
  const product = getProductBySlugs(slug, productSlug);

  if (!category || !product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.categorySlug).filter(
    (item) => item.slug !== product.slug
  );

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    image: product.image,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    category: product.type,
  };

  return (
    <main className="bg-white text-[#111827]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-[1800px] px-5 py-5 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center gap-2 text-sm text-black/65">
            <Link href="/" className="hover:text-black">
              Home
            </Link>
            <span>/</span>
            <span>Clothing</span>
            <span>/</span>
            <Link href={`/products/${category.slug}`} className="hover:text-black">
              {category.title}
            </Link>
            <span>/</span>
            <span className="font-black text-black">{product.name}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1800px] gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:px-10 lg:py-10">
        <ProductImageGallery
          image={product.image}
          imageAlt={product.imageAlt}
          categoryImage={category.image}
          categorySlug={product.categorySlug}
          type={product.type}
        />

        <aside className="h-fit bg-white p-2 lg:sticky lg:top-28">
          <div className="flex items-start justify-between gap-5 border-b border-black/10 pb-5">
            <div>
              <h1 className="text-3xl font-black leading-tight text-[#282c3f]">
                Lotus Impex
              </h1>
              <p className="mt-2 text-xl text-[#535766]">{product.name}</p>
            </div>

            <button
              type="button"
              aria-label="Save product"
              className="grid size-12 shrink-0 place-items-center rounded-full border border-black/10 bg-white text-xl shadow-sm"
            >
              ♡
            </button>
          </div>

          <div className="mt-5 inline-flex border border-black/10 px-3 py-2 text-sm font-black text-[#282c3f]">
            4.3 <span className="mx-1 text-[#14958f]">★</span>
            <span className="border-l border-black/15 pl-2 font-normal text-black/55">
              5.3k Ratings
            </span>
          </div>

          <div className="mt-5 border-t border-black/10 pt-5">
            <p className="text-3xl font-black text-[#282c3f]">
              ₹667{" "}
              <span className="text-xl font-normal text-[#7e818c] line-through">
                MRP ₹1699
              </span>{" "}
              <span className="text-xl font-black text-[#ff905a]">
                (61% OFF)
              </span>
            </p>
            <p className="mt-2 text-sm font-black text-[#03a685]">
              inclusive of all taxes
            </p>
          </div>

          <p className="mt-5 text-sm leading-7 text-black/60">
            {product.description}
          </p>

          <div className="mt-7">
            <p className="text-base font-black uppercase text-[#282c3f]">
              More Colors
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                product.image,
                category.image,
                ...relatedProducts.slice(0, 8).map((item) => item.image),
              ].map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="relative size-16 overflow-hidden border border-black/10 bg-[#f5f5f6]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center gap-8">
              <p className="text-base font-black uppercase text-[#282c3f]">
                Select Size
              </p>
              <button
                type="button"
                className="text-sm font-black uppercase text-[#c9a16b]"
              >
                Size Chart ›
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  type="button"
                  className="grid size-14 place-items-center rounded-full border border-black/20 text-sm font-black transition hover:border-[#c9a16b] hover:text-[#c9a16b]"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
            <AddToEnquiryButton product={product} fullWidth tone="myntra" />

            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-[4px] border border-black/20 px-6 py-4 text-sm font-black uppercase tracking-[0.04em] text-[#282c3f] transition hover:border-black"
            >
              ♡ Wishlist
            </Link>
          </div>

          <div className="mt-8">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-black/40">
              Available Options
            </p>
            <div className="flex flex-wrap gap-2">
              {product.availableOptions.slice(0, 5).map((option) => (
                <span
                  key={option}
                  className="rounded-full border border-black/10 bg-[#f5f5f6] px-4 py-2 text-xs font-bold text-black/65"
                >
                  {option}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              ["MOQ", product.minOrder],
              ["Lead Time", product.leadTime],
              ["Origin", product.origin],
              ["Packaging", product.packaging],
            ].map(([label, value]) => (
              <div key={label} className="border border-black/10 bg-[#f5f5f6] p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-black/35">
                  {label}
                </p>
                <p className="mt-2 text-sm font-black text-[#282c3f]">{value}</p>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-[1800px] px-5 pb-20 sm:px-8 lg:px-10 lg:pb-24">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-black/45">
              Product Details
            </p>

            <h2 className="text-3xl leading-tight sm:text-4xl">
              Specification overview.
            </h2>
          </div>

          <div className="overflow-hidden border border-black/10 bg-white">
            {product.specifications.map((spec) => (
              <div
                key={spec.label}
                className="grid gap-2 border-b border-black/10 p-5 last:border-b-0 sm:grid-cols-[0.38fr_0.62fr]"
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-black/40">
                  {spec.label}
                </p>

                <p className="text-sm font-bold leading-7 text-black/70">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="border-t border-black/10 px-5 py-16 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1800px]">
            <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-black/45">
                  Related Products
                </p>

                <h2 className="text-3xl leading-tight sm:text-4xl">
                  More in {category.title}.
                </h2>
              </div>

              <Link
                href={`/products/${category.slug}`}
                className="bg-black px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#b58a52]"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-x-7 gap-y-10 md:grid-cols-3 xl:grid-cols-5">
              {relatedProducts.slice(0, 5).map((related, index) => (
                <CatalogProductCard
                  key={related.slug}
                  product={related}
                  index={index}
                  variant="myntra"
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}

