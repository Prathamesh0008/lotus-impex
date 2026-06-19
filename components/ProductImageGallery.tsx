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
  priority = false,
}: {
  src: string;
  fallback: string;
  alt: string;
  priority?: boolean;
}) {
  const [imageSrc, setImageSrc] = useState(src || fallback);

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
}: ProductImageGalleryProps) {
  const fallback = fallbackImages[categorySlug] || "/product_category.jpg";

  return (
    <div className="mx-auto flex w-full max-w-[560px] items-center justify-center">
      <SafeImage src={image} fallback={fallback} alt={imageAlt} priority />
    </div>
  );
}
