import type { Metadata } from "next";
import SignInForm from "@/components/SignInForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to Lotus Impex buyer account.",
  alternates: {
    canonical: "/sign-in",
  },
};

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[#f4efe7] px-5 py-16 text-black sm:px-8 lg:px-10">
      <section className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-center">
        <div>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-[#b58a52]">
            Buyer Account
          </p>
          <h1 className="text-6xl leading-[0.9] tracking-[-0.05em] sm:text-7xl">
            Sign in to continue.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-black/60">
            Access saved cart items, checkout requests and export enquiry
            updates from Lotus Impex.
          </p>
        </div>

        <SignInForm />
      </section>
    </main>
  );
}
