"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, ReactNode, useState } from "react";

const USER_STORAGE_KEY = "lotus_impex_user";
const USER_UPDATED_EVENT = "lotus-impex-user-updated";

type AuthMode = "signIn" | "forgot";
type AuthSubmitMode = "signIn" | "signUp" | "forgot";
type AuthView = "signIn" | "signUp";

type SignedInUser = {
  name: string;
  email: string;
};

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.14em] text-black/50 sm:text-xs sm:tracking-[0.18em]">
        {label}
      </span>
      {children}
    </label>
  );
}

function TextInput({
  name,
  type = "text",
  placeholder,
  required = true,
  autoComplete,
}: {
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <input
      required={required}
      name={name}
      type={type}
      autoComplete={autoComplete || "off"}
      autoCorrect="off"
      spellCheck={false}
      placeholder={placeholder}
      className="h-12 w-full min-w-0 rounded-2xl border border-black/10 bg-[#f9f6ef] px-4 text-sm font-semibold text-black outline-none transition placeholder:text-black/35 focus:border-black focus:bg-white sm:h-14 sm:px-5"
    />
  );
}

export default function SignInForm({ authView = "signIn" }: { authView?: AuthView }) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("signIn");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleAuthSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();
    const authMode = String(formData.get("authMode") || "signIn") as AuthSubmitMode;

    if (authMode === "forgot") {
      setMessage(
        email
          ? `Password reset help is ready for ${email}. Please contact Lotus Impex support to complete reset.`
          : "Please enter your email address.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: String(formData.get("password") || ""),
          firstName: String(formData.get("firstName") || ""),
          lastName: String(formData.get("lastName") || ""),
          authMode,
          rememberMe: false,
        }),
      });
      const result = (await response.json()) as {
        success?: boolean;
        user?: SignedInUser;
        message?: string;
      };

      if (!response.ok || !result.success || !result.user) {
        throw new Error(result.message || "Unable to continue.");
      }

      form.reset();

      if (authMode === "signUp") {
        setMessage("Account created successfully. Redirecting to sign in...");
        window.setTimeout(() => router.push("/sign-in"), 900);
        return;
      }

      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(result.user));
      window.dispatchEvent(new Event(USER_UPDATED_EVENT));
      setMessage("Login successful.");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to continue. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (authView === "signUp") {
    return (
      <form
        autoComplete="off"
        onSubmit={handleAuthSubmit}
        className="mx-auto w-full max-w-[760px] min-w-0 overflow-hidden rounded-[22px] border border-black/10 bg-white p-4 shadow-xl shadow-black/5 sm:rounded-[28px] sm:p-6 lg:p-8"
      >
        <input type="hidden" name="authMode" value="signUp" />

        <div className="mb-6 border-b border-black/10 pb-5 sm:mb-8 sm:pb-6">
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#b58a52] sm:text-xs sm:tracking-[0.3em]">
            New User
          </p>
          <h2 className="mt-3 font-serif text-3xl uppercase leading-[1] text-black sm:text-5xl">
            Create Account
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-black/55">
            Fill in your name, email and password to create a buyer account.
          </p>
        </div>

        <div className="grid min-w-0 gap-4 sm:gap-5 md:grid-cols-2">
          <Field label="First name">
            <TextInput
              name="firstName"
              placeholder="First name"
              autoComplete="given-name"
            />
          </Field>
          <Field label="Last name">
            <TextInput
              name="lastName"
              placeholder="Last name"
              autoComplete="family-name"
            />
          </Field>
          <div className="md:col-span-2">
            <Field label="Email address">
              <TextInput
                name="email"
                type="email"
                placeholder="Enter email address"
                autoComplete="email"
              />
            </Field>
          </div>
          <div className="md:col-span-2">
            <PasswordField
              autoComplete="new-password"
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </div>
        </div>

        <div className="mt-6 grid gap-3 border-t border-black/10 pt-5 sm:mt-7 sm:gap-4 sm:pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-black px-5 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#6b3f24] disabled:cursor-not-allowed disabled:bg-black/50 sm:px-8 sm:py-4 sm:tracking-[0.18em]"
          >
            {isSubmitting ? "Please wait..." : "Create Account"}
          </button>

          <Link
            href="/sign-in"
            className="inline-flex justify-center rounded-full border border-black/15 px-5 py-3.5 text-center text-xs font-black uppercase tracking-[0.12em] text-black transition hover:border-black hover:bg-black hover:text-white sm:px-8 sm:py-4 sm:tracking-[0.18em]"
          >
            Already have account? Sign In
          </Link>
        </div>

        <AuthMessage error={error} message={message} />
      </form>
    );
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleAuthSubmit}
      className="mx-auto w-full max-w-[760px] min-w-0 overflow-hidden rounded-[22px] border border-black/10 bg-white p-4 shadow-xl shadow-black/5 sm:rounded-[28px] sm:p-6 lg:p-8"
    >
      <input
        type="hidden"
        name="authMode"
        value={mode === "forgot" ? "forgot" : "signIn"}
      />

      <div className="mb-6 border-b border-black/10 pb-5 sm:mb-8 sm:pb-6">
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#b58a52] sm:text-xs sm:tracking-[0.3em]">
          Existing User
        </p>
        <h2 className="mt-3 font-serif text-3xl uppercase leading-[1] text-black sm:text-5xl">
          {mode === "forgot" ? "Forgot password" : "Sign in"}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-black/55">
          {mode === "forgot"
            ? "Enter your account email and we will guide you through password reset support."
            : "Enter your email and password to access your buyer account."}
        </p>
      </div>

      <div className={mode === "forgot" ? "" : "mb-5"}>
        <Field label="Email address">
          <TextInput
            name="email"
            type="email"
            placeholder="Enter email address"
            autoComplete="email"
          />
        </Field>
      </div>

      {mode === "forgot" ? (
        <p className="mt-5 rounded-2xl border border-black/10 bg-[#f9f6ef] px-5 py-4 text-sm font-semibold leading-7 text-black/60">
          Enter your account email and we will guide you through password reset
          support.
        </p>
      ) : (
        <>
          <PasswordField
            autoComplete="current-password"
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={() => {
                setMode("forgot");
                setError("");
                setMessage("");
              }}
              className="rounded-full border border-black/15 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] transition hover:border-black hover:bg-black hover:text-white"
            >
              Forgot password?
            </button>
          </div>
        </>
      )}

      <div className="mt-7 grid gap-4 border-t border-black/10 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-black px-5 py-3.5 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#6b3f24] disabled:cursor-not-allowed disabled:bg-black/50 sm:px-8 sm:py-4 sm:tracking-[0.18em]"
        >
          {isSubmitting
            ? "Please wait..."
            : mode === "forgot"
              ? "Reset Password"
              : "Sign In"}
        </button>

        {mode === "forgot" ? (
          <button
            type="button"
            onClick={() => {
              setMode("signIn");
              setError("");
              setMessage("");
            }}
            className="rounded-full border border-black/15 px-5 py-3.5 text-xs font-black uppercase tracking-[0.12em] text-black transition hover:border-black hover:bg-black hover:text-white sm:px-8 sm:py-4 sm:tracking-[0.18em]"
          >
            Back To Sign In
          </button>
        ) : (
          <Link
            href="/sign-up"
            className="inline-flex justify-center rounded-full border border-black/15 px-5 py-3.5 text-center text-xs font-black uppercase tracking-[0.12em] text-black transition hover:border-black hover:bg-black hover:text-white sm:px-8 sm:py-4 sm:tracking-[0.18em]"
          >
            Create New Account
          </Link>
        )}
      </div>

      <AuthMessage error={error} message={message} />
    </form>
  );
}

function PasswordField({
  autoComplete = "current-password",
  showPassword,
  setShowPassword,
}: {
  autoComplete?: string;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}) {
  return (
    <Field label="Password">
      <div className="flex min-w-0 overflow-hidden rounded-2xl border border-black/10 bg-[#f9f6ef] transition focus-within:border-black focus-within:bg-white">
        <input
          required
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete={autoComplete}
          minLength={4}
          placeholder="Enter password"
          className="h-12 min-w-0 flex-1 bg-transparent px-4 text-sm font-semibold text-black outline-none placeholder:text-black/35 sm:h-14 sm:px-5"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="shrink-0 border-l border-black/10 bg-white/70 px-3 text-[11px] font-black uppercase tracking-[0.08em] text-black/60 transition hover:bg-black hover:text-white sm:px-5 sm:text-xs sm:tracking-[0.14em]"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </Field>
  );
}

function AuthMessage({ error, message }: { error: string; message: string }) {
  if (error) {
    return (
      <p className="mt-5 rounded-[8px] bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
        {error}
      </p>
    );
  }

  if (message) {
    return (
      <p className="mt-5 rounded-[8px] bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
        {message}
      </p>
    );
  }

  return null;
}
