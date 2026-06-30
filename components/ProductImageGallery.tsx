"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import AddToEnquiryButton from "@/components/AddToEnquiryButton";
import type { ExportProduct } from "@/data/products";

type ProductImageGalleryProps = {
  image: string;
  imageAlt: string;
  categoryImage: string;
  categorySlug: string;
  type: string;
  galleryImages?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  similarProducts?: Pick<
    ExportProduct,
    "slug" | "categorySlug" | "name" | "shortName" | "image" | "imageAlt" | "summary" | "minOrder"
  >[];
};

const fallbackImages: Record<string, string> = {
  "ladies-garments": "/content-women-shopping-mall.jpg",
  "mens-garments": "/fast-fashion.jpg",
  fabrics: "/product_category.jpg",
  accessories: "/online-marketing.jpg",
  footwear:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
  machinery: "/product_category.jpg",
  "general-goods": "/e-commerce.jpg",
};

function SafeImage({
  src,
  fallback,
  alt,
  priority = false,
  fill = false,
}: {
  src: string;
  fallback: string;
  alt: string;
  priority?: boolean;
  fill?: boolean;
}) {
  const [imageSrc, setImageSrc] = useState(src || fallback);

  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 38vw"
        priority={priority}
        onError={() => setImageSrc(fallback)}
        className="object-contain object-center p-4"
      />
    );
  }

  return (
    <div className="flex w-full items-center justify-center bg-transparent">
      <Image
        src={imageSrc}
        alt={alt}
        width={520}
        height={700}
        priority={priority}
        onError={() => setImageSrc(fallback)}
        className="mx-auto h-auto max-h-[700px] w-full max-w-[520px] object-contain"
      />
    </div>
  );
}

export default function ProductImageGallery({
  image,
  imageAlt,
  categorySlug,
  type,
  galleryImages = [],
  similarProducts = [],
}: ProductImageGalleryProps) {
  const mobileScrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [similarOpen, setSimilarOpen] = useState(false);
  const fallback = fallbackImages[categorySlug] || "/product_category.jpg";
  const images =
    galleryImages.length > 0
      ? galleryImages
      : [{ src: image, alt: imageAlt, caption: type }];

  function scrollToMobileImage(index: number) {
    const scroller = mobileScrollerRef.current;
    const target = scroller?.children[index] as HTMLElement | undefined;

    target?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }

  function handleMobileScroll() {
    const scroller = mobileScrollerRef.current;

    if (!scroller) return;

    const nextIndex = Math.round(scroller.scrollLeft / scroller.clientWidth);
    setActiveIndex(Math.min(Math.max(nextIndex, 0), images.length - 1));
  }

  return (
    <div className="w-full min-w-0">
      <div className="sm:hidden">
        <div
          ref={mobileScrollerRef}
          onScroll={handleMobileScroll}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((item, index) => (
            <div
              key={`${item.src}-mobile-${index}`}
              className="relative h-[min(128vw,620px)] w-full shrink-0 snap-start overflow-hidden rounded-b-[28px] bg-white"
            >
              <SafeImage
                src={item.src}
                fallback={fallback}
                alt={item.alt}
                priority={index === 0}
                fill
              />
              <button
                type="button"
                onClick={() => setSimilarOpen(true)}
                className="absolute bottom-5 left-5 rounded-[10px] bg-white px-3 py-2 text-sm font-black text-[#282c3f] shadow-sm"
              >
                View Similar
              </button>
              <Link
                href="#mobile-ratings-reviews"
                className="absolute bottom-5 right-5 rounded-[10px] bg-white px-3 py-2 text-sm font-black text-[#282c3f] shadow-sm"
              >
                4.3 <span className="text-[#14958f]">★</span>
                <span className="ml-2 border-l border-black/15 pl-2 font-normal">
                  5.3k
                </span>
              </Link>
            </div>
          ))}
        </div>

        {images.length > 1 ? (
          <>
            <div className="mt-2 flex justify-center gap-1.5">
              {images.map((item, index) => (
                <button
                  key={`${item.src}-dot-${index}`}
                  type="button"
                  aria-label={`Show image ${index + 1}`}
                  onClick={() => scrollToMobileImage(index)}
                  className={`size-2 rounded-full transition ${
                    activeIndex === index ? "bg-[#282c3f]" : "bg-[#d4d5d9]"
                  }`}
                />
              ))}
            </div>

          </>
        ) : null}

        {similarOpen ? (
          <div className="fixed inset-0 z-[190] bg-black/40">
            <div className="absolute inset-x-0 bottom-0 max-h-[78vh] overflow-hidden rounded-t-[22px] bg-white shadow-2xl">
              <div className="flex items-center justify-between px-5 py-4">
                <h2 className="text-xl font-black text-[#10182f]">
                  Similar Products
                </h2>
                <button
                  type="button"
                  onClick={() => setSimilarOpen(false)}
                  className="grid size-9 place-items-center text-3xl font-light leading-none text-black"
                  aria-label="Close similar products"
                >
                  x
                </button>
              </div>

              <div className="flex gap-3 overflow-x-auto px-5 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {(similarProducts.length > 0
                  ? similarProducts
                  : []
                ).slice(0, 8).map((product) => (
                  <div
                    key={`${product.categorySlug}-${product.slug}`}
                    className="w-[148px] shrink-0"
                  >
                    <Link
                      href={`/products/${product.categorySlug}/${product.slug}`}
                      onClick={() => setSimilarOpen(false)}
                      className="block"
                    >
                      <div className="relative h-[200px] overflow-hidden rounded-[14px] bg-[#f5f5f6]">
                        <Image
                          src={product.image}
                          alt={product.imageAlt}
                          fill
                          sizes="148px"
                          className="object-cover"
                        />
                        <div className="absolute bottom-2 left-2 rounded bg-white/90 px-2 py-1 text-xs font-black text-[#282c3f]">
                          4.3 <span className="text-[#14958f]">★</span>
                        </div>
                      </div>
                      <p className="mt-2 truncate text-base font-black text-[#282c3f]">
                        {product.shortName || product.name}
                      </p>
                      <p className="truncate text-sm text-[#94969f]">
                        {product.summary}
                      </p>
                      <p className="mt-1 text-sm font-black text-[#282c3f]">
                        $874 <span className="font-normal text-[#94969f] line-through">$1,749</span>{" "}
                        <span className="text-[#D4AF36]">50%...</span>
                      </p>
                    </Link>
                    <div className="mt-3">
                      <AddToEnquiryButton
                        product={product}
                        fullWidth
                        label="Add to Bag"
                      />
                    </div>
                  </div>
                ))}

                {similarProducts.length === 0 ? (
                  <p className="pb-8 text-sm font-semibold text-black/55">
                    Similar products are not available right now.
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="hidden gap-4 sm:grid sm:grid-cols-2">
        {images.slice(0, 4).map((item, index) => (
          <div
            key={`${item.src}-${index}`}
            className="group relative min-h-[360px] overflow-hidden bg-white sm:min-h-[560px]"
          >
            <SafeImage
              src={item.src}
              fallback={fallback}
              alt={item.alt}
              priority={index === 0}
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
}
