import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  dark?: boolean;
  size?: "nav" | "footer";
};

export default function Logo({ dark = false, size = "nav" }: LogoProps) {
  const isFooter = size === "footer";

  return (
    <Link
      href="/"
      aria-label="Lotus Impex Home"
      className={`relative z-10 flex shrink-0 items-center ${
        isFooter
          ? "h-20 w-[min(82vw,360px)] sm:h-24"
          : "h-12 w-[42vw] max-w-[210px] sm:h-20 sm:w-80 sm:max-w-none xl:w-96"
      }`}
    >
      <div
        className={`relative h-full w-full`}
      >
        <Image
          src="/Artboard_7.png"
          alt="Lotus Impex Global Exporters"
          fill
          priority
          sizes={
            isFooter
              ? "360px"
              : "(max-width: 640px) 70vw, (max-width: 1024px) 320px, 384px"
          }
          className={`object-contain object-left ${
            dark ? "brightness-0 invert" : ""
          }`}
        />
      </div>
    </Link>
  );
}
