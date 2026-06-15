"use client";

import { FormEvent, useState } from "react";
import { exportCategories } from "@/data/site";

type Status = {
  type: "idle" | "success" | "error";
  message: string;
};

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>({
    type: "idle",
    message: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setStatus({ type: "idle", message: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      category: String(formData.get("category") || ""),
      quantity: String(formData.get("quantity") || ""),
      country: String(formData.get("country") || ""),
      message: String(formData.get("message") || ""),
      companyName: String(formData.get("companyName") || ""),
    };

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setStatus({
        type: "success",
        message: data.message || "Your export enquiry has been received.",
      });

      form.reset();
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full border border-black/10 bg-[#f4efe7] px-5 py-4 text-sm font-bold text-black outline-none transition placeholder:text-black/35 focus:border-black focus:bg-white";

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-black/10 bg-[#ebe3d7] p-5 sm:p-7 lg:p-8"
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="companyName">Company Name</label>
        <input
          id="companyName"
          name="companyName"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-black uppercase tracking-[0.16em] text-black/55">
          Full Name
          <input
            required
            name="name"
            minLength={2}
            maxLength={80}
            placeholder="Your name"
            className={inputClass}
          />
        </label>

        <label className="grid gap-2 text-xs font-black uppercase tracking-[0.16em] text-black/55">
          Email Address
          <input
            required
            type="email"
            name="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-black uppercase tracking-[0.16em] text-black/55">
          Phone / WhatsApp
          <input
            name="phone"
            placeholder="+91..."
            className={inputClass}
          />
        </label>

        <label className="grid gap-2 text-xs font-black uppercase tracking-[0.16em] text-black/55">
          Destination Country
          <input
            name="country"
            placeholder="Example: UAE, UK, USA"
            className={inputClass}
          />
        </label>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-black uppercase tracking-[0.16em] text-black/55">
          Product Category
          <select
            required
            name="category"
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Select category
            </option>

            {exportCategories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.title}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-xs font-black uppercase tracking-[0.16em] text-black/55">
          Estimated Quantity
          <input
            name="quantity"
            placeholder="500 pieces / 1 container / 100 units"
            className={inputClass}
          />
        </label>
      </div>

      <label className="mt-4 grid gap-2 text-xs font-black uppercase tracking-[0.16em] text-black/55">
        Requirement Details
        <textarea
          required
          name="message"
          minLength={10}
          maxLength={1200}
          rows={6}
          placeholder="Tell us product details, destination country, quantity, packaging, timeline and any quality expectations."
          className={`${inputClass} resize-none`}
        />
      </label>

      <button
        disabled={loading}
        type="submit"
        className="mt-5 w-full bg-black px-6 py-5 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#6b3f24] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Submitting Enquiry..." : "Submit Export Enquiry"}
      </button>

      {status.message ? (
        <p
          className={`mt-4 px-5 py-4 text-sm font-bold ${
            status.type === "success"
              ? "bg-emerald-100 text-emerald-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}