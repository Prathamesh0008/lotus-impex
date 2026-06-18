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

const divisionDetails = [
  {
    slug: "ladies-garments",
    title: "Ladies Garments",
    eyebrow: "Fashion Export",
    text: "We manufacture premium ladies garments including dresses, tops, ethnic wear, uniforms, and fashion apparel. Our production facilities support bulk export orders, OEM manufacturing, and private-label requirements for global buyers. We use high-quality fabrics and advanced production techniques to ensure superior finishing and durability. Our experienced team manages everything from design development to final packaging. We offer customized production solutions based on buyer specifications and international fashion trends. Strict quality control procedures are implemented at every stage of manufacturing. We serve wholesalers, retailers, distributors, and fashion brands across global markets.",
  },
  {
    slug: "mens-garments",
    title: "Mens Garments",
    eyebrow: "Ready-to-Wear",
    text: "We manufacture high-quality menswear including shirts, t-shirts, trousers, uniforms, jackets, and workwear. With modern production units and strict quality standards, we deliver reliable export solutions worldwide. Our facilities are equipped to handle both small and large-volume orders efficiently. We provide custom branding, labeling, and packaging services for international buyers. Every garment undergoes rigorous quality inspections before shipment. Our production processes focus on comfort, durability, and consistent sizing standards. We cater to distributors, corporate buyers, retailers, and private-label brands globally.",
  },
  {
    slug: "fabrics",
    title: "Fabrics",
    eyebrow: "Textile Manufacturing",
    text: "We manufacture and source cotton, polyester, blended, woven, knitted, and printed fabrics for garment production. Our fabric solutions meet international quality standards and support custom buyer specifications. We work closely with textile mills and production partners to ensure consistent quality and timely delivery. Various fabric weights, finishes, and dyeing options are available to meet specific requirements. We provide fabrics suitable for apparel, uniforms, home textiles, and industrial applications. Continuous quality testing ensures color fastness, strength, and performance. Our export-ready fabric solutions support manufacturers and brands worldwide.",
  },
  {
    slug: "accessories",
    title: "Accessories",
    eyebrow: "Finishing Goods",
    text: "We manufacture and supply garment accessories including labels, tags, trims, buttons, zippers, packaging materials, and promotional accessories. We provide complete sourcing solutions for export-ready products. Our accessory range is designed to enhance product presentation and brand value. Custom designs, logos, and packaging options can be developed according to client requirements. We maintain strong supplier networks to ensure quality consistency and competitive pricing. Every product is carefully inspected before dispatch. Our solutions help buyers streamline procurement and simplify supply chain management.",
  },
  {
    slug: "machinery",
    title: "Machinery",
    eyebrow: "Industrial Export",
    text: "We manufacture and export selected industrial equipment, machinery components, spare parts, and engineering products. Our solutions are tailored for industrial buyers, distributors, and project-based procurement needs. We focus on precision manufacturing, reliability, and long-term performance. Products are developed according to international standards and customer specifications. Our engineering capabilities allow us to support custom manufacturing projects across various industries. We ensure thorough testing and quality assurance before export. Timely delivery and technical support remain key priorities for our industrial clients worldwide.",
  },
  {
    slug: "general-goods",
    title: "General Goods",
    eyebrow: "Multi-Category Manufacturing",
    text: "We manufacture and export a wide range of consumer and industrial products through our trusted production network. From customized products to bulk orders, we support international sourcing and private-label requirements. Our diverse product portfolio enables buyers to source multiple categories from a single trusted partner. We focus on quality, competitive pricing, and dependable supply chain management. Flexible manufacturing capabilities allow us to meet unique market demands and project requirements. Every order is managed with attention to detail and international compliance standards. We work closely with importers, wholesalers, distributors, and retailers across global markets.",
  },
];

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

      <section className="bg-[#fffaf2] px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-black/45">
                Manufacturing Divisions
              </p>

              <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] sm:text-6xl lg:text-7xl">
                Product strength for global buyers.
              </h2>
            </div>

            <p className="max-w-3xl text-lg leading-8 text-black/60 lg:justify-self-end">
              Lotus Impex works across apparel, textiles, accessories,
              machinery and multi-category goods with export-focused planning,
              buyer communication and quality control.
            </p>
          </div>

          <div className="grid gap-10">
            {divisionDetails.map((division, index) => {
              const category = exportCategories.find(
                (item) => item.slug === division.slug,
              );
              const reverse = index % 2 === 1;

              return (
                <article
                  key={division.slug}
                  className="grid overflow-hidden border border-black/10 bg-[#f4efe7] lg:grid-cols-2"
                >
                  <div
                    className={`relative min-h-[360px] ${
                      reverse ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={category?.image ?? "/product_category.jpg"}
                      alt={category?.imageAlt ?? `${division.title} export products`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>

                  <div
                    className={`flex flex-col justify-center p-7 sm:p-10 lg:p-14 ${
                      reverse ? "lg:order-1" : ""
                    }`}
                  >
                    <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-black/45">
                      {division.eyebrow}
                    </p>

                    <h3 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.07em] sm:text-5xl">
                      {division.title}
                    </h3>

                    <p className="mt-7 text-base leading-8 text-black/62 sm:text-lg">
                      {division.text}
                    </p>

                    <Link
                      href={`/products/${division.slug}`}
                      className="mt-8 inline-flex w-fit items-center gap-4 bg-black px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-[#b4884d]"
                    >
                      View Products
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
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
