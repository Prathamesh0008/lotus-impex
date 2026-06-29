import Image from "next/image";
import Link from "next/link";
import FeaturedCollectionsCarousel from "@/components/FeaturedCollectionsCarousel";
import { exportCategories } from "@/data/site";

const whyItems = [
  "Verified sourcing coordination",
  "Export documentation support",
  "Quality-focused communication",
  "Private-label order support",
  "Bulk enquiry handling",
  "India-based supply network",
];

const shoppingSteps = [
  {
    title: "Browse",
    text: "Explore product categories, compare details and open product pages for MOQ, material and sourcing information.",
  },
  {
    title: "Add Cart",
    text: "Save selected products to your cart so every requirement stays ready for review before checkout.",
  },
  {
    title: "Checkout",
    text: "Enter buyer details, delivery address, destination country and preferred payment method in one place.",
  },
  {
    title: "Account",
    text: "Sign in to view saved products, submitted orders, profile information and address details.",
  },
  {
    title: "Support",
    text: "Send questions to our team for product availability, bulk quantity, packing or export coordination.",
  },
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
      {/* <section className="border-y border-black/10 bg-white">
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
      </section> */}

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

   
      {/* PROCESS
      <section className="bg-[#f4efe7] px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-10 max-w-4xl">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#b58a52]">
              Shopping Process
            </p>
            <h2 className="text-3xl leading-tight text-black sm:text-4xl lg:text-5xl">
              From product browsing to buyer support.
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-5">
            {shoppingSteps.map((step, index) => (
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
      </section> */}

    </>
  );
}
