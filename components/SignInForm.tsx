"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const USER_STORAGE_KEY = "lotus_impex_user";
const USER_UPDATED_EVENT = "lotus-impex-user-updated";

type SignedInUser = {
  name: string;
  email: string;
};

export default function SignInForm() {
  const router = useRouter();

  const [rememberMe, setRememberMe] = useState(false);
  const [user, setUser] = useState<SignedInUser | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const raw = window.localStorage.getItem(USER_STORAGE_KEY);

    if (!raw) {
      return;
    }

    try {
      setUser(JSON.parse(raw) as SignedInUser);
    } catch {
      window.localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
      rememberMe: formData.get("rememberMe") === "on",
    };

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        success?: boolean;
        user?: SignedInUser;
        message?: string;
      };

      if (!response.ok || !result.success || !result.user) {
        throw new Error(result.message || "Unable to sign in.");
      }

      window.localStorage.setItem(
        USER_STORAGE_KEY,
        JSON.stringify(result.user)
      );
      window.dispatchEvent(new Event(USER_UPDATED_EVENT));
      setUser(result.user);
      setMessage(`Signed in as ${result.user.name}.`);
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to sign in. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function signOut() {
    window.localStorage.removeItem(USER_STORAGE_KEY);
    window.dispatchEvent(new Event(USER_UPDATED_EVENT));
    setUser(null);
    setMessage("");
    setError("");
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className="rounded-[8px] border border-black/10 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="mb-6 border-b border-black/10 pb-6">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#b58a52]">
          Account Login
        </p>
        <h2 className="mt-2 text-4xl leading-none tracking-[-0.04em]">
          Welcome Back
        </h2>
        {user ? (
          <p className="mt-4 text-sm font-bold text-black/55">
            Current user: <span className="text-black">{user.name}</span>
          </p>
        ) : null}
      </div>

      <label className="grid gap-2 text-xs font-black uppercase tracking-[0.16em] text-black/55">
        Email Address
        <input
          required
          name="email"
          type="email"
          defaultValue=""
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="you@example.com"
          className="rounded-[8px] border border-black/10 bg-[#f8f4ed] px-5 py-4 text-sm font-bold text-black outline-none transition placeholder:text-black/35 focus:border-black focus:bg-white"
        />
      </label>

      <label className="mt-4 grid gap-2 text-xs font-black uppercase tracking-[0.16em] text-black/55">
        Password
        <input
          required
          name="password"
       type={rememberMe ? "text" : "password"}
          defaultValue=""
          autoComplete="new-password"
          placeholder="Enter password"
          className="rounded-[8px] border border-black/10 bg-[#f8f4ed] px-5 py-4 text-sm font-bold text-black outline-none transition placeholder:text-black/35 focus:border-black focus:bg-white"
        />
      </label>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm font-bold">
     <label className="flex items-center gap-2 text-black/60">
  <input
    name="rememberMe"
    type="checkbox"
    checked={rememberMe}
    onChange={(e) => setRememberMe(e.target.checked)}
    className="size-4 accent-black"
  />
  Remember me
</label>
        <Link href="/contact" className="text-black hover:text-[#6b3f24]">
          Need help?
        </Link>
      </div>

      {error ? (
        <p className="mt-5 rounded-[8px] bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          {error}
        </p>
      ) : null}

      {message ? (
        <p className="mt-5 rounded-[8px] bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 w-full rounded-full bg-black px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#6b3f24] disabled:cursor-not-allowed disabled:bg-black/40"
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </button>

      {user ? (
        <button
          type="button"
          onClick={signOut}
          className="mt-3 inline-flex w-full justify-center rounded-full border border-black/15 px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white"
        >
          Sign Out
        </button>
      ) : (
        <Link
          href="/contact"
          className="mt-3 inline-flex w-full justify-center rounded-full border border-black/15 px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white"
        >
          Request Buyer Access
        </Link>
      )}
    </form>
  );
}
