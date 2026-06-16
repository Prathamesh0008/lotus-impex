import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Lotus Impex shopping and export enquiry website.",
  alternates: {
    canonical: "/privacy",
  },
};

const faqs = [
  {
    q: "What information does Lotus Impex collect?",
    a: "We may collect your name, email, phone number, company name, destination country, product interest, quantity, cart details and enquiry message.",
  },
  {
    q: "Why do you collect cart and checkout details?",
    a: "Cart and checkout details help us understand your product shortlist, prepare sourcing options and respond with relevant export quotation details.",
  },
  {
    q: "Do you process payments automatically?",
    a: "No. Checkout creates a payment or order request only. Final payment instructions are confirmed directly by Lotus Impex.",
  },
  {
    q: "Do you share buyer information?",
    a: "We do not sell buyer information. Product requirements may be shared with relevant suppliers only when needed for sourcing or quotation support.",
  },
  {
    q: "How can I request privacy support?",
    a: `You can contact ${siteConfig.name} at ${siteConfig.email} for privacy-related questions or correction requests.`,
  },
];

const detailedSections = [
  {
    title: "Welcome to our privacy policy",
    content: [
      `${siteConfig.name} respects buyer privacy and handles shopping, cart, checkout and enquiry information with care.`,
      "This policy explains what information may be collected, how it is used, when it may be shared and how buyers can contact us for privacy support.",
    ],
  },
  {
    title: "Data Collection",
    content: [
      "Information you provide directly may include contact details, company name, destination country, product category, quantity, packing preferences and enquiry notes.",
      "Automatically stored cart information may include selected products, quantity and browser-based cart state so you can continue shopping later.",
      "Checkout request information may include buyer details, delivery preferences, shipping terms and payment method selection for quotation review.",
    ],
  },
  {
    title: "Types of Data",
    content: [
      "Buyer contact data: name, email, phone number, company name and country.",
      "Order request data: selected product, category, quantity, MOQ, destination, delivery instructions and packaging requirements.",
      "Communication data: enquiry messages, quote discussions and follow-up information shared through forms, phone, email or WhatsApp.",
    ],
  },
  {
    title: "Use of Information",
    content: [
      "We use buyer information to understand requirements, prepare sourcing options, coordinate supplier communication and respond with suitable export next steps.",
      "We may use product and cart details to organize quotation requests, estimate order scope and discuss shipment documentation requirements.",
    ],
  },
  {
    title: "Security & Retention",
    content: [
      "We keep enquiry information only as long as needed for buyer communication, quotation follow-up, order coordination or legal/business record purposes.",
      "Buyers should avoid submitting unnecessary sensitive information in open text fields unless specifically requested for documentation.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-white px-5 py-14 text-black sm:px-8 lg:px-10 lg:py-20">
      <section className="mx-auto max-w-[1000px]">
        <div className="relative mb-10 min-h-[280px] overflow-hidden rounded-[18px] bg-black text-white shadow-2xl shadow-black/15">
          <Image
            src="/online-marketing.jpg"
            alt="Lotus Impex ecommerce privacy policy"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
          <div className="relative z-10 flex min-h-[280px] flex-col items-center justify-center px-5 text-center">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#c9a16b]">
              Shopping Website Policy
            </p>
            <h1 className="text-5xl leading-[0.95] tracking-[-0.04em] sm:text-6xl">
              Privacy Policy
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70">
              How {siteConfig.name} handles buyer, cart, checkout and export
              enquiry information.
            </p>
          </div>
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

        <div className="mt-12 grid gap-8 border-t border-black/10 pt-10 lg:grid-cols-[240px_1fr]">
          <aside className="h-fit rounded-[8px] border border-black/10 bg-[#f8f4ed] p-5 lg:sticky lg:top-32">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.24em] text-black/40">
              More Information
            </p>
            <div className="grid gap-2">
              {detailedSections.map((section, index) => (
                <a
                  key={section.title}
                  href={`#privacy-detail-${index + 1}`}
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
                id={`privacy-detail-${index + 1}`}
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
            href="/terms-condition"
            className="inline-flex justify-center rounded-full border border-black/15 px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white"
          >
            Terms & Conditions
          </Link>
          <Link
            href="/contact"
            className="inline-flex justify-center rounded-full bg-black px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#6b3f24]"
          >
            Contact Lotus Impex
          </Link>
        </div>
      </section>
    </main>
  );
}
