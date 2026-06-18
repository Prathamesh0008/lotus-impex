import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import InternalLinkSection from "@/components/InternalLinkSection";
import { exportCategories, siteConfig } from "@/data/site";


export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Lotus Impex for export enquiries related to garments, fabrics, accessories, machinery and general goods.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="bg-[#f4efe7] text-black">
      {/* HERO SECTION */}
      <section className="relative min-h-[520px] overflow-hidden bg-black lg:min-h-[600px]">
        <Image
          src="/Contact_us.png"
          alt="Lotus Impex export enquiry office"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-75"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/82 via-black/45 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/15" />

        <div className="relative z-10 mx-auto flex min-h-[520px] max-w-[1500px] items-center px-5 py-16 sm:px-8 lg:min-h-[600px] lg:px-10">
          <div className="max-w-4xl">
            <div className="mb-6 h-1 w-16 rounded-full bg-[#d6b85a]" />

            <p className="mb-5 text-xs font-black uppercase tracking-[0.34em] text-[#f0cf6d]">
              Contact Lotus Impex
            </p>

            <h1 className="max-w-4xl font-serif text-5xl uppercase leading-[0.95] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
              Start Export Enquiry.
            </h1>

            <p className="mt-6 max-w-2xl text-base font-medium leading-8 text-white/78 sm:text-lg">
              Share your product, quantity, destination country and packaging
              requirement. We will review the enquiry and prepare the next
              sourcing step.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section className="px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-[1500px] gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          {/* LEFT INFO CARD */}
          <aside className="rounded-[28px] border border-black/10 bg-white p-6 shadow-xl shadow-black/5 lg:sticky lg:top-28 lg:p-8">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-[#b58a52]">
              Enquiry Form
            </p>

            <h2 className="font-serif text-5xl uppercase leading-[0.95] tracking-[-0.04em] text-black sm:text-6xl">
              Tell us what you want to source.
            </h2>

            <p className="mt-6 text-base leading-8 text-black/60">
              For faster response, include product name, quantity, destination,
              packing type and any quality specifications.
            </p>

            <div className="mt-8 grid gap-4 border-y border-black/10 py-6">
              <a
                href={`mailto:${siteConfig.email}`}
                className="group rounded-2xl border border-black/10 bg-[#f4efe7] px-5 py-5 transition hover:bg-black hover:text-white"
              >
                <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-black/35 transition group-hover:text-white/40">
                  Email
                </span>
                <span className="break-words text-sm font-black uppercase tracking-[0.12em]">
                  {siteConfig.email}
                </span>
              </a>

              <a
                href={`tel:${siteConfig.phone}`}
                className="group rounded-2xl border border-black/10 bg-[#f4efe7] px-5 py-5 transition hover:bg-black hover:text-white"
              >
                <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-black/35 transition group-hover:text-white/40">
                  Phone
                </span>
                <span className="text-sm font-black uppercase tracking-[0.12em]">
                  {siteConfig.phone}
                </span>
              </a>

              <div className="rounded-2xl border border-black/10 bg-[#f4efe7] px-5 py-5">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-black/35">
                  Location
                </span>
                <span className="text-sm font-black uppercase tracking-[0.12em]">
                  {siteConfig.location}
                </span>
              </div>
            </div>

            <div className="mt-6 grid gap-4 rounded-2xl bg-black p-5 text-white">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-white/45">
                Response Checklist
              </p>

              {[
                "Product photos or reference",
                "Quantity and destination",
                "Target packing and timeline",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#d6b85a] text-xs font-black text-black">
                    ✓
                  </span>
                  <span className="text-sm font-bold leading-6 text-white/75">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </aside>

          {/* RIGHT FORM */}
          <ContactForm />
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="bg-black px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-[#d6b85a]">
                Enquiry Categories
              </p>

              <h2 className="font-serif text-5xl uppercase leading-[0.95] tracking-[-0.04em] sm:text-6xl">
                Select the right division.
              </h2>
            </div>

            <Link
              href="/products"
              className="w-fit rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-[#d6b85a]"
            >
              View Catalogue
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {exportCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/products/${category.slug}`}
                className="group rounded-2xl border border-white/10 p-6 transition hover:bg-white hover:text-black"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/35 transition group-hover:text-black/35">
                  {category.eyebrow}
                </p>

                <h3 className="mt-3 font-serif text-2xl uppercase tracking-[-0.04em]">
                  {category.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/55 transition group-hover:text-black/55">
                  {category.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InternalLinkSection />
    </main>
  );
}
