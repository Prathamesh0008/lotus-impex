import Image from "next/image";
import Link from "next/link";
import { exportCategories, processSteps } from "@/data/site";

const whyItems = [
  "Verified sourcing coordination",
  "Export documentation support",
  "Quality-focused communication",
  "Private-label order support",
  "Bulk enquiry handling",
  "India-based supply network",
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
              <h2 className="font-heading text-5xl text-black">{value}</h2>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.22em] text-black/45">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED COLLECTIONS */}
      <section className="bg-[#f4efe7] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#b58a52]">
                Featured Collections
              </p>
              <h2 className="font-heading text-6xl leading-none text-black">
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

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
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
                  <h3 className="font-heading text-4xl leading-none">
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
      <section className="bg-black px-5 py-20 text-white sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-white/40">
              Why Lotus Impex
            </p>
            <h2 className="font-heading text-6xl leading-none">
              Built for buyers who need clarity.
            </h2>
            <p className="mt-6 text-lg leading-8 text-white/55">
              We focus on structured sourcing, clear communication, export
              readiness and practical support for international B2B buyers.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {whyItems.map((item) => (
              <div
                key={item}
                className="rounded-[24px] border border-white/10 p-6 transition hover:bg-white hover:text-black"
              >
                <h3 className="font-heading text-3xl">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-[#ebe3d7] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#b58a52]">
              Industries Served
            </p>
            <h2 className="font-heading text-6xl leading-none text-black">
              Sourcing support for different buyer types.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <div
                key={industry}
                className="rounded-[26px] border border-black/10 bg-[#f8f4ed] p-8"
              >
                <h3 className="font-heading text-4xl text-black">
                  {industry}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[#f4efe7] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-10 max-w-4xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#b58a52]">
              Export Process
            </p>
            <h2 className="font-heading text-6xl leading-none text-black">
              From requirement to shipment coordination.
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[26px] border border-black/10 bg-white p-6"
              >
                <span className="text-xs font-black uppercase tracking-[0.2em] text-black/35">
                  0{index + 1}
                </span>
                <h3 className="mt-8 font-heading text-3xl text-black">
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
              className="rounded-[24px] border border-black/10 bg-[#f8f4ed] p-6 text-center"
            >
              <h3 className="font-heading text-3xl text-black">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-black px-5 py-20 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1000px] text-center">
          <p className="mb-5 text-xs font-black uppercase tracking-[0.28em] text-white/40">
            Buyer Experience
          </p>
          <h2 className="font-heading text-6xl leading-tight">
            “Clear communication and structured sourcing support for export
            requirements.”
          </h2>
          <p className="mt-6 text-sm font-black uppercase tracking-[0.22em] text-white/45">
            B2B Buyer Feedback
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#f4efe7] px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#b58a52]">
              FAQ
            </p>
            <h2 className="font-heading text-6xl leading-none text-black">
              Common export questions.
            </h2>
          </div>

          <div className="grid gap-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="rounded-[24px] border border-black/10 bg-white p-6"
              >
                <summary className="text-lg font-black text-black">
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
          <h2 className="font-heading text-5xl leading-none text-black">
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