"use client";

import Image from "next/image";
import { useRef, useState } from "react";

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
}: ProductImageGalleryProps) {
  const mobileScrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
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
              className="relative h-[min(128vw,620px)] w-full shrink-0 snap-start overflow-hidden bg-[#f5f5f6]"
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

        {images.length > 1 ? (
          <>
            <div className="mt-3 flex justify-center gap-1.5">
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
      </div>

      <div className="hidden gap-3 sm:grid sm:grid-cols-2">
        {images.slice(0, 4).map((item, index) => (
          <div
            key={`${item.src}-${index}`}
            className="group relative min-h-[360px] overflow-hidden bg-[#f5f5f6] sm:min-h-[520px]"
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
