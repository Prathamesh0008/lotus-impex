"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type PointerEvent,
} from "react";
import { exportProducts } from "@/data/products";

const topCategories = [
  {
    label: "Kurta Sets",
    image: "/catalogue-women/03_Kurti_Printed_Anarkali.png",
    href: "/products/ladies-garments?type=Kurtis",
  },
  {
    label: "Dresses",
    image: "/catalogue-women/20_Dress_Solid_Maxi.png",
    href: "/products/ladies-garments?type=Dresses",
  },
  {
    label: "Kurtas",
    image: "/catalogue-women/04_Kurti_Cotton_High_Low.png",
    href: "/products/ladies-garments?type=Kurtis",
  },
  {
    label: "Shirts",
    image: "/catalogue-mens/printed-casual-shirts.png",
    href: "/products/mens-garments?type=Casual%20Shirts",
  },
  {
    label: "T-Shirts",
    image: "/catalogue-mens/printed-tshirts.png",
    href: "/products/mens-garments?type=T-shirts%20and%20polos",
  },
];

const mobileBanners = [
  {
    image: "/Banner_2.png",
    alt: "Lotus Impex fashion shopping sale",
    eyebrow: "New Arrivals",
    title: "Curated Shopping Looks",
    offer: "Min. 60% Off",
    position: "center",
  },
  {
    image: "/new_1.jpg",
    alt: "Women fashion collection",
    eyebrow: "Season Sale",
    title: "Season Sale",
    offer: "40-80% Off",
    position: "center",
  },
  {
    image: "/new_2.jpg",
    alt: "Women seasonal fashion styles",
    eyebrow: "First Purchase",
    title: "Fresh Looks",
    offer: "Flat Rs.300 Off",
    position: "center",
  },
  {
    image: "/new_4.jpg",
    alt: "Premium clothing collection on rack",
    eyebrow: "Premium Range",
    title: "Premium Range",
    offer: "New Styles",
    position: "center",
  },
  {
    image: "/new_9.jpg",
    alt: "Yellow fashion collection",
    eyebrow: "Trending Now",
    title: "Trending Now",
    offer: "Shop Today",
    position: "center",
  },
  {
    image: "/new_6.jpg",
    alt: "Yellow fashion collection",
    eyebrow: "Fashion Edit",
    title: "Fashion Edit",
    offer: "Best Deals",
    position: "center",
  },
];

const quickCategories = [
  {
    label: "Shirt",
    image: "/catalogue-mens/slim-fit-formal-shirts.png",
    href: "/products/mens-garments?type=Formal%20Shirts",
  },
  {
    label: "Jeans",
    image: "/catalogue-mens/jeans-denim-bottoms.png",
    href: "/products/mens-garments?type=Jeans",
  },
  {
    label: "T-Shirt",
    image: "/catalogue-mens/round-neck-tshirts.png",
    href: "/products/mens-garments?type=T-shirts%20and%20polos",
  },
  {
    label: "Trousers",
    image: "/catalogue-mens/formal-trousers.png",
    href: "/products/mens-garments?type=Trousers",
  },
  {
    label: "Kurta Sets",
    image: "/catalogue-women/03_Kurti_Printed_Anarkali.png",
    href: "/products/ladies-garments?type=Kurtis",
  },
  {
    label: "Tops",
    image: "/catalogue-women/05_Top_Peplum.png",
    href: "/products/ladies-garments?type=Tops%20and%20shirts",
  },
  {
    label: "Kids Wear",
    image: "/catalogue-women/19_Dress_Floral_Midi.png",
    href: "/products/ladies-garments?gender=Girls",
  },
  {
    label: "Casual",
    image: "/catalogue-mens/linen-casual-shirts.png",
    href: "/products/mens-garments?type=Casual%20Shirts",
  },
];

function normalizeSearch(value: string) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, " ").trim();
}

export default function MobileHomeExperience() {
  const router = useRouter();
  const [activeBanner, setActiveBanner] = useState(0);
  const [bannerDragOffset, setBannerDragOffset] = useState(0);
  const [isBannerDragging, setIsBannerDragging] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const bannerDragStartX = useRef(0);
  const bannerDragDeltaX = useRef(0);
  const isBannerPointerDown = useRef(false);
  const products = exportProducts
    .filter((product) =>
      ["ladies-garments", "mens-garments"].includes(product.categorySlug)
    )
    .slice(0, 6);

  useEffect(() => {
    if (isBannerDragging) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveBanner((current) => (current + 1) % mobileBanners.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [isBannerDragging]);

  function handleBannerPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    isBannerPointerDown.current = true;
    bannerDragStartX.current = event.clientX;
    bannerDragDeltaX.current = 0;
    setIsBannerDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handleBannerPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!isBannerPointerDown.current) {
      return;
    }

    const delta = event.clientX - bannerDragStartX.current;
    bannerDragDeltaX.current = delta;
    setBannerDragOffset(delta);
  }

  function handleBannerPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (!isBannerPointerDown.current) {
      return;
    }

    const width = event.currentTarget.clientWidth;
    const threshold = Math.min(80, width * 0.2);
    const delta = bannerDragDeltaX.current;

    if (delta <= -threshold) {
      setActiveBanner((current) => (current + 1) % mobileBanners.length);
    } else if (delta >= threshold) {
      setActiveBanner(
        (current) => (current - 1 + mobileBanners.length) % mobileBanners.length
      );
    }

    isBannerPointerDown.current = false;
    bannerDragDeltaX.current = 0;
    setBannerDragOffset(0);
    setIsBannerDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchQuery.trim();

    if (!query) {
      router.push("/products");
      return;
    }

    const normalizedQuery = normalizeSearch(query);
    const matchedProduct = exportProducts
      .map((product) => {
        const name = normalizeSearch(product.name);
        const shortName = normalizeSearch(product.shortName);
        const type = normalizeSearch(product.type);
        const searchable = normalizeSearch(
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
      .sort((a, b) => b.score - a.score)[0]?.product;

    if (matchedProduct) {
      router.push(`/products/${matchedProduct.categorySlug}/${matchedProduct.slug}`);
    } else {
      router.push("/products");
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f5f6] pt-16 text-[#282c3f]">
      <section className="bg-white px-3 pb-3 pt-5">
        <form
          onSubmit={handleSearchSubmit}
          className="flex h-11 items-center gap-2 rounded-full border border-black/10 bg-white px-4 text-[#535766] shadow-[0_8px_22px_rgba(0,0,0,0.08)]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-5 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m16.5 16.5 4 4" />
          </svg>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search for brands and products"
            className="min-w-0 flex-1 bg-transparent text-[15px] font-medium outline-none placeholder:text-[#535766]"
          />
          {searchQuery ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setSearchQuery("")}
              className="grid size-7 place-items-center text-xl font-black leading-none text-[#557199]"
            >
              ×
            </button>
          ) : null}
        </form>
      </section>

      <section className="overflow-x-auto bg-white px-3 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max gap-4">
          {topCategories.map((category) => (
            <Link
              key={category.label}
              href={category.href}
              className="w-[66px] shrink-0 text-center"
            >
              <div className="relative mx-auto size-[58px] overflow-hidden rounded-xl bg-[#fff2f5] shadow-[0_0_10px_rgba(255,63,108,0.22)]">
                <Image
                  src={category.image}
                  alt={category.label}
                  fill
                  sizes="58px"
                  className="object-contain object-bottom"
                />
              </div>
              <span className="mt-1 block truncate text-[10px] font-black uppercase leading-4 text-[#282c3f]">
                {category.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white px-1 pb-2">
        <div className="flex min-h-12 items-center justify-center gap-3 bg-gradient-to-r from-[#fff3dc] via-[#ffe4e7] to-[#f7def2] px-3 text-center">
          <span className="text-xl font-black text-[#ff6f21]">Flat Rs.300 Off</span>
          <span className="rounded bg-white px-2 py-1 text-[9px] font-black uppercase leading-3 text-[#282c3f] shadow-sm">
            Coupon Code
            <span className="ml-1 text-sm">MYNTRA300</span>
          </span>
        </div>
      </section>

      <section className="relative bg-white px-1 pb-3">
        <div
          className={`relative h-[164px] cursor-grab touch-pan-y overflow-hidden rounded-[10px] bg-[#f5f5f6] active:cursor-grabbing ${
            isBannerDragging ? "select-none" : ""
          }`}
          onPointerDown={handleBannerPointerDown}
          onPointerMove={handleBannerPointerMove}
          onPointerUp={handleBannerPointerUp}
          onPointerCancel={handleBannerPointerUp}
          onPointerLeave={handleBannerPointerUp}
        >
          <div
            className={`flex h-full ${
              isBannerDragging ? "" : "transition-transform duration-700 ease-out"
            }`}
            style={{
              transform: `translateX(calc(-${activeBanner * 100}% + ${bannerDragOffset}px))`,
            }}
          >
            {mobileBanners.map((banner, index) => (
              <div key={banner.image} className="relative h-full min-w-full">
                <Image
                  src={banner.image}
                  alt={banner.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                  style={{ objectPosition: banner.position }}
                  draggable={false}
                />
                <div className="hidden">
                  <div className="max-w-[150px]">
                    <p className="text-[9px] font-black uppercase leading-3 tracking-[0.24em] text-black/75">
                      {banner.eyebrow}
                    </p>
                    <p className="mt-1 font-serif text-2xl font-black uppercase leading-[0.9]">
                      {banner.title}
                    </p>
                    <p className="mt-2 text-[11px] font-black uppercase">
                      {banner.offer}
                    </p>
                    <span className="mt-2 inline-flex min-h-7 items-center rounded bg-black px-3 text-[10px] font-black uppercase tracking-[0.08em] text-white shadow">
                      Shop Now
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 flex justify-center gap-2">
          {mobileBanners.map((banner, index) => (
            <button
              key={banner.image}
              type="button"
              aria-label={`Show banner ${index + 1}`}
              onClick={() => setActiveBanner(index)}
              className={`size-2 rounded-full transition ${
                activeBanner === index ? "bg-[#535766]" : "bg-[#d4d5d9]"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="bg-white px-1 pb-3">
        <div className="flex min-h-10 items-center justify-center gap-3 rounded-md border border-dashed border-[#bfc0c6] bg-white text-center">
          <span className="h-5 w-12 rounded-sm bg-[#14213d]" />
          <span className="text-xs font-black text-[#282c3f]">
            Flat 7.5% Cashback
          </span>
        </div>
      </section>

      <section className="bg-white px-3 pb-4">
        <div className="grid grid-cols-4 gap-x-3 gap-y-4">
          {quickCategories.map((category) => (
            <Link key={category.label} href={category.href} className="text-center">
              <div className="relative mx-auto h-[66px] w-full overflow-hidden rounded-xl bg-[#fff4ed]">
                <Image
                  src={category.image}
                  alt={category.label}
                  fill
                  sizes="25vw"
                  className="object-contain object-bottom p-1"
                />
              </div>
              <span className="mt-1 block truncate text-[11px] font-medium text-black">
                {category.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-x-3 gap-y-5 bg-white px-3 pb-6">
        {products.map((product, index) => {
          const price = 499 + ((index * 47) % 700);
          const mrp = price + 900 + ((index * 23) % 700);
          const discount = Math.round(((mrp - price) / mrp) * 100);

          return (
            <Link
              key={product.slug}
              href={`/products/${product.categorySlug}/${product.slug}`}
              className="min-w-0 bg-white"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-white">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  sizes="50vw"
                  className="object-cover object-bottom"
                />
                <span className="absolute bottom-2 left-2 rounded-sm bg-white/95 px-1.5 py-0.5 text-[10px] font-black text-[#282c3f] shadow-sm">
                  {(4 + (index % 5) / 10).toFixed(1)}{" "}
                  <span className="text-[#14958f]">*</span>
                </span>
              </div>
              <div className="pt-2">
                <p className="truncate text-[13px] font-black text-[#282c3f]">
                  Lotus Impex
                </p>
                <p className="truncate text-xs font-semibold leading-4 text-[#535766]">
                  {product.shortName || product.name}
                </p>
                <p className="mt-1 truncate text-xs font-black text-[#282c3f]">
                  Rs. {price}{" "}
                  <span className="font-normal text-[#7e818c] line-through">
                    Rs. {mrp}
                  </span>{" "}
                  <span className="font-normal text-[#ff905a]">
                    ({discount}% OFF)
                  </span>
                </p>
              </div>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
