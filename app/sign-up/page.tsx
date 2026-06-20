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
    <main className="grid min-h-screen place-items-center bg-[#f8f6f2] px-5 py-8 text-black sm:px-8 lg:px-10">
      <section className="mx-auto w-full max-w-[760px]">
        <SignInForm authView="signUp" />
      </section>
    </main>
  );
}
