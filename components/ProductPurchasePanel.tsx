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

export default function ProductPurchasePanel({
  product,
  availableSizes,
  allSizes,
}: ProductPurchasePanelProps) {
  const [selectedSize, setSelectedSize] = useState("");
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
        <div className="flex items-center justify-between gap-5">
          <p className="text-xl font-black text-[#282c3f] lg:text-base lg:uppercase">
            <span className="lg:hidden">Select Size</span>
            <span className="hidden lg:inline">Select Size</span>
          </p>
          <button
            type="button"
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
          <WishlistLoginButton label />
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
    </>
  );
}
