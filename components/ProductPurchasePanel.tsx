"use client";

import { useEffect, useRef, useState } from "react";
import AddToEnquiryButton from "@/components/AddToEnquiryButton";
import WishlistLoginButton from "@/components/WishlistLoginButton";
import type { ExportProduct } from "@/data/products";

type ProductPurchasePanelProps = {
  product: Pick<
    ExportProduct,
    "slug" | "categorySlug" | "name" | "image" | "summary" | "minOrder"
  >;
  inStock: boolean;
  availableSizes: string[];
  allSizes: string[];
};

const ratingBreakdown = [
  { label: "5", count: 134, width: "w-[150px]", color: "bg-[#14958f]" },
  { label: "4", count: 27, width: "w-[58px]", color: "bg-[#14958f]" },
  { label: "3", count: 9, width: "w-[24px]", color: "bg-[#14958f]/45" },
  { label: "2", count: 5, width: "w-[14px]", color: "bg-[#D4AF36]" },
  { label: "1", count: 18, width: "w-[36px]", color: "bg-[#ff6b6b]" },
];

const mobileReviews = [
  {
    date: "Oct 21, 2023",
    size: "XL",
    text: "Nice product, nice fabric",
    name: "Sweta ramani",
  },
  {
    date: "Mar 12, 2024",
    size: "M",
    text: "Size chart is small",
    name: "Ashwini",
  },
  {
    date: "Jun 04, 2024",
    size: "L",
    text: "Good quality and comfortable fit",
    name: "Verified buyer",
  },
];

const sizeChartRows = [
  { size: "XS", bust: "38.0", toFitBust: "32.0", frontLength: "24.3", shoulder: "13.5", toFitWaist: "26.0", waist: "40.5" },
  { size: "S", bust: "40.0", toFitBust: "34.0", frontLength: "24.5", shoulder: "14.0", toFitWaist: "28.0", waist: "42.5" },
  { size: "M", bust: "42.0", toFitBust: "36.0", frontLength: "24.8", shoulder: "14.3", toFitWaist: "30.0", waist: "44.5" },
  { size: "L", bust: "44.0", toFitBust: "38.0", frontLength: "25.0", shoulder: "14.8", toFitWaist: "32.0", waist: "46.5" },
  { size: "XL", bust: "46.0", toFitBust: "40.0", frontLength: "25.3", shoulder: "15.3", toFitWaist: "34.0", waist: "48.5" },
  { size: "XXL", bust: "48.0", toFitBust: "42.0", frontLength: "25.5", shoulder: "15.5", toFitWaist: "36.0", waist: "50.5" },
];

export default function ProductPurchasePanel({
  product,
  availableSizes,
  allSizes,
}: ProductPurchasePanelProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [sizeChartTab, setSizeChartTab] = useState<"chart" | "measure">("chart");
  const [pincode, setPincode] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState<"idle" | "valid" | "invalid">(
    "idle"
  );
  const inlineButtonRef = useRef<HTMLDivElement>(null);
  const [fixedButtonVisible, setFixedButtonVisible] = useState(false);

  const addDisabled = !selectedSize;
  const disabledLabel = "Select Size";

  function checkDelivery() {
    setDeliveryStatus(/^[1-9]\d{5}$/.test(pincode) ? "valid" : "invalid");
  }

  useEffect(() => {
    function updateFixedButton() {
      const node = inlineButtonRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      setFixedButtonVisible(rect.top > window.innerHeight);
    }

    updateFixedButton();
    window.addEventListener("scroll", updateFixedButton, { passive: true });
    window.addEventListener("resize", updateFixedButton);

    return () => {
      window.removeEventListener("scroll", updateFixedButton);
      window.removeEventListener("resize", updateFixedButton);
    };
  }, []);

  return (
    <>
      <div className="mt-6 lg:mt-5">
        <div className="flex items-center gap-7">
          <p className="text-xl font-black text-[#282c3f] lg:text-base lg:uppercase">
            <span className="lg:hidden">Select Size</span>
            <span className="hidden lg:inline">Select Size</span>
          </p>
          <button
            type="button"
            onClick={() => setSizeChartOpen(true)}
            className="text-sm font-black text-[#D4AF36] lg:uppercase"
          >
            Size Chart &gt;
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2.5 lg:mt-3 lg:gap-3">
          {allSizes.map((size) => {
            const available = true;
            const selected = selectedSize === size;
            const limited = availableSizes.includes(size);
            const lowStockLabel =
              limited && size === "M"
                ? "3 left"
                : limited && size === "XXL"
                  ? "1 left"
                  : "";

            return (
              <button
                key={size}
                type="button"
                disabled={!available}
                aria-pressed={selected}
                title={available ? `${size} available` : `${size} not available`}
                onClick={() => setSelectedSize(size)}
                className={`relative grid h-11 w-11 place-items-center rounded-[10px] border text-sm font-black transition lg:size-12 lg:rounded-full lg:text-base ${
                  selected
                    ? "border-[#282c3f] bg-[#282c3f] text-white"
                    : available
                      ? "border-black/20 hover:border-[#D4AF36] hover:text-[#D4AF36]"
                      : "cursor-not-allowed border-black/10 bg-[#f5f5f6] text-black/25 line-through"
                }`}
              >
                {size}
                {lowStockLabel ? (
                  <span className="absolute -bottom-1 rounded-sm bg-[#D4AF36] px-2 py-0.5 text-[10px] font-black leading-none text-black">
                    {lowStockLabel}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {sizeChartOpen ? (
        <div
          className="fixed inset-0 z-[210] bg-black/45 px-0 sm:px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Size chart"
        >
          <button
            type="button"
            aria-label="Close size chart"
            className="absolute inset-0 cursor-default"
            onClick={() => setSizeChartOpen(false)}
          />

          <div className="relative ml-auto flex h-full w-full max-w-[530px] flex-col overflow-hidden bg-white text-[#10182f] shadow-2xl sm:border-l sm:border-black/10">
            <div className="shrink-0 border-b border-black/10 bg-white">
              <div className="flex items-start gap-4 px-5 py-4">
                <button
                  type="button"
                  aria-label="Close size chart"
                  onClick={() => setSizeChartOpen(false)}
                  className="grid size-7 shrink-0 place-items-center text-3xl font-light leading-none text-[#282c3f]"
                >
                  x
                </button>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-24 w-20 shrink-0 object-cover object-top"
                />
                <div className="min-w-0 pt-1">
                  <h2 className="text-base font-black leading-tight text-[#282c3f]">
                    Lotus Impex
                  </h2>
                  <p className="mt-1 line-clamp-2 text-sm leading-5 text-[#535766]">
                    {product.name}
                  </p>
                  <p className="mt-3 text-base font-black text-[#282c3f]">
                    Rs. 1080{" "}
                    <span className="font-normal text-[#94969f] line-through">
                      Rs. 1895
                    </span>{" "}
                    <span className="text-[#D4AF36]">(43% OFF)</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 border-t border-black/10">
                <button
                  type="button"
                  onClick={() => setSizeChartTab("chart")}
                  className={`min-h-14 border-b-2 text-base font-black transition ${
                    sizeChartTab === "chart"
                      ? "border-[#D4AF36] text-[#D4AF36]"
                      : "border-transparent text-[#282c3f]"
                  }`}
                >
                  Size Chart
                </button>
                <button
                  type="button"
                  onClick={() => setSizeChartTab("measure")}
                  className={`min-h-14 border-b-2 text-base font-medium transition ${
                    sizeChartTab === "measure"
                      ? "border-[#D4AF36] text-[#D4AF36]"
                      : "border-transparent text-[#282c3f]"
                  }`}
                >
                  How to measure
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto bg-[#f7f7f8]">
              {sizeChartTab === "chart" ? (
                <>
                  <div className="flex justify-end bg-white px-5 py-3">
                    <span className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-2 py-1 text-sm font-semibold text-[#282c3f]">
                      <span className="grid size-6 place-items-center rounded-full bg-[#10182f] text-xs font-black text-white">
                        in
                      </span>
                      cm
                    </span>
                  </div>

                  <div className="overflow-x-auto bg-white">
                    <table className="w-full min-w-[520px] border-collapse text-center text-sm text-[#282c3f]">
                      <thead>
                        <tr className="border-y border-black/10 text-sm font-black">
                          <th className="w-10 px-2 py-4" />
                          <th className="px-2 py-4">Size</th>
                          <th className="px-2 py-4">Bust</th>
                          <th className="px-2 py-4">To Fit<br />Bust</th>
                          <th className="px-2 py-4">Front<br />Length</th>
                          <th className="px-2 py-4">Across<br />Shoulder</th>
                          <th className="px-2 py-4">To Fit<br />Waist</th>
                          <th className="px-2 py-4">Waist</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sizeChartRows.map((row) => (
                          <tr key={row.size} className="border-b border-black/10">
                            <td className="px-2 py-3">
                              <button
                                type="button"
                                aria-label={`Select ${row.size}`}
                                onClick={() => setSelectedSize(row.size)}
                                className={`mx-auto block size-5 rounded-full border-2 ${
                                  selectedSize === row.size
                                    ? "border-[#D4AF36] bg-[#D4AF36] ring-2 ring-white"
                                    : "border-[#94969f]"
                                }`}
                              />
                            </td>
                            <td className="px-2 py-3">{row.size}</td>
                            <td className="px-2 py-3">{row.bust}</td>
                            <td className="px-2 py-3">{row.toFitBust}</td>
                            <td className="px-2 py-3">{row.frontLength}</td>
                            <td className="px-2 py-3">{row.shoulder}</td>
                            <td className="px-2 py-3">{row.toFitWaist}</td>
                            <td className="px-2 py-3">{row.waist}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : null}

              {sizeChartTab === "measure" ? (
              <section className="bg-white px-6 py-5">
                <h3 className="text-base font-black text-[#10182f]">
                  How to measure yourself
                </h3>
                <p className="mx-auto mt-6 max-w-sm text-center text-sm leading-5 text-[#535766]">
                  Find the size to fit your body measurements in the chart above.
                  Here is a handy body measurement guide:
                </p>
                <div className="mx-auto mt-4 max-w-[260px]">
                  <svg
                    aria-label="Body measurement guide"
                    viewBox="0 0 260 430"
                    className="h-auto w-full"
                    fill="none"
                  >
                    <g stroke="#b7b7b7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4">
                      <path d="M103 65c-7-8-8-25-2-39 5-12 17-20 30-20s25 8 30 20c6 14 5 31-2 39" />
                      <path d="M109 58c-5 9-14 15-24 19 8 2 16 1 23-3" />
                      <path d="M151 58c5 9 14 15 24 19-8 2-16 1-23-3" />
                      <path d="M103 83c-16 10-26 25-31 49l-13 67c-4 20-10 38-18 55-5 11 1 24 11 26 9 2 15-6 13-16-2-11 1-25 5-38l15-58" />
                      <path d="M157 83c16 10 26 25 31 49l13 67c4 20 10 38 18 55 5 11-1 24-11 26-9 2-15-6-13-16 2-11-1-25-5-38l-15-58" />
                      <path d="M90 112c8 21 12 45 12 75 0 22-4 48-11 75" />
                      <path d="M170 112c-8 21-12 45-12 75 0 22 4 48 11 75" />
                      <path d="M91 262c7 28 13 58 14 96 0 16-3 38-10 56" />
                      <path d="M169 262c-7 28-13 58-14 96 0 16 3 38 10 56" />
                      <path d="M106 414c-12 3-22 3-29 0 2-8 8-11 18-11" />
                      <path d="M154 414c12 3 22 3 29 0-2-8-8-11-18-11" />
                      <path d="M113 260c8 4 26 4 34 0" />
                    </g>
                    <g stroke="#D4AF36" strokeDasharray="3 3" strokeLinecap="round" strokeWidth="2">
                      <path d="M80 96c24 7 76 7 100 0" />
                      <path d="M91 154c24 8 54 8 78 0" />
                      <path d="M101 201c18 6 40 6 58 0" />
                      <path d="M81 248c28 11 70 11 98 0" />
                    </g>
                    <g fill="#535766" fontFamily="Arial, Helvetica, sans-serif" fontSize="16">
                      <text x="194" y="103">Shoulder</text>
                      <text x="194" y="161">Bust</text>
                      <text x="194" y="208">Waist</text>
                      <text x="194" y="255">Hips</text>
                    </g>
                  </svg>
                </div>
              </section>
              ) : null}
            </div>

            <div className="grid shrink-0 grid-cols-2 gap-3 border-t border-black/10 bg-white px-5 py-4">
              <WishlistLoginButton label product={product} />
              <AddToEnquiryButton
                product={product}
                fullWidth
                tone="myntra"
                selectedSize={selectedSize}
                disabled={!selectedSize}
                disabledLabel="Select Size"
                label="Add To Bag"
              />
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-4 grid gap-3 lg:mt-8 lg:grid-cols-[1fr_240px]">
        <div className="hidden">
          <p className="text-base font-black text-[#282c3f]">
            <span className="font-normal text-[#7e818c] line-through">â‚¹1699</span>{" "}
            â‚¹667 <span className="text-[#D4AF36]">(61% OFF)</span>
          </p>
          <p className="mt-1 text-base text-[#282c3f]">
            Seller: <span className="font-black text-[#D4AF36]">LOTUS IMPEX</span>
          </p>
        </div>
        {fixedButtonVisible ? (
          <div className="fixed inset-x-0 bottom-0 z-[120] bg-white px-5 pb-[calc(12px+env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_20px_rgba(40,44,63,0.12)] lg:hidden">
            <div className="mx-auto w-full max-w-[480px]">
              <AddToEnquiryButton
                product={product}
                fullWidth
                tone="myntra"
                selectedSize={selectedSize}
                disabled={addDisabled}
                disabledLabel={disabledLabel}
                label="Add To Bag"
              />
            </div>
          </div>
        ) : null}

        <div ref={inlineButtonRef} className="lg:hidden">
          <div className="bg-white py-3">
            <div className="mx-auto w-full max-w-[480px]">
              <AddToEnquiryButton
                product={product}
                fullWidth
                tone="myntra"
                selectedSize={selectedSize}
                disabled={addDisabled}
                disabledLabel={disabledLabel}
                label="Add To Bag"
              />
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <AddToEnquiryButton
            product={product}
            fullWidth
            tone="myntra"
            selectedSize={selectedSize}
            disabled={addDisabled}
            disabledLabel={disabledLabel}
            label="Add To Bag"
          />
        </div>
        <div className="hidden lg:block">
          <WishlistLoginButton label product={product} />
        </div>
      </div>

      <div className="mt-4 border-t border-black/10 pt-4 lg:mt-8 lg:pt-7">
        <div className="flex items-center gap-3 text-xl font-black text-[#282c3f] lg:text-base lg:uppercase">
          <span className="lg:hidden">Check Delivery</span>
          <span className="hidden lg:inline">Delivery Options</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          >
            <path d="M3 7h11v10H3z" />
            <path d="M14 10h3l3 3v4h-6z" />
            <circle cx="7" cy="19" r="1.5" />
            <circle cx="17" cy="19" r="1.5" />
          </svg>
        </div>
        <label className="mt-5 flex max-w-sm items-center overflow-hidden rounded-[8px] border border-[#d4d5d9] bg-white lg:mt-4 lg:rounded-[6px]">
          <span className="sr-only">Enter pincode</span>
          <input
            type="text"
            inputMode="numeric"
            value={pincode}
            onChange={(event) => {
              setPincode(event.target.value.replace(/\D/g, "").slice(0, 6));
              setDeliveryStatus("idle");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                checkDelivery();
              }
            }}
            placeholder="Enter PIN Code"
            className="min-h-12 min-w-0 flex-1 px-4 text-base font-semibold outline-none placeholder:text-[#D4AF36] lg:font-normal lg:placeholder:text-[#7e818c]"
          />
          <button
            type="button"
            onClick={checkDelivery}
            className="px-4 text-sm font-black text-[#D4AF36]"
          >
            Check
          </button>
        </label>
        {deliveryStatus === "valid" ? (
          <p className="mt-3 text-sm font-black text-[#03a685]">
            Delivery options available for PIN {pincode}.
          </p>
        ) : null}
        {deliveryStatus === "invalid" ? (
          <p className="mt-3 text-sm font-black text-[#D4AF36]">
            Please enter a valid 6 digit PIN code.
          </p>
        ) : null}
        <div className="mt-5 space-y-5 text-lg leading-6 text-[#282c3f] lg:mt-3 lg:space-y-3 lg:text-base">
          <p className="hidden lg:block">
            Please enter PIN code to check delivery time &amp; Pay on Delivery Availability
          </p>
          <p><span className="font-black">Express delivery</span> might be available</p>
          <p><span className="font-black">Pay on delivery</span> might be available</p>
          <p>
            <span className="font-black">Hassle free 7, 15 and 30 days</span> Return
            &amp; Exchange might be available
          </p>
        </div>
      </div>

      <section
        id="mobile-ratings-reviews"
        className="scroll-mt-24 border-t border-black/10 bg-white pt-5 lg:hidden"
      >
        <div className="text-[22px] font-bold leading-tight text-[#282c3f]">
          Ratings &amp; Reviews
        </div>

        <div className="mt-4 flex min-w-0 items-center gap-2">
          <span className="inline-flex min-h-11 shrink-0 items-center rounded-[9px] bg-[#1fa36f] px-3 text-xl font-bold text-white">
            4.3 <span className="ml-1 text-lg">★</span>
          </span>
          <span className="inline-flex min-h-11 min-w-0 items-center gap-2 rounded-[9px] bg-[#f5f5f6] px-3 text-sm font-medium text-[#535766]">
            <span>193 ratings</span>
            <span className="h-4 w-px bg-black/15" />
            <span>22 reviews</span>
            <span className="shrink-0 text-xl leading-none text-[#7e818c]">›</span>
          </span>
        </div>

        <div className="mt-4 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[0, 1].map((item) => (
            <div
              key={item}
              className="relative size-[78px] shrink-0 overflow-hidden rounded-[12px] bg-[#f5f5f6]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={`${product.name} customer photo ${item + 1}`}
                className="h-full w-full object-cover object-center"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="text-[21px] font-bold leading-tight text-[#282c3f]">
            Customer Reviews (22)
          </div>
          <button
            type="button"
            className="shrink-0 text-sm font-semibold text-[#282c3f] underline underline-offset-4"
          >
            View All
          </button>
        </div>

        <div className="-mx-5 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {mobileReviews.map((review) => (
            <article
              key={`${review.date}-${review.name}`}
              className="min-h-[184px] w-[min(306px,calc(100vw-54px))] shrink-0 snap-start rounded-[14px] border border-black/10 bg-white p-3 shadow-[0_4px_14px_rgba(40,44,63,0.08)]"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="shrink-0 rounded-md bg-[#1fa36f] px-2 py-1 text-xs font-black text-white">
                    5 ★
                  </span>
                  <span className="truncate text-sm font-semibold text-[#7e818c]">
                    {review.date}
                  </span>
                </div>
                <span className="shrink-0 rounded-[8px] bg-[#f5f5f6] px-3 py-1.5 text-sm font-black text-[#282c3f]">
                  Size: {review.size}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-[1fr_72px] gap-3">
                <p className="text-[15px] leading-6 text-[#282c3f]">
                  {review.text}
                </p>
                <div className="relative size-[72px] overflow-hidden rounded-[12px] bg-[#f5f5f6] shadow-lg shadow-black/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={`${product.name} review photo`}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>

              <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#535766]">
                <span className="grid size-4 place-items-center rounded-full border border-[#1fa36f] text-[10px] text-[#1fa36f]">
                  ✓
                </span>
                {review.name}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 hidden border-t border-black/10 pt-7 lg:block">
        <div className="flex items-center gap-2 text-base font-black uppercase text-[#282c3f]">
          <span>Ratings</span>
          <span className="text-xl font-normal leading-none">☆</span>
        </div>

        <div className="mt-8 flex items-center gap-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-6xl font-light leading-none text-[#282c3f]">
                4.3
              </span>
              <span className="text-4xl leading-none text-[#14958f]">★</span>
            </div>
            <p className="mt-5 text-base text-[#282c3f]">
              193 Verified Buyers
            </p>
          </div>

          <div className="h-[118px] w-px bg-black/10" />

          <div className="grid gap-2">
            {ratingBreakdown.map((rating) => (
              <div
                key={rating.label}
                className="grid grid-cols-[26px_150px_36px] items-center gap-2 text-sm text-[#535766]"
              >
                <span>
                  {rating.label} <span className="text-[#bfc0c6]">★</span>
                </span>
                <span className="h-1.5 overflow-hidden bg-[#f5f5f6]">
                  <span className={`block h-full ${rating.width} ${rating.color}`} />
                </span>
                <span className="text-[#282c3f]">{rating.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-black/10 pt-7">
          <h3 className="text-xl font-black text-[#282c3f]">
            Customer Photos (2)
          </h3>
          <div className="mt-4 flex gap-3">
            {[0, 1].map((item) => (
              <div
                key={item}
                className="relative size-[94px] overflow-hidden bg-[#f5f5f6]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={`${product.name} customer photo ${item + 1}`}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-black/10 pt-7">
          <h3 className="text-xl font-black text-[#282c3f]">
            Customer Reviews (22)
          </h3>
          <div className="mt-6 flex items-start gap-4">
            <span className="mt-1 bg-[#14958f] px-1.5 py-0.5 text-xs font-black text-white">
              5★
            </span>
            <div>
              <p className="text-lg text-[#282c3f]">
                Nice product, nice fabric
              </p>
              <div className="mt-3 relative size-[94px] overflow-hidden bg-[#f5f5f6]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={`${product.name} review photo`}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
