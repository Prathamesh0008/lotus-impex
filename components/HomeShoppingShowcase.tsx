import Image from "next/image";
import Link from "next/link";

type PromoCard = {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  badge?: string;
};

type CircleCategory = {
  title: string;
  image: string;
  href: string;
};

const brandDeals: PromoCard[] = [
  {
    title: "Premium Shirts",
    subtitle: "30-60% sourcing value",
    badge: "Top deal",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=max&w=900&q=85",
    href: "/products/mens-garments",
  },
  {
    title: "Denim Essentials",
    subtitle: "Bulk-ready collections",
    badge: "Buyer pick",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=max&w=900&q=85",
    href: "/products/mens-garments",
  },
  {
    title: "Fashion Tops",
    subtitle: "Private label support",
    badge: "Export ready",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=max&w=900&q=85",
    href: "/products/ladies-garments",
  },
  {
    title: "Accessories Range",
    subtitle: "Finishing goods and trims",
    badge: "Fast enquiry",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=max&w=900&q=85",
    href: "/products/accessories",
  },
  {
    title: "Fabric Specials",
    subtitle: "Bulk textile sourcing",
    badge: "New range",
    image:
      "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=max&w=900&q=85",
    href: "/products/fabrics",
  },
];

const categoriesToBag: CircleCategory[] = [
  {
    title: "Shirts",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=max&w=700&q=85",
    href: "/products/mens-garments",
  },
  {
    title: "T-Shirts",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=max&w=700&q=85",
    href: "/products/mens-garments",
  },
  {
    title: "Jeans",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=max&w=700&q=85",
    href: "/products/mens-garments",
  },
  {
    title: "Trousers",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=max&w=700&q=85",
    href: "/products/mens-garments",
  },
  {
    title: "Footwear",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=max&w=700&q=85",
    href: "/products/accessories",
  },
  {
    title: "Fabrics",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=max&w=700&q=85",
    href: "/products/fabrics",
  },
];

const topBrands: PromoCard[] = [
  {
    title: "Urban Wear",
    subtitle: "Flat 50% sourcing value",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=max&w=900&q=85",
    href: "/products/ladies-garments",
  },
  {
    title: "Casual Menswear",
    subtitle: "Up to 60% value range",
    image:
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=max&w=900&q=85",
    href: "/products/mens-garments",
  },
  {
    title: "Denim Stories",
    subtitle: "40-70% export value",
    image:
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=max&w=900&q=85",
    href: "/products/mens-garments",
  },
  {
    title: "Textile Select",
    subtitle: "Bulk fabric sourcing",
    image:
      "https://images.unsplash.com/photo-1534639077088-d702bcf685e7?auto=format&fit=max&w=900&q=85",
    href: "/products/fabrics",
  },
  {
    title: "Workwear Supply",
    subtitle: "Industrial order support",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=max&w=900&q=85",
    href: "/products/mens-garments",
  },
];

const indianWear: PromoCard[] = [
  {
    title: "All White Indian Wear",
    subtitle: "Cool cotton outlook",
    image:
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=max&w=900&q=85",
    href: "/products/mens-garments",
  },
  {
    title: "Ethnic Casuals",
    subtitle: "Comfort-led festive sourcing",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=max&w=900&q=85",
    href: "/products/ladies-garments",
  },
  {
    title: "Printed Kurta Sets",
    subtitle: "Family festive collections",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=max&w=900&q=85",
    href: "/products/ladies-garments",
  },
  {
    title: "Everyday Kurtas",
    subtitle: "Wholesale comfort styles",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=max&w=900&q=85",
    href: "/products/ladies-garments",
  },
  {
    title: "Handpicked Trendy Styles",
    subtitle: "Updated language of comfort",
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=max&w=900&q=85",
    href: "/products/ladies-garments",
  },
];

const sportsWear: PromoCard[] = [
  {
    title: "Active T-Shirts",
    subtitle: "Flexible workout basics",
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=max&w=900&q=85",
    href: "/products/mens-garments",
  },
  {
    title: "Training Sets",
    subtitle: "Stretch-ready apparel",
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=max&w=900&q=85",
    href: "/products/mens-garments",
  },
  {
    title: "Running Footwear",
    subtitle: "Retail-ready style range",
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=max&w=900&q=85",
    href: "/products/accessories",
  },
  {
    title: "Performance Wear",
    subtitle: "Bulk sportswear enquiry",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=max&w=900&q=85",
    href: "/products/mens-garments",
  },
  {
    title: "Gym Essentials",
    subtitle: "Training-ready supply",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=max&w=900&q=85",
    href: "/products/mens-garments",
  },
];

const footwear: PromoCard[] = [
  {
    title: "Neutral Shades",
    subtitle: "Pairs with everything",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=max&w=900&q=85",
    href: "/products/accessories",
  },
  {
    title: "Sneakers For Movement",
    subtitle: "Made for everyday motion",
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=max&w=900&q=85",
    href: "/products/accessories",
  },
  {
    title: "Printed Sneakers",
    subtitle: "A fresh retail staple",
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=max&w=900&q=85",
    href: "/products/accessories",
  },
  {
    title: "Outdoor Shoes",
    subtitle: "Built for rugged demand",
    image:
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=max&w=900&q=85",
    href: "/products/accessories",
  },
  {
    title: "Flip-Flops & Sliders",
    subtitle: "Comfort-led summer range",
    image:
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=max&w=900&q=85",
    href: "/products/accessories",
  },
];

export default function HomeShoppingShowcase() {
  return (
    <section className="w-full max-w-full overflow-hidden bg-white px-4 py-12 text-[#282c3f] sm:px-8 sm:py-14 lg:px-10">
      <div className="mx-auto grid w-full max-w-[1800px] gap-12 sm:gap-16">
        <PromoSection
          title="Biggest Deals On Export Brands"
          items={brandDeals}
          variant="deal"
        />
        <CategoryCircleSection title="Categories To Bag" items={categoriesToBag} />
        <PromoSection title="Explore Top Collections" items={topBrands} />
        <EditorialSection title="Trending In Footwear" items={footwear} />
        <EditorialSection title="Trending In Indian Wear" items={indianWear} />
        <EditorialSection title="Trending In Sports Wear" items={sportsWear} />
      </div>
    </section>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="mb-6 text-xl font-black uppercase tracking-[0.14em] text-[#2d3448] sm:mb-8 sm:text-3xl sm:tracking-[0.18em]">
      {children}
    </h2>
  );
}

function PromoSection({
  title,
  items,
  variant = "brand",
}: {
  title: string;
  items: PromoCard[];
  variant?: "brand" | "deal";
}) {
  return (
    <section>
      <SectionTitle>{title}</SectionTitle>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group min-w-0 bg-[#f7f7f8] p-3 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 sm:p-4"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-white shadow-sm">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 76vw, (max-width: 1024px) 42vw, 20vw"
                className="object-cover object-center transition duration-700 group-hover:scale-105"
              />
              {item.badge ? (
                <span className="absolute left-3 top-3 hidden rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-black shadow-sm sm:inline-flex">
                  {item.badge}
                </span>
              ) : null}
            </div>

            <div className="px-1 pt-4 text-center sm:px-2 sm:pt-5">
              <p className="text-sm font-black text-[#282c3f] sm:text-lg">{item.title}</p>
              <p
                className={`mt-1 ${
                  variant === "deal"
                    ? "text-base font-semibold sm:text-2xl"
                    : "text-base font-medium sm:text-xl"
                } text-black/75`}
              >
                {item.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CategoryCircleSection({
  title,
  items,
}: {
  title: string;
  items: CircleCategory[];
}) {
  return (
    <section>
      <SectionTitle>{title}</SectionTitle>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group min-w-0 bg-[#f7f7f8] px-3 py-4 text-center transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 sm:px-4 sm:py-5"
          >
            <div className="relative mx-auto aspect-square w-full max-w-[190px] overflow-hidden rounded-full border-[6px] border-[#f2e6df] bg-white">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 42vw, (max-width: 1024px) 28vw, 15vw"
                className="object-cover object-center transition duration-700 group-hover:scale-105"
              />
            </div>
            <p className="mt-4 font-serif text-lg leading-tight text-black sm:text-2xl">
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function EditorialSection({
  title,
  items,
}: {
  title: string;
  items: PromoCard[];
}) {
  return (
    <section>
      <SectionTitle>{title}</SectionTitle>
      <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-5 lg:grid-cols-3 2xl:grid-cols-5">
        {items.map((item) => (
          <Link key={item.title} href={item.href} className="group block min-w-0">
            <div className="relative aspect-[16/11] overflow-hidden bg-[#f7f7f8]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="object-cover object-center transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="px-1 pt-3 sm:px-3 sm:pt-4">
              <h3 className="font-serif text-lg leading-tight text-black sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-1 text-xs text-black/55 sm:text-sm">{item.subtitle}</p>
              <span className="mt-3 inline-block text-[10px] font-bold uppercase tracking-[0.14em] text-black/45 sm:text-xs sm:tracking-[0.16em]">
                + Explore
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

