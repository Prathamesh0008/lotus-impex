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
    <main className="grid min-h-screen place-items-center bg-[#f4efe7] px-5 py-10 text-black sm:px-8 lg:px-10">
      <section className="mx-auto grid w-full max-w-[1200px] items-center gap-10 lg:grid-cols-[0.82fr_1fr]">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
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

        <div className="mx-auto w-full max-w-[640px]">
          <SignInForm />
        </div>
      </section>
    </main>
  );
}
