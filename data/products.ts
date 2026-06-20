export type ExportProduct = {
  slug: string;
  categorySlug: string;
  name: string;
  shortName: string;
  type: string;
  image: string;
  imageAlt: string;
  summary: string;
  description: string;
  minOrder: string;
  leadTime: string;
  packaging: string;
  origin: string;
  applications: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  availableOptions: string[];
};

const categoryImageSets: Record<string, string[]> = {
  "ladies-garments": [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1400&q=85",
  ],
  fabrics: [
    "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1530731141654-5993c3016c77?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=85",
  ],
  accessories: [
    "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1506629905607-d9c297d127bf?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1400&q=85",
  ],
  footwear: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1400&q=85",
  ],
  machinery: [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=85",
    "/product_category.jpg",
    "https://images.unsplash.com/photo-1496247749665-49cf5b1022e9?auto=format&fit=crop&w=1400&q=85",
  ],
  "general-goods": [
    "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?auto=format&fit=crop&w=1400&q=85",
    "/e-commerce.jpg",
    "/online-marketing.jpg",
  ],
};

const productTypeImageSets: Record<string, string[]> = {
  "Tops and shirts": [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=85",
  ],
  "Kurtis and ethnic wear": [
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=85",
  ],
  "Co-ord sets": [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=85",
  ],
  "Modest wear": [
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1400&q=85",
  ],
  "Seasonal collections": [
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1400&q=85",
  ],
  "Cotton fabrics": [
    "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1534639077088-d702bcf685e7?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1476683874822-744764a2438f?auto=format&fit=crop&w=1400&q=85",
  ],
  "Polyester blends": [
    "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1517146783983-418c681b56c5?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1534639077088-d702bcf685e7?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1476683874822-744764a2438f?auto=format&fit=crop&w=1400&q=85",
  ],
  "Printed fabrics": [
    "https://images.unsplash.com/photo-1506629905607-d9c297d127bf?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1534639077088-d702bcf685e7?auto=format&fit=crop&w=1400&q=85",
  ],
  "Knitted fabrics": [
    "https://images.unsplash.com/photo-1534639077088-d702bcf685e7?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1476683874822-744764a2438f?auto=format&fit=crop&w=1400&q=85",
  ],
  "Woven fabrics": [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1476683874822-744764a2438f?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1534639077088-d702bcf685e7?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1517146783983-418c681b56c5?auto=format&fit=crop&w=1400&q=85",
  ],
  "Custom textile sourcing": [
    "https://images.unsplash.com/photo-1530731141654-5993c3016c77?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1524292332709-b33366a7f165?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1660980041852-230420b8f99f?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1741176506261-73218298e4d8?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1673201229733-69d19c5c4a87?auto=format&fit=crop&w=1400&q=85",
  ],
  Sneakers: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=1400&q=85",
  ],
  "Casual shoes": [
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1400&q=85",
  ],
  "Sports shoes": [
    "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1400&q=85",
  ],
  "Sandals and sliders": [
    "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1400&q=85",
  ],
  "Formal shoes": [
    "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1616406432452-07bc5938759d?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1400&q=85",
  ],
  "Private-label footwear": [
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1400&q=85",
  ],
  "General machinery": [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=85",
  ],
  "Textile machinery": [
    "https://images.unsplash.com/photo-1660980041852-230420b8f99f?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1524292332709-b33366a7f165?auto=format&fit=crop&w=1400&q=85",
    "https://images.unsplash.com/photo-1610891015188-5369212db097?auto=format&fit=crop&w=1400&q=85",
  ],
};

const ladiesGeneratedImages = [
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1524255684952-d7185b5095715?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1524638431109-93d95c968f03?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1525450824786-227cbef70703?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1524503033411-c9566986fc8f?auto=format&fit=crop&w=1400&q=85",
  "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1400&q=85",
];

const generatedProductTypes = [
  ["ladies-garments", "Tops and shirts"],
  ["ladies-garments", "Kurtis and ethnic wear"],
  ["ladies-garments", "Co-ord sets"],
  ["ladies-garments", "Modest wear"],
  ["ladies-garments", "Seasonal collections"],
  ["fabrics", "Cotton fabrics"],
  ["fabrics", "Polyester blends"],
  ["fabrics", "Printed fabrics"],
  ["fabrics", "Knitted fabrics"],
  ["fabrics", "Woven fabrics"],
  ["fabrics", "Custom textile sourcing"],
  ["accessories", "Scarves and stoles"],
  ["accessories", "Belts"],
  ["accessories", "Buttons and trims"],
  ["accessories", "Bags"],
  ["accessories", "Labels and tags"],
  ["accessories", "Packaging accessories"],
  ["footwear", "Sneakers"],
  ["footwear", "Casual shoes"],
  ["footwear", "Sports shoes"],
  ["footwear", "Sandals and sliders"],
  ["footwear", "Formal shoes"],
  ["footwear", "Private-label footwear"],
  ["machinery", "General machinery"],
  ["machinery", "Textile machinery"],
  ["machinery", "Machine parts"],
  ["machinery", "Workshop tools"],
  ["machinery", "Packaging machinery"],
  ["machinery", "Custom industrial sourcing"],
  ["general-goods", "Retail goods"],
  ["general-goods", "Wholesale goods"],
  ["general-goods", "Promotional items"],
  ["general-goods", "Packaging goods"],
  ["general-goods", "Household goods"],
  ["general-goods", "Custom order sourcing"],
] as const;

const productVariants = [
  "Classic",
  "Premium",
  "Export Ready",
  "Private Label",
  "Bulk Supply",
] as const;

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function createGeneratedProduct(
  categorySlug: string,
  type: string,
  variant: string,
  variantIndex: number,
  typeIndex: number
): ExportProduct {
  const name = variant ? `${variant} ${type}` : type;
  const images =
    categorySlug === "ladies-garments"
      ? ladiesGeneratedImages
      : productTypeImageSets[type] ??
    categoryImageSets[categorySlug] ??
    categoryImageSets["general-goods"];
  const imageIndex =
    categorySlug === "ladies-garments"
      ? (typeIndex * productVariants.length + variantIndex + 5) % images.length
      : (typeIndex * productVariants.length + variantIndex) % images.length;

  return {
    slug: variant ? `${toSlug(type)}-${toSlug(variant)}` : toSlug(type),
    categorySlug,
    name,
    shortName: name,
    type,
    image: images[imageIndex],
    imageAlt: `${name} export product`,
    summary: `${name} for international buyers, wholesalers and private-label sourcing.`,
    description: `${name} can be sourced for export orders with buyer-specific specifications, packing, labeling and documentation support.`,
    minOrder: categorySlug === "machinery" ? "1 - 10 units" : "300 - 1000 pieces",
    leadTime: categorySlug === "machinery" ? "30 - 60 days" : "20 - 45 days",
    packaging:
      categorySlug === "machinery"
        ? "Protective export packing / crate packing"
        : "Individual packing / carton packing",
    origin: "India",
    applications: [
      "Importers",
      "Wholesalers",
      "Retailers",
      "Private label",
    ],
    specifications: [
      { label: "Product Type", value: type },
      { label: "Order Model", value: "Bulk export and custom sourcing" },
      { label: "Customization", value: "Buyer-specific colors, sizes and packing" },
      { label: "Quality", value: "Supplier coordination and quality checkpoints" },
      { label: "Export Support", value: "Documentation and shipment coordination" },
    ],
    availableOptions: [
      variant ? `${variant} ${type}` : type,
      `Custom ${type}`,
      `Bulk ${type}`,
      `Private-label ${type}`,
      `Export ${type}`,
    ],
  };
}

const generatedProducts: ExportProduct[] = generatedProductTypes.flatMap(
  ([categorySlug, type], typeIndex) => {
    const variants = categorySlug === "general-goods" ? [""] : productVariants;

    return variants.map((variant, variantIndex) =>
      createGeneratedProduct(categorySlug, type, variant, variantIndex, typeIndex)
    );
  }
);

const mensCatalogueImageOverrides: Record<string, string> = {
  "classic-formal-shirts": "/catalogue-mens/classic-formal-shirts.png",
  "slim-fit-formal-shirts": "/catalogue-mens/slim-fit-formal-shirts.png",
  "striped-formal-shirts": "/catalogue-mens/striped-formal-shirts.png",
  "checked-formal-shirts": "/catalogue-mens/checked-formal-shirts.png",
  "corporate-uniform-shirts": "/catalogue-mens/corporate-uniform-shirts.png",
  "casual-cotton-shirts": "/catalogue-mens/casual-cotton-shirts.png",
  "denim-shirts": "/catalogue-mens/denim-shirts.png",
  "printed-casual-shirts": "/catalogue-mens/printed-casual-shirts.png",
  "linen-casual-shirts": "/catalogue-mens/linen-casual-shirts.png",
  "flannel-casual-shirts": "/catalogue-mens/flannel-casual-shirts.png",
  "round-neck-tshirts": "/catalogue-mens/round-neck-tshirts.png",
  "polo-tshirts": "/catalogue-mens/polo-tshirts.png",
  "v-neck-tshirts": "/catalogue-mens/v-neck-tshirts.png",
  "oversized-tshirts": "/catalogue-mens/oversized-tshirts.png",
  "printed-tshirts": "/catalogue-mens/printed-tshirts.png",
  "formal-trousers": "/catalogue-mens/formal-trousers.png",
  "casual-trousers": "/catalogue-mens/casual-trousers.png",
  chinos: "/catalogue-mens/chinos.png",
  "cargo-pants": "/catalogue-mens/cargo-pants.png",
  "jeans-denim-bottoms": "/catalogue-mens/jeans-denim-bottoms.png",
  "industrial-work-shirts": "/catalogue-mens/industrial-work-shirts.png",
  "industrial-work-trousers": "/catalogue-mens/industrial-work-trousers.png",
  "safety-jackets": "/catalogue-mens/safety-jackets.png",
  "industrial-coveralls": "/catalogue-mens/industrial-coveralls.png",
  "aprons-workwear": "/catalogue-mens/aprons-workwear.png",
  "school-uniforms": "/catalogue-mens/school-uniforms.png",
  "corporate-uniforms": "/catalogue-mens/corporate-uniforms.png",
  "hotel-uniforms": "/catalogue-mens/hotel-uniforms.png",
  "hospital-uniforms": "/catalogue-mens/hospital-uniforms.png",
  "security-uniforms": "/catalogue-mens/security-uniforms.png",
};

const baseExportProducts: ExportProduct[] = [
  /* ===================== FORMAL SHIRTS ===================== */
  {
    slug: "classic-formal-shirts",
    categorySlug: "mens-garments",
    name: "Classic Formal Shirts",
    shortName: "Classic Formal",
    type: "Formal shirts",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Classic formal shirts for export",
    summary: "Premium formal shirts for office, retail and corporate buyers.",
    description:
      "Classic formal shirts are export-ready garments suitable for office wear, retail stores, wholesale buyers and corporate uniform requirements.",
    minOrder: "500 pieces",
    leadTime: "25 - 45 days",
    packaging: "Folded shirt packing / carton packing",
    origin: "India",
    applications: ["Office wear", "Retail", "Corporate uniforms", "Wholesale"],
    specifications: [
      { label: "Product Type", value: "Classic formal shirts" },
      { label: "Fabric Options", value: "Cotton, poly-cotton, linen blends" },
      { label: "Fit Options", value: "Regular, slim, custom fit" },
      { label: "Collar Options", value: "Formal collar, button-down collar" },
      { label: "Branding", value: "Custom label, tag and packing available" },
    ],
    availableOptions: [
      "Plain formal shirts",
      "Striped shirts",
      "Checked shirts",
      "Corporate shirts",
      "Private label shirts",
    ],
  },
  {
    slug: "slim-fit-formal-shirts",
    categorySlug: "mens-garments",
    name: "Slim Fit Formal Shirts",
    shortName: "Slim Fit Formal",
    type: "Formal shirts",
    image:
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Slim fit formal shirts",
    summary: "Modern slim-fit formal shirts for fashion and export buyers.",
    description:
      "Slim fit formal shirts are designed for modern menswear collections, office wear ranges and private-label export orders.",
    minOrder: "500 pieces",
    leadTime: "25 - 45 days",
    packaging: "Individual polybag / carton packing",
    origin: "India",
    applications: ["Menswear retail", "Office wear", "Private label", "Wholesale"],
    specifications: [
      { label: "Product Type", value: "Slim fit formal shirts" },
      { label: "Fabric Options", value: "Cotton, twill, poplin, blended fabrics" },
      { label: "Fit Options", value: "Slim fit / tailored fit" },
      { label: "Size Range", value: "S to XXL / buyer-specific sizing" },
      { label: "Export Use", value: "Retail, wholesale and private label" },
    ],
    availableOptions: [
      "Solid slim fit shirts",
      "Micro-check shirts",
      "Textured formal shirts",
      "Office shirts",
      "Custom label shirts",
    ],
  },
  {
    slug: "striped-formal-shirts",
    categorySlug: "mens-garments",
    name: "Striped Formal Shirts",
    shortName: "Striped Formal",
    type: "Formal shirts",
    image:
      "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Striped formal shirts export",
    summary: "Striped formal shirts for office, retail and corporate markets.",
    description:
      "Striped formal shirts can be manufactured in multiple stripe patterns, fabrics, fits and private-label packaging formats.",
    minOrder: "500 pieces",
    leadTime: "25 - 45 days",
    packaging: "Folded packing / carton packing",
    origin: "India",
    applications: ["Office wear", "Corporate buyers", "Retail stores", "Export"],
    specifications: [
      { label: "Product Type", value: "Striped formal shirts" },
      { label: "Fabric Options", value: "Cotton, poly-cotton, poplin" },
      { label: "Pattern Options", value: "Vertical stripes, micro stripes, bold stripes" },
      { label: "Fit Options", value: "Regular, slim, custom fit" },
      { label: "Branding", value: "Custom tags and labels available" },
    ],
    availableOptions: [
      "Vertical striped shirts",
      "Micro striped shirts",
      "Office striped shirts",
      "Button-down striped shirts",
      "Private label striped shirts",
    ],
  },
  {
    slug: "checked-formal-shirts",
    categorySlug: "mens-garments",
    name: "Checked Formal Shirts",
    shortName: "Checked Formal",
    type: "Formal shirts",
    image:
      "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Checked formal shirts",
    summary: "Checked formal shirts for office wear and export collections.",
    description:
      "Checked formal shirts are suitable for smart office wear, retail menswear collections and private-label sourcing programs.",
    minOrder: "500 pieces",
    leadTime: "25 - 45 days",
    packaging: "Buyer label packing / carton packing",
    origin: "India",
    applications: ["Office wear", "Retail", "Wholesale", "Private label"],
    specifications: [
      { label: "Product Type", value: "Checked formal shirts" },
      { label: "Fabric Options", value: "Cotton, poplin, twill, blended fabric" },
      { label: "Pattern Options", value: "Small checks, large checks, window checks" },
      { label: "Sleeve Options", value: "Full sleeve, half sleeve" },
      { label: "Packing", value: "Export carton packing" },
    ],
    availableOptions: [
      "Micro check shirts",
      "Window check shirts",
      "Corporate check shirts",
      "Full sleeve check shirts",
      "Private label check shirts",
    ],
  },
  {
    slug: "corporate-uniform-shirts",
    categorySlug: "mens-garments",
    name: "Corporate Uniform Shirts",
    shortName: "Corporate Shirts",
    type: "Formal shirts",
    image:
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Corporate uniform shirts",
    summary: "Formal uniform shirts for offices, hotels and corporate teams.",
    description:
      "Corporate uniform shirts are developed for offices, hotels, service teams and institutional buyers with custom branding support.",
    minOrder: "500 pieces",
    leadTime: "25 - 45 days",
    packaging: "Uniform set packing / carton packing",
    origin: "India",
    applications: ["Corporate uniforms", "Hotels", "Office teams", "Institutions"],
    specifications: [
      { label: "Product Type", value: "Corporate uniform shirts" },
      { label: "Fabric Options", value: "Cotton, poly-cotton, wrinkle-resistant blends" },
      { label: "Branding", value: "Logo embroidery and custom labels" },
      { label: "Fit Options", value: "Regular, slim, custom fit" },
      { label: "Packing", value: "Bulk or individual uniform packing" },
    ],
    availableOptions: [
      "Office uniform shirts",
      "Hotel uniform shirts",
      "Logo embroidered shirts",
      "Formal staff shirts",
      "Custom corporate shirts",
    ],
  },

  /* ===================== CASUAL SHIRTS ===================== */
  {
    slug: "casual-cotton-shirts",
    categorySlug: "mens-garments",
    name: "Casual Cotton Shirts",
    shortName: "Cotton Shirts",
    type: "Casual shirts",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Casual cotton shirts",
    summary: "Comfortable cotton casual shirts for retail and wholesale buyers.",
    description:
      "Casual cotton shirts are suitable for everyday menswear collections, export orders, boutiques and private-label brands.",
    minOrder: "500 pieces",
    leadTime: "25 - 40 days",
    packaging: "Individual polybag / carton packing",
    origin: "India",
    applications: ["Retail", "Casual wear", "Online stores", "Wholesale"],
    specifications: [
      { label: "Product Type", value: "Casual cotton shirts" },
      { label: "Fabric Options", value: "Cotton, cotton slub, cotton blends" },
      { label: "Sleeve Options", value: "Half sleeve, full sleeve" },
      { label: "Fit Options", value: "Regular, relaxed, custom fit" },
      { label: "Branding", value: "Custom label and tag support" },
    ],
    availableOptions: [
      "Plain casual shirts",
      "Printed casual shirts",
      "Half sleeve shirts",
      "Full sleeve shirts",
      "Private label casual shirts",
    ],
  },
  {
    slug: "denim-shirts",
    categorySlug: "mens-garments",
    name: "Denim Shirts",
    shortName: "Denim Shirts",
    type: "Casual shirts",
    image:
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Mens denim shirts",
    summary: "Denim shirts for casual fashion collections and export buyers.",
    description:
      "Denim shirts can be developed in different washes, weights, pocket styles and private-label packaging formats.",
    minOrder: "500 pieces",
    leadTime: "30 - 50 days",
    packaging: "Folded polybag / carton packing",
    origin: "India",
    applications: ["Casual fashion", "Retail", "Boutiques", "Private label"],
    specifications: [
      { label: "Product Type", value: "Denim shirts" },
      { label: "Fabric Options", value: "Lightweight denim, cotton denim blends" },
      { label: "Wash Options", value: "Light wash, dark wash, enzyme wash" },
      { label: "Style Options", value: "Pocket shirts, western style, regular fit" },
      { label: "Export Use", value: "Retail and wholesale distribution" },
    ],
    availableOptions: [
      "Light wash denim shirts",
      "Dark wash denim shirts",
      "Pocket denim shirts",
      "Western denim shirts",
      "Custom denim shirts",
    ],
  },
  {
    slug: "printed-casual-shirts",
    categorySlug: "mens-garments",
    name: "Printed Casual Shirts",
    shortName: "Printed Shirts",
    type: "Casual shirts",
    image:
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Printed casual shirts export",
    summary: "Printed casual shirts for fashion retail and summer collections.",
    description:
      "Printed casual shirts can be sourced in floral, geometric, abstract and custom buyer-specific print designs.",
    minOrder: "500 pieces",
    leadTime: "25 - 45 days",
    packaging: "Individual polybag / carton packing",
    origin: "India",
    applications: ["Fashion retail", "Summer wear", "Boutiques", "Wholesale"],
    specifications: [
      { label: "Product Type", value: "Printed casual shirts" },
      { label: "Fabric Options", value: "Cotton, rayon, viscose, blends" },
      { label: "Print Options", value: "Floral, abstract, digital, screen print" },
      { label: "Sleeve Options", value: "Half sleeve, full sleeve" },
      { label: "Branding", value: "Buyer-specific labels and tags" },
    ],
    availableOptions: [
      "Floral printed shirts",
      "Abstract printed shirts",
      "Beach shirts",
      "Resort shirts",
      "Custom print shirts",
    ],
  },
  {
    slug: "linen-casual-shirts",
    categorySlug: "mens-garments",
    name: "Linen Casual Shirts",
    shortName: "Linen Shirts",
    type: "Casual shirts",
    image:
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Linen casual shirts",
    summary: "Linen and linen-blend shirts for premium casual collections.",
    description:
      "Linen casual shirts are ideal for resort wear, summer collections, boutiques and premium private-label menswear sourcing.",
    minOrder: "500 pieces",
    leadTime: "25 - 45 days",
    packaging: "Premium folded packing / carton packing",
    origin: "India",
    applications: ["Resort wear", "Summer fashion", "Boutiques", "Private label"],
    specifications: [
      { label: "Product Type", value: "Linen casual shirts" },
      { label: "Fabric Options", value: "Linen, cotton-linen, viscose-linen blends" },
      { label: "Fit Options", value: "Relaxed, regular, custom fit" },
      { label: "Color Options", value: "Natural, pastel, solid dyed colors" },
      { label: "Packing", value: "Retail or export carton packing" },
    ],
    availableOptions: [
      "Solid linen shirts",
      "Relaxed linen shirts",
      "Summer linen shirts",
      "Resort linen shirts",
      "Private label linen shirts",
    ],
  },
  {
    slug: "flannel-casual-shirts",
    categorySlug: "mens-garments",
    name: "Flannel Casual Shirts",
    shortName: "Flannel Shirts",
    type: "Casual shirts",
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Flannel casual shirts",
    summary: "Soft flannel shirts for casual, winter and outdoor collections.",
    description:
      "Flannel casual shirts are suitable for winter collections, outdoor fashion, casual retail and private-label sourcing.",
    minOrder: "500 pieces",
    leadTime: "30 - 50 days",
    packaging: "Folded polybag / carton packing",
    origin: "India",
    applications: ["Winter wear", "Casual retail", "Outdoor fashion", "Wholesale"],
    specifications: [
      { label: "Product Type", value: "Flannel casual shirts" },
      { label: "Fabric Options", value: "Cotton flannel, brushed cotton blends" },
      { label: "Pattern Options", value: "Checks, plaids, solids" },
      { label: "Sleeve Options", value: "Full sleeve" },
      { label: "Export Use", value: "Retail and wholesale collections" },
    ],
    availableOptions: [
      "Checked flannel shirts",
      "Plaid shirts",
      "Winter casual shirts",
      "Outdoor shirts",
      "Custom flannel shirts",
    ],
  },

  /* ===================== T-SHIRTS AND POLOS ===================== */
  {
    slug: "round-neck-tshirts",
    categorySlug: "mens-garments",
    name: "Round Neck T-Shirts",
    shortName: "Round Neck",
    type: "T-shirts and polos",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Round neck t-shirts",
    summary: "Basic round neck t-shirts for brands, retailers and wholesalers.",
    description:
      "Round neck t-shirts can be developed in multiple GSM, fabrics, colors and branding options for export buyers.",
    minOrder: "1000 pieces",
    leadTime: "20 - 35 days",
    packaging: "Individual polybag / carton packing",
    origin: "India",
    applications: ["Retail", "Promotional wear", "Uniforms", "Wholesale"],
    specifications: [
      { label: "Product Type", value: "Round neck t-shirts" },
      { label: "Fabric Options", value: "Cotton, jersey, blended knit fabric" },
      { label: "GSM", value: "Buyer requirement based" },
      { label: "Print Options", value: "Screen print, heat transfer, embroidery" },
      { label: "Packing", value: "Export carton packing" },
    ],
    availableOptions: [
      "Plain round neck t-shirts",
      "Printed t-shirts",
      "Logo t-shirts",
      "Basic t-shirts",
      "Private label t-shirts",
    ],
  },
  {
    slug: "polo-tshirts",
    categorySlug: "mens-garments",
    name: "Polo T-Shirts",
    shortName: "Polos",
    type: "T-shirts and polos",
    image:
      "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Polo t-shirts export",
    summary: "Polo t-shirts for uniforms, retail collections and promotional use.",
    description:
      "Polo t-shirts are available in pique, cotton and blended fabrics with embroidery, logo and private-label branding support.",
    minOrder: "1000 pieces",
    leadTime: "20 - 35 days",
    packaging: "Individual polybag / carton packing",
    origin: "India",
    applications: ["Uniforms", "Corporate wear", "Retail", "Promotional wear"],
    specifications: [
      { label: "Product Type", value: "Polo t-shirts" },
      { label: "Fabric Options", value: "Pique cotton, cotton blends, polyester blends" },
      { label: "Collar Options", value: "Rib collar, contrast collar, custom collar" },
      { label: "Branding", value: "Embroidery, print, custom label" },
      { label: "Packing", value: "Retail or bulk packing" },
    ],
    availableOptions: [
      "Plain polo t-shirts",
      "Corporate polos",
      "Logo embroidered polos",
      "Contrast collar polos",
      "Private label polos",
    ],
  },
  {
    slug: "v-neck-tshirts",
    categorySlug: "mens-garments",
    name: "V-Neck T-Shirts",
    shortName: "V-Neck",
    type: "T-shirts and polos",
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "V-neck t-shirts",
    summary: "V-neck t-shirts for casual retail and private-label collections.",
    description:
      "V-neck t-shirts are suitable for basic menswear collections, fashion retailers, online stores and private-label sourcing.",
    minOrder: "1000 pieces",
    leadTime: "20 - 35 days",
    packaging: "Individual polybag / carton packing",
    origin: "India",
    applications: ["Casual wear", "Retail", "Online stores", "Wholesale"],
    specifications: [
      { label: "Product Type", value: "V-neck t-shirts" },
      { label: "Fabric Options", value: "Cotton jersey, blended jersey" },
      { label: "Fit Options", value: "Regular, slim, relaxed" },
      { label: "Color Options", value: "Solid dyed colors / custom colors" },
      { label: "Branding", value: "Custom neck label and hang tag" },
    ],
    availableOptions: [
      "Plain V-neck t-shirts",
      "Fashion V-neck t-shirts",
      "Slim fit V-neck t-shirts",
      "Basic V-neck t-shirts",
      "Private label V-neck t-shirts",
    ],
  },
  {
    slug: "oversized-tshirts",
    categorySlug: "mens-garments",
    name: "Oversized T-Shirts",
    shortName: "Oversized Tees",
    type: "T-shirts and polos",
    image:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Oversized t-shirts",
    summary: "Oversized t-shirts for streetwear and fashion brands.",
    description:
      "Oversized t-shirts can be developed for streetwear, lifestyle fashion, private-label brands and retail collections.",
    minOrder: "1000 pieces",
    leadTime: "25 - 40 days",
    packaging: "Individual polybag / carton packing",
    origin: "India",
    applications: ["Streetwear", "Fashion retail", "Online brands", "Wholesale"],
    specifications: [
      { label: "Product Type", value: "Oversized t-shirts" },
      { label: "Fabric Options", value: "Cotton jersey, heavy GSM cotton" },
      { label: "Fit Options", value: "Oversized, drop shoulder, relaxed fit" },
      { label: "Print Options", value: "Screen print, puff print, DTG, embroidery" },
      { label: "Branding", value: "Custom streetwear labels and tags" },
    ],
    availableOptions: [
      "Plain oversized t-shirts",
      "Graphic oversized t-shirts",
      "Drop shoulder t-shirts",
      "Heavy GSM t-shirts",
      "Private label streetwear",
    ],
  },
  {
    slug: "printed-tshirts",
    categorySlug: "mens-garments",
    name: "Printed T-Shirts",
    shortName: "Printed Tees",
    type: "T-shirts and polos",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Printed t-shirts export",
    summary: "Printed t-shirts for brands, events and retail collections.",
    description:
      "Printed t-shirts are available with screen print, heat transfer, digital print and buyer-specific custom artwork development.",
    minOrder: "1000 pieces",
    leadTime: "20 - 40 days",
    packaging: "Individual polybag / carton packing",
    origin: "India",
    applications: ["Retail", "Events", "Promotional wear", "Private label"],
    specifications: [
      { label: "Product Type", value: "Printed t-shirts" },
      { label: "Fabric Options", value: "Cotton, jersey, poly-cotton blends" },
      { label: "Print Options", value: "Screen print, digital, heat transfer" },
      { label: "GSM", value: "Buyer requirement based" },
      { label: "Packing", value: "Retail or export carton packing" },
    ],
    availableOptions: [
      "Graphic t-shirts",
      "Logo printed t-shirts",
      "Event t-shirts",
      "Promotional t-shirts",
      "Custom artwork t-shirts",
    ],
  },

  /* ===================== TROUSERS ===================== */
  {
    slug: "formal-trousers",
    categorySlug: "mens-garments",
    name: "Formal Trousers",
    shortName: "Formal Trousers",
    type: "Trousers",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Formal trousers export",
    summary: "Formal trousers for office wear, uniforms and retail buyers.",
    description:
      "Formal trousers are suitable for corporate wear, retail menswear, uniforms and private-label export requirements.",
    minOrder: "500 pieces",
    leadTime: "25 - 45 days",
    packaging: "Folded polybag / carton packing",
    origin: "India",
    applications: ["Office wear", "Corporate uniforms", "Retail", "Wholesale"],
    specifications: [
      { label: "Product Type", value: "Formal trousers" },
      { label: "Fabric Options", value: "Poly-viscose, cotton blends, suiting fabric" },
      { label: "Fit Options", value: "Regular, slim, custom fit" },
      { label: "Waist Options", value: "Standard waist, adjustable waist" },
      { label: "Branding", value: "Custom label and barcode support" },
    ],
    availableOptions: [
      "Office trousers",
      "Slim fit trousers",
      "Corporate trousers",
      "Pleated trousers",
      "Private label trousers",
    ],
  },
  {
    slug: "casual-trousers",
    categorySlug: "mens-garments",
    name: "Casual Trousers",
    shortName: "Casual Trousers",
    type: "Trousers",
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Casual trousers",
    summary: "Casual trousers for daily wear and retail collections.",
    description:
      "Casual trousers are export-ready bottom wear products for fashion retailers, wholesalers and private-label brands.",
    minOrder: "500 pieces",
    leadTime: "25 - 45 days",
    packaging: "Folded polybag / carton packing",
    origin: "India",
    applications: ["Casual wear", "Retail", "Wholesale", "Private label"],
    specifications: [
      { label: "Product Type", value: "Casual trousers" },
      { label: "Fabric Options", value: "Cotton twill, stretch cotton, blends" },
      { label: "Fit Options", value: "Regular, tapered, relaxed" },
      { label: "Color Options", value: "Solid dyed / custom color" },
      { label: "Packing", value: "Export carton packing" },
    ],
    availableOptions: [
      "Plain casual trousers",
      "Stretch trousers",
      "Relaxed fit trousers",
      "Tapered trousers",
      "Custom casual trousers",
    ],
  },
  {
    slug: "chinos",
    categorySlug: "mens-garments",
    name: "Chinos",
    shortName: "Chinos",
    type: "Trousers",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Mens chinos export",
    summary: "Chinos for smart casual fashion and private-label buyers.",
    description:
      "Chinos can be sourced in cotton twill, stretch blends and multiple garment-dyed colors for export buyers.",
    minOrder: "500 pieces",
    leadTime: "25 - 45 days",
    packaging: "Folded polybag / carton packing",
    origin: "India",
    applications: ["Smart casual wear", "Retail", "Online stores", "Wholesale"],
    specifications: [
      { label: "Product Type", value: "Chinos" },
      { label: "Fabric Options", value: "Cotton twill, stretch cotton blends" },
      { label: "Fit Options", value: "Slim, tapered, regular" },
      { label: "Color Options", value: "Khaki, navy, black, beige, custom colors" },
      { label: "Branding", value: "Private label support available" },
    ],
    availableOptions: [
      "Slim fit chinos",
      "Tapered chinos",
      "Stretch chinos",
      "Garment dyed chinos",
      "Private label chinos",
    ],
  },
  {
    slug: "cargo-pants",
    categorySlug: "mens-garments",
    name: "Cargo Pants",
    shortName: "Cargo Pants",
    type: "Trousers",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Cargo pants export",
    summary: "Cargo pants for casual, outdoor and workwear collections.",
    description:
      "Cargo pants are suitable for outdoor fashion, utility wear, casual retail, workwear buyers and private-label sourcing.",
    minOrder: "500 pieces",
    leadTime: "30 - 50 days",
    packaging: "Folded polybag / carton packing",
    origin: "India",
    applications: ["Casual wear", "Outdoor wear", "Workwear", "Retail"],
    specifications: [
      { label: "Product Type", value: "Cargo pants" },
      { label: "Fabric Options", value: "Cotton twill, canvas, stretch blends" },
      { label: "Pocket Options", value: "Multi-pocket, utility pocket, flap pocket" },
      { label: "Fit Options", value: "Regular, relaxed, tapered" },
      { label: "Export Use", value: "Retail, utility and workwear" },
    ],
    availableOptions: [
      "Utility cargo pants",
      "Casual cargo pants",
      "Outdoor cargo pants",
      "Multi-pocket cargos",
      "Private label cargos",
    ],
  },
  {
    slug: "jeans-denim-bottoms",
    categorySlug: "mens-garments",
    name: "Jeans & Denim Bottoms",
    shortName: "Jeans",
    type: "Trousers",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Jeans and denim bottoms",
    summary: "Jeans and denim bottoms for retail and fashion buyers.",
    description:
      "Jeans and denim bottoms can be developed in multiple washes, fits, fabrics and private-label branding formats.",
    minOrder: "500 pieces",
    leadTime: "30 - 55 days",
    packaging: "Folded polybag / carton packing",
    origin: "India",
    applications: ["Fashion retail", "Casual wear", "Online stores", "Wholesale"],
    specifications: [
      { label: "Product Type", value: "Jeans and denim bottoms" },
      { label: "Fabric Options", value: "Denim, stretch denim, cotton denim" },
      { label: "Fit Options", value: "Slim, skinny, straight, relaxed" },
      { label: "Wash Options", value: "Dark wash, light wash, enzyme wash" },
      { label: "Branding", value: "Custom button, rivet, label and tag support" },
    ],
    availableOptions: [
      "Slim fit jeans",
      "Straight fit jeans",
      "Stretch jeans",
      "Washed denim jeans",
      "Private label denim bottoms",
    ],
  },

  /* ===================== WORKWEAR ===================== */
  {
    slug: "industrial-work-shirts",
    categorySlug: "mens-garments",
    name: "Industrial Work Shirts",
    shortName: "Work Shirts",
    type: "Workwear",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Industrial work shirts",
    summary: "Durable work shirts for industrial and factory uniforms.",
    description:
      "Industrial work shirts are designed for factories, warehouses, logistics teams, maintenance staff and uniform buyers.",
    minOrder: "500 pieces",
    leadTime: "25 - 45 days",
    packaging: "Bulk uniform packing / carton packing",
    origin: "India",
    applications: ["Factories", "Warehouses", "Logistics", "Maintenance teams"],
    specifications: [
      { label: "Product Type", value: "Industrial work shirts" },
      { label: "Fabric Options", value: "Cotton, poly-cotton, heavy-duty blends" },
      { label: "Branding", value: "Logo embroidery and custom labels" },
      { label: "Fit Options", value: "Regular and custom uniform fit" },
      { label: "Packing", value: "Uniform set or bulk carton packing" },
    ],
    availableOptions: [
      "Factory work shirts",
      "Warehouse shirts",
      "Maintenance shirts",
      "Logo work shirts",
      "Custom work shirts",
    ],
  },
  {
    slug: "industrial-work-trousers",
    categorySlug: "mens-garments",
    name: "Industrial Work Trousers",
    shortName: "Work Trousers",
    type: "Workwear",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Industrial work trousers",
    summary: "Strong work trousers for factories, warehouses and utility teams.",
    description:
      "Industrial work trousers can be sourced in durable fabrics for factory teams, technicians, logistics workers and maintenance staff.",
    minOrder: "500 pieces",
    leadTime: "25 - 45 days",
    packaging: "Bulk uniform packing / carton packing",
    origin: "India",
    applications: ["Factories", "Industrial teams", "Warehouses", "Utility workers"],
    specifications: [
      { label: "Product Type", value: "Industrial work trousers" },
      { label: "Fabric Options", value: "Cotton twill, canvas, poly-cotton blends" },
      { label: "Pocket Options", value: "Utility pockets, side pockets, tool pockets" },
      { label: "Fit Options", value: "Regular, relaxed, custom fit" },
      { label: "Export Use", value: "Industrial and uniform supply" },
    ],
    availableOptions: [
      "Factory work trousers",
      "Utility trousers",
      "Multi-pocket trousers",
      "Technician trousers",
      "Custom work trousers",
    ],
  },
  {
    slug: "safety-jackets",
    categorySlug: "mens-garments",
    name: "Safety Jackets",
    shortName: "Safety Jackets",
    type: "Workwear",
    image: "/fast-fashion.jpg",
    imageAlt: "Safety jackets workwear",
    summary: "Safety jackets for industrial, warehouse and outdoor work teams.",
    description:
      "Safety jackets can be developed for visibility, utility and workwear requirements with buyer-specific trims and branding.",
    minOrder: "500 pieces",
    leadTime: "25 - 45 days",
    packaging: "Individual polybag / carton packing",
    origin: "India",
    applications: ["Construction", "Warehouses", "Logistics", "Outdoor workers"],
    specifications: [
      { label: "Product Type", value: "Safety jackets" },
      { label: "Fabric Options", value: "Polyester, cotton blends, coated fabric" },
      { label: "Feature Options", value: "Reflective tape, zip closure, pockets" },
      { label: "Branding", value: "Logo print or embroidery available" },
      { label: "Packing", value: "Export carton packing" },
    ],
    availableOptions: [
      "Reflective jackets",
      "Utility safety jackets",
      "Warehouse safety jackets",
      "Construction jackets",
      "Custom safety jackets",
    ],
  },
  {
    slug: "industrial-coveralls",
    categorySlug: "mens-garments",
    name: "Industrial Coveralls",
    shortName: "Coveralls",
    type: "Workwear",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Industrial coveralls",
    summary: "Industrial coveralls for factories, workshops and maintenance teams.",
    description:
      "Industrial coveralls can be sourced for factory workers, mechanics, technicians, utility teams and industrial buyers.",
    minOrder: "300 - 500 pieces",
    leadTime: "30 - 50 days",
    packaging: "Individual polybag / carton packing",
    origin: "India",
    applications: ["Factories", "Workshops", "Maintenance", "Industrial supply"],
    specifications: [
      { label: "Product Type", value: "Industrial coveralls" },
      { label: "Fabric Options", value: "Cotton, poly-cotton, heavy-duty blends" },
      { label: "Closure Options", value: "Zip closure, button closure" },
      { label: "Pocket Options", value: "Chest pockets, side pockets, tool pockets" },
      { label: "Branding", value: "Logo embroidery and label support" },
    ],
    availableOptions: [
      "Factory coveralls",
      "Mechanic coveralls",
      "Technician coveralls",
      "Utility coveralls",
      "Custom coveralls",
    ],
  },
  {
    slug: "aprons-workwear",
    categorySlug: "mens-garments",
    name: "Workwear Aprons",
    shortName: "Aprons",
    type: "Workwear",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Workwear aprons",
    summary: "Aprons for hospitality, kitchen, factory and service uniforms.",
    description:
      "Workwear aprons are suitable for restaurants, hotels, kitchens, factory workers, retail staff and service uniforms.",
    minOrder: "500 pieces",
    leadTime: "20 - 35 days",
    packaging: "Individual polybag / carton packing",
    origin: "India",
    applications: ["Hotels", "Restaurants", "Factories", "Retail staff"],
    specifications: [
      { label: "Product Type", value: "Workwear aprons" },
      { label: "Fabric Options", value: "Cotton, canvas, denim, polyester blends" },
      { label: "Style Options", value: "Bib apron, waist apron, cross-back apron" },
      { label: "Branding", value: "Logo print, embroidery, custom label" },
      { label: "Packing", value: "Retail or bulk packing" },
    ],
    availableOptions: [
      "Chef aprons",
      "Factory aprons",
      "Denim aprons",
      "Logo aprons",
      "Custom uniform aprons",
    ],
  },

  /* ===================== UNIFORM STYLES ===================== */
  {
    slug: "school-uniforms",
    categorySlug: "mens-garments",
    name: "School Uniforms",
    shortName: "School Uniforms",
    type: "Uniform styles",
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "School uniforms export",
    summary: "School uniforms for institutions, distributors and bulk buyers.",
    description:
      "School uniforms can be sourced in shirts, trousers, skirts, tunics, sweaters and complete student uniform sets.",
    minOrder: "500 sets",
    leadTime: "30 - 50 days",
    packaging: "Set packing / carton packing",
    origin: "India",
    applications: ["Schools", "Institutions", "Distributors", "Bulk supply"],
    specifications: [
      { label: "Product Type", value: "School uniforms" },
      { label: "Fabric Options", value: "Cotton, poly-cotton, uniform fabrics" },
      { label: "Set Options", value: "Shirt, trouser, skirt, tunic, sweater" },
      { label: "Size Range", value: "Kids to teens / buyer-specific sizing" },
      { label: "Branding", value: "School logo and label support" },
    ],
    availableOptions: [
      "School shirts",
      "School trousers",
      "School skirts",
      "School tunics",
      "Complete school uniform sets",
    ],
  },
  {
    slug: "corporate-uniforms",
    categorySlug: "mens-garments",
    name: "Corporate Uniforms",
    shortName: "Corporate Uniforms",
    type: "Uniform styles",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Corporate uniforms",
    summary: "Corporate uniforms for offices, service teams and staff branding.",
    description:
      "Corporate uniforms can include shirts, trousers, blazers, polos and complete staff uniform solutions.",
    minOrder: "500 pieces",
    leadTime: "25 - 45 days",
    packaging: "Uniform set packing / carton packing",
    origin: "India",
    applications: ["Offices", "Service teams", "Hotels", "Corporate buyers"],
    specifications: [
      { label: "Product Type", value: "Corporate uniforms" },
      { label: "Fabric Options", value: "Cotton, poly-cotton, suiting blends" },
      { label: "Branding", value: "Logo embroidery, custom labels, tags" },
      { label: "Set Options", value: "Shirts, trousers, polos, blazers" },
      { label: "Packing", value: "Individual or set packing" },
    ],
    availableOptions: [
      "Office uniforms",
      "Corporate shirts",
      "Staff trousers",
      "Corporate polos",
      "Complete corporate uniform sets",
    ],
  },
  {
    slug: "hotel-uniforms",
    categorySlug: "mens-garments",
    name: "Hotel Uniforms",
    shortName: "Hotel Uniforms",
    type: "Uniform styles",
    image:
      "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Hotel uniforms",
    summary: "Hotel uniforms for front office, housekeeping and service teams.",
    description:
      "Hotel uniforms are available for front desk, housekeeping, kitchen, service staff and hospitality teams.",
    minOrder: "500 pieces",
    leadTime: "25 - 45 days",
    packaging: "Uniform set packing / carton packing",
    origin: "India",
    applications: ["Hotels", "Restaurants", "Hospitality", "Service teams"],
    specifications: [
      { label: "Product Type", value: "Hotel uniforms" },
      { label: "Fabric Options", value: "Cotton, poly-cotton, suiting blends" },
      { label: "Set Options", value: "Shirts, trousers, aprons, jackets" },
      { label: "Branding", value: "Logo embroidery and custom trims" },
      { label: "Packing", value: "Bulk or individual packing" },
    ],
    availableOptions: [
      "Front office uniforms",
      "Housekeeping uniforms",
      "Restaurant uniforms",
      "Chef uniforms",
      "Custom hotel uniforms",
    ],
  },
  {
    slug: "hospital-uniforms",
    categorySlug: "mens-garments",
    name: "Hospital Uniforms",
    shortName: "Hospital Uniforms",
    type: "Uniform styles",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Hospital uniforms",
    summary: "Hospital uniforms for medical staff, clinics and healthcare teams.",
    description:
      "Hospital uniforms include scrub suits, coats, tunics, trousers and healthcare workwear for clinics and hospitals.",
    minOrder: "500 pieces",
    leadTime: "25 - 45 days",
    packaging: "Individual polybag / carton packing",
    origin: "India",
    applications: ["Hospitals", "Clinics", "Healthcare staff", "Medical suppliers"],
    specifications: [
      { label: "Product Type", value: "Hospital uniforms" },
      { label: "Fabric Options", value: "Cotton, poly-cotton, medical uniform fabric" },
      { label: "Set Options", value: "Scrubs, coats, tunics, trousers" },
      { label: "Branding", value: "Logo embroidery and label support" },
      { label: "Packing", value: "Hygienic export packing" },
    ],
    availableOptions: [
      "Scrub suits",
      "Doctor coats",
      "Nurse uniforms",
      "Medical tunics",
      "Healthcare uniform sets",
    ],
  },
  {
    slug: "security-uniforms",
    categorySlug: "mens-garments",
    name: "Security Uniforms",
    shortName: "Security Uniforms",
    type: "Uniform styles",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Security uniforms",
    summary: "Security uniforms for agencies, institutions and facility teams.",
    description:
      "Security uniforms can include shirts, trousers, caps, jackets and complete staff uniform sets based on buyer requirements.",
    minOrder: "500 pieces",
    leadTime: "25 - 45 days",
    packaging: "Set packing / carton packing",
    origin: "India",
    applications: ["Security agencies", "Institutions", "Facility teams", "Bulk supply"],
    specifications: [
      { label: "Product Type", value: "Security uniforms" },
      { label: "Fabric Options", value: "Cotton, poly-cotton, durable uniform fabrics" },
      { label: "Set Options", value: "Shirts, trousers, caps, jackets" },
      { label: "Branding", value: "Badge, logo embroidery and labels" },
      { label: "Packing", value: "Uniform set packing" },
    ],
    availableOptions: [
      "Security shirts",
      "Security trousers",
      "Security jackets",
      "Security caps",
      "Complete security uniform sets",
    ],
  },

  /* ===================== LADIES DRESSES ===================== */
  {
    slug: "casual-dresses",
    categorySlug: "ladies-garments",
    name: "Casual Dresses",
    shortName: "Casual Dresses",
    type: "Dresses and gowns",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Casual ladies dresses",
    summary: "Casual dresses for boutiques, retail stores and export buyers.",
    description:
      "Casual dresses are export-ready fashion garments suitable for boutiques, online stores, importers and private-label brands.",
    minOrder: "300 - 1000 pieces",
    leadTime: "25 - 45 days",
    packaging: "Polybag / carton / buyer label packing",
    origin: "India",
    applications: ["Retail fashion", "Boutiques", "Private label", "Wholesale"],
    specifications: [
      { label: "Product Type", value: "Casual ladies dresses" },
      { label: "Fabric Options", value: "Cotton, rayon, viscose, polyester blends" },
      { label: "Size Range", value: "XS to XXL / buyer-specific sizing" },
      { label: "Branding", value: "Custom label, tag and packing available" },
      { label: "Export Use", value: "Retail, wholesale and private label" },
    ],
    availableOptions: [
      "Printed casual dresses",
      "Solid casual dresses",
      "Summer dresses",
      "Daywear dresses",
      "Custom pattern dresses",
    ],
  },
  {
    slug: "party-dresses",
    categorySlug: "ladies-garments",
    name: "Party Dresses",
    shortName: "Party Dresses",
    type: "Dresses and gowns",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Party dresses for export",
    summary: "Party dresses for boutiques, fashion retailers and private labels.",
    description:
      "Party dresses can be developed in fashionable silhouettes, trims, embellishments and buyer-specific designs for export markets.",
    minOrder: "300 - 1000 pieces",
    leadTime: "30 - 50 days",
    packaging: "Premium polybag / carton packing",
    origin: "India",
    applications: ["Fashion retail", "Boutiques", "Private label", "Wholesale"],
    specifications: [
      { label: "Product Type", value: "Party dresses" },
      { label: "Fabric Options", value: "Georgette, satin, viscose, polyester blends" },
      { label: "Style Options", value: "Mini, midi, maxi, evening styles" },
      { label: "Branding", value: "Custom label and tag support" },
      { label: "Packing", value: "Retail or export carton packing" },
    ],
    availableOptions: [
      "Evening dresses",
      "Cocktail dresses",
      "Embellished dresses",
      "Fashion party dresses",
      "Private label party dresses",
    ],
  },
  {
    slug: "maxi-dresses",
    categorySlug: "ladies-garments",
    name: "Maxi Dresses",
    shortName: "Maxi Dresses",
    type: "Dresses and gowns",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Maxi dresses export",
    summary: "Maxi dresses for resort wear, boutiques and seasonal collections.",
    description:
      "Maxi dresses are available in printed, solid, flowy and custom designs for fashion retailers and private-label buyers.",
    minOrder: "300 - 1000 pieces",
    leadTime: "25 - 45 days",
    packaging: "Individual polybag / carton packing",
    origin: "India",
    applications: ["Resort wear", "Boutiques", "Online stores", "Wholesale"],
    specifications: [
      { label: "Product Type", value: "Maxi dresses" },
      { label: "Fabric Options", value: "Rayon, viscose, cotton, georgette" },
      { label: "Length Options", value: "Full length / buyer-specific sizing" },
      { label: "Design Options", value: "Printed, solid, embroidered" },
      { label: "Branding", value: "Private label support available" },
    ],
    availableOptions: [
      "Printed maxi dresses",
      "Solid maxi dresses",
      "Resort maxi dresses",
      "Boho maxi dresses",
      "Custom maxi dresses",
    ],
  },
  {
    slug: "shirt-dresses",
    categorySlug: "ladies-garments",
    name: "Shirt Dresses",
    shortName: "Shirt Dresses",
    type: "Dresses and gowns",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Ladies shirt dresses",
    summary: "Shirt dresses for smart casual collections and retail buyers.",
    description:
      "Shirt dresses combine tailored shirt styling with dress silhouettes for modern womenswear and private-label collections.",
    minOrder: "300 - 1000 pieces",
    leadTime: "25 - 45 days",
    packaging: "Folded polybag / carton packing",
    origin: "India",
    applications: ["Smart casual wear", "Retail", "Boutiques", "Private label"],
    specifications: [
      { label: "Product Type", value: "Shirt dresses" },
      { label: "Fabric Options", value: "Cotton, rayon, linen blends, viscose" },
      { label: "Style Options", value: "Belted, button-down, relaxed fit" },
      { label: "Size Range", value: "XS to XXL / buyer-specific sizing" },
      { label: "Packing", value: "Export carton packing" },
    ],
    availableOptions: [
      "Button-down shirt dresses",
      "Belted shirt dresses",
      "Printed shirt dresses",
      "Solid shirt dresses",
      "Private label shirt dresses",
    ],
  },
  {
    slug: "evening-dresses",
    categorySlug: "ladies-garments",
    name: "Evening Dresses",
    shortName: "Evening Dresses",
    type: "Dresses and gowns",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Evening dresses export",
    summary: "Evening dresses for premium fashion and boutique collections.",
    description:
      "Evening dresses can be produced in elegant silhouettes, premium fabrics, buyer-specific trims and private-label packaging.",
    minOrder: "300 - 1000 pieces",
    leadTime: "30 - 55 days",
    packaging: "Premium garment packing / carton packing",
    origin: "India",
    applications: ["Boutiques", "Fashion retail", "Private label", "Wholesale"],
    specifications: [
      { label: "Product Type", value: "Evening dresses" },
      { label: "Fabric Options", value: "Satin, georgette, chiffon, polyester blends" },
      { label: "Style Options", value: "Midi, maxi, evening silhouettes" },
      { label: "Branding", value: "Custom label and premium packing support" },
      { label: "Export Use", value: "Boutique and fashion retail" },
    ],
    availableOptions: [
      "Elegant evening dresses",
      "Satin evening dresses",
      "Chiffon evening dresses",
      "Boutique evening dresses",
      "Custom evening dresses",
    ],
  },
  ...generatedProducts,
];

export const exportProducts: ExportProduct[] = baseExportProducts.map((product) => {
  const catalogueImage = mensCatalogueImageOverrides[product.slug];

  if (!catalogueImage) {
    return product;
  }

  return {
    ...product,
    image: catalogueImage,
    imageAlt: `${product.name} from Lotus Impex mens catalogue`,
  };
});

export function getProductsByCategory(categorySlug: string) {
  return exportProducts.filter(
    (product) => product.categorySlug === categorySlug
  );
}

export function getProductBySlugs(categorySlug: string, productSlug: string) {
  return exportProducts.find(
    (product) =>
      product.categorySlug === categorySlug && product.slug === productSlug
  );
}
