"use client";

import Image from "next/image";
import { useState } from "react";

type ProductImageGalleryProps = {
  image: string;
  imageAlt: string;
  categoryImage: string;
  categorySlug: string;
  type: string;
};

const fallbackImages: Record<string, string> = {
  "ladies-garments": "/content-women-shopping-mall.jpg",
  "mens-garments": "/fast-fashion.jpg",
  fabrics: "/product_category.jpg",
  accessories: "/online-marketing.jpg",
  machinery: "/product_category.jpg",
  "general-goods": "/e-commerce.jpg",
};

function SafeImage({
  src,
  fallback,
  alt,
  sizes,
  priority = false,
  className = "object-cover",
}: {
  src: string;
  fallback: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const [imageSrc, setImageSrc] = useState(src || fallback);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      onError={() => setImageSrc(fallback)}
      className={className}
    />
  );
}

export default function ProductImageGallery({
  image,
  imageAlt,
  categoryImage,
  categorySlug,
  type,
}: ProductImageGalleryProps) {
  const fallback = fallbackImages[categorySlug] || "/product_category.jpg";
  const images = [image, categoryImage, fallback];

  return (
    <>
      <div className="hidden gap-3 lg:grid">
        {images.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="relative h-24 overflow-hidden rounded-2xl border border-black/10 bg-white"
          >
            <SafeImage
              src={item}
              fallback={fallback}
              alt={imageAlt}
              sizes="90px"
            />
          </div>
        ))}
      </div>

      <div className="relative min-h-[620px] overflow-hidden rounded-[32px] bg-black">
        <SafeImage
          src={image}
          fallback={fallback}
          alt={imageAlt}
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover opacity-95"
        />

        <div className="absolute left-6 top-6 rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-black">
          {type}
        </div>
      </div>
    </>
  );
}
