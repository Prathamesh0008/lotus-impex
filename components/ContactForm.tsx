"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formRef.current) return;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setErrorMessage("EmailJS keys are missing. Please check .env.local file.");
      return;
    }

    try {
      setSending(true);
      setErrorMessage("");

      await emailjs.sendForm(
        serviceId.trim(),
        templateId.trim(),
        formRef.current,
        {
          publicKey: publicKey.trim(),
        }
      );

      formRef.current.reset();
      setSubmitted(true);
    } catch (error: any) {
      console.error("EmailJS error:", error);

      setErrorMessage(
        error?.text ||
          error?.message ||
          "Email not sent. Please check EmailJS setup."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="rounded-[28px] border border-black/10 bg-white p-6 shadow-xl shadow-black/5 lg:p-8">
      <div className="mb-8 border-b border-black/10 pb-6">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[#b58a52]">
          Send Requirement
        </p>

        <h2 className="mt-3 font-serif text-4xl uppercase leading-[0.95] tracking-[-0.04em] text-black sm:text-5xl">
          Export Enquiry Form
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-black/55">
          Fill in your sourcing requirement and our team will contact you with
          the next step.
        </p>
      </div>

      {submitted ? (
        <div className="rounded-3xl border border-[#d6b85a]/40 bg-[#f4efe7] p-8 text-center">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-black text-xl font-black text-[#d6b85a]">
            ✓
          </div>

          <h3 className="mt-5 font-serif text-4xl uppercase tracking-[-0.04em] text-black">
            Enquiry Sent
          </h3>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-black/60">
            Thank you. Your export enquiry has been received. Our team will
            review your requirement and contact you soon.
          </p>

          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setErrorMessage("");
            }}
            className="mt-6 rounded-full bg-black px-7 py-4 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#6b3f24]"
          >
            Send Another Enquiry
          </button>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-black/50">
                Full Name
              </label>
              <input
                type="text"
                name="user_name"
                required
                placeholder="Enter your name"
                className="h-14 w-full rounded-2xl border border-black/10 bg-[#f9f6ef] px-5 text-sm font-semibold text-black outline-none transition placeholder:text-black/35 focus:border-black focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-black/50">
                Company Name
              </label>
              <input
                type="text"
                name="company_name"
                placeholder="Enter company name"
                className="h-14 w-full rounded-2xl border border-black/10 bg-[#f9f6ef] px-5 text-sm font-semibold text-black outline-none transition placeholder:text-black/35 focus:border-black focus:bg-white"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-black/50">
                Email Address
              </label>
              <input
                type="email"
                name="user_email"
                required
                placeholder="Enter email address"
                className="h-14 w-full rounded-2xl border border-black/10 bg-[#f9f6ef] px-5 text-sm font-semibold text-black outline-none transition placeholder:text-black/35 focus:border-black focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-black/50">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                required
                placeholder="Enter phone number"
                className="h-14 w-full rounded-2xl border border-black/10 bg-[#f9f6ef] px-5 text-sm font-semibold text-black outline-none transition placeholder:text-black/35 focus:border-black focus:bg-white"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-black/50">
                Product Category
              </label>
              <select
                name="product_category"
                required
                className="h-14 w-full rounded-2xl border border-black/10 bg-[#f9f6ef] px-5 text-sm font-semibold text-black outline-none transition focus:border-black focus:bg-white"
              >
                <option value="">Select category</option>
                <option value="Garments">Garments</option>
                <option value="Fabrics">Fabrics</option>
                <option value="Accessories">Accessories</option>
                <option value="Machinery">Machinery</option>
                <option value="General Goods">General Goods</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-black/50">
                Destination Country
              </label>
              <input
                type="text"
                name="destination_country"
                required
                placeholder="Example: UAE, USA, UK"
                className="h-14 w-full rounded-2xl border border-black/10 bg-[#f9f6ef] px-5 text-sm font-semibold text-black outline-none transition placeholder:text-black/35 focus:border-black focus:bg-white"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-black/50">
                Quantity
              </label>
              <input
                type="text"
                name="quantity"
                placeholder="Example: 500 pieces"
                className="h-14 w-full rounded-2xl border border-black/10 bg-[#f9f6ef] px-5 text-sm font-semibold text-black outline-none transition placeholder:text-black/35 focus:border-black focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-black/50">
                Timeline
              </label>
              <input
                type="text"
                name="timeline"
                placeholder="Example: 30-45 days"
                className="h-14 w-full rounded-2xl border border-black/10 bg-[#f9f6ef] px-5 text-sm font-semibold text-black outline-none transition placeholder:text-black/35 focus:border-black focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-black/50">
              Product Details
            </label>
            <textarea
              name="message"
              required
              rows={6}
              placeholder="Write product name, material, size, packing, reference details or any special requirement..."
              className="w-full resize-none rounded-2xl border border-black/10 bg-[#f9f6ef] px-5 py-4 text-sm font-semibold leading-7 text-black outline-none transition placeholder:text-black/35 focus:border-black focus:bg-white"
            />
          </div>

          {errorMessage ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-bold text-red-700">
              {errorMessage}
            </div>
          ) : null}

          <div className="mt-3 flex flex-col gap-4 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-xs font-semibold leading-6 text-black/45">
              By submitting this form, you agree to be contacted by Lotus Impex
              for export enquiry discussion.
            </p>

            <button
              type="submit"
              disabled={sending}
              className="rounded-full bg-black px-8 py-4 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-[#6b3f24] disabled:cursor-not-allowed disabled:bg-black/50"
            >
              {sending ? "Sending..." : "Submit Enquiry"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}