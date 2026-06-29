import Image from "next/image";
import Link from "next/link";

type PromoCard = {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  badge?: string;
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
    image: "/catalogue-women/05_Top_Peplum.png",
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
  {
    title: "Kurti Collection",
    subtitle: "Wholesale ethnic wear",
    badge: "Hot sale",
    image: "/catalogue-women/01_Kurti_Floral_A_Line.png",
    href: "/products/ladies-garments",
  },
];

const topBrands: PromoCard[] = [
  {
    title: "Urban Wear",
    subtitle: "Flat 50% sourcing value",
    image: "/catalogue-women/07_Top_Asymmetrical_Black.png",
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
    title: "Shirt Staples",
    subtitle: "Everyday menswear supply",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=max&w=900&q=85",
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
    title: "Fabric Rolls",
    subtitle: "Production-ready textiles",
    image:
      "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=max&w=900&q=85",
    href: "/products/fabrics",
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
    image: "/catalogue-women/02_Kurti_Embroidered_Straight.png",
    href: "/products/ladies-garments",
  },
  {
    title: "Floral Kurtis",
    subtitle: "Everyday ethnic styles",
    image: "/catalogue-women/01_Kurti_Floral_A_Line.png",
    href: "/products/ladies-garments",
  },
  {
    title: "Printed Kurta Sets",
    subtitle: "Family festive collections",
    image: "/catalogue-women/03_Kurti_Printed_Anarkali.png",
    href: "/products/ladies-garments",
  },
  {
    title: "Everyday Kurtas",
    subtitle: "Wholesale comfort styles",
    image: "/catalogue-women/04_Kurti_Cotton_High_Low.png",
    href: "/products/ladies-garments",
  },
  {
    title: "Saree Drapes",
    subtitle: "Classic festive supply",
    image: "/catalogue-women/17_Saree_Cotton_Printed.png",
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
    title: "Performance Wear",
    subtitle: "Bulk sportswear enquiry",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=max&w=900&q=85",
    href: "/products/mens-garments",
  },
  {
    title: "Running Gear",
    subtitle: "Active outdoor styles",
    image:
      "https://images.unsplash.com/photo-1486218119243-13883505764c?auto=format&fit=max&w=900&q=85",
    href: "/products/mens-garments",
  },
  {
    title: "Gym Essentials",
    subtitle: "Training-ready supply",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=max&w=900&q=85",
    href: "/products/mens-garments",
  },
  {
    title: "Yoga Basics",
    subtitle: "Flexible fitness apparel",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=max&w=900&q=85",
    href: "/products/ladies-garments",
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
        <EditorialSection title="Explore Top Collections" items={topBrands} />
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
  const visibleItems = items.slice(0, 6);

  return (
    <section>
      <SectionTitle>{title}</SectionTitle>

      <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-5 xl:grid-cols-6">
        {visibleItems.map((item) => (
          <Link key={item.title} href={item.href} className="group block min-w-0">
            <div className="relative aspect-square overflow-hidden bg-white sm:aspect-[5/4]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="object-cover object-center transition duration-700 group-hover:scale-105"
              />

              {item.badge ? (
                <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-black shadow-sm">
                  {item.badge}
                </span>
              ) : null}
            </div>

            <div className="px-1 pt-3 sm:px-3 sm:pt-4">
              <h3 className="font-serif text-lg leading-tight text-black sm:text-2xl">
                {item.title}
              </h3>

              <p className="mt-1 text-xs text-black/55 sm:text-sm">
                {item.subtitle}
              </p>

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
      <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-5 xl:grid-cols-6">
        {items.map((item) => (
          <Link key={item.title} href={item.href} className="group block min-w-0">
            <div className="relative aspect-square overflow-hidden bg-white sm:aspect-[5/4]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="object-cover object-center"
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
