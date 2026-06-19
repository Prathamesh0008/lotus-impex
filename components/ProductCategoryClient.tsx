"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
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
const genderOptions = ["Women", "Men", "Girls", "Boys", "Unisex"];

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
        : "Unisex";

  return { brand, color, discount, gender, mrp, price, size };
}

function toggleSingleValue(values: string[], value: string) {
  return values.includes(value) ? [] : [value];
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
  const [search, setSearch] = useState("");
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [genderFilters, setGenderFilters] = useState<string[]>([]);
  const [brandFilters, setBrandFilters] = useState<string[]>([]);
  const [bundleFilters, setBundleFilters] = useState<string[]>([]);
  const [countryFilters, setCountryFilters] = useState<string[]>([]);
  const [priceFilters, setPriceFilters] = useState<string[]>([]);
  const [colorFilters, setColorFilters] = useState<string[]>([]);
  const [sizeFilters, setSizeFilters] = useState<string[]>([]);
  const [openTopFilter, setOpenTopFilter] = useState<string | null>(null);
  const [sort, setSort] = useState("recommended");

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
    () => (storeMode || hasActiveFilters ? allProducts : products),
    [allProducts, hasActiveFilters, products, storeMode]
  );

  const productTypes = useMemo(
    () => Array.from(new Set(allProducts.map((product) => product.type))),
    [allProducts]
  );

  const filteredProducts = useMemo(() => {
    const hasSelectedFacet =
      typeFilters.length > 0 ||
      genderFilters.length > 0 ||
      brandFilters.length > 0 ||
      bundleFilters.length > 0 ||
      countryFilters.length > 0 ||
      priceFilters.length > 0 ||
      colorFilters.length > 0 ||
      sizeFilters.length > 0;
    const searchValue = normalize(search);

    let result = sourceProducts.filter((product, index) => {
      const meta = getProductMeta(product, index);
      const searchMatch =
        searchValue.length === 0 || getSearchScore(product, searchValue) > 0;

      const typeMatch =
        typeFilters.length > 0 && typeFilters.includes(product.type);
      const genderMatch =
        genderFilters.length > 0 &&
        (
        genderFilters.includes(meta.gender) ||
        (meta.gender === "Unisex" && !genderFilters.includes("Unisex"))
        );
      const brandMatch =
        brandFilters.length > 0 && brandFilters.includes(meta.brand);
      const bundleMatch =
        bundleFilters.length > 0 &&
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
        countryFilters.length > 0 &&
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
        colorFilters.length > 0 && colorFilters.includes(meta.color);
      const sizeMatch =
        sizeFilters.length > 0 && sizeFilters.includes(meta.size);
      const priceMatch =
        priceFilters.length > 0 &&
        priceFilters.some((range) => {
          if (range === "Under Rs. 500") return meta.price < 500;
          if (range === "Rs. 500 - Rs. 999") {
            return meta.price >= 500 && meta.price <= 999;
          }
          return meta.price >= 1000;
        });
      const facetMatch =
        !hasSelectedFacet ||
        typeMatch ||
        genderMatch ||
        brandMatch ||
        bundleMatch ||
        countryMatch ||
        priceMatch ||
        colorMatch ||
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
  };

  return (
    <main className="bg-white text-[#111827]">
      <section className="border-b border-black/10 bg-white px-5 py-5 sm:px-8 lg:px-10">
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

      <section className="sticky top-0 z-20 border-b border-black/10 bg-white px-5 py-3 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-[1800px] flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-base font-black uppercase text-black">Filters</p>
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-black uppercase tracking-[0.08em] text-[#c9a16b]"
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
        <aside className="border-r border-black/10 bg-white lg:sticky lg:top-[73px] lg:h-[calc(100vh-73px)] lg:overflow-y-auto">
          <div className="border-b border-black/10 p-5">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products"
              className="w-full rounded-full border border-black/15 bg-[#f5f5f6] px-4 py-3 text-sm font-semibold outline-none focus:border-black"
            />
          </div>

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
                    setGenderFilters((values) => toggleSingleValue(values, option))
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
                      setTypeFilters((values) => toggleSingleValue(values, item))
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
                      toggleSingleValue(values, option.label)
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

        <div className="min-w-0 bg-white px-5 py-7 sm:px-8">
          <div className="mb-6 flex flex-wrap gap-3">
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
            <div className="grid grid-cols-2 gap-x-7 gap-y-10 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
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
            onChange={() => onChange(toggleSingleValue(values, option))}
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
                onChange={() => onChange(toggleSingleValue(values, option))}
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

