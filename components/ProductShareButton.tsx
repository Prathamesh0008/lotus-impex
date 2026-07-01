"use client";

import { useState } from "react";

type ProductShareButtonProps = {
  title: string;
  text?: string;
  path: string;
};

export default function ProductShareButton({
  title,
  text,
  path,
}: ProductShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function shareProduct() {
    const url =
      typeof window === "undefined"
        ? path
        : new URL(path, window.location.origin).toString();
    const brandedText = `Lotus Impex\n${text || title}`;
    const shareData = {
      title: `Lotus Impex - ${title}`,
      text: brandedText,
      url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard?.writeText(`${brandedText}\n${url}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Share product"
        onClick={shareProduct}
        className="grid size-9 shrink-0 place-items-center rounded-[8px] border border-[#d4d5d9] bg-white text-[#282c3f] transition hover:border-[#282c3f]"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        >
          <circle cx="18" cy="5" r="2.6" />
          <circle cx="6" cy="12" r="2.6" />
          <circle cx="18" cy="19" r="2.6" />
          <path d="m8.3 10.8 7.4-4.6" />
          <path d="m8.3 13.2 7.4 4.6" />
        </svg>
      </button>
      {copied ? (
        <span className="absolute right-0 top-full mt-2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs font-black text-white">
          Link copied
        </span>
      ) : null}
    </div>
  );
}
