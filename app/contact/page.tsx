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
      <section className="relative min-h-[560px] overflow-hidden bg-black">
        <Image
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85"
          alt="Lotus Impex export enquiry office"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-58"
        />

        <div className="absolute inset-0 image-overlay" />

        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-[1500px] items-end px-5 py-12 sm:px-8 lg:px-10">
          <div className="max-w-5xl">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.34em] text-white/65">
              Contact Lotus Impex
            </p>

            <h1 className="text-6xl font-black uppercase leading-[0.84] tracking-[-0.09em] text-white sm:text-7xl lg:text-8xl">
              Start Export Enquiry.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72">
              Share your product, quantity, destination country and packaging
              requirement. We will review the enquiry and prepare the next
              sourcing step.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-black/45">
              Enquiry Form
            </p>

            <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] sm:text-6xl">
              Tell us what you want to source.
            </h2>

            <p className="mt-6 text-lg leading-8 text-black/60">
              For faster response, include product name, quantity, destination,
              packing type and any quality specifications.
            </p>

            <div className="mt-8 grid gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="border border-black/10 bg-[#ebe3d7] px-5 py-5 text-sm font-black uppercase tracking-[0.14em] transition hover:bg-black hover:text-white"
              >
                {siteConfig.email}
              </a>

              <a
                href={`tel:${siteConfig.phone}`}
                className="border border-black/10 bg-[#ebe3d7] px-5 py-5 text-sm font-black uppercase tracking-[0.14em] transition hover:bg-black hover:text-white"
              >
                {siteConfig.phone}
              </a>

              <div className="border border-black/10 bg-[#ebe3d7] px-5 py-5 text-sm font-black uppercase tracking-[0.14em]">
                {siteConfig.location}
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="bg-black px-5 py-16 text-white sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-white/45">
                Enquiry Categories
              </p>

              <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] sm:text-6xl">
                Select the right division.
              </h2>
            </div>

            <Link
              href="/products"
              className="rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-[#c9a16b]"
            >
              View Catalogue
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {exportCategories.map((category) => (
              <Link
                key={category.slug}
                href={`/products/${category.slug}`}
                className="group border border-white/10 p-6 transition hover:bg-white hover:text-black"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/35 transition group-hover:text-black/35">
                  {category.eyebrow}
                </p>

                <h3 className="mt-3 text-2xl font-black uppercase tracking-[-0.06em]">
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