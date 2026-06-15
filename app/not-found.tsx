import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="grid min-h-[70vh] place-items-center bg-[#f4efe7] px-5 text-center text-black">
      <section className="max-w-2xl">
        <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-black/45">
          404 Error
        </p>

        <h1 className="text-6xl uppercase leading-[0.86] sm:text-8xl">
          Page Not Found
        </h1>

        <p className="mt-6 text-lg leading-8 text-black/60">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-black px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#6b3f24]"
          >
            Go Home
          </Link>

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