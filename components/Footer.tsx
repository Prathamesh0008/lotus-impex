import Link from "next/link";
import { exportCategories, navLinks, siteConfig } from "@/data/site";

const visibleCategories = exportCategories.filter(
  (category) => category.slug !== "footwear"
);

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid items-start gap-11 sm:gap-12 md:grid-cols-2 xl:grid-cols-[minmax(360px,1.25fr)_minmax(180px,0.75fr)_minmax(240px,1fr)_minmax(300px,1fr)] xl:gap-14">
          <div className="flex min-w-0 flex-col items-start text-left">
            <Link
              href="/"
              className="block w-full max-w-[300px] sm:max-w-[360px]"
              aria-label="Lotus Impex home"
            >
              <img
                src="/Lotus_Final_Logo1.png"
                alt="Lotus Impex Global Exporters"
                className="h-auto w-full object-contain brightness-125 contrast-125"
              />
            </Link>

            <p className="mt-6 max-w-md text-base leading-7 text-white/65 sm:mt-7 sm:text-sm sm:text-white/55">
              {siteConfig.description}
            </p>

            <div className="mt-8 grid gap-3 text-base text-white/75 sm:gap-2 sm:text-sm sm:text-white/65">
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
              <a href={`tel:${siteConfig.phone}`} className="hover:text-white">
                {siteConfig.phone}
              </a>
              <p>{siteConfig.location}</p>
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="text-xs font-black uppercase tracking-[0.32em] text-white/35">
              Navigation
            </h3>

            <div className="mt-7 grid gap-5 sm:gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-base font-bold text-white/70 transition hover:text-white sm:text-sm sm:text-white/60"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/privacy"
                className="text-base font-bold text-white/70 transition hover:text-white sm:text-sm sm:text-white/60"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-condition"
                className="text-base font-bold text-white/70 transition hover:text-white sm:text-sm sm:text-white/60"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="text-xs font-black uppercase tracking-[0.32em] text-white/35">
              Product Categories
            </h3>

            <div className="mt-7 grid gap-5 sm:gap-4">
              {visibleCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/products/${category.slug}`}
                  className="text-base font-bold text-white/70 transition hover:text-white sm:text-sm sm:text-white/60"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="text-xs font-black uppercase tracking-[0.32em] text-white/45">
              Quick Actions
            </h3>

            <div className="mt-7 grid gap-4">
              <Link
                href="/products"
                className="inline-flex min-h-11 w-full max-w-[220px] items-center justify-center rounded-md border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-black sm:w-fit"
              >
                View Catalogue
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-11 w-full max-w-[220px] items-center justify-center rounded-md bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-black transition hover:bg-[#c9a16b] sm:w-fit"
              >
                Request Quote
              </Link>
              <div className="grid max-w-[260px] grid-cols-2 gap-3">
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

        <div className="mt-12 border-t border-white/10 pt-6 text-xs font-bold uppercase leading-6 tracking-[0.18em] text-white/35 sm:mt-14">
          © {new Date().getFullYear()} Lotus Impex. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
