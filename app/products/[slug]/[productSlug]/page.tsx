import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CatalogProductCard from "@/components/CatalogProductCard";
import ProductImageGallery from "@/components/ProductImageGallery";
import ProductPurchasePanel from "@/components/ProductPurchasePanel";
import WishlistLoginButton from "@/components/WishlistLoginButton";
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
  const clothingLabel =
    product.categorySlug === "mens-garments"
      ? "Men Clothing"
      : product.categorySlug === "ladies-garments"
        ? "Women Clothing"
        : category.title;
  const productTypeHref = `/products/${category.slug}?type=${encodeURIComponent(
    product.type
  )}`;
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
  const colorImages = [
    product.image,
    category.image,
    ...relatedProducts.slice(0, 8).map((item) => item.image),
  ];
  const mobileColorImages = colorImages.slice(0, 4);

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
    <main className="bg-white pb-6 pt-20 text-[#111827] sm:pt-20 lg:pb-0 lg:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      <section className="hidden bg-white lg:block">
        <div className="mx-auto max-w-[1800px] px-4 py-4 sm:px-8 lg:px-10 lg:py-5">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap text-[16px] font-medium leading-6 text-[#111827] [scrollbar-width:none] [&_*]:text-[16px] [&_*]:font-medium [&::-webkit-scrollbar]:hidden">
            <Link href="/" className="hover:text-[#c9a16b]">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-[#c9a16b]">
              Clothing
            </Link>
            <span>/</span>
            <Link
              href={`/products/${category.slug}`}
              className="hover:text-[#c9a16b]"
            >
              {clothingLabel}
            </Link>
            <span>/</span>
            <Link href={productTypeHref} className="hover:text-[#c9a16b]">
              {product.type}
            </Link>
            <span>/</span>
            <span className="text-[#111827]">{product.type}</span>
            <span>&gt;</span>
            <Link
              href={`/products/${category.slug}`}
              className="text-[#111827] hover:text-[#c9a16b]"
            >
              More Products
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1800px] gap-5 px-0 py-0 sm:px-0 lg:grid-cols-[minmax(0,1.16fr)_minmax(420px,0.84fr)] lg:gap-9 lg:px-10 lg:pb-10">
        <ProductImageGallery
          image={product.image}
          imageAlt={product.imageAlt}
          categoryImage={category.image}
          categorySlug={product.categorySlug}
          type={product.type}
          galleryImages={galleryImages}
          similarProducts={relatedProducts.slice(0, 8)}
        />

        <aside className="h-fit min-w-0 max-w-full overflow-hidden bg-white px-5 py-2 lg:sticky lg:top-28 lg:p-0">
          <div className="hidden">
            <div>
              <h1 className="text-2xl font-normal leading-tight text-[#535766]">
                {product.name}
              </h1>
              <p className="hidden">{product.name}</p>
            </div>

            <Link
              href="#product-actions"
              aria-label="Add product to wishlist"
              className="hidden"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-7 text-[#282c3f]"
              >
                <path
                  d="M12 20.25S4.75 16.2 3.05 10.9C1.9 7.35 4.2 4.5 7.45 4.5c1.85 0 3.35 1 4.55 2.45C13.2 5.5 14.7 4.5 16.55 4.5c3.25 0 5.55 2.85 4.4 6.4C19.25 16.2 12 20.25 12 20.25Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
              <span className="hidden">
                ♡
              </span>
              <span className="text-[#282c3f]">Wishlist</span>
              ♡
            </Link>
          </div>

          <h1 className="sr-only">{product.name}</h1>

          <div className="mt-0 min-w-0 border-b border-black/10 pb-4 lg:pb-5">
            <div className="flex items-start justify-between gap-4 lg:block">
              <div className="pt-1 text-xl font-semibold normal-case leading-[1.25] text-[#282c3f] lg:pt-0 lg:text-3xl lg:font-semibold lg:normal-case lg:leading-tight">
                <span className="lg:hidden">{product.name}</span>
                <span className="hidden lg:inline">{product.name}</span>
              </div>
              {product.shortName && product.shortName !== product.name ? (
                <div className="mt-2 hidden text-[28px] font-normal leading-snug text-[#7e818c] lg:block">
                  {product.shortName}
                </div>
              ) : null}
              <div className="lg:hidden">
                <WishlistLoginButton />
              </div>
            </div>
            <div className="mt-5 hidden items-center border border-black/10 px-3 py-1.5 text-base font-black text-[#282c3f] lg:inline-flex">
              4.3 <span className="mx-1 text-[#14958f]">★</span>
              <span className="border-l border-black/15 pl-2 font-normal text-[#535766]">
                5.3k Ratings
              </span>
            </div>
          </div>

          <div className="hidden">
          <div className="inline-flex border border-black/10 px-3 py-2 text-sm font-black text-[#282c3f]">
            4.3 <span className="mx-1 text-[#14958f]">★</span>
            <span className="border-l border-black/15 pl-2 font-normal text-black/55">
              5.3k Ratings
            </span>
          </div>
          </div>

          <div className="mt-2 min-w-0 lg:mt-5">
            <p className="text-lg font-black text-[#282c3f] min-[380px]:text-xl lg:text-3xl">
              ₹667{" "}
              <span className="text-lg font-normal text-[#7e818c] line-through lg:text-xl">
                MRP ₹1699
              </span>{" "}
              <span className="text-lg font-black text-[#D4AF36] min-[380px]:text-xl">
                (61% OFF)
              </span>
            </p>
            <p className="mt-2 hidden text-sm font-black text-[#03a685] lg:block">
              inclusive of all taxes
            </p>
          </div>

          <div className="mt-5 max-w-full overflow-hidden rounded-[16px] border border-[#d4d5d9] bg-white lg:hidden">
            <div className="flex min-w-0 items-center gap-3 px-3 py-3">
              <div className="grid size-12 shrink-0 place-items-center rounded-full bg-[#D4AF36] text-center text-[10px] font-black uppercase leading-[0.85] text-black">
                <span>
                  Mega
                  <br />
                  Deal
                </span>
              </div>
              <p className="min-w-0 flex-1 truncate text-base font-black text-[#282c3f] min-[380px]:text-lg">
                Get at <span className="underline decoration-[#D4AF36] decoration-2 underline-offset-4">₹257</span>
              </p>
              <span className="max-w-[116px] shrink-0 truncate rounded-[8px] bg-[#2dbb7f] px-2.5 py-2 text-xs font-black text-white min-[380px]:max-w-[136px] min-[380px]:px-3 min-[380px]:text-sm">
                Extra ₹139 Off
              </span>
            </div>
            <div className="flex min-w-0 items-center justify-between gap-3 border-t border-black/10 px-4 py-3 text-sm text-[#535766] [&>span:first-child]:min-w-0 [&>span:first-child]:truncate">
              <span>With Coupon + 🏦 Bank Offer</span>
              <span className="shrink-0 font-black text-[#D4AF36]">Details &gt;</span>
            </div>
          </div>

          <div className="mt-5 min-w-0 lg:mt-7">
            <p className="text-xl font-black text-[#282c3f] lg:text-base lg:uppercase">
              <span className="lg:hidden">
                Colour <span className="font-normal">Green</span>
              </span>
              <span className="hidden lg:inline">More Colors</span>
            </p>
            <div className="-mx-5 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {mobileColorImages.map((image, index) => (
                <Link
                  key={`${image}-${index}`}
                  href="#product-actions"
                  className={`relative size-[72px] shrink-0 snap-start overflow-hidden rounded-[14px] bg-[#f5f5f6] ${
                    index === 0 ? "ring-1 ring-[#D4AF36]" : ""
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </Link>
              ))}
            </div>
            <div className="mt-4 hidden flex-wrap gap-3 lg:flex">
              {colorImages.map((image, index) => {
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

