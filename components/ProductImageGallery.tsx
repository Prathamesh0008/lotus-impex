"use client";

import Image from "next/image";
import { useState } from "react";

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
        className="object-cover object-top"
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
  const fallback = fallbackImages[categorySlug] || "/product_category.jpg";
  const images =
    galleryImages.length > 0
      ? galleryImages
      : [{ src: image, alt: imageAlt, caption: type }];

  return (
    <div className="w-full min-w-0">
      <div className="sm:hidden">
        <div className="relative h-[min(120vw,560px)] overflow-hidden bg-[#f5f5f6]">
          <SafeImage
            src={images[0].src}
            fallback={fallback}
            alt={images[0].alt}
            priority
            fill
          />
          {images[0].caption ? (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5">
              <p className="max-w-xs text-xl font-black uppercase leading-tight tracking-[0.02em] text-white">
                {images[0].caption}
              </p>
            </div>
          ) : null}
        </div>

        {images.length > 1 ? (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {images.slice(0, 4).map((item, index) => (
              <div
                key={`${item.src}-thumb-${index}`}
                className="relative size-16 shrink-0 overflow-hidden rounded-xl border border-black/10 bg-[#f5f5f6]"
              >
                <SafeImage
                  src={item.src}
                  fallback={fallback}
                  alt={item.alt}
                  fill
                />
              </div>
            ))}
          </div>
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
            {item.caption ? (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5">
                <p className="max-w-xs text-xl font-black uppercase leading-tight tracking-[0.02em] text-white">
                  {item.caption}
                </p>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
