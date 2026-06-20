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
    <main className="grid min-h-screen place-items-center bg-[#f8f6f2] px-5 py-8 text-black sm:px-8 lg:px-10">
      <section className="mx-auto w-full max-w-[760px]">
        <SignInForm authView="signIn" />
      </section>
    </main>
  );
}
