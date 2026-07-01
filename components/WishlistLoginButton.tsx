"use client";

import { useState } from "react";
import type { ExportProduct } from "@/data/products";

type WishlistLoginButtonProps = {
  label?: boolean;
  product?: Pick<
    ExportProduct,
    "slug" | "categorySlug" | "name" | "image" | "summary" | "minOrder"
  >;
};

const USER_STORAGE_KEY = "lotus_impex_user";
const USER_UPDATED_EVENT = "lotus-impex-user-updated";
const WISHLIST_STORAGE_KEY = "lotus_impex_wishlist";
const WISHLIST_UPDATED_EVENT = "lotus-impex-wishlist-updated";

type WishlistItem = NonNullable<WishlistLoginButtonProps["product"]> & {
  addedAt: string;
};

function addProductToWishlist(product: WishlistLoginButtonProps["product"]) {
  if (!product) return;

  const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
  const existing = raw ? (JSON.parse(raw) as WishlistItem[]) : [];
  const alreadySaved = existing.some(
    (item) => item.slug === product.slug && item.categorySlug === product.categorySlug
  );
  const nextItems = alreadySaved
    ? existing
    : [
        ...existing,
        {
          ...product,
          addedAt: new Date().toISOString(),
        },
      ];

  window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(nextItems));
  window.dispatchEvent(new Event(WISHLIST_UPDATED_EVENT));
}

function createOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export default function WishlistLoginButton({
  label = false,
  product,
}: WishlistLoginButtonProps) {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [step, setStep] = useState<"mobile" | "otp" | "done">("mobile");
  const [message, setMessage] = useState("");
  const canContinue = mobile.trim().length >= 10 && accepted;
  const canVerify = enteredOtp.trim().length === 6;

  function resetModal() {
    setOpen(false);
    setEnteredOtp("");
    setStep("mobile");
    setMessage("");
  }

  function handleOpen() {
    try {
      const rawUser = window.localStorage.getItem(USER_STORAGE_KEY);
      if (rawUser) {
        addProductToWishlist(product);
        setMessage("Added to wishlist.");
        return;
      }
    } catch {
      window.localStorage.removeItem(USER_STORAGE_KEY);
    }

    setOpen(true);
  }

  function sendOtp() {
    if (!canContinue) return;
    const nextOtp = createOtp();
    setOtp(nextOtp);
    setEnteredOtp("");
    setStep("otp");
    setMessage(`OTP sent. Demo OTP: ${nextOtp}`);
  }

  function verifyOtp() {
    if (enteredOtp !== otp) {
      setMessage("Please enter the correct OTP.");
      return;
    }

    const user = {
      name: `Buyer ${mobile.slice(-4)}`,
      email: `+91 ${mobile}`,
      mobile,
    };

    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event(USER_UPDATED_EVENT));
    addProductToWishlist(product);
    setStep("done");
    setMessage("Login successful. Product added to wishlist.");
    window.setTimeout(resetModal, 1100);
  }

  return (
    <>
      <button
        type="button"
        aria-label="Add product to wishlist"
        onClick={handleOpen}
        className={
          label
            ? "flex min-h-12 w-full items-center justify-center gap-3 rounded-[4px] border border-[#d4d5d9] bg-white px-6 py-4 text-base font-black uppercase text-[#282c3f] transition hover:border-[#282c3f]"
            : "grid size-9 shrink-0 place-items-center rounded-[8px] border border-[#d4d5d9] bg-white text-[#282c3f] transition hover:border-[#282c3f]"
        }
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className={label ? "size-7" : "size-5"}>
          <path
            d="M12 20.25S4.75 16.2 3.05 10.9C1.9 7.35 4.2 4.5 7.45 4.5c1.85 0 3.35 1 4.55 2.45C13.2 5.5 14.7 4.5 16.55 4.5c3.25 0 5.55 2.85 4.4 6.4C19.25 16.2 12 20.25 12 20.25Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
        {label ? <span>Wishlist</span> : null}
      </button>
      {!open && message ? (
        <p className="mt-2 text-sm font-black text-[#03a685]">{message}</p>
      ) : null}

      {open ? (
        <div
          className="fixed inset-0 z-[200] overflow-y-auto bg-black/45 px-3 py-6 sm:px-6"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Close login form"
            className="fixed inset-0 cursor-default"
            onClick={resetModal}
          />

          <div className="relative mx-auto mt-16 w-full max-w-[430px] overflow-hidden bg-white text-[#282c3f] shadow-2xl sm:mt-20">
              <button
                type="button"
                aria-label="Close login form"
                onClick={resetModal}
                className="absolute right-4 top-4 z-10 grid size-8 place-items-center rounded-full bg-[#f5f5f6] text-xl leading-none text-black/60 transition hover:text-black"
              >
                x
              </button>

            <div className="px-8 py-10">
              <h2 className="text-2xl font-black leading-tight">
                Login <span className="font-normal">or</span> Signup
              </h2>

              {step === "mobile" ? (
                <>
                  <label className="mt-10 grid border border-[#d4d5d9] px-4 py-3 text-sm focus-within:border-[#c9a16b]">
                    <span className="sr-only">Mobile Number</span>
                    <span className="flex items-center gap-3">
                      <span className="text-[#7e818c]">+91</span>
                      <span className="h-5 w-px bg-[#d4d5d9]" />
                      <input
                        type="tel"
                        inputMode="numeric"
                        value={mobile}
                        onChange={(event) =>
                          setMobile(event.target.value.replace(/\D/g, "").slice(0, 10))
                        }
                        placeholder="Mobile Number*"
                        className="min-w-0 flex-1 bg-transparent text-base font-medium outline-none placeholder:text-[#94969f]"
                      />
                    </span>
                  </label>

                  <label className="mt-8 flex items-start gap-4 text-base leading-6 text-[#282c3f]">
                    <input
                      type="checkbox"
                      checked={accepted}
                      onChange={(event) => setAccepted(event.target.checked)}
                      className="mt-1 size-4 shrink-0 accent-[#c9a16b]"
                    />
                    <span>
                      By continuing, I agree to the{" "}
                      <span className="font-black text-[#c9a16b]">Terms of Use</span>{" "}
                      &amp;{" "}
                      <span className="font-black text-[#c9a16b]">Privacy Policy</span>{" "}
                      and I am above 18 years old.
                    </span>
                  </label>

                  <button
                    type="button"
                    disabled={!canContinue}
                    onClick={sendOtp}
                    className="mt-8 flex min-h-12 w-full items-center justify-center bg-[#c9a16b] px-6 py-3 text-sm font-black uppercase text-white transition hover:bg-[#b88d55] disabled:bg-[#a4adbd]"
                  >
                    Continue
                  </button>
                </>
              ) : null}

              {step === "otp" ? (
                <>
                  <p className="mt-8 text-sm leading-6 text-[#535766]">
                    Enter the 6 digit OTP sent to +91 {mobile}.
                  </p>
                  <label className="mt-5 grid border border-[#d4d5d9] px-4 py-3 text-sm focus-within:border-[#c9a16b]">
                    <span className="sr-only">OTP</span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      value={enteredOtp}
                      onChange={(event) =>
                        setEnteredOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      placeholder="Enter OTP"
                      className="min-w-0 bg-transparent text-base font-medium outline-none placeholder:text-[#94969f]"
                    />
                  </label>
                  <button
                    type="button"
                    disabled={!canVerify}
                    onClick={verifyOtp}
                    className="mt-8 flex min-h-12 w-full items-center justify-center bg-[#c9a16b] px-6 py-3 text-sm font-black uppercase text-white transition hover:bg-[#b88d55] disabled:bg-[#a4adbd]"
                  >
                    Verify OTP
                  </button>
                  <button
                    type="button"
                    onClick={sendOtp}
                    className="mt-4 text-sm font-black text-[#c9a16b]"
                  >
                    Resend OTP
                  </button>
                </>
              ) : null}

              {step === "done" ? (
                <p className="mt-8 rounded-[8px] bg-green-50 px-4 py-3 text-sm font-black text-green-700">
                  Product added to wishlist.
                </p>
              ) : null}

              {message ? (
                <p className="mt-5 rounded-[8px] bg-[#f8f8f8] px-4 py-3 text-sm font-black text-[#535766]">
                  {message}
                </p>
              ) : null}

              <p className="mt-10 text-sm text-[#7e818c]">
                Have trouble logging in?{" "}
                <span className="font-black text-[#c9a16b]">Get help</span>
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
