import Image from "next/image";
import Link from "next/link";
import CategoryMarquee from "@/components/CategoryMarquee";
import InternalLinkSection from "@/components/InternalLinkSection";
import ProductCard from "@/components/ProductCard";
import {
  exportCategories,
  heroSlides,
  processSteps,
  siteConfig,
  trustPoints,
} from "@/data/site";
import HomeCategoryShowcase from "@/components/HomeCategoryShowcase";
import HomePremiumSections from "@/components/HomePremiumSections";

export default function HomePage() {
  const hero = heroSlides[0];

  return (
    <main className="bg-[#f4efe7] text-black">
      {/* HERO */}
      <section className="relative min-h-[calc(100vh-81px)] overflow-hidden bg-black">
        <Image
          src={hero.image}
          alt="Lotus Impex global export sourcing"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-72"
        />

        <div className="absolute inset-0 image-overlay" />

        <div className="absolute right-8 top-8 z-10 hidden rounded-full border border-white/20 bg-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.22em] text-white backdrop-blur-xl lg:block">
          {hero.label}
        </div>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-81px)] max-w-[1500px] items-end px-5 py-10 sm:px-8 lg:px-10 lg:py-16">
          <div className="grid w-full gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <p className="mb-5 text-xs font-black uppercase tracking-[0.34em] text-white/70">
                {siteConfig.tagline}
              </p>

              <h1 className="max-w-6xl text-6xl font-black uppercase leading-[0.82] tracking-[-0.1em] text-white sm:text-7xl lg:text-8xl xl:text-[10rem]">
                Source. Export. Scale.
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/72">
                Lotus Impex connects international buyers with export-ready
                garments, fabrics, accessories, machinery and general goods from
                India.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-[#c9a16b]"
                >
                  Explore Catalogue
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black"
                >
                  Start Export Enquiry
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-xl transition hover:bg-white hover:text-black"
                >
                  <p className="text-sm font-bold leading-6 text-white/80 transition hover:text-black">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CategoryMarquee />
      <HomeCategoryShowcase/>
      <HomePremiumSections/>

      

      {/* CATEGORY SHOWCASE */}
      <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-black/45">
                Product Divisions
              </p>

              <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-black sm:text-6xl lg:text-7xl">
                Built for serious buyers.
              </h2>
            </div>

            <p className="max-w-2xl text-lg leading-8 text-black/60 lg:ml-auto">
              Explore export divisions for apparel, textiles, finishing goods,
              industrial requirements and flexible global trade sourcing.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {exportCategories.map((category, index) => (
              <ProductCard
                key={category.slug}
                category={category}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* HIGH ENERGY SPLIT */}
      <section className="bg-black px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="relative h-[620px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1500&q=85"
              alt="Fashion apparel production and export sourcing"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-90"
            />

            <div className="absolute bottom-6 left-6 rounded-full bg-white px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-black">
              Fashion • Textile • Trade
            </div>
          </div>

          <div className="lg:pl-14">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-white/45">
              Export Capability
            </p>

            <h2 className="text-5xl font-black uppercase leading-[0.86] tracking-[-0.09em] sm:text-6xl lg:text-8xl">
              Speed with structure.
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/60">
              We are building Lotus Impex as a modern export house — fast in
              communication, sharp in sourcing, serious about documentation and
              focused on buyer confidence.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {exportCategories.slice(0, 4).map((category) => (
                <Link
                  key={category.slug}
                  href={`/products/${category.slug}`}
                  className="group border border-white/10 p-5 transition hover:bg-white hover:text-black"
                >
                  <p className="text-sm font-black uppercase tracking-[0.16em]">
                    {category.title}
                  </p>
                  <span className="mt-5 inline-block text-white/45 transition group-hover:text-black/45">
                    View →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-12 max-w-4xl">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-black/45">
              How We Work
            </p>

            <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] text-black sm:text-6xl lg:text-7xl">
              Simple process. Professional execution.
            </h2>
          </div>

          <div className="grid border-y border-black/10 md:grid-cols-5">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="border-b border-black/10 p-6 transition hover:bg-black hover:text-white md:border-b-0 md:border-r last:md:border-r-0"
              >
                <span className="text-sm font-black text-black/30">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-10 text-2xl font-black uppercase tracking-[-0.05em]">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-7 opacity-60">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InternalLinkSection />

      {/* CTA */}
      <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="relative mx-auto min-h-[560px] max-w-[1500px] overflow-hidden bg-black">
          <Image
            src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=85"
            alt="International export shipping containers"
            fill
            sizes="100vw"
            className="object-cover opacity-55"
          />

          <div className="absolute inset-0 bg-black/45" />

          <div className="relative z-10 flex min-h-[560px] items-end p-6 sm:p-10 lg:p-14">
            <div className="max-w-4xl">
              <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-white/55">
                Start Trade Conversation
              </p>

              <h2 className="text-5xl font-black uppercase leading-[0.86] tracking-[-0.09em] text-white sm:text-6xl lg:text-8xl">
                Send your product requirement.
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
                Share the product, quantity, destination country and expected
                packing. We will move the enquiry into sourcing coordination.
              </p>

              <Link
                href="/contact"
                className="mt-9 inline-flex rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-[#c9a16b]"
              >
                Request Export Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}