import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCategoryClient from "@/components/ProductCategoryClient";
import { exportCategories, siteConfig } from "@/data/site";
import { exportProducts, getProductsByCategory } from "@/data/products";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return exportCategories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = exportCategories.find((item) => item.slug === slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.title} Export Products`,
    description: category.summary,
    alternates: {
      canonical: `/products/${category.slug}`,
    },
    openGraph: {
      title: `${category.title} Export Products | Lotus Impex`,
      description: category.summary,
      url: `${siteConfig.url}/products/${category.slug}`,
      images: [
        {
          url: category.image,
          width: 1200,
          height: 630,
          alt: category.imageAlt,
        },
      ],
    },
  };
}

export default async function ProductCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = exportCategories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.slug);

  const categoryJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.title} Export Products`,
    description: category.summary,
    url: `${siteConfig.url}/products/${category.slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteConfig.url}/products/${category.slug}/${product.slug}`,
        name: product.name,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(categoryJsonLd),
        }}
      />

      <ProductCategoryClient
        category={category}
        products={products}
        allProducts={exportProducts}
      />
    </>
  );
}
