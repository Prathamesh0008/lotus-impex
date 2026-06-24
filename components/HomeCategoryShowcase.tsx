import Image from "next/image";
import Link from "next/link";
import { exportCategories } from "@/data/site";

const visibleCategories = exportCategories.filter(
  (category) => category.slug !== "footwear"
);

export default function HomeCategoryShowcase() {
  return (
    <section className="w-full max-w-full overflow-hidden bg-[#f4efe7] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[1800px] grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        {visibleCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/products/${category.slug}`}
            className="group flex min-h-[250px] min-w-0 flex-col items-center rounded-[6px] border border-black/10 bg-[#f8f4ed] px-2 py-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-black/25 hover:shadow-xl sm:min-h-[260px] sm:px-4 sm:py-5"
          >
            <div className="grid min-h-[86px] w-full place-items-start">
              <p className="mx-auto mb-2 max-w-[135px] text-[8px] font-black uppercase leading-4 tracking-[0.2em] text-[#b58a52] sm:text-[9px] sm:tracking-[0.24em]">
                {category.eyebrow}
              </p>

              <h3 className="mx-auto max-w-[150px] text-[17px] font-semibold leading-[1.08] text-black [overflow-wrap:anywhere] sm:text-[20px]">
                {category.title}
              </h3>
            </div>

            <div className="relative mx-auto my-4 size-14 overflow-hidden rounded-full border border-black/10 bg-white shadow-sm sm:size-16">
              <Image
                src={category.image}
                alt={category.imageAlt}
                fill
                sizes="(max-width: 640px) 56px, 64px"
                className="object-cover object-center opacity-90 transition duration-500 group-hover:scale-110 group-hover:opacity-100"
              />
            </div>

            <div className="mt-auto w-full">
              <p className="mx-auto mb-4 max-w-[165px] text-[11px] font-medium leading-5 text-black/55 sm:text-[12px]">
                {category.summary}
              </p>

              <span className="mx-auto grid size-8 place-items-center rounded-full bg-black text-sm text-white transition group-hover:bg-[#b58a52]">
                &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
