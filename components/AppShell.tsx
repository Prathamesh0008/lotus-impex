"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideNavbarFooter = pathname === "/sign-in" || pathname === "/sign-up";
  const hideFooter = hideNavbarFooter || pathname === "/checkout";

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <div>{children}</div>
      {!hideFooter && <Footer />}
    </>
  );
}
