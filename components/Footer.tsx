import Link from "next/link";
import Logo from "@/components/Logo";
import { exportCategories, navLinks, siteConfig } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.7fr_1fr_1fr]">
          <div>
            <Logo dark={false} />

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
            <h3 className="text-xs font-black uppercase tracking-[0.24em] text-white/35">
              Navigation
            </h3>

            <div className="mt-6 grid gap-4">
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
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.24em] text-white/35">
              Product Categories
            </h3>

            <div className="mt-6 grid gap-4">
              {exportCategories.map((category) => (
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
            <h3 className="text-xs font-black uppercase tracking-[0.24em] text-white/35">
              Quick Actions
            </h3>

            <div className="mt-6 grid gap-3">
              <Link
                href="/products"
                className="border border-white/10 px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black"
              >
                View Catalogue
              </Link>

              <Link
                href="/contact"
                className="bg-white px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-[#c9a16b]"
              >
                Request Quote
              </Link>
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