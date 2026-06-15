import Link from "next/link";
import { exportCategories } from "@/data/site";

export default function CategoryMarquee() {
  const items = [...exportCategories, ...exportCategories];

  return (
    <section className="overflow-hidden border-y border-black/10 bg-black py-5 text-white">
      <div className="marquee-track flex w-max items-center gap-6">
        {items.map((category, index) => (
          <Link
            key={`${category.slug}-${index}`}
            href={`/products/${category.slug}`}
            className="group flex items-center gap-6"
          >
            <span className="text-3xl font-black uppercase tracking-[-0.08em] text-white transition group-hover:text-[#c9a16b] sm:text-5xl">
              {category.title}
            </span>

            <span className="size-3 rounded-full bg-white/30 transition group-hover:bg-[#c9a16b]" />
          </Link>
        ))}
      </div>
    </section>
  );
}