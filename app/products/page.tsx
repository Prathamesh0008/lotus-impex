import type { Metadata } from "next";
import ProductCategoryClient from "@/components/ProductCategoryClient";
import { exportCategories, siteConfig } from "@/data/site";
import { exportProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Lotus Fashion Store",
  description:
    "Explore all Lotus Impex products with Myntra-style filters for garments, fabrics, accessories, machinery and general goods.",
  alternates: {
    canonical: "/products",
  },
};

const storeCategory = {
  slug: "products",
  title: "Lotus Fashion Store",
  shortTitle: "Store",
  eyebrow: "Fashion store",
  summary: "Complete Lotus Impex export catalogue.",
  description: siteConfig.description,
  image: "/product_category.jpg",
  imageAlt: "Lotus Impex product catalogue",
  items: Array.from(new Set(exportProducts.map((product) => product.type))),
  highlights: ["All products", "All categories", "Export ready"],
  markets: ["Importers", "Wholesalers", "Retailers", "Trading companies"],
  gradient: "from-black to-neutral-800",
};

export default function ProductsPage() {
  return (
    <ProductCategoryClient
      category={storeCategory}
      products={exportProducts}
      allProducts={exportProducts}
      allCategories={exportCategories}
      storeMode
    />
  );
}
