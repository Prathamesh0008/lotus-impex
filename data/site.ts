export type ExportCategory = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  items: string[];
  highlights: string[];
  markets: string[];
  gradient: string;
};

export const siteConfig = {
  name: "Lotus Impex",
  tagline: "Exports Built For Global Trade",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: "info@lotusimpex.com",
  phone: "+91 98765 43210",
  location: "India",
  description:
    "Lotus Impex is an India-based export company sourcing garments, fabrics, accessories, machinery and general goods for international buyers with reliable coordination, quality checks and export-ready documentation.",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Company", href: "/company" },
  { label: "Contact", href: "/contact" },
];

export const heroSlides = [
  {
    label: "Fashion Export",
    title: "Garments For Global Buyers",
    image: "/fast-fashion.jpg",
  },

  {
    label: "Textile Sourcing",
    title: "Premium Fabrics For International Markets",
    image: "/Banner-3.png",
  },

  {
    label: "Global Trade",
    title: "Trusted Export Partner From India",
    image: "/Banner-1.png",
  },
  {
    label: "Textile Sourcing",
    title: "Fabrics, Finishes And Accessories",
    image:
      "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1800&q=85",
  },
  {
    label: "Industrial Trade",
    title: "Machinery And General Goods",
    image:
      "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1800&q=85",
  },
];

export const exportCategories: ExportCategory[] = [
  {
    slug: "ladies-garments",
    title: "Ladies Garments",
    shortTitle: "Ladies",
    eyebrow: "Fashion export",
    summary:
      "Export-ready ladies apparel for boutiques, wholesalers, retail chains and private-label buyers.",
    description:
      "We source ladies garments including dresses, tops, modest wear, ethnic styles, co-ord sets and seasonal collections with attention to finishing, sizing and packaging.",
    image: "/content-women-shopping-mall.jpg",
    imageAlt: "Ecommerce package delivery for export order",
    items: [
      "Dresses and gowns",
      "Tops and shirts",
      "Kurtis and ethnic wear",
      "Co-ord sets",
      "Modest wear",
      "Seasonal collections",
    ],
    highlights: ["Private label", "Sampling", "Bulk supply"],
    markets: ["Retail chains", "Boutiques", "Importers", "Wholesalers"],
    gradient: "from-neutral-950 to-stone-800",
  },
  {
    slug: "mens-garments",
    title: "Mens Garments",
    shortTitle: "Mens",
    eyebrow: "Ready-to-wear",
    summary:
      "Clean, reliable menswear sourcing for distributors, stores, uniforms and wholesale export.",
    description:
      "We help buyers source formal shirts, casual wear, t-shirts, polos, trousers, workwear and uniforms with consistent sizing and quality.",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Mens formal shirts and apparel for export",
    items: [
      "Formal shirts",
      "Casual shirts",
      "T-shirts and polos",
      "Trousers",
      "Workwear",
      "Uniform styles",
    ],
    highlights: ["Consistent sizing", "Export packing", "Bulk ready"],
    markets: ["Uniform buyers", "Retailers", "Distributors", "Trading firms"],
    gradient: "from-black to-neutral-800",
  },
  {
    slug: "fabrics",
    title: "Fabrics",
    shortTitle: "Fabrics",
    eyebrow: "Textile sourcing",
    summary:
      "Cotton, blends, woven, knitted and printed fabrics sourced for international production needs.",
    description:
      "We coordinate fabric sourcing based on GSM, width, color, texture, composition and buyer application requirements.",
    image:
      "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Fabric and textile material closeup",
    items: [
      "Cotton fabrics",
      "Polyester blends",
      "Printed fabrics",
      "Knitted fabrics",
      "Woven fabrics",
      "Custom textile sourcing",
    ],
    highlights: ["GSM options", "Custom colors", "Textile network"],
    markets: ["Garment units", "Brands", "Textile traders", "Design houses"],
    gradient: "from-stone-950 to-zinc-800",
  },
  {
    slug: "accessories",
    title: "Accessories",
    shortTitle: "Accessories",
    eyebrow: "Finishing goods",
    summary:
      "Fashion accessories, trims, labels, packaging and add-on goods for complete export orders.",
    description:
      "We source accessories such as scarves, belts, garment trims, labels, tags, packaging and retail add-ons for export buyers.",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Fashion accessories and garments",
    items: [
      "Scarves and stoles",
      "Belts",
      "Buttons and trims",
      "Bags",
      "Labels and tags",
      "Packaging accessories",
    ],
    highlights: ["Branding", "Retail ready", "Bundle sourcing"],
    markets: ["Fashion brands", "Export buyers", "Boutiques", "Packaging buyers"],
    gradient: "from-neutral-900 to-stone-700",
  },
  {
    slug: "footwear",
    title: "Footwear",
    shortTitle: "Footwear",
    eyebrow: "Shoe export",
    summary:
      "Casual shoes, sneakers, sandals and sliders sourced for retail and wholesale export.",
    description:
      "We source footwear including sneakers, casual shoes, sports shoes, sandals, sliders and private-label shoe collections for international buyers.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Sneakers and footwear for export",
    items: [
      "Sneakers",
      "Casual shoes",
      "Sports shoes",
      "Sandals and sliders",
      "Formal shoes",
      "Private-label footwear",
    ],
    highlights: ["Retail ready", "Size runs", "Private label"],
    markets: ["Retailers", "Footwear importers", "Wholesalers", "Trading firms"],
    gradient: "from-neutral-950 to-zinc-800",
  },
  {
    slug: "machinery",
    title: "Machinery",
    shortTitle: "Machinery",
    eyebrow: "Industrial export",
    summary:
      "Machinery, equipment, industrial parts and requirement-based sourcing for global trade.",
    description:
      "We coordinate machinery and industrial goods sourcing with supplier communication, documentation support and careful export planning.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Industrial machinery and equipment",
    items: [
      "General machinery",
      "Textile machinery",
      "Machine parts",
      "Workshop tools",
      "Packaging machinery",
      "Custom industrial sourcing",
    ],
    highlights: ["Supplier checks", "Documentation", "Requirement mapping"],
    markets: ["Factories", "Trading houses", "Industrial buyers", "Project buyers"],
    gradient: "from-zinc-950 to-neutral-800",
  },
  {
    slug: "general-goods",
    title: "General Goods",
    shortTitle: "Goods",
    eyebrow: "Multi-category export",
    summary:
      "Flexible export sourcing for trading companies, distributors, wholesalers and project buyers.",
    description:
      "We handle general export goods based on buyer requirements, order quantity, shipment destination and documentation needs.",
    image:
      "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Shipping containers for international export",
    items: [
      "Retail goods",
      "Wholesale goods",
      "Promotional items",
      "Packaging goods",
      "Household goods",
      "Custom order sourcing",
    ],
    highlights: ["Flexible sourcing", "Buyer focused", "Global trade"],
    markets: ["Importers", "Wholesalers", "Distributors", "Trading companies"],
    gradient: "from-black to-stone-800",
  },
];

export const processSteps = [
  {
    title: "Brief",
    text: "Buyer shares product category, quantity, destination, packing and quality expectations.",
  },
  {
    title: "Source",
    text: "We shortlist suitable sourcing options and align samples, specifications and pricing.",
  },
  {
    title: "Verify",
    text: "We coordinate quality checkpoints, supplier confirmation and export readiness.",
  },
  {
    title: "Prepare",
    text: "Packaging, documentation and dispatch planning are aligned before shipment movement.",
  },
  {
    title: "Ship",
    text: "The order moves with clear communication from confirmation to export coordination.",
  },
];

export const trustPoints = [
  // "Garments, fabrics, accessories and machinery",
  // "Export documentation coordination",
  // "B2B sourcing for international buyers",
  // "Quality-focused supplier communication",
];

export const internalLinks = [
  {
    title: "Ladies Garments Export",
    href: "/products/ladies-garments",
    text: "Dresses, tops, modest wear, ethnic wear and seasonal apparel.",
  },
  {
    title: "Mens Garments Export",
    href: "/products/mens-garments",
    text: "Formal shirts, casual wear, workwear, trousers and uniforms.",
  },
  {
    title: "Fabric Sourcing",
    href: "/products/fabrics",
    text: "Cotton, woven, printed, knitted and blended fabrics.",
  },
  {
    title: "Accessories Export",
    href: "/products/accessories",
    text: "Scarves, trims, belts, labels, packaging and retail accessories.",
  },
  {
    title: "Machinery Export",
    href: "/products/machinery",
    text: "Machinery, parts, workshop tools and industrial sourcing.",
  },
  {
    title: "General Goods Export",
    href: "/products/general-goods",
    text: "Flexible sourcing for retail, wholesale and trading orders.",
  },
];

export const faqs = [
  {
    question: "Does Lotus Impex export only garments?",
    answer:
      "No. Lotus Impex works with garments, fabrics, accessories, machinery and general goods.",
  },
  {
    question: "Can buyers request custom sourcing?",
    answer:
      "Yes. Buyers can share product specifications, quantity, target country and packaging requirements.",
  },
  {
    question: "Is the website database connected?",
    answer:
      "Not yet. The current website is built for localhost first. Database and admin panel can be connected later.",
  },
];
