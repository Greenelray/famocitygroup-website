import {
  BadgeDollarSign,
  Drill,
  Landmark,
  Smartphone,
  SunMedium,
  type LucideIcon
} from "lucide-react";

export type PropertyListing = {
  slug: string;
  src: string;
  alt: string;
  title: string;
  location: string;
  price: string;
  size: string;
  summary: string;
  highlights: string[];
};

export type BusinessPillar = {
  slug: string;
  title: string;
  eyebrow: string;
  copy: string;
  longCopy: string[];
  icon: LucideIcon;
  logo?: string;
  href: string;
};

export const propertyListings: PropertyListing[] = [
  {
    slug: "greenland-phase-ii",
    src: "/greenland-phase-ii.jpeg",
    alt: "Greenland Phase II Olodu Ogwashi-Uku",
    title: "Greenland Phase II",
    location: "Olodu Ogwashi-Uku, Delta State",
    price: "N1.980M",
    size: "450 SQM",
    summary:
      "A new Famocity property opportunity positioned for land buyers who want affordable entry, clear location context, and long-term value in Delta State.",
    highlights: [
      "Located at Olodu Ogwashi-Uku, Delta State.",
      "450 SQM plot size for practical ownership planning.",
      "Affordable entry price for land banking and future building.",
      "Supported by Famocity guidance and purchase communication."
    ]
  },
  {
    slug: "famocity-villa-abraka",
    src: "/villa-abraka.jpeg",
    alt: "Famocity Villa Abraka",
    title: "Famocity Villa Abraka",
    location: "Abraka, Delta State",
    price: "Contact for price",
    size: "Available plots",
    summary:
      "A Famocity property listing for buyers who want a structured path into land ownership around Abraka.",
    highlights: [
      "Located in Abraka, Delta State.",
      "Built around accessible ownership planning.",
      "Suitable for personal building goals and long-term holding.",
      "Inquiry support available through the Famocity team."
    ]
  },
  {
    slug: "premium-garden-city",
    src: "/premium-garden-city.jpeg",
    alt: "Premium Garden City",
    title: "Premium Garden City",
    location: "Asaba, Delta State",
    price: "Contact for price",
    size: "Available plots",
    summary:
      "A premium estate opportunity for buyers considering long-term property value in Asaba.",
    highlights: [
      "Located in Asaba, Delta State.",
      "Designed for buyers looking for growth-focused property access.",
      "Useful for investment planning and future development.",
      "Famocity team support from inquiry to next steps."
    ]
  },
  {
    slug: "everess-palm-city",
    src: "/everess-palm-city.jpeg",
    alt: "Everess Palm City",
    title: "Everess Palm City",
    location: "Olodu Ibusa, Delta State",
    price: "Contact for price",
    size: "Available plots",
    summary:
      "A land ownership opportunity around Olodu Ibusa for buyers seeking a clear path into real estate.",
    highlights: [
      "Located at Olodu Ibusa, Delta State.",
      "Good fit for first-time buyers and land banking.",
      "Built around transparent property communication.",
      "Inquiry and verification guidance available."
    ]
  }
];

export const businessPillars: BusinessPillar[] = [
  {
    slug: "real-estate",
    title: "Real Estate",
    eyebrow: "Verified ownership",
    copy:
      "Helping clients acquire safe, verified lands and properties with confidence, clarity, and long-term value.",
    longCopy: [
      "Famocity helps people approach real estate with better structure. We support land buyers, investors, and families who want to own genuine property without moving blindly.",
      "Our real estate support includes property search, purchase guidance, legitimacy checks, and practical communication before decisions are made."
    ],
    icon: Landmark,
    href: "/services/real-estate"
  },
  {
    slug: "construction",
    title: "Construction",
    eyebrow: "Build lasting value",
    copy:
      "Delivering quality building solutions that transform land into functional, lasting, and valuable structures.",
    longCopy: [
      "The construction arm helps clients move from owning land to creating useful, valuable spaces.",
      "Whether the goal is a home, an investment project, or a larger development, Famocity focuses on practical execution and lasting value."
    ],
    icon: Drill,
    href: "/services/construction"
  },
  {
    slug: "ouscraft-technology-hubs",
    title: "OUSCRAFT TECHNOLOGY HUBS",
    eyebrow: "Modern tools",
    copy:
      "Providing smart devices and modern technology solutions that support productivity, convenience, and better living.",
    longCopy: [
      "Ouscraft Technology Hubs is the technology and gadgets arm within the Famocity structure.",
      "It supports people and businesses with practical devices and technology solutions for communication, productivity, learning, and daily convenience."
    ],
    icon: Smartphone,
    logo: "/ouscraft-technology-hubs.png",
    href: "/services/ouscraft-technology-hubs"
  },
  {
    slug: "famosave",
    title: "Famosave",
    eyebrow: "Save with purpose",
    copy:
      "Helping individuals build disciplined savings habits that lead toward land ownership and real asset growth.",
    longCopy: [
      "Famosave gives saving a target. It helps people build discipline around a real ownership goal rather than saving without direction.",
      "The aim is to make land and asset ownership feel more reachable through consistency, structure, and clear motivation."
    ],
    icon: BadgeDollarSign,
    logo: "/famosave-logo.png",
    href: "/services/famosave"
  },
  {
    slug: "solar-energy",
    title: "Famocity Solar Energy",
    eyebrow: "Affordable energy access",
    copy:
      "Making clean energy easier to access by helping clients source quality solar solutions and connect with the right professionals.",
    longCopy: [
      "Famocity Solar Energy helps individuals, businesses, and property owners make solar feel less expensive and less complicated.",
      "We act as trusted facilitators, helping clients source quality solutions, connect with the right professionals, and understand cost-effective options that fit their budget and energy needs."
    ],
    icon: SunMedium,
    logo: "/famocity-solar-energy.png",
    href: "/services/solar-energy"
  }
];

export const faqs = [
  {
    question: "Can Famocity help me verify a property before I buy?",
    answer:
      "Yes. Famocity offers property legitimacy check consultancy to help buyers review documents, ask the right questions, and avoid costly mistakes."
  },
  {
    question: "Can I buy land through Famocity if I am outside Delta State?",
    answer:
      "Yes. The real estate purchase consultancy is designed to support buyers across locations with search, verification, and guided purchase communication."
  },
  {
    question: "Does Famocity install solar systems directly?",
    answer:
      "Famocity Solar Energy focuses on facilitation. We help you source quality solar options and connect with suitable professionals for your budget and needs."
  },
  {
    question: "Where do I see available properties?",
    answer:
      "The Properties section shows active listings. Each property page includes location, size, price information, highlights, and a contact path."
  }
];

export function getPropertyBySlug(slug: string) {
  return propertyListings.find((property) => property.slug === slug);
}

export function getBusinessPillarBySlug(slug: string) {
  return businessPillars.find((pillar) => pillar.slug === slug);
}
