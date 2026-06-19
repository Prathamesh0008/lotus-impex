import Image from "next/image";
import Link from "next/link";
import { exportCategories } from "@/data/site";

export default function HomeCategoryShowcase() {
  return (
    <section className="bg-[#f4efe7] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {exportCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/products/${category.slug}`}
            className="group flex min-h-[260px] min-w-0 flex-col items-center rounded-[6px] border border-black/10 bg-[#f8f4ed] px-4 py-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-black/25 hover:shadow-xl"
          >
            <div className="grid min-h-[86px] w-full place-items-start">
              <p className="mx-auto mb-2 max-w-[135px] text-[9px] font-black uppercase leading-4 tracking-[0.24em] text-[#b58a52]">
                {category.eyebrow}
              </p>

              <h3 className="mx-auto max-w-[150px] text-[20px] font-semibold leading-[1.08] text-black [overflow-wrap:anywhere]">
                {category.title}
              </h3>
            </div>

            <div className="relative mx-auto my-4 size-16 overflow-hidden rounded-full border border-black/10 bg-white shadow-sm">
              <Image
                src={category.image}
                alt={category.imageAlt}
                fill
                sizes="64px"
                className="object-cover opacity-90 transition duration-500 group-hover:scale-110 group-hover:opacity-100"
              />
            </div>

            <div className="mt-auto w-full">
              <p className="mx-auto mb-4 max-w-[165px] text-[12px] font-medium leading-5 text-black/55">
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
