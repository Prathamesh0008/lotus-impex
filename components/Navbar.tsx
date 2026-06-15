"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/components/Logo";
import { exportCategories, navLinks } from "@/data/site";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f4efe7]/90 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <Logo />

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            if (link.href === "/products") {
              return (
                <div key={link.href} className="group relative">
                  <Link
                    href="/products"
                    className={`relative text-sm font-black uppercase tracking-[0.14em] transition ${
                      active ? "text-black" : "text-black/50 hover:text-black"
                    }`}
                  >
                    Products
                    {active ? (
                      <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-black" />
                    ) : null}
                  </Link>

                  <div className="invisible absolute left-1/2 top-full z-50 mt-7 w-[720px] -translate-x-1/2 border border-black/10 bg-[#f4efe7] p-4 opacity-0 shadow-2xl shadow-black/15 transition group-hover:visible group-hover:opacity-100">
                    <div className="grid grid-cols-2 gap-3">
                      {exportCategories.map((category) => (
                        <Link
                          key={category.slug}
                          href={`/products/${category.slug}`}
                          className="group/item border border-black/10 bg-[#ebe3d7] p-5 transition hover:bg-black hover:text-white"
                        >
                          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-black/45 transition group-hover/item:text-white/45">
                            {category.eyebrow}
                          </p>

                          <h3 className="mt-2 text-xl font-black uppercase tracking-[-0.05em]">
                            {category.title}
                          </h3>

                          <p className="mt-3 line-clamp-2 text-xs leading-6 text-black/55 transition group-hover/item:text-white/60">
                            {category.summary}
                          </p>
                        </Link>
                      ))}
                    </div>

                    <Link
                      href="/products"
                      className="mt-3 flex items-center justify-between bg-black px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#6b3f24]"
                    >
                      View Complete Catalogue
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-black uppercase tracking-[0.14em] transition ${
                  active ? "text-black" : "text-black/50 hover:text-black"
                }`}
              >
                {link.label}
                {active ? (
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-black" />
                ) : null}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/products"
            className="rounded-full border border-black/15 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-black transition hover:bg-black hover:text-white"
          >
            Catalogue
          </Link>

          <Link
            href="/contact"
            className="rounded-full bg-black px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#6b3f24]"
          >
            Enquire
          </Link>
        </div>

        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="grid size-11 place-items-center rounded-full border border-black/15 bg-transparent text-black lg:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-2 h-0.5 w-5 rounded-full bg-current transition ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-4 h-0.5 w-5 rounded-full bg-current transition ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {open ? (
        <div className="border-t border-black/10 bg-[#f4efe7] px-5 py-5 lg:hidden">
          <div className="mx-auto grid max-w-[1500px] gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-4 text-sm font-black uppercase tracking-[0.14em] text-black hover:bg-white"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-4 border-t border-black/10 pt-4">
              <p className="mb-2 px-4 text-xs font-black uppercase tracking-[0.24em] text-black/40">
                Categories
              </p>

              {exportCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/products/${category.slug}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm font-bold text-black/70 hover:bg-white hover:text-black"
                >
                  {category.title}
                </Link>
              ))}
            </div>

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-2xl bg-black px-4 py-4 text-center text-sm font-black uppercase tracking-[0.14em] text-white"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}