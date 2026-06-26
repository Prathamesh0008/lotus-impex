"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

type CartItem = {
  slug: string;
  categorySlug: string;
  name: string;
  image: string;
  summary: string;
  minOrder: string;
  quantity?: number;
};

type PaymentMethod = "card" | "bank" | "upi";

const STORAGE_KEY = "lotus_impex_enquiry_basket";
const ORDER_KEY = "lotus_impex_last_order";
const USER_STORAGE_KEY = "lotus_impex_user";
const ESTIMATE_PER_ITEM = 125;

type SignedInUser = {
  name: string;
  email: string;
};

function loadCart() {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as CartItem[]) : [];
}

function loadSignedInUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(USER_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as SignedInUser;
  } catch {
    window.localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
}

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [signedInUser] = useState<SignedInUser | null>(loadSignedInUser);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bank");
  const [orderNumber, setOrderNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const totals = useMemo(() => {
    const totalQuantity = items.reduce(
      (sum, item) => sum + (item.quantity ?? 1),
      0
    );
    const subtotal = totalQuantity * ESTIMATE_PER_ITEM;
    const documentation = items.length > 0 ? 45 : 0;
    const handling = items.length > 0 ? 30 : 0;

    return {
      totalQuantity,
      subtotal,
      documentation,
      handling,
      grandTotal: subtotal + documentation + handling,
    };
  }, [items]);

  async function placeOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const order = {
      buyer: {
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        company: String(formData.get("company") || ""),
        phone: String(formData.get("phone") || ""),
      },
      delivery: {
        address: String(formData.get("address") || ""),
        country: String(formData.get("country") || ""),
        port: String(formData.get("port") || ""),
        terms: String(formData.get("terms") || ""),
      },
      items,
      totals,
      paymentMethod,
      account: signedInUser,
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      const result = (await response.json()) as {
        success?: boolean;
        orderNumber?: string;
        message?: string;
      };

      if (!response.ok || !result.success || !result.orderNumber) {
        throw new Error(result.message || "Unable to save order.");
      }

      window.localStorage.setItem(
        ORDER_KEY,
        JSON.stringify({ ...order, orderNumber: result.orderNumber })
      );
      window.localStorage.removeItem(STORAGE_KEY);
      setItems([]);
      setOrderNumber(result.orderNumber);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to save order. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (orderNumber) {
    return (
      <main className="grid min-h-[calc(100vh-74px)] place-items-center bg-[#f4efe7] px-5 py-10 text-black sm:min-h-[calc(100vh-80px)] sm:px-8 xl:min-h-[calc(100vh-96px)]">
        <section className="w-full max-w-[900px]">
          <div className="rounded-[8px] border border-black/10 bg-white px-6 py-12 text-center shadow-md shadow-black/10 sm:px-12 sm:py-16">
            <p className="mx-auto grid size-16 place-items-center rounded-full bg-[#c9a16b] text-2xl font-black text-black sm:size-20">
              {"\u2713"}
            </p>
            <p className="mt-7 text-xs font-black uppercase tracking-[0.32em] text-[#b58a52] sm:text-sm">
              Payment Request Created
            </p>
            <h1 className="mt-5 text-5xl leading-[0.9] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
              Order Submitted
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-black/60">
              Your checkout request is saved with order number{" "}
              <span className="font-black text-black">{orderNumber}</span>.
              Lotus Impex can now confirm final pricing, payment instructions
              and export documentation.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-black px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#6b3f24] sm:min-w-[290px]"
              >
                Continue Shopping
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-black/15 px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white sm:min-w-[240px]"
              >
                Contact Team
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4efe7] px-4 py-6 text-black sm:px-6 lg:px-8">
      <section className="mx-auto max-w-[1240px]">
        <div className="mb-5">
          <p className="mb-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#b58a52]">
            Secure Checkout
          </p>
          <h1 className="text-3xl font-black leading-tight text-[#282c3f] sm:text-4xl">
            Checkout & Payment
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-black/55">
            Enter delivery and payment details to submit your order request.
          </p>
        </div>

        {items.length > 0 ? (
          <form
            onSubmit={placeOrder}
            className="grid gap-5 lg:grid-cols-[1fr_360px]"
          >
            <div className="grid gap-4">
              <section className="rounded-[8px] border border-black/10 bg-white p-4 shadow-sm">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#b58a52]">
                  Buyer Information
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  <input
                    required
                    name="name"
                    defaultValue={signedInUser?.name || ""}
                    placeholder="Full name"
                    className="rounded-[8px] border border-black/10 bg-[#f4efe7] px-4 py-3 text-sm font-bold outline-none focus:border-black focus:bg-white"
                  />
                  <input
                    required
                    type="email"
                    name="email"
                    defaultValue={signedInUser?.email || ""}
                    placeholder="Email address"
                    className="rounded-[8px] border border-black/10 bg-[#f4efe7] px-4 py-3 text-sm font-bold outline-none focus:border-black focus:bg-white"
                  />
                  <input
                    required
                    name="company"
                    placeholder="Company name"
                    className="rounded-[8px] border border-black/10 bg-[#f4efe7] px-4 py-3 text-sm font-bold outline-none focus:border-black focus:bg-white"
                  />
                  <input
                    required
                    name="phone"
                    placeholder="Phone / WhatsApp"
                    className="rounded-[8px] border border-black/10 bg-[#f4efe7] px-4 py-3 text-sm font-bold outline-none focus:border-black focus:bg-white"
                  />
                </div>
              </section>

              <section className="rounded-[8px] border border-black/10 bg-white p-4 shadow-sm">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#b58a52]">
                  Delivery Details
                </p>
                <div className="grid gap-3">
                  <textarea
                    required
                    name="address"
                    placeholder="Shipping address"
                    rows={3}
                    className="resize-none rounded-[8px] border border-black/10 bg-[#f4efe7] px-4 py-3 text-sm font-bold outline-none focus:border-black focus:bg-white"
                  />
                  <div className="grid gap-3 md:grid-cols-3">
                    <input
                      required
                      name="country"
                      placeholder="Country"
                      className="rounded-[8px] border border-black/10 bg-[#f4efe7] px-4 py-3 text-sm font-bold outline-none focus:border-black focus:bg-white"
                    />
                    <input
                      name="port"
                      placeholder="Destination port"
                      className="rounded-[8px] border border-black/10 bg-[#f4efe7] px-4 py-3 text-sm font-bold outline-none focus:border-black focus:bg-white"
                    />
                    <select
                      name="terms"
                      className="rounded-[8px] border border-black/10 bg-[#f4efe7] px-4 py-3 text-sm font-bold outline-none focus:border-black focus:bg-white"
                    >
                      <option>FOB</option>
                      <option>CIF</option>
                      <option>EXW</option>
                      <option>DAP</option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="rounded-[8px] border border-black/10 bg-white p-4 shadow-sm">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#b58a52]">
                  Payment Method
                </p>
                <div className="grid gap-2 md:grid-cols-3">
                  {[
                    ["card", "Card Payment"],
                    ["bank", "Bank Transfer"],
                    ["upi", "UPI / Online"],
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setPaymentMethod(value as PaymentMethod)}
                      className={`rounded-[8px] border px-4 py-3 text-left text-sm font-black transition ${
                        paymentMethod === value
                          ? "border-black bg-black text-white"
                          : "border-black/10 bg-[#f4efe7] text-black hover:border-black"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {paymentMethod === "card" ? (
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <input
                      required
                      name="cardNumber"
                      placeholder="Card number"
                      inputMode="numeric"
                      className="rounded-[8px] border border-black/10 bg-[#f4efe7] px-4 py-3 text-sm font-bold outline-none focus:border-black focus:bg-white md:col-span-2"
                    />
                    <input
                      required
                      name="expiry"
                      placeholder="MM / YY"
                      className="rounded-[8px] border border-black/10 bg-[#f4efe7] px-4 py-3 text-sm font-bold outline-none focus:border-black focus:bg-white"
                    />
                    <input
                      required
                      name="cvv"
                      placeholder="CVV"
                      inputMode="numeric"
                      className="rounded-[8px] border border-black/10 bg-[#f4efe7] px-4 py-3 text-sm font-bold outline-none focus:border-black focus:bg-white"
                    />
                  </div>
                ) : (
                  <div className="mt-3 rounded-[8px] border border-black/10 bg-[#f4efe7] p-4 text-sm leading-6 text-black/60">
                    Payment instructions will be shared after order review and
                    final quotation confirmation.
                  </div>
                )}
              </section>
            </div>

            <aside className="h-fit rounded-[8px] border border-black/10 bg-white p-4 shadow-sm lg:sticky lg:top-28">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#b58a52]">
                Cart Summary
              </p>
              <div className="mt-3 grid gap-3">
                {items.map((item) => (
                  <div
                    key={`${item.categorySlug}-${item.slug}`}
                    className="grid grid-cols-[58px_1fr] gap-3 rounded-[8px] bg-[#f4efe7] p-2.5"
                  >
                    <div className="relative h-16 overflow-hidden rounded-[8px] bg-black">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="72px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="line-clamp-2 text-sm font-black leading-5">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs font-bold text-black/50">
                        Qty {item.quantity ?? 1} / MOQ {item.minOrder}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-2 border-y border-black/10 py-4 text-sm font-bold">
                <div className="flex justify-between">
                  <span className="text-black/55">Subtotal</span>
                  <span>${totals.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/55">Documentation</span>
                  <span>${totals.documentation.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/55">Handling</span>
                  <span>${totals.handling.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-4 flex items-end justify-between gap-4">
                <span className="text-xs font-black uppercase tracking-[0.22em] text-black/40">
                  Payable Estimate
                </span>
                <span className="text-2xl font-black">
                  ${totals.grandTotal.toLocaleString()}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-black px-6 py-3.5 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#6b3f24] disabled:cursor-not-allowed disabled:bg-black/40"
              >
                {isSubmitting ? "Saving Order..." : "Place Order"}
              </button>

              {submitError ? (
                <p className="mt-4 rounded-[8px] bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                  {submitError}
                </p>
              ) : null}

              <Link
                href="/enquiry-basket"
                className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-black/15 px-6 py-3.5 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white"
              >
                Back To Cart
              </Link>
            </aside>
          </form>
        ) : (
          <div className="rounded-[8px] border border-black/10 bg-white p-10 text-center shadow-sm">
            <h2 className="text-5xl leading-[0.9] tracking-[-0.05em]">
              No Items To Checkout
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-black/55">
              Add products to your cart before starting checkout.
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
    </main>
  );
}

