"use client";

import Link from "next/link";
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
    <label className="grid gap-2 text-sm font-bold text-black/60">
      {label}
      {children}
    </label>
  );
}

function TextInput({
  name,
  type = "text",
  placeholder,
  required = true,
}: {
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <input
      required={required}
      name={name}
      type={type}
      autoComplete="off"
      autoCorrect="off"
      spellCheck={false}
      placeholder={placeholder}
      className="h-14 rounded-[8px] border border-black/15 bg-white px-5 text-base font-semibold text-black outline-none transition placeholder:text-black/35 focus:border-black"
    />
  );
}

export default function SignInForm({ authView = "signIn" }: { authView?: AuthView }) {
  const [mode, setMode] = useState<AuthMode>("signIn");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleAuthSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    const formData = new FormData(event.currentTarget);
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
          rememberMe,
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

      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(result.user));
      window.dispatchEvent(new Event(USER_UPDATED_EVENT));
      setMessage(
        authMode === "signUp"
          ? "Account created successfully."
          : "Login successful.",
      );
      event.currentTarget.reset();
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
        className="rounded-[8px] border border-black bg-white p-6 shadow-sm sm:p-8"
      >
        <input type="hidden" name="authMode" value="signUp" />

        <div className="mb-6 border-b border-black pb-5">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#b58a52]">
            New User
          </p>
          <p className="mt-2 text-3xl font-semibold leading-tight">
            Create Account
          </p>
          <p className="mt-3 text-sm leading-6 text-black/55">
            Fill in your name, email and password to create a buyer account.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First name">
            <TextInput name="firstName" placeholder="First name" />
          </Field>
          <Field label="Last name">
            <TextInput name="lastName" placeholder="Last name" />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Email address">
              <TextInput name="email" type="email" placeholder="you@example.com" />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <PasswordField showPassword={showPassword} setShowPassword={setShowPassword} />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-7 w-full rounded-[6px] border border-black bg-black px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:bg-black/40"
        >
          {isSubmitting ? "Please wait..." : "Create Account"}
        </button>

        <Link
          href="/sign-in"
          className="mt-4 inline-flex w-full justify-center rounded-[6px] border border-black px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white"
        >
          Already have account? Sign In
        </Link>

        <AuthMessage error={error} message={message} />
      </form>
    );
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleAuthSubmit}
      className="rounded-[8px] border border-black bg-white p-6 shadow-sm sm:p-8"
    >
      <input
        type="hidden"
        name="authMode"
        value={mode === "forgot" ? "forgot" : "signIn"}
      />

      <div className="mb-6 border-b border-black pb-5">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#b58a52]">
          Existing User
        </p>
        <p className="mt-2 text-3xl font-semibold leading-tight">
          {mode === "forgot" ? "Forgot password" : "Sign in"}
        </p>
        <p className="mt-3 text-sm leading-6 text-black/55">
          {mode === "forgot"
            ? "Enter your account email and we will guide you through password reset support."
            : "Sign in with your buyer account to view profile, cart products and orders."}
        </p>
      </div>

      <Field label="Email address">
        <TextInput name="email" type="email" placeholder="you@example.com" />
      </Field>

      {mode === "forgot" ? (
        <p className="mt-4 rounded-[8px] border border-black bg-[#f8f4ed] px-4 py-3 text-sm text-black/60">
          Enter your account email and we will guide you through password reset
          support.
        </p>
      ) : (
        <>
          <PasswordField
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-sm font-bold">
            <label className="flex items-center gap-2 text-black/60">
              <input
                name="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="size-4 accent-black"
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={() => {
                setMode("forgot");
                setError("");
                setMessage("");
              }}
              className="rounded-[6px] border border-black px-4 py-2 text-xs font-black uppercase tracking-[0.12em] transition hover:bg-black hover:text-white"
            >
              Forgot password?
            </button>
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 w-full rounded-[6px] border border-black bg-black px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:bg-black/40"
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
          className="mt-3 w-full rounded-[6px] border border-black px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white"
        >
          Back To Sign In
        </button>
      ) : (
        <Link
          href="/sign-up"
          className="mt-3 inline-flex w-full justify-center rounded-[6px] border border-black px-6 py-4 text-xs font-black uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white"
        >
          Create New Account
        </Link>
      )}

      <AuthMessage error={error} message={message} />
    </form>
  );
}

function PasswordField({
  showPassword,
  setShowPassword,
}: {
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
}) {
  return (
    <Field label="Password">
      <div className="flex overflow-hidden rounded-[8px] border border-black bg-white">
        <input
          required
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          placeholder="Enter password"
          className="h-14 min-w-0 flex-1 px-5 text-base font-semibold text-black outline-none placeholder:text-black/35"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="border-l border-black px-5 text-xs font-black uppercase tracking-[0.12em] hover:bg-black hover:text-white"
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
