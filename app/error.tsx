"use client";

import Link from "next/link";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <main className="grid min-h-[70vh] place-items-center bg-[#f4efe7] px-5 text-center text-black">
      <section className="max-w-2xl">
        <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-black/45">
          Website Error
        </p>

        <h1 className="text-6xl uppercase leading-[0.86] sm:text-7xl">
          Something Went Wrong
        </h1>

        <p className="mt-6 text-lg leading-8 text-black/60">
          The page could not load correctly. You can try again or go back to the
          catalogue.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-black px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#6b3f24]"
          >
            Try Again
          </button>

          <Link
            href="/products"
            className="rounded-full border border-black/15 px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white"
          >
            View Catalogue
          </Link>
        </div>
      </section>
    </main>
  );
}