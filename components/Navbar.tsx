"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { exportCategories, navLinks } from "@/data/site";

const CART_STORAGE_KEY = "lotus_impex_enquiry_basket";
const CART_UPDATED_EVENT = "lotus-impex-cart-updated";
const USER_STORAGE_KEY = "lotus_impex_user";
const USER_UPDATED_EVENT = "lotus-impex-user-updated";

type SignedInUser = {
  name: string;
  email: string;
};

function getCartCount() {
  if (typeof window === "undefined") return 0;

  const raw = window.localStorage.getItem(CART_STORAGE_KEY);
  if (!raw) return 0;

  try {
    const items = JSON.parse(raw) as { quantity?: number }[];
    return items.reduce((total, item) => total + (item.quantity ?? 1), 0);
  } catch {
    return 0;
  }
}

function getSignedInUser() {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(USER_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as SignedInUser;
  } catch {
    window.localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
}

function CartIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.2"
    >
      <path d="M5 6h16l-2 8H7L5 3H3" />
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.2"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.6-4.2 4.2-6 8-6s6.4 1.8 8 6" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState<SignedInUser | null>(null);

  useEffect(() => {
    function updateCartCount() {
      setCartCount(getCartCount());
    }

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener(CART_UPDATED_EVENT, updateCartCount);
    window.addEventListener("focus", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener(CART_UPDATED_EVENT, updateCartCount);
      window.removeEventListener("focus", updateCartCount);
    };
  }, []);

  useEffect(() => {
    function updateUser() {
      setUser(getSignedInUser());
    }

    updateUser();
    window.addEventListener("storage", updateUser);
    window.addEventListener(USER_UPDATED_EVENT, updateUser);
    window.addEventListener("focus", updateUser);

    return () => {
      window.removeEventListener("storage", updateUser);
      window.removeEventListener(USER_UPDATED_EVENT, updateUser);
      window.removeEventListener("focus", updateUser);
    };
  }, []);

  const iconLinks = [
    {
      href: "/enquiry-basket",
      label: "Cart",
      icon: <CartIcon />,
      count: cartCount,
    },
    {
      href: "/sign-in",
      label: user ? user.name : "Sign in",
      icon: <UserIcon />,
      count: 0,
    },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 text-white backdrop-blur-2xl">
      <nav className="mx-auto grid h-20 max-w-[1500px] grid-cols-[1fr_auto] items-center px-5 sm:px-8 lg:h-24 lg:grid-cols-[minmax(360px,1fr)_auto_minmax(420px,1fr)] lg:px-10">
        <div className="flex min-w-0 items-center justify-start">
          <Logo />
        </div>

        <div className="hidden items-center justify-center gap-9 lg:flex">
          {navLinks.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            if (link.href === "/products") {
              return (
           <div key={link.href} className="group relative py-8">
                  <Link
                    href="/products"
                    className={`relative text-sm font-black uppercase tracking-[0.14em] transition ${
                      active ? "text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    Products
                    {active ? (
                      <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-white" />
                    ) : null}
                  </Link>

<div className="invisible absolute left-1/2 top-full z-50 mt-4 w-[720px] -translate-x-1/2 border border-white/10 bg-black p-4 opacity-0 shadow-2xl shadow-black/30 transition-all duration-200 group-hover:visible group-hover:opacity-100">                    <div className="grid grid-cols-2 gap-3">
                      {exportCategories.map((category) => (
                        <Link
                          key={category.slug}
                          href={`/products/${category.slug}`}
                          className="group/item border border-white/10 bg-neutral-950 p-5 text-white transition hover:bg-white hover:text-black"
                        >
                          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/45 transition group-hover/item:text-black/45">
                            {category.eyebrow}
                          </p>

                          <h3 className="mt-2 text-xl font-black uppercase tracking-[-0.05em]">
                            {category.title}
                          </h3>

                          <p className="mt-3 line-clamp-2 text-xs leading-6 text-white/55 transition group-hover/item:text-black/60">
                            {category.summary}
                          </p>
                        </Link>
                      ))}
                    </div>

                    <Link
                      href="/products"
                      className="mt-3 flex items-center justify-between bg-white px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-[#c9a16b]"
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
                  active ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
                {active ? (
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-white" />
                ) : null}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center justify-end gap-3 lg:flex">
          {iconLinks.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                title={item.label}
                className={`relative inline-flex h-12 items-center justify-center gap-2 rounded-full border text-lg transition ${
                  active
                    ? "border-white bg-white text-black"
                    : "border-white/20 bg-black text-white hover:bg-white hover:text-black"
                } ${user && item.href === "/sign-in" ? "px-4" : "w-12"}`}
              >
                {item.icon}

                {user && item.href === "/sign-in" ? (
                  <span className="max-w-28 truncate text-xs font-black uppercase tracking-[0.12em]">
                    {user.name}
                  </span>
                ) : null}

                {item.count > 0 ? (
                  <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-[#c9a16b] px-1.5 py-0.5 text-[10px] font-black leading-none text-black ring-2 ring-black">
                    {item.count > 99 ? "99+" : item.count}
                  </span>
                ) : null}
              </Link>
            );
          })}

          <Link
            href="/contact"
            className="rounded-full bg-white px-7 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-black transition hover:bg-[#c9a16b]"
          >
            Enquire
          </Link>
        </div>

        <button
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="col-start-2 grid size-11 place-items-center justify-self-end rounded-full border border-white/20 bg-transparent text-white lg:hidden"
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
        <div className="border-t border-white/10 bg-black px-5 py-5 lg:hidden">
          <div className="mx-auto grid max-w-[1500px] gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-4 text-sm font-black uppercase tracking-[0.14em] text-white hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}

            <div className="grid grid-cols-2 gap-2">
              {iconLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="relative flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-neutral-950 px-4 py-4 text-sm font-black uppercase tracking-[0.14em] text-white"
                >
                  {item.icon}
                  {item.label}

                  {item.count > 0 ? (
                    <span className="grid min-w-5 place-items-center rounded-full bg-[#c9a16b] px-1.5 py-0.5 text-[10px] font-black leading-none text-black">
                      {item.count > 99 ? "99+" : item.count}
                    </span>
                  ) : null}
                </Link>
              ))}
            </div>

            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="mb-2 px-4 text-xs font-black uppercase tracking-[0.24em] text-white/40">
                Categories
              </p>

              {exportCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/products/${category.slug}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm font-bold text-white/70 hover:bg-white/10 hover:text-white"
                >
                  {category.title}
                </Link>
              ))}
            </div>

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-2xl bg-white px-4 py-4 text-center text-sm font-black uppercase tracking-[0.14em] text-black"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}