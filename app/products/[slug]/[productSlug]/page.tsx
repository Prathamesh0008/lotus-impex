import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToEnquiryButton from "@/components/AddToEnquiryButton";
import CatalogProductCard from "@/components/CatalogProductCard";
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
    <main className="bg-[#f4efe7] text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      {/* BREADCRUMB */}
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-[1500px] px-5 py-5 sm:px-8 lg:px-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-black/45">
            <Link href="/" className="hover:text-black">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-black">
              Products
            </Link>
            <span>/</span>
            <Link href={`/products/${category.slug}`} className="hover:text-black">
              {category.title}
            </Link>
            <span>/</span>
            <span className="text-black">{product.name}</span>
          </div>
        </div>
      </section>

      {/* PRODUCT DETAIL TOP */}
      <section className="mx-auto grid max-w-[1500px] gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[90px_1.05fr_0.95fr] lg:px-10 lg:py-12">
        {/* THUMBNAILS */}
        <div className="hidden gap-3 lg:grid">
          {[product.image, category.image, product.image].map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="relative h-24 overflow-hidden rounded-2xl border border-black/10 bg-white"
            >
              <Image
                src={image}
                alt={product.imageAlt}
                fill
                sizes="90px"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* MAIN IMAGE */}
        <div className="relative min-h-[620px] overflow-hidden rounded-[32px] bg-black">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover opacity-95"
          />

          <div className="absolute left-6 top-6 rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-black">
            {product.type}
          </div>
        </div>

        {/* PRODUCT INFO */}
        <aside className="h-fit rounded-[32px] border border-black/10 bg-white p-6 shadow-sm lg:sticky lg:top-28">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-black/40">
                Export Product
              </p>

              <h1 className="mt-3 text-6xl uppercase leading-[0.86] tracking-[-0.06em] text-black sm:text-7xl">
                {product.name}
              </h1>
            </div>

            <button
              type="button"
              aria-label="Save product"
              className="grid size-12 shrink-0 place-items-center rounded-full border border-black/10 bg-[#f4efe7] text-xl"
            >
              ♡
            </button>
          </div>

          <p className="mt-5 text-base leading-8 text-black/60">
            {product.description}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["MOQ", product.minOrder],
              ["Lead Time", product.leadTime],
              ["Origin", product.origin],
              ["Packaging", product.packaging],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-[#f4efe7] p-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/35">
                  {label}
                </p>
                <p className="mt-2 text-sm font-black text-black">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-7">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-black/40">
              Available Options
            </p>

            <div className="flex flex-wrap gap-2">
              {product.availableOptions.slice(0, 5).map((option) => (
                <span
                  key={option}
                  className="rounded-full border border-black/10 bg-[#f4efe7] px-4 py-2 text-xs font-bold text-black/65"
                >
                  {option}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <AddToEnquiryButton product={product} fullWidth />

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-black/15 px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white"
            >
              Request Quote
            </Link>
          </div>
        </aside>
      </section>

      {/* SPECIFICATION */}
      <section className="mx-auto max-w-[1500px] px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-black/45">
              Product Details
            </p>

            <h2 className="text-6xl uppercase leading-[0.88] tracking-[-0.06em] sm:text-7xl">
              Specification overview.
            </h2>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-black/10 bg-white">
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

      {/* APPLICATIONS */}
      <section className="bg-black px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-white/45">
                Suitable For
              </p>

              <h2 className="text-6xl uppercase leading-[0.88] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
                Buyer applications.
              </h2>
            </div>

            <p className="max-w-2xl text-lg leading-8 text-white/60 lg:ml-auto">
              This product is suitable for different buyer types depending on
              quantity, market, packaging and final use.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {product.applications.map((application) => (
              <div
                key={application}
                className="rounded-[24px] border border-white/10 p-6 transition hover:bg-white hover:text-black"
              >
                <h3 className="text-3xl uppercase tracking-[-0.05em]">
                  {application}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 ? (
        <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-black/45">
                  Related Products
                </p>

                <h2 className="text-6xl uppercase leading-[0.88] tracking-[-0.06em] sm:text-7xl">
                  More in {category.title}.
                </h2>
              </div>

              <Link
                href={`/products/${category.slug}`}
                className="rounded-full bg-black px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#6b3f24]"
              >
                View All
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {relatedProducts.slice(0, 3).map((related) => (
                <CatalogProductCard key={related.slug} product={related} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}