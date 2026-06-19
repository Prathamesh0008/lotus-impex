import Image from "next/image";
import Link from "next/link";
import type { ExportCategory } from "@/data/site";

type ProductCardProps = {
  category: ExportCategory;
  index: number;
};

export default function ProductCard({ category, index }: ProductCardProps) {
  return (
    <article className="group overflow-hidden border border-black/10 bg-[#ebe3d7]">
      <Link href={`/products/${category.slug}`} className="block">
        <div className="relative h-[420px] overflow-hidden bg-black">
          <Image
            src={category.image}
            alt={category.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

          <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white backdrop-blur">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-white/60">
              {category.eyebrow}
            </p>

            <h3 className="mt-3 text-3xl font-black uppercase tracking-[-0.06em] text-white">
              {category.title}
            </h3>
          </div>
        </div>

        <div className="grid gap-5 p-6">
          <p className="text-sm leading-7 text-black/65">{category.summary}</p>

          <div className="flex flex-wrap gap-2">
            {category.highlights.map((highlight) => (
              <span
                key={highlight}
                className="rounded-full border border-black/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-black/70"
              >
                {highlight}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-black/10 pt-5">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-black">
              View Category
            </span>
            <span className="grid size-9 place-items-center rounded-full bg-black text-white transition group-hover:translate-x-1 group-hover:bg-[#b58a52]">
              →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
