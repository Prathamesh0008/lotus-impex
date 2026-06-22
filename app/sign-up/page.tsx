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
    <main className="grid min-h-screen place-items-start bg-[#f8f6f2] px-3 py-4 text-black sm:place-items-center sm:px-8 sm:py-8 lg:px-10">
      <section className="mx-auto w-full max-w-[760px] min-w-0">
        <SignInForm authView="signUp" />
      </section>
    </main>
  );
}
