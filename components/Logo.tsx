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
      className={`relative z-10 flex shrink-0 items-center overflow-hidden ${
        isFooter
          ? "h-20 w-[360px] max-w-full"
          : "h-16 w-[300px] sm:w-[330px] lg:w-[360px]"
      }`}
    >
      <div
        className={`relative w-full overflow-hidden ${
          isFooter ? "h-20" : "h-16"
        }`}
      >
        <Image
          src="/Lotus_Final_Logo1.png"
          alt="Lotus Impex Global Exporters"
          fill
          priority
          sizes={
            isFooter
              ? "360px"
              : "(max-width: 640px) 300px, (max-width: 1024px) 330px, 360px"
          }
          className={`object-contain ${
            dark ? "brightness-0 invert" : ""
          }`}
        />
      </div>
    </Link>
  );
}
