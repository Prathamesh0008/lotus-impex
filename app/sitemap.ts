import type { MetadataRoute } from "next";
import { exportCategories, siteConfig } from "@/data/site";
import { exportProducts } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes = [
    "",
    "/products",
    "/company",
    "/contact",
    "/privacy",
    "/enquiry-basket",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const categoryRoutes = exportCategories.map((category) => ({
    url: `${baseUrl}/products/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const productRoutes = exportProducts.map((product) => ({
    url: `${baseUrl}/products/${product.categorySlug}/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}