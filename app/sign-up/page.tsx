import type { Metadata } from "next";
import SignInForm from "@/components/SignInForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create a Lotus Impex buyer account.",
  alternates: {
    canonical: "/sign-up",
  },
};

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f2] px-5 py-10 text-black sm:px-8 lg:px-10">
      <section className="mx-auto grid w-full max-w-[760px] gap-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-[#b58a52]">
            Buyer Account
          </p>

          <p className="text-4xl font-semibold leading-tight">Sign up</p>

          <p className="mt-4 text-lg leading-8 text-black/60">
            Create your buyer account with name, email and password.
          </p>
        </div>

        <SignInForm authView="signUp" />
      </section>
    </main>
  );
}
