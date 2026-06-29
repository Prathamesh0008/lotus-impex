"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Logo from "@/components/Logo";
import { exportCategories, navLinks } from "@/data/site";
import { exportProducts } from "@/data/products";

const CART_STORAGE_KEY = "lotus_impex_enquiry_basket";
const CART_UPDATED_EVENT = "lotus-impex-cart-updated";
const USER_STORAGE_KEY = "lotus_impex_user";
const USER_UPDATED_EVENT = "lotus-impex-user-updated";
const visibleCategories = exportCategories.filter(
  (category) => category.slug !== "footwear"
);

const productMegaMenu = [
  {
    heading: "Men",
    groups: [
      {
        label: "Topwear",
        items: ["T-Shirts", "Casual Shirts", "Formal Shirts", "Workwear"],
      },
      {
        label: "Bottomwear",
        items: ["Trousers", "Uniform Styles"],
      },
    ],
    categorySlug: "mens-garments",
  },
  {
    heading: "Women",
    groups: [
      {
        label: "Indian & Fusion Wear",
        items: [
          "Kurtis and Ethnic Wear",
          "Sarees",
          "Dresses and Gowns",
          "Co-ord Sets",
          "Modest Wear",
        ],
      },
      {
        label: "Western Wear",
        items: ["Tops and Shirts", "Seasonal Collections"],
      },
    ],
    categorySlug: "ladies-garments",
  },
  {
    heading: "Textiles",
    groups: [
      {
        label: "Fabric Sourcing",
        items: [
          "Cotton Fabrics",
          "Polyester Blends",
          "Printed Fabrics",
          "Knitted Fabrics",
          "Woven Fabrics",
        ],
      },
    ],
    categorySlug: "fabrics",
  },
  {
    heading: "Accessories",
    groups: [
      {
        label: "Fashion Accessories",
        items: ["Scarves and Stoles", "Belts", "Bags", "Labels and Tags", "Packaging Accessories"],
      },
    ],
    categorySlug: "accessories",
  },
  {
    heading: "Industrial",
    groups: [
      {
        label: "Machinery & Goods",
        items: ["General Machinery", "Textile Machinery", "Machine Parts", "Retail Goods", "Household Goods"],
      },
    ],
    categorySlug: "machinery",
  },
] as const;

function normalizeLabel(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, " ").trim();
}

function listingHref(categorySlug: string, label: string) {
  const normalizedLabel = normalizeLabel(label);
  const product = exportProducts.find((item) => {
    if (item.categorySlug !== categorySlug && categorySlug !== "machinery") {
      return false;
    }

    if (
      categorySlug === "machinery" &&
      item.categorySlug !== "machinery" &&
      item.categorySlug !== "general-goods"
    ) {
      return false;
    }

    const searchable = normalizeLabel(
      `${item.name} ${item.shortName} ${item.type} ${item.availableOptions.join(" ")}`
    );

    return searchable.includes(normalizedLabel) || normalizedLabel.includes(normalizeLabel(item.type));
  });

  const targetCategory = product?.categorySlug ?? categorySlug;
  const targetType = product?.type ?? label;

  return `/products/${targetCategory}?type=${encodeURIComponent(targetType)}`;
}

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

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4 4" />
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

function BackIcon() {
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
      <path d="m15 18-6-6 6-6" />
      <path d="M9 12h12" />
    </svg>
  );
}

function DrawerArrow({ rotated = false }: { rotated?: boolean }) {
  return (
  <span
  aria-hidden="true"
  className="grid size-4 place-items-center text-sm font-normal leading-none text-[#94969f]"
>
  {">"}
</span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const headerRef = useRef<HTMLElement>(null);
  const mobileDrawerRef = useRef<HTMLElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState<SignedInUser | null>(null);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [desktopProductsOpen, setDesktopProductsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isProductDetailPage = /^\/products\/[^/]+\/[^/]+/.test(pathname);
  const showMobileBackButton = pathname !== "/";

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

  useEffect(() => {
    function closeOpenPanels(event: MouseEvent) {
      const target = event.target as Node;
      const clickedHeader = headerRef.current?.contains(target);
      const clickedDrawer = mobileDrawerRef.current?.contains(target);
      const clickedSearch = searchPanelRef.current?.contains(target);

      if (open && !clickedHeader && !clickedDrawer) {
        setOpen(false);
      }

      if (searchOpen && !clickedHeader && !clickedSearch) {
        setSearchOpen(false);
      }
    }

    if (!open && !searchOpen) return;

    document.addEventListener("pointerdown", closeOpenPanels);

    return () => {
      document.removeEventListener("pointerdown", closeOpenPanels);
    };
  }, [open, searchOpen]);

  const iconLinks = [
    {
      href: "/enquiry-basket",
      label: "Cart",
      icon: <CartIcon />,
      count: cartCount,
    },
    {
      href: user ? "/sign-in" : "/sign-up",
      label: user ? user.name : "Sign up",
      icon: <UserIcon />,
      count: 0,
    },
  ];

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchQuery.trim();

    if (!query) {
      router.push("/products");
      setSearchOpen(false);
      return;
    }

    const normalizedQuery = normalizeLabel(query);
    const scoredProducts = exportProducts
      .map((product) => {
        const name = normalizeLabel(product.name);
        const shortName = normalizeLabel(product.shortName);
        const type = normalizeLabel(product.type);
        const searchable = normalizeLabel(
          `${product.name} ${product.shortName} ${product.type} ${product.summary} ${product.availableOptions.join(" ")}`
        );

        let score = 0;
        if (
          name === normalizedQuery ||
          shortName === normalizedQuery ||
          type === normalizedQuery
        ) {
          score = 100;
        } else if (
          name.startsWith(normalizedQuery) ||
          shortName.startsWith(normalizedQuery)
        ) {
          score = 80;
        } else if (name.includes(normalizedQuery) || shortName.includes(normalizedQuery)) {
          score = 60;
        } else if (searchable.includes(normalizedQuery)) {
          score = 30;
        }

        return { product, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);
    const matchedProduct = scoredProducts[0]?.product;

    if (matchedProduct) {
      router.push(
        `/products/${matchedProduct.categorySlug}/${matchedProduct.slug}`
      );
    } else {
      router.push("/products");
    }

    setSearchOpen(false);
  }

  return (
    <>
     <header
  ref={headerRef}
  className="fixed left-0 right-0 top-0 z-[100] border-b border-black/10 bg-white text-black shadow-sm"
>
      <nav className="relative mx-auto grid h-20 max-w-[1500px] grid-cols-[46px_minmax(135px,1fr)_120px] items-center gap-1 px-3 sm:grid-cols-[52px_minmax(190px,1fr)_150px] sm:px-6 xl:h-24 xl:grid-cols-[minmax(300px,0.8fr)_minmax(420px,1fr)_auto] xl:gap-8 xl:px-10">
          <div className="flex items-center xl:hidden">
            {showMobileBackButton ? (
              <button
                type="button"
                aria-label="Go back"
                onClick={() => router.back()}
                className="grid h-10 w-10 place-items-center rounded-full border border-black/20 bg-transparent text-black transition hover:bg-black hover:text-white sm:h-12 sm:w-12 xl:hidden"
              >
                <BackIcon />
              </button>
            ) : (
              <button
                type="button"
                aria-label={open ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={open}
                onClick={() => {
                  setSearchOpen(false);
                  setOpen((value) => !value);
                }}
                className={`grid h-10 w-10 place-items-center rounded-full border bg-transparent transition sm:h-12 sm:w-12 xl:hidden ${
                  isProductDetailPage
                    ? "border-black/20 text-black hover:bg-black hover:text-white"
                    : "border-black/20 text-black hover:bg-black hover:text-white"
                }`}
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
            )}
          </div>
<div className="flex min-w-0 items-center justify-center overflow-hidden xl:justify-start">
 <Link href="/" className="block -translate-x-9 xl:hidden">
  <img
    src="/Artboard_1.png"
    alt="Lotus Impex"
    className="h-13 w-auto sm:h-11"
  />
</Link>

  <div className="hidden xl:block">
    <Logo />
  </div>
</div>

          <div className="hidden min-w-0 items-center justify-center gap-8 xl:flex">
            {navLinks.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              const isProducts = link.href === "/products";

              return isProducts ? (
                <div
                  key={link.href}
                  className="flex h-24 items-center"
                  onMouseEnter={() => setDesktopProductsOpen(true)}
                  onMouseLeave={() => setDesktopProductsOpen(false)}
                >
                  <button
                    type="button"
                    aria-expanded={desktopProductsOpen}
                    onClick={() => setDesktopProductsOpen(true)}
                    className={`text-sm font-semibold uppercase tracking-[0.14em] transition ${
               active ? "text-black" : "text-black/70 hover:text-black"
                    }`}
                  >
                    {link.label}
                  </button>

                  <div
                    className={`absolute left-1/2 top-full w-[min(1260px,calc(100vw-40px))] -translate-x-1/2 pt-1 transition ${
                      desktopProductsOpen
                        ? "pointer-events-auto block opacity-100"
                        : "pointer-events-none hidden opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden border border-black/10 bg-white text-[#282c3f] shadow-2xl shadow-black/25">
                      <div className="grid grid-cols-5">
                        {productMegaMenu.map((section, index) => (
                          <div
                            key={section.heading}
                            className={`min-h-[285px] px-8 py-7 ${
                              index % 2 === 1 ? "bg-[#fafafa]" : "bg-white"
                            }`}
                          >
                            <Link
                              href={`/products/${section.categorySlug}`}
                              onClick={() => {
                                setDesktopProductsOpen(false);
                              }}
                              className="text-sm font-black uppercase tracking-[0.12em] text-[#c49454] transition hover:text-black"
                            >
                              {section.heading}
                            </Link>

                            <div className="mt-5 space-y-5">
                              {section.groups.map((group) => (
                                <div key={group.label}>
                                  <p className="mb-2 text-xs font-black text-[#c49454]">
                                    {group.label}
                                  </p>
                                  <div className="space-y-2.5">
                                    {group.items.map((item) => (
                                      <Link
                                        key={item}
                                        href={listingHref(section.categorySlug, item)}
                                        onClick={() => {
                                          setDesktopProductsOpen(false);
                                        }}
                                        className="block text-sm font-semibold text-[#282c3f] transition hover:text-[#c49454]"
                                      >
                                        {item}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-6 border-t border-black/10">
                        {visibleCategories.map((category) => (
                          <Link
                            key={category.slug}
                            href={`/products/${category.slug}`}
                            onClick={() => {
                              setDesktopProductsOpen(false);
                            }}
                            className="min-h-[82px] border-r border-black/10 bg-[#f8f8f8] px-6 py-4 transition last:border-r-0 hover:bg-white"
                          >
                            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/35">
                              {category.eyebrow}
                            </p>
                            <p className="mt-2 text-base font-semibold text-black">
                              {category.title}
                            </p>
                          </Link>
                        ))}
                      </div>

                      <Link
                        href="/products"
                        onClick={() => {
                          setDesktopProductsOpen(false);
                        }}
                        className="flex min-h-12 items-center justify-between bg-black px-8 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-[#c49454] hover:text-black"
                      >
                        View Complete Catalogue
                        <span className="text-2xl leading-none">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold uppercase tracking-[0.14em] transition ${
                active ? "text-black" : "text-black/70 hover:text-black"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex min-w-0 items-center justify-end gap-5">
        <div className="flex items-center gap-2 sm:gap-3 xl:gap-5">
              <button
                type="button"
                aria-label="Search products"
                title="Search"
                onClick={() => {
                  setOpen(false);
                  setSearchOpen((value) => !value);
                }}

               
               
className="grid h-9 w-9 sm:h-10 sm:w-10 xl:h-12 xl:w-12 place-items-center rounded-full border border-black/20 bg-transparent text-black transition hover:bg-black hover:text-white"             
             >

                <SearchIcon />
              </button>

              {iconLinks.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-label={item.label}
                    title={item.label}
                  className={`relative inline-flex h-9 w-9 sm:h-10 sm:w-10 xl:h-12 ${
  user && item.href === "/sign-in"
    ? "xl:w-auto xl:px-4"
    : ""
} items-center justify-center gap-2 rounded-full border transition ${
  active
    ? "border-black bg-black text-white"
    : "border-black/20 bg-transparent text-black hover:bg-black hover:text-white"
}`}
                  >
                  {item.icon}

{user && item.href === "/sign-in" ? (
  <span className="hidden max-w-28 truncate text-xs font-semibold uppercase tracking-[0.12em] xl:block">
    {user.name}
  </span>
) : null}

{item.count > 0 ? (
  <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-[#c9a16b] px-1.5 py-0.5 text-[10px] font-black leading-none text-black ring-2 ring-white">
    {item.count > 99 ? "99+" : item.count}
  </span>
) : null}
                  </Link>
                );
              })}

              <Link
                href="/contact"

className="hidden md:flex rounded-full bg-white px-5 xl:px-7 py-2.5 xl:py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-black border border-black/20 hover:bg-black hover:text-white transition"             
             >

                Enquire
              </Link>
            </div>

        {/* <div className="flex shrink-0 items-center gap-2 xl:hidden">
              {isProductDetailPage ? (
                <>
                  <button
                    type="button"
                    aria-label="Search products"
                    title="Search"
                    onClick={() => setSearchOpen((value) => !value)}
                    className="grid h-6 w-6 place-items-center text-white transition hover:text-[#c9a16b] sm:h-8 sm:w-8"
                  >
                    <SearchIcon />
                  </button>
                  <Link
                    href="/enquiry-basket"
                    aria-label="Cart"
                    title="Cart"
                    className="relative grid h-6 w-6 place-items-center text-white transition hover:text-[#c9a16b] sm:h-8 sm:w-8"
                  >
                    <CartIcon />
                    {cartCount > 0 ? (
                      <span className="absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-[#ff3f6c] px-1.5 py-0.5 text-[10px] font-black leading-none text-white">
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    ) : null}
                  </Link>
                  <Link
                    href={user ? "/sign-in" : "/sign-up"}
                    aria-label={user ? user.name : "Sign up"}
                    title={user ? user.name : "Sign up"}
                    className="grid h-6 w-6 place-items-center text-white transition hover:text-[#c9a16b] sm:h-8 sm:w-8"
                  >
                    <UserIcon />
                  </Link>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    aria-label="Search products"
                    title="Search"
                    onClick={() => setSearchOpen((value) => !value)}
className="relative grid h-10 w-10 place-items-center rounded-full border border-black/25 bg-transparent text-black transition hover:bg-black hover:text-white"
              >
                    <SearchIcon />
                  </button>
                  {iconLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-label={item.label}
                      title={item.label}
                      className="relative grid h-10 w-10 place-items-center rounded-full border border-transparent text-black hover:bg-black/5 transition hover:bg-white/10 sm:h-12 sm:w-12"
                    >
                      {item.icon}
                      {item.count > 0 ? (
                        <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-[#c9a16b] px-1.5 py-0.5 text-[10px] font-black leading-none text-black">
                          {item.count > 99 ? "99+" : item.count}
                        </span>
                      ) : null}
                    </Link>
                  ))}
                </>
              )}
            </div> */}
          </div>
        </nav>

      </header>

      {searchOpen ? (
        <div
          ref={searchPanelRef}
          className="fixed inset-x-0 top-16 z-[95] border-b border-black/10 bg-white px-4 py-3 shadow-lg shadow-black/10 sm:top-20 sm:px-8 xl:top-24"
        >
          <form
            onSubmit={submitSearch}
            className="mx-auto flex max-w-[1600px] items-center overflow-hidden rounded-[8px] border border-black/20 bg-white"
          >
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              autoFocus
              placeholder="Search products or categories..."
              className="min-h-12 min-w-0 flex-1 px-4 text-base text-[#282c3f] outline-none placeholder:text-[#7e818c] sm:px-5"
            />
            <button
              type="button"
              aria-label="Close search"
              onClick={() => setSearchOpen(false)}
              className="grid min-h-12 w-12 place-items-center text-2xl font-black text-[#7e818c] transition hover:text-[#282c3f]"
            >
              ×
            </button>
          </form>
        </div>
      ) : null}

      <div
        className={`fixed inset-x-0 bottom-0 top-16 z-[120] block transition ${
          open ? "pointer-events-auto" : "pointer-events-none"
        } sm:top-20 xl:hidden`}
        aria-hidden={!open}
      >
          <div
            className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ease-out ${
              open ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <aside
            ref={mobileDrawerRef}
            className={`absolute left-0 top-0 h-full w-[88vw] max-w-sm overflow-y-auto bg-white text-[#282c3f] shadow-2xl shadow-black/30 transition-transform duration-300 ease-out ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="border-b border-black/10">
              {navLinks.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex min-h-14 items-center justify-between px-6 py-4 text-[15px] font-medium transition ${
                      active
                        ? "bg-[#f5f5f6] text-[#c9a16b]"
                        : "text-[#282c3f] hover:bg-[#f5f5f6]"
                    }`}
                  >
                    <span>{link.label}</span>
                    <DrawerArrow />
                  </Link>
                );
              })}
            </div>

            <div className="border-b border-black/10 py-2">
              <button
                type="button"
                onClick={() => setMobileProductsOpen((value) => !value)}
                className="flex min-h-14 w-full items-center justify-between px-6 py-4 text-left text-[15px] font-medium text-[#282c3f] transition hover:bg-[#f5f5f6]"
              >
                Product Categories
                <DrawerArrow rotated={mobileProductsOpen} />
              </button>

              {mobileProductsOpen ? (
                <div className="bg-[#f8f8f8] py-1">
                  {visibleCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/products/${category.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center justify-between px-8 py-3 text-sm font-medium text-[#3e4152] transition hover:bg-white"
                    >
                      <span>{category.title}</span>
                      <DrawerArrow />
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="border-b border-black/10 py-2">
              <p className="px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#94969f]">
                Categories
              </p>
              <div>
                {visibleCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/products/${category.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center justify-between px-6 py-3 text-[15px] font-medium text-[#3e4152] transition hover:bg-[#f5f5f6]"
                  >
                    <span>{category.title}</span>
                    <DrawerArrow />
                  </Link>
                ))}
              </div>
            </div>

            <div className="px-6 py-5">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-center rounded-full bg-black px-6 py-3 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#c9a16b] hover:text-black"
              >
                Enquire Now
              </Link>
            </div>
          </aside>
        </div>

    </>
  );
}
