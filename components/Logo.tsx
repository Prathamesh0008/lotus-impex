import Link from "next/link";

type LogoProps = {
  dark?: boolean;
};

export default function Logo({ dark = true }: LogoProps) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3"
      aria-label="Lotus Impex home"
    >
      <span
        className={`grid size-12 place-items-center rounded-full border transition ${
          dark
            ? "border-black bg-black text-white group-hover:bg-[#6b3f24]"
            : "border-white/20 bg-white text-black group-hover:bg-[#c9a16b]"
        }`}
      >
        <svg
          viewBox="0 0 64 64"
          aria-hidden="true"
          className="size-7"
          fill="none"
        >
          <path
            d="M32 10C38 18 40 25 37 32C35 37 32 41 32 41C32 41 29 37 27 32C24 25 26 18 32 10Z"
            fill="currentColor"
          />
          <path
            d="M18 24C27 25 33 31 33 42C23 41 16 35 18 24Z"
            fill="currentColor"
            opacity="0.72"
          />
          <path
            d="M46 24C37 25 31 31 31 42C41 41 48 35 46 24Z"
            fill="currentColor"
            opacity="0.72"
          />
          <path
            d="M14 43C24 40 31 43 32 53C22 54 16 51 14 43Z"
            fill="currentColor"
            opacity="0.44"
          />
          <path
            d="M50 43C40 40 33 43 32 53C42 54 48 51 50 43Z"
            fill="currentColor"
            opacity="0.44"
          />
        </svg>
      </span>

      <span className="leading-none">
        <span
          className={`block text-xl font-black uppercase tracking-[-0.055em] ${
            dark ? "text-black" : "text-white"
          }`}
        >
          Lotus Impex
        </span>

        <span
          className={`mt-1 block text-[10px] font-bold uppercase tracking-[0.32em] ${
            dark ? "text-black/55" : "text-white/55"
          }`}
        >
          Export House
        </span>
      </span>
    </Link>
  );
}