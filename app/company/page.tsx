import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InternalLinkSection from "@/components/InternalLinkSection";
import { exportCategories, processSteps, siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Learn about Lotus Impex, an India-based export company for garments, fabrics, accessories, machinery and general goods.",
  alternates: {
    canonical: "/company",
  },
};

export default function CompanyPage() {
  return (
    <main className="bg-[#f4efe7] text-black">
      <section className="relative min-h-[620px] overflow-hidden bg-black">
        <Image
          src="/online-marketing.jpg"
          alt="Lotus Impex business export team"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-58"
        />

        <div className="absolute inset-0 image-overlay" />

        <div className="relative z-10 mx-auto flex min-h-[620px] max-w-[1500px] items-end px-5 py-12 sm:px-8 lg:px-10">
          <div className="max-w-6xl">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.34em] text-white/65">
              About Lotus Impex
            </p>

            <h1 className="text-6xl font-black uppercase leading-[0.84] tracking-[-0.09em] text-white sm:text-7xl lg:text-8xl xl:text-[9rem]">
              Built For Global Trade.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72">
              We are building Lotus Impex as a modern India-based export house
              focused on garments, fabrics, accessories, machinery and general
              goods for international buyers.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-black/45">
              Who We Are
            </p>

            <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] sm:text-6xl lg:text-7xl">
              A sourcing partner for serious buyers.
            </h2>
          </div>

          <div>
            <p className="text-xl leading-9 text-black/65">
              {siteConfig.name} helps overseas buyers coordinate product
              sourcing from India with a practical, transparent and
              documentation-focused approach.
            </p>

            <p className="mt-6 text-lg leading-8 text-black/55">
              Our goal is simple: understand the buyer requirement clearly,
              match it with suitable sourcing options, coordinate quality
              expectations and support export-ready execution.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "India-based sourcing",
                "Multi-category exports",
                "Clear buyer communication",
                "Export-ready coordination",
              ].map((item) => (
                <div
                  key={item}
                  className="border border-black/10 bg-[#ebe3d7] p-5 text-sm font-black uppercase tracking-[0.14em]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black px-5 py-20 text-white sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="relative h-[620px] overflow-hidden">
            <Image
              src="/product_category.jpg"
              alt="Export logistics and shipment coordination"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-90"
            />
          </div>

          <div className="lg:pl-14">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-white/45">
              Our Position
            </p>

            <h2 className="text-5xl font-black uppercase leading-[0.86] tracking-[-0.09em] sm:text-6xl lg:text-8xl">
              Modern export, not old trading.
            </h2>

            <p className="mt-7 text-lg leading-8 text-white/60">
              Lotus Impex is shaped for today’s buyer expectations: fast
              response, clean presentation, category clarity, better sourcing
              communication and professional export flow.
            </p>

            <div className="mt-10 grid gap-4">
              {exportCategories.slice(0, 4).map((category) => (
                <Link
                  key={category.slug}
                  href={`/products/${category.slug}`}
                  className="group flex items-center justify-between border border-white/10 px-5 py-5 transition hover:bg-white hover:text-black"
                >
                  <span className="text-sm font-black uppercase tracking-[0.16em]">
                    {category.title}
                  </span>
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-12 max-w-4xl">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-black/45">
              Working Method
            </p>

            <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] sm:text-6xl lg:text-7xl">
              Every enquiry moves through a clear flow.
            </h2>
          </div>

          <div className="grid border-y border-black/10 md:grid-cols-5">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="border-b border-black/10 p-6 transition hover:bg-black hover:text-white md:border-b-0 md:border-r last:md:border-r-0"
              >
                <span className="text-sm font-black opacity-30">
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

      <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28">
        <div className="mx-auto grid max-w-[1500px] gap-5 md:grid-cols-3">
          {[
            {
              title: "For Importers",
              text: "Structured sourcing support for buyers importing products from India.",
            },
            {
              title: "For Wholesalers",
              text: "Bulk-ready coordination for garments, fabrics, accessories and goods.",
            },
            {
              title: "For Project Buyers",
              text: "Requirement-based sourcing for machinery, parts and general export goods.",
            },
          ].map((card) => (
            <div key={card.title} className="border border-black/10 bg-[#ebe3d7] p-7">
              <h3 className="text-3xl font-black uppercase tracking-[-0.06em]">
                {card.title}
              </h3>
              <p className="mt-5 text-sm leading-7 text-black/60">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <InternalLinkSection />
    </main>
  );
}
