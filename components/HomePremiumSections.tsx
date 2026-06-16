import Image from "next/image";
import Link from "next/link";
import FeaturedCollectionsCarousel from "@/components/FeaturedCollectionsCarousel";
import { exportCategories, processSteps } from "@/data/site";

const whyItems = [
  "Verified sourcing coordination",
  "Export documentation support",
  "Quality-focused communication",
  "Private-label order support",
  "Bulk enquiry handling",
  "India-based supply network",
];

const buyerSupportDetails = [
  {
    title: "Requirement mapping",
    text: "We organize buyer requirements by product type, quantity, destination, packing and expected quality level before sourcing begins.",
  },
  {
    title: "Supplier communication",
    text: "Our process keeps supplier discussions structured so buyers receive clearer responses on availability, samples, lead times and packing.",
  },
  {
    title: "Export readiness",
    text: "We support export-focused coordination around documentation, shipment planning, product presentation and buyer-specific order details.",
  },
];

const industries = [
  "Retailers",
  "Wholesalers",
  "Importers",
  "Fashion Brands",
  "Factories",
  "Trading Companies",
];

const faqs = [
  {
    q: "Do you support private-label export orders?",
    a: "Yes. Lotus Impex can coordinate private-label requirements such as custom labels, tags, packaging and buyer-specific product presentation.",
  },
  {
    q: "What product categories do you export?",
    a: "We handle garments, fabrics, accessories, machinery and general goods based on buyer requirements and order quantity.",
  },
  {
    q: "Can buyers request samples?",
    a: "Yes. Sampling can be discussed depending on the product type, quantity, supplier availability and buyer specification.",
  },
  {
    q: "Do you export machinery also?",
    a: "Yes. Machinery, machine parts and industrial sourcing can be handled based on technical requirements and destination market.",
  },
];

export default function HomePremiumSections() {
  return (
    <>
      {/* STATS */}
      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto grid max-w-[1500px] gap-4 px-5 py-8 sm:px-8 md:grid-cols-4 lg:px-10">
          {[
            ["25+", "Product Lines"],
            ["06", "Export Categories"],
            ["B2B", "Sourcing Model"],
            ["India", "Supply Network"],
          ].map(([value, label]) => (
            <div key={label} className="text-center">
              <h2 className="text-3xl text-black sm:text-4xl">{value}</h2>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-black/45">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED COLLECTIONS */}
      <section className="bg-[#f4efe7] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#b58a52]">
                Featured Collections
              </p>
              <h2 className="max-w-3xl text-3xl leading-tight text-black sm:text-4xl lg:text-5xl">
                Export categories buyers ask for most.
              </h2>
            </div>

            <Link
              href="/products"
              className="w-fit rounded-full bg-black px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#6b3f24]"
            >
              View Catalogue
            </Link>
          </div>

          <FeaturedCollectionsCarousel />

          <div className="hidden">
            {exportCategories.slice(0, 4).map((category) => (
              <Link
                key={category.slug}
                href={`/products/${category.slug}`}
                className="group relative min-h-[420px] overflow-hidden rounded-[28px] bg-black"
              >
                <Image
                  src={category.image}
                  alt={category.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover opacity-80 transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                  <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-white/55">
                    {category.eyebrow}
                  </p>
                  <h3 className="text-2xl leading-tight">
                    {category.title}
                  </h3>
                  <span className="mt-6 inline-grid size-11 place-items-center rounded-full bg-white text-black">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="bg-black px-5 py-16 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-white/40">
              Why Lotus Impex
            </p>
            <h2 className="max-w-xl text-3xl leading-tight sm:text-4xl">
              Built for buyers who need clarity.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/55">
              We focus on structured sourcing, clear communication, export
              readiness and practical support for international B2B buyers.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {whyItems.map((item) => (
              <div
                key={item}
                className="rounded-[18px] border border-white/10 p-5 transition hover:bg-white hover:text-black"
              >
                <h3 className="text-xl leading-tight sm:text-2xl">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUYER SUPPORT DETAILS */}
      <section className="bg-white px-5 py-16 text-black sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#b58a52]">
              Buyer Support Details
            </p>
            <h2 className="max-w-xl text-3xl leading-tight text-black sm:text-4xl">
              Practical support after every enquiry.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {buyerSupportDetails.map((item, index) => (
              <article
                key={item.title}
                className="rounded-[8px] border border-black/10 bg-[#f8f4ed] p-5"
              >
                <span className="text-xs font-black uppercase tracking-[0.22em] text-[#b58a52]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-2xl leading-tight text-black">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-black/55">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-[#ebe3d7] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#b58a52]">
              Industries Served
            </p>
            <h2 className="text-3xl leading-tight text-black sm:text-4xl lg:text-5xl">
              Sourcing support for different buyer types.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <div
                key={industry}
                className="rounded-[18px] border border-black/10 bg-[#f8f4ed] p-5"
              >
                <h3 className="text-2xl leading-tight text-black">
                  {industry}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[#f4efe7] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-10 max-w-4xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#b58a52]">
              Export Process
            </p>
            <h2 className="text-3xl leading-tight text-black sm:text-4xl lg:text-5xl">
              From requirement to shipment coordination.
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[18px] border border-black/10 bg-white p-5"
              >
                <span className="text-xs font-black uppercase tracking-[0.2em] text-black/35">
                  0{index + 1}
                </span>
                <h3 className="mt-6 text-xl leading-tight text-black">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-black/55">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-white px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-4 md:grid-cols-4">
          {[
            "Export Documentation",
            "Quality Checkpoints",
            "Private Label Ready",
            "Bulk Order Support",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[18px] border border-black/10 bg-[#f8f4ed] p-5 text-center"
            >
              <h3 className="text-xl leading-tight text-black">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-black px-5 py-16 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1000px] text-center">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.28em] text-white/40">
            Buyer Experience
          </p>
          <h2 className="mx-auto max-w-4xl text-3xl leading-tight sm:text-4xl">
            “Clear communication and structured sourcing support for export
            requirements.”
          </h2>
          <p className="mt-6 text-sm font-black uppercase tracking-[0.22em] text-white/45">
            B2B Buyer Feedback
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f4efe7] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#b58a52]">
              FAQ
            </p>
            <h2 className="text-3xl leading-tight text-black sm:text-4xl">
              Common export questions.
            </h2>
          </div>

          <div className="grid gap-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="rounded-[18px] border border-black/10 bg-white p-5"
              >
                <summary className="text-base font-black text-black">
                  {faq.q}
                </summary>
                <p className="mt-4 text-sm leading-7 text-black/55">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* STICKY CTA STYLE SECTION */}
      <section className="bg-[#c9a16b] px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-[1500px] flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
          <h2 className="text-3xl leading-tight text-black sm:text-4xl">
            Ready to source from India?
          </h2>

          <Link
            href="/contact"
            className="rounded-full bg-black px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black"
          >
            Send Requirement →
          </Link>
        </div>
      </section>
    </>
  );
}
