import Image from "next/image";
import Link from "next/link";

type CategoryDeal = {
  title: string;
  offer: string;
  image: string;
  href: string;
};

const categoryDeals: CategoryDeal[] = [
  {
    title: "Ethnic Wear",
    offer: "50-80% OFF",
    image: "/catalogue-women/17_Saree_Cotton_Printed.png",
    href: "/products/ladies-garments?type=Sarees",
  },
  {
    title: "Casual Wear",
    offer: "40-80% OFF",
    image:
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=900&q=85",
    href: "/products/mens-garments?type=Casual%20Shirts",
  },
  {
    title: "Men's Activewear",
    offer: "30-70% OFF",
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85",
    href: "/products/mens-garments?type=T-shirts%20and%20polos",
  },
  {
    title: "Women's Activewear",
    offer: "30-70% OFF",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85",
    href: "/products/ladies-garments?type=T-Shirts",
  },
  {
    title: "Western Wear",
    offer: "40-80% OFF",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
    href: "/products/ladies-garments?type=Dresses",
  },
  {
    title: "Sportswear",
    offer: "30-80% OFF",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85",
    href: "/products/mens-garments?type=Workwear",
  },
  {
    title: "Kurti Sets",
    offer: "40-80% OFF",
    image: "/catalogue-women/03_Kurti_Printed_Anarkali.png",
    href: "/products/ladies-garments?type=Kurtis",
  },
  {
    title: "Sleepwear",
    offer: "30-70% OFF",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85",
    href: "/products/ladies-garments",
  },
  {
    title: "Formal Shirts",
    offer: "40-70% OFF",
    image: "/catalogue-mens/slim-fit-formal-shirts.png",
    href: "/products/mens-garments?type=Formal%20Shirts",
  },
  {
    title: "Denim Styles",
    offer: "UP TO 80% OFF",
    image: "/catalogue-mens/jeans-denim-bottoms.png",
    href: "/products/mens-garments?type=Jeans",
  },
  {
    title: "T-Shirts",
    offer: "40-80% OFF",
    image: "/catalogue-mens/printed-tshirts.png",
    href: "/products/mens-garments?type=T-shirts%20and%20polos",
  },
  {
    title: "Casual Styles",
    offer: "40-80% OFF",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
    href: "/products/ladies-garments?type=Dresses",
  },
];

const machineryDeals: CategoryDeal[] = [
  {
    title: "Machinery",
    offer: "Industrial Supply",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=85",
    href: "/products/machinery?type=General%20machinery",
  },
  {
    title: "Textile Machinery",
    offer: "Export Ready",
    image:
      "https://images.unsplash.com/photo-1660980041852-230420b8f99f?auto=format&fit=crop&w=900&q=85",
    href: "/products/machinery?type=Textile%20machinery",
  },
  {
    title: "Machine Parts",
    offer: "Project Supply",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=85",
    href: "/products/machinery?type=Machine%20parts",
  },
  {
    title: "Workshop Tools",
    offer: "Bulk Orders",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=85",
    href: "/products/machinery?type=Workshop%20tools",
  },
  {
    title: "Packaging Machinery",
    offer: "Industrial Goods",
    image:
      "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?auto=format&fit=crop&w=900&q=85",
    href: "/products/machinery?type=Packaging%20machinery",
  },
  {
    title: "Custom Sourcing",
    offer: "Requirement Based",
    image:
      "https://images.unsplash.com/photo-1610891015188-5369212db097?auto=format&fit=crop&w=900&q=85",
    href: "/products/machinery?type=Custom%20industrial%20sourcing",
  },
];

export default function HomeCategoryShowcase() {
  return (
    <section className="w-full max-w-full overflow-hidden bg-white px-4 py-12 text-[#282c3f] sm:px-8 sm:py-14 lg:px-10">
      <div className="mx-auto w-full max-w-[1800px]">
        <h2 className="mb-8 text-2xl font-black uppercase tracking-[0.22em] text-[#2f3548] sm:mb-12 sm:text-4xl">
          Shop By Category
        </h2>

        <div className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-7 sm:gap-y-11 xl:grid-cols-6 xl:gap-x-5">
          {categoryDeals.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group block w-full max-w-[275px] min-w-0 overflow-hidden border-[5px] border-[#D4AF36] bg-white text-center shadow-[0_6px_16px_rgba(40,44,63,0.05)] transition hover:-translate-y-1 hover:shadow-[0_10px_22px_rgba(40,44,63,0.08)]"
            >
              <div className="bg-white">
                <div className="relative aspect-[1/1.18] overflow-hidden bg-white">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 275px"
                    className={`object-center transition duration-700 group-hover:scale-[1.02] ${
                      item.image.startsWith("/catalogue-")
                        ? "object-cover"
                        : "object-cover"
                    }`}
                  />
                </div>

                <div className="grid min-h-[112px] content-center bg-[linear-gradient(180deg,#fffaf4_0%,#fff0df_100%)] px-1 py-2">
                  <h3 className="text-base font-black leading-tight text-black sm:text-[20px]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[24px] font-black leading-none text-black sm:text-[30px]">
                    {item.offer}
                  </p>
                  <p className="mt-1 text-base font-black leading-tight text-black sm:text-[20px]">
                    Shop Now
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 border-t border-black/10 pt-10">
          <h2 className="mb-8 text-2xl font-black uppercase tracking-[0.22em] text-[#2f3548] sm:mb-12 sm:text-4xl">
            Machinery Products
          </h2>

          <div className="grid grid-cols-2 justify-items-center gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-7 sm:gap-y-11 xl:grid-cols-6 xl:gap-x-5">
            {machineryDeals.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group block w-full max-w-[275px] min-w-0 overflow-hidden border-[5px] border-[#D4AF36] bg-white text-center shadow-[0_6px_16px_rgba(40,44,63,0.05)] transition hover:-translate-y-1 hover:shadow-[0_10px_22px_rgba(40,44,63,0.08)]"
              >
                <div className="bg-white">
                  <div className="relative aspect-[1/1.18] overflow-hidden bg-white">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 275px"
                      className="object-cover object-center transition duration-700 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="grid min-h-[112px] content-center bg-[linear-gradient(180deg,#fffaf4_0%,#fff0df_100%)] px-1 py-2">
                    <h3 className="text-base font-black leading-tight text-black sm:text-[20px]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[18px] font-black leading-none text-black sm:text-[24px]">
                      {item.offer}
                    </p>
                    <p className="mt-1 text-base font-black leading-tight text-black sm:text-[20px]">
                      Shop Now
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
