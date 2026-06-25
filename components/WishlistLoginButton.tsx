"use client";

import { useState } from "react";

type WishlistLoginButtonProps = {
  label?: boolean;
};

export default function WishlistLoginButton({ label = false }: WishlistLoginButtonProps) {
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState("");
  const [accepted, setAccepted] = useState(false);
  const canContinue = mobile.trim().length >= 10 && accepted;

  return (
    <>
      <button
        type="button"
        aria-label="Add product to wishlist"
        onClick={() => setOpen(true)}
        className={
          label
            ? "flex min-h-12 w-full items-center justify-center gap-3 rounded-[4px] border border-[#d4d5d9] bg-white px-6 py-4 text-base font-black uppercase text-[#282c3f] transition hover:border-[#282c3f]"
            : "grid size-12 shrink-0 place-items-center rounded-[8px] border border-[#d4d5d9] bg-white text-[#282c3f] transition hover:border-[#282c3f]"
        }
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-7">
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
            onClick={() => setOpen(false)}
          />

          <div className="relative mx-auto mt-16 w-full max-w-[430px] overflow-hidden bg-white text-[#282c3f] shadow-2xl sm:mt-20">
            <div className="relative border border-[#d6b85a]/40 bg-[#fff4df] px-4 py-4">
              <button
                type="button"
                aria-label="Close login form"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/85 text-xl leading-none text-black/60 transition hover:text-black"
              >
                x
              </button>

              <div className="flex min-h-24 items-center gap-4">
                <div className="grid size-20 shrink-0 place-items-center rounded-full bg-[#d6b85a] text-center text-xs font-black uppercase leading-tight text-black">
                  Lotus
                  <br />
                  Offer
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#6b3f24]">
                    Welcome to Lotus
                  </p>
                  <p className="mt-1 text-2xl font-black uppercase leading-none text-[#c9a16b]">
                    Flat 300 Off
                  </p>
                  <p className="mt-2 text-xs font-black uppercase text-[#282c3f]">
                    Only on export checkout
                  </p>
                </div>
              </div>
            </div>

            <div className="px-8 py-10">
              <h2 className="text-2xl font-black leading-tight">
                Login <span className="font-normal">or</span> Signup
              </h2>

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
                className="mt-8 flex min-h-12 w-full items-center justify-center bg-[#c9a16b] px-6 py-3 text-sm font-black uppercase text-white transition hover:bg-[#b88d55] disabled:bg-[#a4adbd]"
              >
                Continue
              </button>

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
