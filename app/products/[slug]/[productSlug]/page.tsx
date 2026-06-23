import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CatalogProductCard from "@/components/CatalogProductCard";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductPurchasePanel from "@/components/ProductPurchasePanel";
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

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
const visibleCategories = exportCategories.filter(
  (category) => category.slug !== "footwear"
);
const visibleProducts = exportProducts.filter(
  (product) => product.categorySlug !== "footwear"
);

function getProductInventory(productSlug: string) {
  const score = productSlug
    .split("")
    .reduce((total, char) => total + char.charCodeAt(0), 0);
  const inStock = score % 7 !== 0;
  const availableSizes = sizeOptions.filter((_, index) => {
    if (!inStock) return false;
    return (score + index) % 4 !== 0;
  });

  return {
    inStock,
    availableSizes: inStock
      ? availableSizes.length > 0
        ? availableSizes
        : ["M", "L"]
      : [],
    lowStock: inStock && score % 5 === 0,
  };
}

export function generateStaticParams() {
  return visibleProducts.map((product) => ({
    slug: product.categorySlug,
    productSlug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, productSlug } = await params;
  if (slug === "footwear") {
    return {
      title: "Product Not Found",
    };
  }

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
  const category = visibleCategories.find((item) => item.slug === slug);
  const product = getProductBySlugs(slug, productSlug);

  if (!category || !product || product.categorySlug === "footwear") {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.categorySlug).filter(
    (item) => item.slug !== product.slug
  );
  const inventory = getProductInventory(product.slug);
  const galleryImages = [
    {
      src: product.image,
      alt: product.imageAlt,
    },
    {
      src: relatedProducts[0]?.image || category.image,
      alt: relatedProducts[0]?.imageAlt || category.imageAlt,
      caption: "Breathes Easy Feels Light",
    },
    {
      src: relatedProducts[1]?.image || product.image,
      alt: relatedProducts[1]?.imageAlt || product.imageAlt,
    },
    {
      src: relatedProducts[2]?.image || category.image,
      alt: relatedProducts[2]?.imageAlt || category.imageAlt,
      caption: `${product.type} Range`,
    },
  ];

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
    <main className="bg-white pt-16 text-[#111827] sm:pt-20 lg:pt-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      <section className="hidden border-b border-black/10 bg-white lg:block">
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

      <section className="mx-auto grid max-w-[1800px] gap-5 px-0 py-0 sm:px-0 lg:grid-cols-[1.25fr_0.75fr] lg:gap-8 lg:px-10 lg:py-10">
        <ProductImageGallery
          image={product.image}
          imageAlt={product.imageAlt}
          categoryImage={category.image}
          categorySlug={product.categorySlug}
          type={product.type}
          galleryImages={galleryImages}
        />

        <aside className="h-fit bg-white px-4 py-5 lg:sticky lg:top-28 lg:p-2">
          <div className="border-b border-black/10 pb-5">
            <div>
              <h1 className="text-2xl font-normal leading-tight text-[#535766]">
                {product.name}
              </h1>
              <p className="hidden">{product.name}</p>
            </div>

            <Link
              href="#product-actions"
              aria-label="Add product to wishlist"
              className="mt-5 flex min-h-12 w-full items-center justify-center gap-3 border border-[#d4d5d9] bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.04em] text-transparent transition hover:border-[#282c3f]"
            >
              <span className="text-3xl font-normal leading-none text-[#282c3f]">
                ♡
              </span>
              <span className="text-[#282c3f]">Wishlist</span>
              ♡
            </Link>
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

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.12em] ${
                inventory.inStock
                  ? "bg-[#e7f8ef] text-[#03a685]"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {inventory.inStock ? "In Stock" : "Out of Stock"}
            </span>
            {inventory.lowStock ? (
              <span className="rounded-full bg-[#fff4e8] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#ff905a]">
                Low Stock
              </span>
            ) : null}
            <span className="text-sm font-bold text-black/55">
              MOQ: {product.minOrder}
            </span>
          </div>

          <div className="mt-7">
            <p className="text-base font-black uppercase text-[#282c3f]">
              More Colors
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {[
                product.image,
                category.image,
                ...relatedProducts.slice(0, 8).map((item) => item.image),
              ].map((image, index) => {
                const linkedProduct = index <= 1 ? null : relatedProducts[index - 2];

                return (
                  <Link
                    key={`${image}-${index}`}
                    href={
                      linkedProduct
                        ? `/products/${linkedProduct.categorySlug}/${linkedProduct.slug}`
                        : "#product-actions"
                    }
                    className="relative size-16 overflow-hidden border border-black/10 bg-[#f5f5f6]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt=""
                      className="h-full w-full object-contain object-center p-1"
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          <div id="product-actions">
            <ProductPurchasePanel
              product={product}
              inStock={inventory.inStock}
              availableSizes={inventory.availableSizes}
              allSizes={sizeOptions}
            />
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

      {relatedProducts.length > 0 ? (
        <section className="border-t border-black/10 px-3 py-12 sm:px-6 lg:px-10 lg:py-16">
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

            <div className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 lg:gap-x-7 lg:gap-y-10 xl:grid-cols-5">
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

