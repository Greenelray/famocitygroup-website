import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://famocitygroup.org"),
  title: "Famocity Real Estate and Construction Limited",
  description:
    "Famocity Real Estate and Construction Limited helps people build wealth through verified real estate, construction, solar energy, Ouscraft Technology Hubs, and disciplined savings.",
  alternates: {
    canonical: "https://famocitygroup.org"
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon.png"
  },
  keywords: [
    "Famocity",
    "real estate Nigeria",
    "Delta State real estate",
    "construction company",
    "land investment",
    "Famosave",
    "Famocity Solar Energy",
    "Ouscraft Technology Hubs",
    "real estate consultancy",
    "property legitimacy check"
  ],
  openGraph: {
    title: "Famocity Real Estate and Construction Limited",
    description:
      "Build smart. Own assets. Live better with verified real estate, construction, solar energy, technology solutions, and structured savings.",
    type: "website",
    url: "https://famocitygroup.org",
    siteName: "Famocity",
    images: [
      {
        url: "/famocity-header-logo-cropped.png",
        width: 766,
        height: 313,
        alt: "Famocity Real Estate and Construction Limited"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Famocity Real Estate and Construction Limited",
    description:
      "Helping you build wealth through real estate, construction, solar energy, smart savings, and future-focused investments.",
    images: ["/famocity-header-logo-cropped.png"]
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "RealEstateAgent"],
  name: "Famocity Real Estate and Construction Limited",
  alternateName: "Famocity",
  url: "https://famocitygroup.org",
  logo: "https://famocitygroup.org/famocity-header-logo-cropped.png",
  image: "https://famocitygroup.org/famocity-header-logo-cropped.png",
  description:
    "Famocity Real Estate and Construction Limited helps clients grow through verified real estate, construction, solar energy facilitation, technology solutions, and disciplined savings.",
  telephone: ["+2348148287468", "+2347038320560", "+2348124592833"],
  email: "famocityprime@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Grace plaza NUT junction, Abraka, New Agbor-Sapele Road",
    addressLocality: "Abraka",
    addressRegion: "Delta State",
    addressCountry: "NG"
  },
  areaServed: {
    "@type": "Country",
    name: "Nigeria"
  },
  knowsAbout: [
    "Real estate",
    "Real estate consultancy",
    "Property legitimacy checks",
    "Construction",
    "Solar energy",
    "Technology hubs",
    "Structured savings"
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Real Estate Purchase Consultancy"
      }
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Property Legitimacy Check Consultancy"
      }
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Solar Energy Facilitation"
      }
    }
  ],
  sameAs: [
    "https://www.facebook.com/share/18CrQum8bN/?mibextid=wwXIfr",
    "https://www.instagram.com/famocityrealestateltd?igsh=NXhrdjJya2lwcWQ%3D&utm_source=qr",
    "https://www.tiktok.com/@famocity.real.est?_r=1&_t=ZS-959O5OJReaO",
    "https://youtube.com/@am_the_best_realtor?si=Jhd3qv0-1SP-nHyk"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Famocity",
  url: "https://famocitygroup.org",
  description:
    "Official website of Famocity Real Estate and Construction Limited."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-slate-800 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
