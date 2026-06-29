"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type BasketItem = {
  slug: string;
  categorySlug: string;
  name: string;
  image: string;
  summary: string;
  minOrder: string;
  quantity?: number;
  selectedSize?: string;
};

const STORAGE_KEY = "lotus_impex_enquiry_basket";
const CART_UPDATED_EVENT = "lotus-impex-cart-updated";
const ESTIMATE_PER_ITEM = 125;
const ESTIMATE_MRP_PER_ITEM = 215;
const PLATFORM_FEE = 23;

function loadBasket() {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as BasketItem[]) : [];
}

function saveBasket(items: BasketItem[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

function getItemKey(item: BasketItem) {
  return `${item.categorySlug}-${item.slug}-${item.selectedSize ?? "default"}`;
}

export default function EnquiryBasketPage() {
  const [items, setItems] = useState<BasketItem[]>(loadBasket);
  const [selectedKeys, setSelectedKeys] = useState<string[]>(() =>
    loadBasket().map(getItemKey)
  );
  const [couponOpen, setCouponOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [pincodeOpen, setPincodeOpen] = useState(false);
  const [pincode, setPincode] = useState("");
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const selectedItems = useMemo(
    () => items.filter((item) => selectedKeys.includes(getItemKey(item))),
    [items, selectedKeys]
  );
  const selectedTotal = selectedItems.reduce(
    (sum, item) => sum + (item.quantity ?? 1) * ESTIMATE_PER_ITEM,
    0
  );
  const allSelected = items.length > 0 && selectedKeys.length === items.length;

  const totals = useMemo(() => {
    const totalQuantity = selectedItems.reduce(
      (sum, item) => sum + (item.quantity ?? 1),
      0
    );

    return {
      totalQuantity,
      subtotal: totalQuantity * ESTIMATE_PER_ITEM,
      totalMrp: totalQuantity * ESTIMATE_MRP_PER_ITEM,
      platformFee: selectedItems.length > 0 ? PLATFORM_FEE : 0,
    };
  }, [selectedItems]);

  const discount = Math.max(0, totals.totalMrp - totals.subtotal);
  const grandTotal = totals.subtotal + totals.platformFee;

  function updateQuantity(
    slug: string,
    categorySlug: string,
    selectedSize: string | undefined,
    quantity: number
  ) {
    const nextItems = items.map((item) =>
      item.slug === slug &&
      item.categorySlug === categorySlug &&
      item.selectedSize === selectedSize
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    );

    setItems(nextItems);
    saveBasket(nextItems);
  }

  function toggleItem(item: BasketItem) {
    const key = getItemKey(item);
    setSelectedKeys((current) =>
      current.includes(key)
        ? current.filter((itemKey) => itemKey !== key)
        : [...current, key]
    );
  }

  function toggleAll() {
    setSelectedKeys(allSelected ? [] : items.map(getItemKey));
  }

  function removeItem(
    slug: string,
    categorySlug: string,
    selectedSize?: string
  ) {
    const nextItems = items.filter(
      (item) =>
        !(
          item.slug === slug &&
          item.categorySlug === categorySlug &&
          item.selectedSize === selectedSize
        )
    );

    setItems(nextItems);
    setSelectedKeys((current) =>
      current.filter(
        (key) =>
          key !==
          `${categorySlug}-${slug}-${selectedSize ?? "default"}`
      )
    );
    saveBasket(nextItems);
  }

  function clearBasket() {
    if (selectedKeys.length === 0) return;

    const nextItems = items.filter(
      (item) => !selectedKeys.includes(getItemKey(item))
    );

    setItems(nextItems);
    setSelectedKeys(nextItems.map(getItemKey));
    saveBasket(nextItems);
  }

  function moveSelectedToWishlist() {
    setSelectedKeys([]);
    setWishlistOpen(false);
  }

  function requestWishlistMove() {
    if (selectedKeys.length === 0) return;
    setWishlistOpen(true);
  }

  async function shareSelectedItems() {
    const selectedNames = selectedItems.map((item) => item.name).join(", ");
    const shareText =
      selectedNames.length > 0
        ? `Lotus Impex order: ${selectedNames}`
        : "Lotus Impex order";

    if (navigator.share) {
      await navigator.share({
        title: "Lotus Impex Shopping Bag",
        text: shareText,
        url: window.location.href,
      });
      return;
    }

    await navigator.clipboard?.writeText(`${shareText} - ${window.location.href}`);
  }

  return (
    <main className="min-h-screen bg-white text-[#282c3f]">
      <div className="flex h-14 items-center justify-between border-b border-black/10 bg-white px-5 sm:h-[70px]">
        <Link
          href="/products"
          aria-label="Go back"
          className="grid size-9 place-items-center text-3xl font-light leading-none text-[#282c3f]"
        >
          &lt;
        </Link>
        <p className="flex-1 pl-2 text-base font-black uppercase tracking-[0.04em] text-[#424553]">
          Shopping Bag
        </p>
        <p className="text-sm font-semibold uppercase text-[#424553]">
          Step 1/3
        </p>
      </div>

      <div className="hidden">
        <div className="relative mx-auto flex max-w-[1190px] items-center justify-center gap-2 text-[11px] font-black uppercase tracking-[0.28em] text-[#696b79] sm:gap-3 sm:text-xs sm:tracking-[0.42em]">
          <span className="border-b-2 border-[#D4AF36] pb-2 text-[#b58a00]">
            Bag
          </span>
          <span className="w-8 border-t border-dashed border-[#696b79] sm:w-16" />
          <span>Address</span>
          <span className="w-8 border-t border-dashed border-[#696b79] sm:w-16" />
          <span>Payment</span>
          <span className="absolute right-0 top-1/2 hidden -translate-y-1/2 items-center gap-2 tracking-[0.18em] text-[#03a685] lg:flex">
            <span className="grid size-8 place-items-center rounded-b-[12px] rounded-t-[4px] bg-[#03a685] text-sm text-white">
              {"\u2713"}
            </span>
            100% Secure
          </span>
        </div>
      </div>

      <section className="w-full px-0 pb-28 pt-0">
        {items.length > 0 ? (
          <div className="grid w-full gap-0">
            <div className="grid w-full gap-0">
              <div className="flex min-h-[82px] items-center justify-between gap-3 border-b border-black/5 bg-white px-4 pb-3 pt-6">
                <p className="text-base font-black leading-5 text-[#282c3f]">
                  Check delivery time & services
                </p>
                <button
                  type="button"
                  onClick={() => setPincodeOpen(true)}
                  className="shrink-0 px-0 py-0 text-base font-black uppercase leading-5 tracking-[0.02em] text-[#b58a00] transition hover:text-black"
                >
                  Enter PIN Code
                </button>
              </div>

              <div className="mb-0 flex min-h-[91px] items-center justify-between bg-[#f5f5f6] px-[22px] py-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label={allSelected ? "Unselect all items" : "Select all items"}
                    aria-pressed={allSelected}
                    onClick={toggleAll}
                    className={`grid size-5 shrink-0 place-items-center rounded-[4px] border-2 border-[#D4AF36] text-[11px] font-black leading-none transition ${
                      allSelected
                        ? "bg-[#D4AF36] text-black"
                        : "bg-white"
                    }`}
                  >
                    {allSelected ? "\u2713" : ""}
                  </button>
                  <div>
                    <p className="text-base font-black uppercase leading-5 tracking-[0.02em] text-[#424553]">
                      {selectedKeys.length}/{items.length} Items Selected
                    </p>
                    <p className="text-sm font-black text-[#b58a00]">
                      (${selectedTotal.toLocaleString()})
                    </p>
                  </div>
                </div>
                <div className="hidden">
                  <button
                    type="button"
                    onClick={clearBasket}
                    disabled={selectedKeys.length === 0}
                    className="transition hover:text-[#b58a00] disabled:text-black/25"
                  >
                    Remove
                  </button>
                  <span className="h-10 w-px bg-black/15" />
                  <button
                    type="button"
                    onClick={requestWishlistMove}
                    disabled={selectedKeys.length === 0}
                    className="transition hover:text-[#b58a00] disabled:text-black/25"
                  >
                    <span className="hidden sm:inline">Move To </span>Wishlist
                  </button>
                </div>
                <div className="flex items-center gap-4 text-[#10182f] min-[390px]:gap-[22px]">
                  <button
                    type="button"
                    onClick={shareSelectedItems}
                    disabled={selectedKeys.length === 0}
                    className="grid size-7 place-items-center transition hover:text-[#b58a00] disabled:text-black/25"
                    aria-label="Share selected items"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="size-[18px]"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <path d="M8.6 10.6 15.4 6.4" />
                      <path d="M8.6 13.4 15.4 17.6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={clearBasket}
                    disabled={selectedKeys.length === 0}
                    className="grid size-7 place-items-center transition hover:text-[#b58a00] disabled:text-black/25"
                    aria-label="Remove selected items"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="size-[18px]"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M3 6h18" />
                      <path d="M8 6V4h8v2" />
                      <path d="M6 6l1 15h10l1-15" />
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={requestWishlistMove}
                    disabled={selectedKeys.length === 0}
                    className="grid size-7 place-items-center transition hover:text-[#b58a00] disabled:text-black/25"
                    aria-label="Move selected items to wishlist"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="size-[18px]"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
                      <path d="m15 5 4 4" />
                      <path d="m17 3 4 4" />
                    </svg>
                  </button>
                </div>
              </div>

              {items.map((item) => {
                const quantity = item.quantity ?? 1;
                const itemKey = getItemKey(item);
                const selected = selectedKeys.includes(itemKey);

                return (
                  <article
                    key={itemKey}
                    className="relative grid grid-cols-[128px_minmax(0,1fr)] gap-3 border-b-[8px] border-[#f5f5f6] bg-white px-3 py-[13px] min-[390px]:grid-cols-[160px_minmax(0,1fr)] min-[390px]:gap-[14px] min-[390px]:px-[17px] sm:grid-cols-[139px_minmax(0,1fr)]"
                  >
                    <button
                      type="button"
                      aria-label={selected ? `Unselect ${item.name}` : `Select ${item.name}`}
                      aria-pressed={selected}
                      onClick={() => toggleItem(item)}
                      className={`absolute left-[17px] top-[18px] z-10 grid size-5 place-items-center rounded-[4px] border-2 border-[#D4AF36] text-[11px] font-black leading-none transition min-[390px]:left-[22px] ${
                        selected
                          ? "bg-[#D4AF36] text-black"
                          : "bg-white"
                      }`}
                    >
                      {selected ? "\u2713" : ""}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        removeItem(
                          item.slug,
                          item.categorySlug,
                          item.selectedSize
                        )
                      }
                      className="absolute right-[15px] top-[14px] grid size-7 place-items-center text-2xl font-light leading-none text-black transition hover:text-[#b58a00]"
                      aria-label={`Remove ${item.name}`}
                    >
                      x
                    </button>
                    <Link
                      href={`/products/${item.categorySlug}/${item.slug}`}
                      className="relative h-[174px] overflow-hidden bg-[#f5f5f6] min-[390px]:h-[220px] sm:h-[184px]"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="139px"
                        className="object-cover"
                      />
                    </Link>

                    <div className="flex min-w-0 flex-col justify-start gap-0 pr-2 min-[390px]:pr-4">
                      <div>
                        <h2 className="line-clamp-1 font-sans text-sm font-black leading-[18px] text-[#10182f] min-[390px]:text-[15px] min-[390px]:leading-[19px]">
                          {item.name}
                        </h2>
                        <p className="mt-0.5 line-clamp-1 text-[15px] leading-5 text-[#282c3f] min-[390px]:text-[17px] min-[390px]:leading-[21px]">
                          {item.summary}
                        </p>
                        <p className="mt-0.5 line-clamp-1 text-sm leading-[19px] text-[#94969f]">
                          Sold by: LOTUS IMPEX
                        </p>

                        <div className="mt-[9px] grid grid-cols-[68px_62px] items-center gap-2 min-[390px]:grid-cols-[92px_82px] min-[390px]:gap-[12px]">
                          <span className="inline-flex min-h-[24px] items-center bg-[#f5f5f6] px-1.5 py-0 text-[13px] font-black leading-none text-[#282c3f] min-[390px]:px-2.5 min-[390px]:text-sm">
                            Size: {item.selectedSize ?? "One Size"}
                          </span>
                          <label className="inline-flex min-h-[24px] items-center bg-[#f5f5f6] px-1.5 py-0 text-[13px] font-black leading-none text-[#282c3f] min-[390px]:px-2.5 min-[390px]:text-sm">
                            Qty:{" "}
                            <select
                              value={quantity}
                              onChange={(event) =>
                                updateQuantity(
                                  item.slug,
                                  item.categorySlug,
                                  item.selectedSize,
                                  Number(event.target.value)
                                )
                              }
                              className="bg-transparent font-black outline-none"
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                                <option key={value} value={value}>
                                  {value}
                                </option>
                              ))}
                            </select>
                          </label>
                        </div>

                        <div className="mt-[10px]">
                          <div className="flex items-baseline gap-2">
                            <span className="text-base font-black leading-5 text-[#10182f]">
                              ${((item.quantity ?? 1) * ESTIMATE_PER_ITEM).toLocaleString()}
                            </span>
                            <span className="text-sm leading-5 text-[#94969f] line-through">
                              ${((item.quantity ?? 1) * ESTIMATE_MRP_PER_ITEM).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm font-bold leading-[18px] text-[#b58a00]">
                            ${((item.quantity ?? 1) * (ESTIMATE_MRP_PER_ITEM - ESTIMATE_PER_ITEM)).toLocaleString()} OFF
                          </p>
                        </div>
                        <p className="mt-[7px] flex items-center gap-1.5 text-sm font-bold leading-5 text-[#10182f]">
                          <span className="grid size-4 place-items-center rounded-full border border-[#10182f] text-[10px] leading-none">
                            ↺
                          </span>
                          10 days return available
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-[0.08em]">
                        <Link
                          href={`/products/${item.categorySlug}/${item.slug}`}
                          className="hidden text-[#424553] transition hover:text-[#b58a00] sm:inline"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside className="hidden">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[#424553]">
                Coupons
              </p>

              <div className="mt-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="grid size-7 place-items-center rounded-full border border-black/15 text-sm font-black text-[#b58a00]">
                    %
                  </span>
                  <span className="font-black text-[#10182f]">Apply Coupons</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCouponOpen(true)}
                  className="rounded-[3px] border border-[#D4AF36] px-7 py-2.5 text-xs font-black uppercase tracking-[0.08em] text-[#b58a00] transition hover:bg-[#D4AF36] hover:text-black"
                >
                  Apply
                </button>
              </div>

              <p className="mt-5 border-b border-black/10 pb-5 text-base text-[#10182f]">
                <span className="font-black text-[#b58a00]">Login</span> to get export buyer offers on your first order.
              </p>

              <div className="border-b border-black/10 py-5">
                <p className="text-xs font-black uppercase tracking-[0.08em] text-[#424553]">
                  Support Export Documentation
                </p>
                <label className="mt-5 flex items-center gap-3 text-base font-black text-[#10182f]">
                  <input
                    type="checkbox"
                    className="size-5 accent-[#D4AF36]"
                  />
                  Add inspection and packing support
                </label>
                <div className="mt-5 flex flex-wrap gap-3">
                  {["$10", "$20", "$50", "$100"].map((value) => (
                    <button
                      key={value}
                      type="button"
                      className="rounded-full border border-black/15 px-5 py-2 text-sm font-black transition hover:border-[#D4AF36] hover:text-[#b58a00]"
                    >
                      {value}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-5 text-sm font-black text-[#b58a00]"
                >
                  Know More
                </button>
              </div>

              <div className="py-6">
                <p className="text-xs font-black uppercase tracking-[0.12em] text-[#424553]">
                  Price Details ({selectedKeys.length} Items)
                </p>
              </div>

              <div className="grid gap-4 text-base text-[#10182f]">
                <div className="flex justify-between gap-4">
                  <span>Total MRP</span>
                  <span>${totals.totalMrp.toLocaleString()}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Discount on MRP</span>
                  <span className="text-[#03a685]">- ${discount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Coupon Discount</span>
                  <button
                    type="button"
                    onClick={() => setCouponOpen(true)}
                    className="font-black text-[#b58a00]"
                  >
                    Apply Coupon
                  </button>
                </div>
                <div className="flex justify-between gap-4">
                  <span>
                    Platform Fee{" "}
                    <button type="button" className="font-black text-[#b58a00]">
                      Know More
                    </button>
                  </span>
                  <span>${totals.platformFee.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-5 text-base font-black text-[#10182f]">
                <span>
                  Total Amount
                </span>
                <span>
                  ${grandTotal.toLocaleString()}
                </span>
              </div>

              <p className="mt-5 text-sm leading-6 text-[#10182f]">
                By placing the order, you agree to Lotus Impex order terms and buyer confirmation process.
              </p>

              <Link
                href="/checkout"
                className="mt-3 inline-flex w-full items-center justify-center rounded-[3px] bg-[#D4AF36] px-6 py-4 text-sm font-black uppercase tracking-[0.1em] text-black transition hover:bg-black hover:text-white"
              >
                Place Order
              </Link>

              <Link
                href="/products"
                className="mt-3 inline-flex w-full items-center justify-center rounded-[3px] border border-black/15 px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white"
              >
                Continue Shopping
              </Link>
            </aside>

            <div className="fixed inset-x-0 bottom-0 z-[120] border-t border-black/15 bg-white">
              <p className="bg-[#fffaf4] px-4 py-2 text-center text-sm font-black text-[#10182f]">
                {selectedKeys.length} Items selected for order
              </p>
              <div className="px-4 py-3">
                <Link
                  href="/checkout"
                  className={`flex min-h-14 w-full items-center justify-center rounded-[3px] text-base font-black uppercase tracking-[0.08em] ${
                    selectedKeys.length > 0
                      ? "bg-[#D4AF36] text-black"
                      : "pointer-events-none bg-black/10 text-black/35"
                  }`}
                >
                  Place Order
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-[8px] border border-black/10 bg-white p-10 text-center shadow-sm">
            <h2 className="text-5xl leading-[0.9] tracking-[-0.05em]">
              Your Cart Is Empty
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-black/55">
              Browse product categories and add products to your cart before
              checkout.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-flex rounded-full bg-black px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#6b3f24]"
            >
              Browse Catalogue
            </Link>
          </div>
        )}
      </section>
      {wishlistOpen ? (
        <div
          className="fixed inset-0 z-[200] flex items-end justify-center bg-black/60 px-4 pb-8 sm:items-center sm:py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="wishlist-title"
        >
          <div className="w-full max-w-[400px] overflow-hidden rounded-t-[4px] bg-white shadow-2xl sm:rounded-[4px]">
            <div className="flex items-start justify-between gap-4 px-5 pb-7 pt-8">
              <div>
                <h2
                  id="wishlist-title"
                  className="text-base font-black text-[#282c3f]"
                >
                  Move {selectedKeys.length}{" "}
                  {selectedKeys.length === 1 ? "item" : "items"} to wishlist
                </h2>
                <p className="mt-3 text-base leading-6 text-[#282c3f]">
                  Are you sure you want to move {selectedKeys.length}{" "}
                  {selectedKeys.length === 1 ? "item" : "items"} from bag.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setWishlistOpen(false)}
                className="grid size-8 shrink-0 place-items-center text-4xl font-light leading-none text-black transition hover:text-[#b58a00]"
                aria-label="Close wishlist confirmation"
              >
                x
              </button>
            </div>

            <div className="grid grid-cols-2 border-t border-black/10">
              <button
                type="button"
                onClick={() => setWishlistOpen(false)}
                className="min-h-14 border-r border-black/10 text-sm font-black uppercase tracking-[0.04em] text-[#696b79] transition hover:text-[#b58a00]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={moveSelectedToWishlist}
                className="min-h-14 text-sm font-black uppercase tracking-[0.04em] text-[#b58a00] transition hover:bg-[#fffaf4]"
              >
                Move To Wishlist
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {couponOpen ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="coupon-title"
        >
          <div className="flex max-h-[calc(100vh-64px)] w-full max-w-[625px] flex-col overflow-hidden rounded-[4px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
              <h2
                id="coupon-title"
                className="text-base font-black uppercase tracking-[0.04em] text-[#282c3f]"
              >
                Apply Coupon
              </h2>
              <button
                type="button"
                onClick={() => setCouponOpen(false)}
                className="grid size-10 place-items-center text-4xl font-light leading-none text-black transition hover:text-[#b58a00]"
                aria-label="Close coupon form"
              >
                x
              </button>
            </div>

            <div className="border-b border-black/10 bg-white px-7 py-7">
              <label className="flex min-h-14 items-center rounded-[4px] border border-black/15 bg-white px-5 focus-within:border-[#D4AF36]">
                <span className="sr-only">Enter coupon code</span>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(event) =>
                    setCouponCode(event.target.value.toUpperCase())
                  }
                  placeholder="Enter coupon code"
                  className="min-w-0 flex-1 text-base font-semibold uppercase outline-none placeholder:normal-case placeholder:text-[#696b79]"
                />
                <button
                  type="button"
                  className="px-2 text-sm font-black uppercase tracking-[0.08em] text-[#b58a00]"
                >
                  Check
                </button>
              </label>
            </div>

            <div className="min-h-[360px] flex-1 bg-[#f5f5f6] px-7 py-6">
              <div className="grid grid-cols-[24px_1fr] gap-5">
                <span className="mt-2 block size-5 rounded-[4px] border-2 border-[#D4AF36] bg-[#D4AF36] shadow-[inset_0_0_0_3px_white]" />
                <div>
                  <p className="inline-flex border border-dashed border-[#D4AF36] px-5 py-3 text-base font-black uppercase tracking-[0.06em] text-[#b58a00]">
                    LotusSave
                  </p>
                  <p className="mt-5 text-base font-black text-[#10182f]">
                    Save $202
                  </p>
                  <p className="mt-2 text-base leading-7 text-[#10182f]">
                    25% off up to $200 on minimum export basket value of $750.
                  </p>
                  <p className="text-base leading-7 text-[#10182f]">
                    Expires on: 30th August 2026 | 11:59 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 border-t border-black/10 bg-white px-7 py-4 sm:grid-cols-[160px_1fr] sm:items-center">
              <div>
                <p className="text-xs font-black text-[#696b79]">
                  Maximum savings:
                </p>
                <p className="text-xl font-black text-[#10182f]">$202</p>
              </div>
              <button
                type="button"
                onClick={() => setCouponOpen(false)}
                className="min-h-12 rounded-[3px] bg-[#D4AF36] px-8 text-base font-black uppercase tracking-[0.08em] text-black transition hover:bg-black hover:text-white"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {pincodeOpen ? (
        <div
          className="fixed inset-0 z-[200] flex items-start justify-center bg-black/60 px-4 py-8 sm:py-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pincode-title"
        >
          <div className="w-full max-w-[552px] overflow-hidden rounded-[4px] bg-white shadow-2xl">
            <div className="flex min-h-[74px] items-center justify-between border-b border-black/10 px-5 sm:px-6">
              <h2
                id="pincode-title"
                className="text-lg font-black leading-none text-[#10182f]"
              >
                Enter Delivery Pincode
              </h2>
              <button
                type="button"
                onClick={() => setPincodeOpen(false)}
                className="grid size-9 place-items-center text-3xl font-light leading-none text-black transition hover:text-[#b58a00]"
                aria-label="Close pincode form"
              >
                x
              </button>
            </div>

            <div className="bg-[#f5f5f6] px-6 py-6">
              <label className="flex min-h-[54px] items-center rounded-[4px] border border-black/15 bg-white px-4 focus-within:border-[#D4AF36]">
                <span className="sr-only">Enter pincode</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={pincode}
                  onChange={(event) =>
                    setPincode(event.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="Enter Pincode"
                  className="min-w-0 flex-1 text-base font-semibold outline-none placeholder:font-normal placeholder:text-[#696b79]"
                />
                <button
                  type="button"
                  onClick={() => setPincodeOpen(false)}
                  className="px-3 text-sm font-black uppercase tracking-[0.08em] text-[#b58a00] disabled:text-[#94969f]"
                  disabled={pincode.length !== 6}
                >
                  Check
                </button>
              </label>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
