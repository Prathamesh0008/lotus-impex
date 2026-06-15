import Link from "next/link";
import { siteConfig } from "@/data/site";

export default function FloatingActions() {
  const phoneNumber = siteConfig.phone.replace(/\D/g, "");
  const whatsappText = encodeURIComponent(
    "Hello Lotus Impex, I want to discuss an export requirement."
  );

  return (
    <div className="fixed bottom-5 right-5 z-40 hidden flex-col gap-3 sm:flex">
      <a
        href={`https://wa.me/${phoneNumber}?text=${whatsappText}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Lotus Impex on WhatsApp"
        className="group flex items-center gap-3 rounded-full bg-[#25D366] px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-black shadow-2xl shadow-black/20 transition hover:-translate-y-1"
      >
        <span className="grid size-8 place-items-center rounded-full bg-white">
          WA
        </span>
        <span className="hidden lg:inline">WhatsApp</span>
      </a>

      <Link
        href="/enquiry-basket"
        aria-label="Open enquiry basket"
        className="group flex items-center gap-3 rounded-full bg-white px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-black shadow-2xl shadow-black/20 transition hover:-translate-y-1"
      >
        <span className="grid size-8 place-items-center rounded-full bg-black text-white">
          +
        </span>
        <span className="hidden lg:inline">Basket</span>
      </Link>

      <Link
        href="/contact"
        aria-label="Send export enquiry"
        className="group flex items-center gap-3 rounded-full bg-black px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:bg-[#6b3f24]"
      >
        <span className="grid size-8 place-items-center rounded-full bg-white text-black">
          →
        </span>
        <span className="hidden lg:inline">Enquire</span>
      </Link>
    </div>
  );
}