import Image from "next/image";
import Link from "next/link";
import HeroBanner from "@/components/HeroBanner";
import { exportCategories } from "@/data/site";
import HomeCategoryShowcase from "@/components/HomeCategoryShowcase";
import HomeProductScroller from "@/components/HomeProductScroller";
import HomePremiumSections from "@/components/HomePremiumSections";
import HomeShoppingShowcase from "@/components/HomeShoppingShowcase";

export default function HomePage() {
  return (
    <main className="bg-[#f4efe7] text-black">
       
    
<HeroBanner />
      {/* <CategoryMarquee /> */}
      <HomeCategoryShowcase />
      <HomeProductScroller />
      <HomeShoppingShowcase />
      <HomePremiumSections />

      

      {/* HIGH ENERGY SPLIT */}
      <section className="bg-white px-5 py-16 text-black sm:px-8 lg:px-10 xl:py-24">
        <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="relative h-[360px] overflow-hidden sm:h-[460px] xl:h-[620px]">
            <Image
              src="/content-women-shopping-mall.jpg"
              alt="Export package delivery and ecommerce sourcing"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-90"
            />

            <div className="absolute bottom-6 left-6 rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-black">
              Fashion • Textile • Trade
            </div>
          </div>

          <div className="lg:pl-14">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-black/45">
              Export Capability
            </p>

            <h2 className="text-4xl font-black uppercase leading-tight text-black sm:text-5xl xl:text-6xl">
              Speed with structure.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-black/60 sm:text-lg sm:leading-8">
              We are building Lotus Impex as a modern export house — fast in
              communication, sharp in sourcing, serious about documentation and
              focused on buyer confidence.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {exportCategories.slice(0, 4).map((category) => (
                <Link
                  key={category.slug}
                  href={`/products/${category.slug}`}
                  className="group border border-black/10 p-5 transition hover:bg-black hover:text-white"
                >
                  <p className="text-sm font-black uppercase tracking-[0.16em]">
                    {category.title}
                  </p>
                  <span className="mt-5 inline-block text-black/45 transition group-hover:text-white/60">
                    View →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
