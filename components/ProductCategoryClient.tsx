"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import CatalogProductCard from "@/components/CatalogProductCard";
import { exportCategories, type ExportCategory } from "@/data/site";
import type { ExportProduct } from "@/data/products";

type ProductCategoryClientProps = {
  category: ExportCategory;
  products: ExportProduct[];
  allProducts?: ExportProduct[];
  allCategories?: ExportCategory[];
  storeMode?: boolean;
};

const brandOptions = ["Lotus Impex", "Private Label", "Bulk Supply", "Export Ready"];
const bundleOptions = ["Private Label", "Bulk Supply", "Export Ready", "Custom Sourcing"];
const countryOptions = ["India", "Custom Sourcing", "Export Ready"];
const priceOptions = ["Under Rs. 500", "Rs. 500 - Rs. 999", "Rs. 1000+"];
const colorOptions = [
  { label: "Blue", className: "bg-blue-500" },
  { label: "Black", className: "bg-neutral-900" },
  { label: "Green", className: "bg-green-600" },
  { label: "White", className: "bg-white border border-black/20" },
  { label: "Pink", className: "bg-pink-400" },
  { label: "Yellow", className: "bg-yellow-400" },
  { label: "Red", className: "bg-red-500" },
  { label: "Brown", className: "bg-amber-800" },
];
const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "Custom"];
const genderOptions = ["Women", "Men", "Girls", "Boys"];

function getDefaultGenderFilter(categorySlug: string, storeMode: boolean) {
  if (storeMode) return "";
  if (categorySlug === "ladies-garments") return "Women";
  if (categorySlug === "mens-garments") return "Men";
  return "";
}

function getGenderHref(gender: string) {
  if (gender === "Women") return "/products/ladies-garments?gender=Women";
  if (gender === "Girls") return "/products/ladies-garments?gender=Girls";
  if (gender === "Men") return "/products/mens-garments?gender=Men";
  if (gender === "Boys") return "/products/mens-garments?gender=Boys";
  return "/products";
}

function getProductMeta(product: ExportProduct, index: number) {
  const price = 399 + ((index * 73) % 1650);
  const mrp = price + 700 + ((index * 131) % 1700);
  const discount = Math.round(((mrp - price) / mrp) * 100);
  const color = colorOptions[index % colorOptions.length].label;
  const size = sizeOptions[index % sizeOptions.length];
  const brand = brandOptions[index % brandOptions.length];
  const gender =
    product.categorySlug === "ladies-garments"
      ? index % 4 === 0
        ? "Girls"
        : "Women"
      : product.categorySlug === "mens-garments"
        ? index % 4 === 0
          ? "Boys"
          : "Men"
        : "";

  return { brand, color, discount, gender, mrp, price, size };
}

function toggleValue(values: string[], value: string) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function getSearchScore(product: ExportProduct, searchValue: string) {
  if (!searchValue) return 0;

  const name = normalize(product.name);
  const shortName = normalize(product.shortName);
  const type = normalize(product.type);
  const summary = normalize(product.summary);

  if (name === searchValue || shortName === searchValue) return 100;
  if (name.startsWith(searchValue) || shortName.startsWith(searchValue)) return 80;
  if (name.includes(searchValue) || shortName.includes(searchValue)) return 60;
  if (type.includes(searchValue)) return 40;
  if (summary.includes(searchValue)) return 20;

  return product.availableOptions.some((option) =>
    normalize(option).includes(searchValue)
  )
    ? 10
    : 0;
}

export default function ProductCategoryClient({
  category,
  products,
  allProducts = products,
  allCategories = exportCategories,
  storeMode = false,
}: ProductCategoryClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryGender = searchParams.get("gender") || "";
  const queryType = searchParams.get("type") || "";
  const defaultGenderFilter = getDefaultGenderFilter(category.slug, storeMode);
  const [search, setSearch] = useState("");
  const [typeFilters, setTypeFilters] = useState<string[]>(
    queryType ? [queryType] : []
  );
  const [genderFilters, setGenderFilters] = useState<string[]>(
    queryGender ? [queryGender] : defaultGenderFilter ? [defaultGenderFilter] : []
  );
  const [brandFilters, setBrandFilters] = useState<string[]>([]);
  const [bundleFilters, setBundleFilters] = useState<string[]>([]);
  const [countryFilters, setCountryFilters] = useState<string[]>([]);
  const [priceFilters, setPriceFilters] = useState<string[]>([]);
  const [colorFilters, setColorFilters] = useState<string[]>([]);
  const [sizeFilters, setSizeFilters] = useState<string[]>([]);
  const [openTopFilter, setOpenTopFilter] = useState<string | null>(null);
  const [sort, setSort] = useState("recommended");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);
  const [pincodePromptOpen, setPincodePromptOpen] = useState(false);
  const [pincode, setPincode] = useState("");
  const [deliveryPincode, setDeliveryPincode] = useState("");

  useEffect(() => {
    // Reset catalogue controls when the route moves to another category.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearch("");
    setTypeFilters(queryType ? [queryType] : []);
    setGenderFilters(
      queryGender ? [queryGender] : defaultGenderFilter ? [defaultGenderFilter] : []
    );
    setBrandFilters([]);
    setBundleFilters([]);
    setCountryFilters([]);
    setPriceFilters([]);
    setColorFilters([]);
    setSizeFilters([]);
    setOpenTopFilter(null);
    setMobileFilterOpen(false);
    setMobileSortOpen(false);
    setPincodePromptOpen(false);
    setSort("recommended");
  }, [category.slug, defaultGenderFilter, queryGender, queryType]);

  const hasActiveFilters =
    search.trim().length > 0 ||
    typeFilters.length > 0 ||
    genderFilters.length > 0 ||
    brandFilters.length > 0 ||
    bundleFilters.length > 0 ||
    countryFilters.length > 0 ||
    priceFilters.length > 0 ||
    colorFilters.length > 0 ||
    sizeFilters.length > 0;

  const sourceProducts = useMemo(
    () =>
      (storeMode ? allProducts : products).filter(
        (product) => product.categorySlug !== "footwear"
      ),
    [allProducts, products, storeMode]
  );

  const productTypes = useMemo(
    () => Array.from(new Set(sourceProducts.map((product) => product.type))),
    [sourceProducts]
  );

  const filteredProducts = useMemo(() => {
    const searchValue = normalize(search);

    let result = sourceProducts.filter((product, index) => {
      const meta = getProductMeta(product, index);
      const searchMatch =
        searchValue.length === 0 || getSearchScore(product, searchValue) > 0;

      const typeMatch =
        typeFilters.length === 0 || typeFilters.includes(product.type);
      const genderMatch =
        genderFilters.length === 0 || genderFilters.includes(meta.gender);
      const brandMatch =
        brandFilters.length === 0 || brandFilters.includes(meta.brand);
      const bundleMatch =
        bundleFilters.length === 0 ||
        bundleFilters.some((bundle) => {
          const bundleValue = bundle.toLowerCase();

          return (
            meta.brand.toLowerCase().includes(bundleValue) ||
            product.name.toLowerCase().includes(bundleValue) ||
            product.summary.toLowerCase().includes(bundleValue) ||
            product.availableOptions.some((option) =>
              option.toLowerCase().includes(bundleValue)
            )
          );
        });
      const countryMatch =
        countryFilters.length === 0 ||
        countryFilters.some((country) => {
          if (country === "India") return product.origin === "India";

          const countryValue = country.toLowerCase();

          return (
            product.name.toLowerCase().includes(countryValue) ||
            product.summary.toLowerCase().includes(countryValue) ||
            product.availableOptions.some((option) =>
              option.toLowerCase().includes(countryValue)
            )
          );
        });
      const colorMatch =
        colorFilters.length === 0 || colorFilters.includes(meta.color);
      const sizeMatch =
        sizeFilters.length === 0 || sizeFilters.includes(meta.size);
      const priceMatch =
        priceFilters.length === 0 ||
        priceFilters.some((range) => {
          if (range === "Under Rs. 500") return meta.price < 500;
          if (range === "Rs. 500 - Rs. 999") {
            return meta.price >= 500 && meta.price <= 999;
          }
          return meta.price >= 1000;
        });
      const facetMatch =
        typeMatch &&
        genderMatch &&
        brandMatch &&
        bundleMatch &&
        countryMatch &&
        priceMatch &&
        colorMatch &&
        sizeMatch;

      return searchMatch && facetMatch;
    });

    if (searchValue) {
      result = [...result].sort(
        (a, b) => getSearchScore(b, searchValue) - getSearchScore(a, searchValue)
      );
    }

    if (sort === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "price-low") {
      result = [...result].sort(
        (a, b) =>
          getProductMeta(a, sourceProducts.indexOf(a)).price -
          getProductMeta(b, sourceProducts.indexOf(b)).price
      );
    }

    if (sort === "discount") {
      result = [...result].sort(
        (a, b) =>
          getProductMeta(b, sourceProducts.indexOf(b)).discount -
          getProductMeta(a, sourceProducts.indexOf(a)).discount
      );
    }

    return result;
  }, [
    brandFilters,
    bundleFilters,
    colorFilters,
    countryFilters,
    genderFilters,
    priceFilters,
    search,
    sizeFilters,
    sort,
    sourceProducts,
    typeFilters,
  ]);

  const activeChips = [
    ...genderFilters,
    ...typeFilters,
    ...brandFilters,
    ...bundleFilters,
    ...countryFilters,
    ...priceFilters,
    ...colorFilters,
    ...sizeFilters,
  ];

  const clearFilters = () => {
    setSearch("");
    setTypeFilters([]);
    setGenderFilters([]);
    setBrandFilters([]);
    setBundleFilters([]);
    setCountryFilters([]);
    setPriceFilters([]);
    setColorFilters([]);
    setSizeFilters([]);
    setOpenTopFilter(null);
    setMobileFilterOpen(false);
    setMobileSortOpen(false);
  };

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const searchValue = normalize(search);

    if (!searchValue) {
      router.push("/products");
      return;
    }

    const matchedProduct = [...sourceProducts]
      .map((product) => ({
        product,
        score: getSearchScore(product, searchValue),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)[0]?.product;

    if (matchedProduct) {
      router.push(
        `/products/${matchedProduct.categorySlug}/${matchedProduct.slug}`
      );
    } else {
      router.push("/products");
    }
  }

  const quickActions = [
    {
      label: "Top Brands",
      active: brandFilters.includes("Lotus Impex"),
      onClick: () =>
        setBrandFilters((values) =>
          values.includes("Lotus Impex") ? [] : ["Lotus Impex"]
        ),
    },
    {
      label: "Express Delivery",
      active: bundleFilters.includes("Export Ready"),
      onClick: () =>
        setBundleFilters((values) =>
          values.includes("Export Ready") ? [] : ["Export Ready"]
        ),
    },
    {
      label: "Top Rated",
      active: sort === "discount",
      onClick: () => setSort((value) => (value === "discount" ? "recommended" : "discount")),
    },
  ];

  function savePincode() {
    const normalizedPincode = pincode.trim();

    if (!/^\d{6}$/.test(normalizedPincode)) return;

    setDeliveryPincode(normalizedPincode);
    setPincodePromptOpen(false);
  }

  return (
    <main className="bg-white pb-16 pt-20 text-[#111827] sm:pt-20 lg:pb-0 xl:pt-24">
      <section className="hidden bg-white px-5 py-5 sm:px-8 lg:block lg:px-10">
        <div className="mx-auto max-w-[1800px]">
          <div className="flex flex-wrap items-center gap-2 text-sm text-[#282c3f]">
            <Link href="/" className="hover:text-black">
              Home
            </Link>
            <span>/</span>
            {storeMode ? (
              <span className="font-black text-black">Lotus Fashion Store</span>
            ) : (
              <>
                <span>Clothing</span>
                <span>/</span>
                <span className="font-black text-black">{category.title}</span>
              </>
            )}
          </div>

          <h1 className="mt-5 text-2xl font-black leading-tight text-[#282c3f]">
            {storeMode ? "Lotus Fashion Store" : category.title}{" "}
            <span className="font-normal text-black/45">
              - {filteredProducts.length} items
            </span>
          </h1>
        </div>
      </section>

      <section className="sticky top-16 z-50 hidden border-b border-black/10 bg-white px-5 py-3 sm:top-20 sm:px-8 lg:block lg:px-10 xl:top-24">
        <div className="mx-auto flex max-w-[1800px] flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-base font-black uppercase text-black">Filters</p>
            <button
              type="button"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className="text-xs font-black uppercase tracking-[0.08em] text-[#c9a16b] disabled:text-black/25"
            >
              Clear All
            </button>

            <TopFilterMenu
              label="Bundles"
              options={bundleOptions}
              values={bundleFilters}
              open={openTopFilter === "Bundles"}
              onToggle={() =>
                setOpenTopFilter(openTopFilter === "Bundles" ? null : "Bundles")
              }
              onChange={setBundleFilters}
            />
            <TopFilterMenu
              label="Country of Origin"
              options={countryOptions}
              values={countryFilters}
              open={openTopFilter === "Country of Origin"}
              onToggle={() =>
                setOpenTopFilter(
                  openTopFilter === "Country of Origin" ? null : "Country of Origin"
                )
              }
              onChange={setCountryFilters}
            />
            <TopFilterMenu
              label="Size"
              options={sizeOptions}
              values={sizeFilters}
              open={openTopFilter === "Size"}
              onToggle={() =>
                setOpenTopFilter(openTopFilter === "Size" ? null : "Size")
              }
              onChange={setSizeFilters}
            />
            <TopFilterMenu
              label="Color Family"
              options={colorOptions.map((option) => option.label)}
              values={colorFilters}
              open={openTopFilter === "Color Family"}
              onToggle={() =>
                setOpenTopFilter(
                  openTopFilter === "Color Family" ? null : "Color Family"
                )
              }
              onChange={setColorFilters}
            />

            {["Bundles", "Country of Origin", "Size", "Color Family"].map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  className="hidden"
                >
                  {item} <span className="text-black/35">⌄</span>
                </button>
              )
            )}
          </div>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="min-w-[240px] border border-black/15 bg-white px-4 py-3 text-sm font-bold outline-none"
          >
            <option value="recommended">Sort by : Recommended</option>
            <option value="price-low">Sort by : Price Low to High</option>
            <option value="discount">Sort by : Better Discount</option>
            <option value="name">Sort by : Name</option>
          </select>
        </div>

        {activeChips.length > 0 ? (
          <div className="mx-auto mt-3 flex max-w-[1800px] flex-wrap gap-2">
            {activeChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => {
                  setGenderFilters((values) => values.filter((v) => v !== chip));
                  setTypeFilters((values) => values.filter((v) => v !== chip));
                  setBrandFilters((values) => values.filter((v) => v !== chip));
                  setBundleFilters((values) => values.filter((v) => v !== chip));
                  setCountryFilters((values) => values.filter((v) => v !== chip));
                  setPriceFilters((values) => values.filter((v) => v !== chip));
                  setColorFilters((values) => values.filter((v) => v !== chip));
                  setSizeFilters((values) => values.filter((v) => v !== chip));
                }}
                className="rounded-full border border-black/15 px-3 py-1.5 text-xs text-[#282c3f]"
              >
                {chip} <span className="ml-1 text-black/45">×</span>
              </button>
            ))}
          </div>
        ) : null}
      </section>

      <section className="mx-auto grid max-w-[1800px] lg:grid-cols-[310px_1fr]">
        <aside className="hidden border-r border-black/10 bg-white lg:block">
          <form onSubmit={submitSearch} className="border-b border-black/10 p-5">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products"
              className="w-full rounded-full border border-black/15 bg-[#f5f5f6] px-4 py-3 text-sm font-semibold outline-none focus:border-black"
            />
          </form>

          <div className="border-b border-black/10 p-5">
            {genderOptions.map((option) => (
              <label
                key={option}
                className="mb-3 flex cursor-pointer items-center gap-3 text-sm font-black text-[#282c3f]"
              >
                <input
                  type="checkbox"
                  checked={genderFilters.includes(option)}
                  onChange={() =>
                    router.push(getGenderHref(option))
                  }
                  className="size-4 accent-[#c9a16b]"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>

          {storeMode ? (
            <div className="border-b border-black/10 p-5">
              <p className="mb-4 text-sm font-black uppercase text-black">
                Departments
              </p>
              <Link
                href="/products"
                className="mb-3 flex items-center justify-between text-sm font-black text-[#c9a16b] transition hover:text-black"
              >
                <span>All Categories</span>
                <span className="text-xs text-black/35">{allProducts.length}</span>
              </Link>
              {allCategories.map((item) => (
                <Link
                  key={item.slug}
                  href={`/products/${item.slug}`}
                  className="mb-3 flex items-center justify-between text-sm font-semibold text-black/75 transition hover:text-[#c9a16b]"
                >
                  <span>{item.title}</span>
                  <span className="text-xs text-black/35">
                    {
                      allProducts.filter(
                        (product) => product.categorySlug === item.slug
                      ).length
                    }
                  </span>
                </Link>
              ))}
            </div>
          ) : null}

          <div className="border-b border-black/10 p-5">
            <p className="mb-4 text-sm font-black uppercase text-black">
              Categories
            </p>
            {productTypes.map((item) => {
              const count = allProducts.filter(
                (product) => product.type === item
              ).length;
              const active = typeFilters.includes(item);

              return (
                <label
                  key={item}
                  className="mb-3 flex cursor-pointer items-center gap-3 text-sm font-semibold text-black/80"
                >
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() =>
                      setTypeFilters((values) => toggleValue(values, item))
                    }
                    className="size-4 accent-[#c9a16b]"
                  />
                  <span>{item}</span>
                  <span className="text-xs text-black/35">({count})</span>
                </label>
              );
            })}
          </div>

          <FilterGroup
            title="Brand"
            options={brandOptions}
            values={brandFilters}
            onChange={setBrandFilters}
            total={allProducts.length}
          />
          <FilterGroup
            title="Price"
            options={priceOptions}
            values={priceFilters}
            onChange={setPriceFilters}
            total={allProducts.length}
          />
          <div className="border-b border-black/10 p-5">
            <p className="mb-4 text-sm font-black uppercase text-black">Color</p>
            {colorOptions.map((option, index) => (
              <label
                key={option.label}
                className="mb-3 flex cursor-pointer items-center gap-3 text-sm font-semibold text-black/75"
              >
                <input
                  type="checkbox"
                  checked={colorFilters.includes(option.label)}
                  onChange={() =>
                    setColorFilters((values) =>
                      toggleValue(values, option.label)
                    )
                  }
                  className="size-4 accent-[#c9a16b]"
                />
                <span className={`size-4 rounded-full ${option.className}`} />
                <span>{option.label}</span>
                <span className="text-xs text-black/35">
                  ({Math.max(8, allProducts.length - index * 3)})
                </span>
              </label>
            ))}
          </div>
          <FilterGroup
            title="Size"
            options={sizeOptions}
            values={sizeFilters}
            onChange={setSizeFilters}
            total={allProducts.length}
          />
        </aside>

        <div className="min-w-0 bg-white px-0 py-0 lg:px-8 lg:py-7">
          <section className="lg:hidden">
            <button
              type="button"
              onClick={() => setPincodePromptOpen(true)}
              className="flex w-full items-center justify-between gap-3 border-b border-black/10 bg-[#f3f0ff] px-4 py-3 text-left text-sm font-semibold text-[#282c3f]"
            >
                <span className="truncate">
                  {deliveryPincode
                    ? `Delivering to ${deliveryPincode}`
                    : "Add Delivery Address"}
                </span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  className="size-5 shrink-0"
                >
                  <path
                    d="M5 7.5 10 12.5 15 7.5"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
            </button>

            <div className="flex gap-2 overflow-x-auto border-b border-black/10 bg-white px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {quickActions.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.onClick}
                  className={`shrink-0 rounded-full border px-4 py-2 text-xs font-black transition ${
                    item.active
                      ? "border-[#ff3f6c] bg-white text-[#ff3f6c]"
                      : "border-black/15 bg-white text-[#282c3f]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex gap-4 overflow-x-auto bg-white px-4 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {(storeMode ? allCategories : allCategories.slice(0, 6)).map(
                (item) => (
                  <Link
                    key={item.slug}
                    href={`/products/${item.slug}`}
                    className="w-20 shrink-0 text-center"
                  >
                    <div className="mx-auto size-16 overflow-hidden rounded-full bg-[#f5f5f6]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <span className="mt-2 block truncate text-xs font-black text-[#282c3f]">
                      {item.shortTitle}
                    </span>
                  </Link>
                )
              )}
            </div>
          </section>

          {storeMode ? (
            <section className="mb-10 hidden border-b border-black/10 pb-8 lg:block">
              <div className="mb-5">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[#c9a16b]">
                  Product Categories
                </p>
                <h2 className="mt-2 text-3xl font-black leading-tight text-[#282c3f]">
                  Shop All Categories
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                {allCategories.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/products/${item.slug}`}
                    className="group overflow-hidden bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#c9a16b]">
                        {item.eyebrow}
                      </p>
                      <h3 className="mt-2 text-lg font-black text-[#282c3f]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-black/55">
                        {
                          allProducts.filter(
                            (product) => product.categorySlug === item.slug
                          ).length
                        }{" "}
                        products
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <div className="mb-6 hidden flex-wrap gap-3 lg:flex">
            {storeMode ? (
              <Link
                href="/products"
                className="rounded-full border border-[#c9a16b] bg-[#c9a16b] px-4 py-2 text-sm font-black text-black transition hover:bg-black hover:text-white"
              >
                All Categories
              </Link>
            ) : (
              <Link
                href="/products"
                className="rounded-full border border-black/15 px-4 py-2 text-sm font-semibold text-black/70 transition hover:border-[#c9a16b] hover:text-[#c9a16b]"
              >
                All Categories
              </Link>
            )}
            {(storeMode ? allCategories : [category]).map((item) => (
              <Link
                key={item.slug}
                href={`/products/${item.slug}`}
                className="rounded-full border border-black/15 px-4 py-2 text-sm font-semibold text-black/70 transition hover:border-[#c9a16b] hover:text-[#c9a16b]"
              >
                {item.title}
              </Link>
            ))}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 items-start gap-x-3 gap-y-8 px-3 pb-4 pt-0 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:px-0 lg:py-0 2xl:grid-cols-5">
              {filteredProducts.map((product, index) => (
                <CatalogProductCard
                  key={product.slug}
                  product={product}
                  index={index}
                  variant="myntra"
                />
              ))}
            </div>
          ) : (
            <div className="border border-black/10 bg-[#f8f4ed] p-10 text-center">
              <h2 className="text-xl font-black">No Products Found</h2>
              <p className="mt-3 text-sm text-black/55">
                Try clearing filters or searching another product name.
              </p>
            </div>
          )}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-[105] grid grid-cols-2 border-t border-black/10 bg-white lg:hidden">
        <button
          type="button"
          onClick={() => setMobileSortOpen(true)}
          className="flex min-h-14 items-center justify-center gap-2 border-r border-black/10 text-sm font-black uppercase tracking-[0.08em] text-[#282c3f]"
        >
          <span className="text-lg">↕</span>
          Sort
        </button>
        <button
          type="button"
          onClick={() => setMobileFilterOpen(true)}
          className="relative flex min-h-14 items-center justify-center gap-2 text-sm font-black uppercase tracking-[0.08em] text-[#282c3f]"
        >
          <span className="text-lg">≡</span>
          Filter
          {hasActiveFilters ? (
            <span className="absolute right-[28%] top-3 size-2 rounded-full bg-[#ff3f6c]" />
          ) : null}
        </button>
      </div>

      {mobileSortOpen ? (
        <div className="fixed inset-0 z-[150] bg-black/45 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close sort options"
            onClick={() => setMobileSortOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-base font-black uppercase text-black">Sort By</p>
              <button
                type="button"
                onClick={() => setMobileSortOpen(false)}
                className="text-2xl leading-none text-black/55"
              >
                x
              </button>
            </div>
            {[
              ["recommended", "Recommended"],
              ["price-low", "Price Low to High"],
              ["discount", "Better Discount"],
              ["name", "Name"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setSort(value);
                  setMobileSortOpen(false);
                }}
                className={`flex min-h-12 w-full items-center justify-between border-b border-black/10 text-left text-sm font-bold ${
                  sort === value ? "text-[#c9a16b]" : "text-[#282c3f]"
                }`}
              >
                {label}
                {sort === value ? <span>✓</span> : null}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {pincodePromptOpen ? (
        <div className="fixed inset-0 z-[155] bg-black/45 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close pincode prompt"
            onClick={() => setPincodePromptOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-base font-black uppercase text-black">
                  Enter Pincode
                </p>
                <p className="mt-1 text-sm text-black/55">
                  Check delivery availability for your area.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPincodePromptOpen(false)}
                className="text-2xl leading-none text-black/55"
              >
                x
              </button>
            </div>

            <div className="flex gap-2">
              <input
                value={pincode}
                onChange={(event) =>
                  setPincode(event.target.value.replace(/\D/g, "").slice(0, 6))
                }
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                placeholder="Enter 6 digit pincode"
                className="min-h-12 flex-1 border border-black/15 px-4 text-sm font-semibold outline-none focus:border-[#ff3f6c]"
              />
              <button
                type="button"
                onClick={savePincode}
                disabled={!/^\d{6}$/.test(pincode.trim())}
                className="min-h-12 bg-[#ff3f6c] px-5 text-sm font-black uppercase text-white disabled:bg-black/20"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {mobileFilterOpen ? (
        <div className="fixed inset-0 z-[150] bg-white text-[#282c3f] lg:hidden">
          <div className="flex min-h-16 items-center justify-between border-b border-black/10 px-5">
            <p className="text-base font-black uppercase text-black">Filters</p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className="text-xs font-black uppercase tracking-[0.08em] text-[#c9a16b] disabled:text-black/25"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="text-2xl leading-none text-black/55"
              >
                x
              </button>
            </div>
          </div>

          <div className="h-[calc(100vh-128px)] overflow-y-auto">
            <form onSubmit={submitSearch} className="border-b border-black/10 p-5">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products"
                className="w-full rounded-full border border-black/15 bg-[#f5f5f6] px-4 py-3 text-sm font-semibold outline-none focus:border-black"
              />
            </form>

            <div className="border-b border-black/10 p-5">
              {genderOptions.map((option) => (
                <label
                  key={option}
                  className="mb-3 flex cursor-pointer items-center gap-3 text-sm font-black text-[#282c3f]"
                >
                  <input
                    type="checkbox"
                    checked={genderFilters.includes(option)}
                    onChange={() =>
                      router.push(getGenderHref(option))
                    }
                    className="size-4 accent-[#c9a16b]"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>

            {storeMode ? (
              <div className="border-b border-black/10 p-5">
                <p className="mb-4 text-sm font-black uppercase text-black">
                  Departments
                </p>
                <Link
                  href="/products"
                  onClick={() => setMobileFilterOpen(false)}
                  className="mb-3 flex items-center justify-between text-sm font-black text-[#c9a16b]"
                >
                  <span>All Categories</span>
                  <span className="text-xs text-black/35">{allProducts.length}</span>
                </Link>
                {allCategories.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/products/${item.slug}`}
                    onClick={() => setMobileFilterOpen(false)}
                    className="mb-3 flex items-center justify-between text-sm font-semibold text-black/75"
                  >
                    <span>{item.title}</span>
                    <span className="text-xs text-black/35">
                      {
                        allProducts.filter(
                          (product) => product.categorySlug === item.slug
                        ).length
                      }
                    </span>
                  </Link>
                ))}
              </div>
            ) : null}

            <div className="border-b border-black/10 p-5">
              <p className="mb-4 text-sm font-black uppercase text-black">
                Categories
              </p>
              {productTypes.map((item) => (
                <label
                  key={item}
                  className="mb-3 flex cursor-pointer items-center gap-3 text-sm font-semibold text-black/80"
                >
                  <input
                    type="checkbox"
                    checked={typeFilters.includes(item)}
                    onChange={() =>
                      setTypeFilters((values) => toggleValue(values, item))
                    }
                    className="size-4 accent-[#c9a16b]"
                  />
                  <span>{item}</span>
                  <span className="text-xs text-black/35">
                    ({allProducts.filter((product) => product.type === item).length})
                  </span>
                </label>
              ))}
            </div>

            <FilterGroup
              title="Brand"
              options={brandOptions}
              values={brandFilters}
              onChange={setBrandFilters}
              total={allProducts.length}
            />
            <FilterGroup
              title="Price"
              options={priceOptions}
              values={priceFilters}
              onChange={setPriceFilters}
              total={allProducts.length}
            />
            <div className="border-b border-black/10 p-5">
              <p className="mb-4 text-sm font-black uppercase text-black">Color</p>
              {colorOptions.map((option, index) => (
                <label
                  key={option.label}
                  className="mb-3 flex cursor-pointer items-center gap-3 text-sm font-semibold text-black/75"
                >
                  <input
                    type="checkbox"
                    checked={colorFilters.includes(option.label)}
                    onChange={() =>
                      setColorFilters((values) => toggleValue(values, option.label))
                    }
                    className="size-4 accent-[#c9a16b]"
                  />
                  <span className={`size-4 rounded-full ${option.className}`} />
                  <span>{option.label}</span>
                  <span className="text-xs text-black/35">
                    ({Math.max(8, allProducts.length - index * 3)})
                  </span>
                </label>
              ))}
            </div>
            <FilterGroup
              title="Size"
              options={sizeOptions}
              values={sizeFilters}
              onChange={setSizeFilters}
              total={allProducts.length}
            />
          </div>

          <div className="grid min-h-16 grid-cols-2 border-t border-black/10 bg-white">
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-black uppercase tracking-[0.1em] text-[#282c3f]"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setMobileFilterOpen(false)}
              className="bg-black text-sm font-black uppercase tracking-[0.1em] text-white"
            >
              Apply
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function FilterGroup({
  title,
  options,
  values,
  onChange,
  total,
}: {
  title: string;
  options: string[];
  values: string[];
  onChange: (values: string[]) => void;
  total: number;
}) {
  return (
    <div className="border-b border-black/10 p-5">
      <p className="mb-4 text-sm font-black uppercase text-black">{title}</p>
      {options.map((option, index) => (
        <label
          key={option}
          className="mb-3 flex cursor-pointer items-center gap-3 text-sm font-semibold text-black/75"
        >
          <input
            type="checkbox"
            checked={values.includes(option)}
            onChange={() => onChange(toggleValue(values, option))}
            className="size-4 accent-[#c9a16b]"
          />
          <span>{option}</span>
          <span className="text-xs text-black/35">
            ({Math.max(7, total - index * 4)})
          </span>
        </label>
      ))}
    </div>
  );
}

function TopFilterMenu({
  label,
  options,
  values,
  open,
  onToggle,
  onChange,
}: {
  label: string;
  options: string[];
  values: string[];
  open: boolean;
  onToggle: () => void;
  onChange: (values: string[]) => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={`text-sm font-medium transition ${
          values.length > 0 ? "text-[#c9a16b]" : "text-[#282c3f] hover:text-[#c9a16b]"
        }`}
      >
        {label} <span className="text-black/35">v</span>
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-40 mt-3 w-64 border border-black/10 bg-white p-4 shadow-2xl shadow-black/10">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.12em] text-black/45">
            {label}
          </p>

          {options.map((option) => (
            <label
              key={option}
              className="mb-3 flex cursor-pointer items-center gap-3 text-sm font-semibold text-black/75"
            >
              <input
                type="checkbox"
                checked={values.includes(option)}
                onChange={() => onChange(toggleValue(values, option))}
                className="size-4 accent-[#c9a16b]"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      ) : null}
    </div>
  );
}

