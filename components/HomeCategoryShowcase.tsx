import Image from "next/image";
import Link from "next/link";
import { exportCategories } from "@/data/site";

const categoryVisuals: Record<string, string> = {
  "ladies-garments":
    "https://cdn-icons-png.flaticon.com/512/3531/3531849.png",
  "mens-garments":
    "https://cdn-icons-png.flaticon.com/512/2503/2503380.png",
  fabrics:
    "https://cdn-icons-png.flaticon.com/512/1040/1040230.png",
  accessories:
    "https://cdn-icons-png.flaticon.com/512/2553/2553642.png",
  machinery:
    "https://cdn-icons-png.flaticon.com/512/2917/2917995.png",
  "general-goods":
    "https://cdn-icons-png.flaticon.com/512/679/679720.png",
};

export default function HomeCategoryShowcase() {
  return (
    <section className="bg-[#f4efe7] px-5 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-[1500px] gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {exportCategories.map((category, index) => (
          <Link
            key={category.slug}
            href={`/products/${category.slug}`}
            className="group flex min-h-[300px] flex-col justify-between rounded-[6px] border border-black/10 bg-[#f8f4ed] px-7 py-7 text-center shadow-sm transition hover:-translate-y-1 hover:border-black/25 hover:shadow-xl"
          >
            <div>
              <p className="mb-5 text-[11px] font-black uppercase tracking-[0.28em] text-[#b58a52]">
                {category.eyebrow}
              </p>

              <h3 className="font-heading text-[32px] font-semibold leading-[0.9] tracking-[-0.04em] text-black">
                {category.title}
              </h3>
            </div>

            <div className="mx-auto my-6 grid size-20 place-items-center">
              <Image
                src={categoryVisuals[category.slug]}
                alt={`${category.title} icon`}
                width={64}
                height={64}
                className="object-contain opacity-85 grayscale transition group-hover:scale-110 group-hover:opacity-100"
              />
            </div>

            <div>
              <p className="mx-auto mb-5 max-w-[170px] text-sm font-medium leading-6 text-black/55">
                {category.summary}
              </p>

              <span
                className={`mx-auto grid size-11 place-items-center rounded-full text-xl text-white transition group-hover:bg-[#b58a52] ${
                  index === 0 ? "bg-[#b58a52]" : "bg-black"
                }`}
              >
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}