"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideNavbarFooter = pathname === "/sign-in" || pathname === "/sign-up";

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <div className={hideNavbarFooter ? "" : "pt-20 lg:pt-24"}>{children}</div>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}
