import type { Metadata } from "next";
import WishlistPageClient from "@/components/WishlistPageClient";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "View saved Lotus Impex products.",
  alternates: {
    canonical: "/wishlist",
  },
};

export default function WishlistPage() {
  return <WishlistPageClient />;
}
