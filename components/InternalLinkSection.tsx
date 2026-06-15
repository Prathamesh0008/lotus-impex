import Link from "next/link";
import { internalLinks } from "@/data/site";

type InternalLinkSectionProps = {
  currentSlug?: string;
  title?: string;
  description?: string;
};

export default function InternalLinkSection({
  currentSlug,
  title = "Explore More Export Categories",
  description = "Move across our product divisions and discover sourcing options for garments, fabrics, accessories, machinery and general goods.",
}: InternalLinkSectionProps) {
  const links = internalLinks.filter((link) => {
    if (!currentSlug) return true;
    return !link.href.endsWith(currentSlug);
  });

  return (
    <section className="bg-[#ebe3d7] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-black/45">
              Internal Links
            </p>

            <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-black sm:text-5xl lg:text-6xl">
              {title}
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-8 text-black/60 lg:ml-auto">
            {description}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group border border-black/10 bg-[#f4efe7] p-6 transition hover:-translate-y-1 hover:bg-black hover:text-white"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-[-0.05em]">
                    {link.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-black/55 transition group-hover:text-white/60">
                    {link.text}
                  </p>
                </div>

                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-black text-white transition group-hover:bg-white group-hover:text-black">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}