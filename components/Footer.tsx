import Link from "next/link";
import Logo from "@/components/Logo";
import { exportCategories, navLinks, siteConfig } from "@/data/site";

const visibleCategories = exportCategories.filter(
  (category) => category.slug !== "footwear"
);

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid items-start gap-10 md:grid-cols-2 xl:grid-cols-[minmax(360px,1.25fr)_minmax(180px,0.75fr)_minmax(240px,1fr)_minmax(300px,1fr)] xl:gap-14">
          <div className="flex min-w-0 flex-col items-start">
            <Logo size="footer" />

            <p className="mt-7 max-w-md text-sm leading-7 text-white/55">
              {siteConfig.description}
            </p>

            <div className="mt-8 grid gap-2 text-sm text-white/65">
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
              <a href={`tel:${siteConfig.phone}`} className="hover:text-white">
                {siteConfig.phone}
              </a>
              <p>{siteConfig.location}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.28em] text-white/35">
              Navigation
            </h3>

            <div className="mt-7 grid gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-bold text-white/60 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/privacy"
                className="text-sm font-bold text-white/60 transition hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-condition"
                className="text-sm font-bold text-white/60 transition hover:text-white"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.28em] text-white/35">
              Product Categories
            </h3>

            <div className="mt-7 grid gap-4">
              {visibleCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/products/${category.slug}`}
                  className="text-sm font-bold text-white/60 transition hover:text-white"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.28em] text-white/35">
              Quick Actions
            </h3>

            <div className="mt-7 grid gap-4">
              <Link
                href="/products"
                className="inline-flex min-h-[68px] items-center border border-white/10 px-7 py-5 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black"
              >
                View Catalogue
              </Link>

              <Link
                href="/contact"
                className="inline-flex min-h-[68px] items-center bg-white px-7 py-5 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-[#c9a16b]"
              >
                Request Quote
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/privacy"
                  className="inline-flex min-h-12 items-center justify-center border border-white/10 px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-white/70 transition hover:bg-white hover:text-black"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms-condition"
                  className="inline-flex min-h-12 items-center justify-center border border-white/10 px-4 py-3 text-[10px] font-black uppercase tracking-[0.14em] text-white/70 transition hover:bg-white hover:text-black"
                >
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-xs font-bold uppercase tracking-[0.18em] text-white/35">
          © {new Date().getFullYear()} Lotus Impex. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
