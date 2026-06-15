import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Lotus Impex.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="bg-[#f4efe7] px-5 py-20 text-black sm:px-8 lg:px-10 lg:py-28">
      <section className="mx-auto max-w-5xl">
        <p className="mb-5 text-xs font-black uppercase tracking-[0.3em] text-black/45">
          Legal
        </p>

        <h1 className="text-6xl font-black uppercase leading-[0.86] tracking-[-0.09em] sm:text-7xl">
          Privacy Policy
        </h1>

        <p className="mt-7 text-lg leading-8 text-black/60">
          This privacy policy explains how {siteConfig.name} handles enquiry
          information submitted through this website.
        </p>

        <div className="mt-12 grid gap-8 border-y border-black/10 py-10">
          {[
            {
              title: "Information We Collect",
              text: "We may collect your name, email address, phone number, destination country, product category, quantity and enquiry message when you submit the contact form.",
            },
            {
              title: "How We Use Information",
              text: "We use submitted information only to understand your export requirement, respond to your enquiry and coordinate possible sourcing or trade discussions.",
            },
            {
              title: "Data Storage",
              text: "The current website build does not connect to a database yet. When database integration is added, enquiry data will be handled with reasonable security practices.",
            },
            {
              title: "Third-Party Sharing",
              text: "We do not sell enquiry information. Information may only be shared where needed to respond to your sourcing request or comply with legal requirements.",
            },
            {
              title: "Contact",
              text: `For privacy-related questions, contact us at ${siteConfig.email}.`,
            },
          ].map((section) => (
            <div key={section.title}>
              <h2 className="text-3xl font-black uppercase tracking-[-0.06em]">
                {section.title}
              </h2>

              <p className="mt-4 text-base leading-8 text-black/60">
                {section.text}
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/contact"
          className="mt-10 inline-flex rounded-full bg-black px-7 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#6b3f24]"
        >
          Contact Lotus Impex
        </Link>
      </section>
    </main>
  );
}