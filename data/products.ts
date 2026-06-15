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

export const exportProducts: ExportProduct[] = [
  {
    slug: "export-dresses",
    categorySlug: "ladies-garments",
    name: "Export Dresses",
    shortName: "Dresses",
    type: "Ladies Garments",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Ladies dresses for export",
    summary:
      "Fashion dresses for boutiques, retail chains and private-label export buyers.",
    description:
      "Export-ready ladies dresses suitable for fashion retailers, boutiques, importers and private-label buyers. Styles can be developed based on season, fabric, sizing, trims and packaging requirements.",
    minOrder: "300 - 1000 pieces",
    leadTime: "25 - 45 days",
    packaging: "Polybag / carton / buyer label packing",
    origin: "India",
    applications: ["Retail fashion", "Boutiques", "Private label", "Wholesale"],
    specifications: [
      { label: "Product Type", value: "Ladies fashion dresses" },
      {
        label: "Fabric Options",
        value: "Cotton, rayon, viscose, polyester blends",
      },
      { label: "Size Range", value: "XS to XXL / buyer-specific sizing" },
      { label: "Branding", value: "Custom label, tag and packing available" },
      { label: "Export Use", value: "Retail, wholesale and private label" },
    ],
    availableOptions: [
      "Printed dresses",
      "Solid color dresses",
      "Casual dresses",
      "Evening styles",
      "Custom pattern development",
    ],
  },
  {
    slug: "ladies-tops-shirts",
    categorySlug: "ladies-garments",
    name: "Ladies Tops & Shirts",
    shortName: "Tops",
    type: "Ladies Garments",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Ladies tops and shirts export",
    summary:
      "Ladies tops and shirts for seasonal collections, boutiques and export buyers.",
    description:
      "Ladies tops and shirts can be sourced in casual, formal, printed, embroidered and private-label styles.",
    minOrder: "500 pieces",
    leadTime: "20 - 40 days",
    packaging: "Folded polybag packing / carton packing",
    origin: "India",
    applications: ["Fashion retail", "Online stores", "Boutiques", "Wholesale"],
    specifications: [
      { label: "Product Type", value: "Ladies tops and shirts" },
      {
        label: "Fabric Options",
        value: "Cotton, rayon, georgette, viscose, blends",
      },
      { label: "Sleeve Options", value: "Sleeveless, half sleeve, full sleeve" },
      { label: "Finishing", value: "Buyer-specific trims and stitching" },
      { label: "Packing", value: "Export carton packing" },
    ],
    availableOptions: [
      "Casual tops",
      "Formal shirts",
      "Printed tops",
      "Embroidered tops",
      "Private label styles",
    ],
  },
  {
    slug: "formal-shirts",
    categorySlug: "mens-garments",
    name: "Mens Formal Shirts",
    shortName: "Formal Shirts",
    type: "Mens Garments",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Mens formal shirts for export",
    summary:
      "Export-ready formal shirts for retail, uniform, wholesale and corporate buyers.",
    description:
      "Mens formal shirts can be sourced for retail collections, corporate uniforms, wholesale distribution and private-label orders.",
    minOrder: "500 pieces",
    leadTime: "25 - 45 days",
    packaging: "Folded shirt packing / carton packing",
    origin: "India",
    applications: ["Retail", "Corporate uniforms", "Wholesale", "Private label"],
    specifications: [
      { label: "Product Type", value: "Mens formal shirts" },
      { label: "Fabric Options", value: "Cotton, poly-cotton, linen blends" },
      { label: "Fit Options", value: "Regular, slim, custom fit" },
      { label: "Collar Options", value: "Formal collar, button-down collar" },
      { label: "Branding", value: "Custom label, barcode and tag support" },
    ],
    availableOptions: [
      "Plain formal shirts",
      "Striped shirts",
      "Checked shirts",
      "Corporate uniform shirts",
      "Private label shirts",
    ],
  },
  {
    slug: "mens-tshirts-polos",
    categorySlug: "mens-garments",
    name: "Mens T-Shirts & Polos",
    shortName: "T-Shirts",
    type: "Mens Garments",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Mens t-shirts and polos export",
    summary:
      "Casual t-shirts and polo shirts for brands, wholesalers and retail buyers.",
    description:
      "Mens t-shirts and polo shirts can be developed in multiple GSM, fabric blends, colors and branding options.",
    minOrder: "1000 pieces",
    leadTime: "20 - 35 days",
    packaging: "Individual polybag / carton packing",
    origin: "India",
    applications: ["Retail", "Promotional wear", "Uniforms", "Wholesale"],
    specifications: [
      { label: "Product Type", value: "Mens t-shirts and polos" },
      { label: "Fabric Options", value: "Cotton, jersey, pique, blends" },
      { label: "GSM", value: "Buyer requirement based" },
      { label: "Print Options", value: "Screen print, embroidery, heat transfer" },
      { label: "Packing", value: "Export carton packing" },
    ],
    availableOptions: [
      "Round neck t-shirts",
      "Polo shirts",
      "Printed t-shirts",
      "Uniform polos",
      "Private label basics",
    ],
  },
  {
    slug: "cotton-poplin-fabric",
    categorySlug: "fabrics",
    name: "Cotton Poplin Fabric",
    shortName: "Cotton Poplin",
    type: "Fabrics",
    image:
      "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Cotton poplin fabric for export",
    summary:
      "Cotton poplin fabric for shirts, dresses, uniforms and fashion production.",
    description:
      "Cotton poplin fabric can be sourced in different widths, colors, finishes and GSM ranges.",
    minOrder: "500 - 1000 meters",
    leadTime: "15 - 35 days",
    packaging: "Roll packing / bale packing",
    origin: "India",
    applications: ["Shirts", "Dresses", "Uniforms", "Fashion production"],
    specifications: [
      { label: "Product Type", value: "Cotton poplin fabric" },
      { label: "Width", value: "Buyer requirement based" },
      { label: "GSM", value: "Custom as per order" },
      { label: "Color", value: "Dyed / printed options" },
      { label: "Packing", value: "Roll packing for export" },
    ],
    availableOptions: [
      "Solid dyed fabric",
      "Printed fabric",
      "Shirting fabric",
      "Uniform fabric",
      "Custom color development",
    ],
  },
  {
    slug: "scarves-stoles",
    categorySlug: "accessories",
    name: "Scarves & Stoles",
    shortName: "Scarves",
    type: "Accessories",
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Scarves and fashion accessories export",
    summary:
      "Fashion scarves and stoles for boutiques, retail buyers and private-label orders.",
    description:
      "Scarves and stoles can be sourced in printed, solid, lightweight, ethnic and seasonal styles.",
    minOrder: "500 pieces",
    leadTime: "20 - 35 days",
    packaging: "Individual polybag / carton packing",
    origin: "India",
    applications: ["Fashion retail", "Boutiques", "Gift stores", "Private label"],
    specifications: [
      { label: "Product Type", value: "Scarves and stoles" },
      { label: "Material Options", value: "Cotton, viscose, polyester, blends" },
      { label: "Design Options", value: "Printed, woven, solid, seasonal" },
      { label: "Branding", value: "Custom tag and label available" },
      { label: "Packing", value: "Retail or bulk packing" },
    ],
    availableOptions: [
      "Printed scarves",
      "Solid stoles",
      "Ethnic scarves",
      "Lightweight scarves",
      "Private label accessories",
    ],
  },
  {
    slug: "textile-machinery",
    categorySlug: "machinery",
    name: "Textile Machinery",
    shortName: "Textile Machinery",
    type: "Machinery",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Textile machinery export",
    summary:
      "Textile machinery and equipment sourcing for factories and industrial buyers.",
    description:
      "Textile machinery sourcing is handled based on buyer technical requirements, capacity, use case and destination market.",
    minOrder: "Requirement based",
    leadTime: "30 - 60 days",
    packaging: "Industrial packing / wooden case where required",
    origin: "India",
    applications: ["Textile units", "Factories", "Industrial buyers", "Project sourcing"],
    specifications: [
      { label: "Product Type", value: "Textile machinery" },
      { label: "Condition", value: "New / requirement based" },
      { label: "Documentation", value: "Invoice and export support" },
      { label: "Packing", value: "Industrial export packing" },
      { label: "Use", value: "Factory and production requirements" },
    ],
    availableOptions: [
      "Textile equipment",
      "Machine parts",
      "Production machinery",
      "Packing machines",
      "Custom requirement sourcing",
    ],
  },
  {
    slug: "retail-general-goods",
    categorySlug: "general-goods",
    name: "Retail General Goods",
    shortName: "Retail Goods",
    type: "General Goods",
    image:
      "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "General goods and export containers",
    summary:
      "Flexible retail and wholesale goods sourcing for importers and trading companies.",
    description:
      "General goods sourcing is handled based on product type, quantity, buyer country and documentation requirements.",
    minOrder: "Requirement based",
    leadTime: "15 - 45 days",
    packaging: "Product-specific export packing",
    origin: "India",
    applications: ["Importers", "Wholesalers", "Distributors", "Trading companies"],
    specifications: [
      { label: "Product Type", value: "General export goods" },
      { label: "Category", value: "Retail, wholesale and custom sourcing" },
      { label: "Packing", value: "Product-specific packing" },
      { label: "Documentation", value: "Export invoice and packing coordination" },
      { label: "Use", value: "Trading and distribution" },
    ],
    availableOptions: [
      "Retail goods",
      "Promotional goods",
      "Packaging goods",
      "Household goods",
      "Custom sourcing",
    ],
  },
];

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