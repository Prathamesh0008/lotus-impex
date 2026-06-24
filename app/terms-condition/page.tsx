import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for Lotus Impex shopping catalogue, checkout request and export enquiry services.",
  alternates: {
    canonical: "/terms-condition",
  },
};

const faqs = [
  {
    q: "How can buyers use the shopping catalogue?",
    a: "The catalogue is for browsing export categories and shortlisting products. Product images, MOQ, lead times and descriptions are indicative until confirmed by Lotus Impex.",
  },
  {
    q: "Does adding products to cart confirm an order?",
    a: "No. Adding products to cart or submitting checkout details creates a buyer request only. Order acceptance, stock availability and final price are confirmed separately.",
  },
  {
    q: "How are quotations prepared?",
    a: "Final quotations depend on product specification, quantity, packing, destination, currency, supplier confirmation, documentation and shipping terms.",
  },
  {
    q: "How does payment work?",
    a: "The website checkout flow is a request interface. Actual invoice details, bank transfer instructions or payment gateway links are shared by Lotus Impex after review.",
  },
  {
    q: "Who handles shipping and documentation?",
    a: "Shipment timelines, packaging, inspection, customs documentation and dispatch coordination depend on supplier readiness, destination country rules and agreed export terms.",
  },
  {
    q: "Can buyers request cancellations or claims?",
    a: "Returns, claims or cancellations are handled case-by-case based on product category, supplier policy, buyer-approved samples, order terms and shipping status.",
  },
];

const detailedSections = [
  {
    title: "Website Use",
    content: [
      `${siteConfig.name} provides this website for product browsing, export category information, enquiry submission and buyer communication.`,
      "All product pages, images, descriptions, MOQ details and lead time references are shared for buyer understanding and are subject to final confirmation.",
    ],
  },
  {
    title: "Catalogue & Product Information",
    content: [
      "Product availability, colors, sizes, materials, packing options and specifications may vary depending on production status and supplier confirmation.",
      "Buyers should confirm final product details, samples, quality expectations and packaging requirements before approving any export order.",
    ],
  },
  {
    title: "Cart, Checkout & Enquiry Requests",
    content: [
      "Adding products to cart or submitting checkout information does not create a confirmed purchase order.",
      "Checkout requests help our team review buyer details, product quantity, destination, payment preference and shipment requirements before preparing next steps.",
    ],
  },
  {
    title: "Pricing, Payment & Order Confirmation",
    content: [
      "Prices, freight charges, taxes, documentation costs and payment terms are confirmed separately after reviewing product specifications and buyer requirements.",
      "An order is treated as confirmed only after written acceptance, agreed commercial terms, buyer approval and payment instructions are completed.",
    ],
  },
  {
    title: "Shipping, Documentation & Delivery",
    content: [
      "Shipment movement depends on production readiness, packing, inspection, export documentation, carrier availability and destination country requirements.",
      `${siteConfig.name} coordinates export-related communication, but delivery timelines may be affected by customs, logistics providers or buyer-side documentation delays.`,
    ],
  },
  {
    title: "Cancellations, Claims & Buyer Responsibility",
    content: [
      "Cancellation, replacement, return or claim requests are reviewed case-by-case based on the product category, order stage, approved sample, supplier policy and shipment status.",
      "Buyers are responsible for sharing accurate company details, delivery information, destination requirements and product specifications before order processing.",
    ],
  },
];

export default function TermsConditionPage() {
  return (
    <main className="bg-white px-5 pb-14 pt-20 text-black sm:px-8 lg:px-10 lg:pb-20 lg:pt-28">
      <section className="mx-auto max-w-[1000px]">
        <div className="relative mb-10 min-h-[280px] overflow-hidden rounded-[18px] bg-black text-white shadow-2xl shadow-black/15">
          <Image
            src="/product_category.jpg"
            alt="Lotus Impex shopping terms and conditions"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
          <div className="relative z-10 flex min-h-[280px] flex-col items-center justify-center px-5 text-center">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#c9a16b]">
              Shopping Website Terms
            </p>
            <h1 className="text-5xl leading-[0.95] tracking-[-0.04em] sm:text-6xl">
              Terms & Conditions
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70">
              Terms for using {siteConfig.name} to browse products, add items to
              cart and submit export checkout requests.
            </p>
          </div>
        </div>

        <div className="grid gap-8 border-t border-black/10 pt-10 lg:grid-cols-[240px_1fr]">
          <aside className="h-fit rounded-[8px] border border-black/10 bg-[#f8f4ed] p-5 lg:sticky lg:top-32">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-black/40">
              Terms Information
            </p>
            <div className="grid gap-2">
              {detailedSections.map((section, index) => (
                <a
                  key={section.title}
                  href={`#terms-detail-${index + 1}`}
                  className="rounded-[8px] bg-white px-4 py-3 text-xs font-black text-black/60 transition hover:bg-black hover:text-white"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </aside>

          <div className="grid gap-8">
            {detailedSections.map((section, index) => (
              <article
                id={`terms-detail-${index + 1}`}
                key={section.title}
                className="scroll-mt-32 border-b border-black/10 pb-8 last:border-b-0"
              >
                <span className="text-xs font-black uppercase tracking-[0.22em] text-[#b58a52]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-xl font-black leading-tight tracking-[-0.01em] sm:text-2xl">
                  {section.title}
                </p>
                <div className="mt-5 grid gap-3">
                  {section.content.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="max-w-3xl text-sm leading-7 text-black/60"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/privacy"
            className="inline-flex justify-center rounded-full border border-black/15 px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white"
          >
            Privacy Policy
          </Link>
          <Link
            href="/contact"
            className="inline-flex justify-center rounded-full bg-black px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#6b3f24]"
          >
            Contact Lotus Impex
          </Link>
        </div>

        <section className="mt-12 border-t border-black/10 pt-10">
          <div className="mb-6 text-center">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.24em] text-[#b58a52]">
              Terms FAQ
            </p>
            <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid gap-3">
            {faqs.map((item, index) => (
              <details
                key={item.q}
                className="group rounded-[8px] border border-black/10 bg-white shadow-sm"
                open={index === 0}
              >
                <summary className="flex items-center justify-between gap-4 px-5 py-4 text-left">
                  <span>
                    <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.22em] text-[#b58a52]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="block text-lg font-black leading-snug tracking-[-0.01em] sm:text-xl">
                      {item.q}
                    </span>
                  </span>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#f4efe7] text-base font-black transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="border-t border-black/10 px-5 py-4">
                  <p className="text-sm leading-7 text-black/60">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
