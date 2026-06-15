type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="mb-4 text-sm font-black uppercase tracking-[0.28em] text-[#b7652b]">
        {eyebrow}
      </p>

      <h2 className="text-3xl font-black tracking-[-0.05em] text-[#17120c] sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {description ? (
        <p
          className={`mt-5 text-base leading-8 text-[#6f6255] sm:text-lg ${
            centered ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}