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
          ? "h-16 w-[min(82vw,360px)] sm:h-20"
          : "h-14 w-[min(64vw,250px)] sm:h-16 sm:w-[330px] xl:w-[360px]"
      }`}
    >
      <div
        className={`relative w-full overflow-hidden ${
          isFooter ? "h-20" : "h-full"
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
              : "(max-width: 640px) 64vw, (max-width: 1024px) 330px, 360px"
          }
          className={`object-contain ${
            dark ? "brightness-0 invert" : ""
          }`}
        />
      </div>
    </Link>
  );
}
