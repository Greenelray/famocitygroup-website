import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://famocitygroup.org"),
  title: "Famocity Group Ltd",
  description:
    "Famocity Group Ltd brings together real estate, property agency, interior decor, solar energy, Ouscraft Technology Hubs, and Famosave.",
  alternates: {
    canonical: "https://famocitygroup.org"
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/famocity-group-icon.png", type: "image/png", sizes: "512x512" }
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png"
  },
  keywords: [
    "Famocity",
    "Famocity Group Ltd",
    "Famocity Group Limited",
    "real estate Nigeria",
    "Delta State real estate",
    "property agency Nigeria",
    "interior decor Nigeria",
    "land investment",
    "Famosave",
    "Famocity Solar Energy",
    "Ouscraft Technology Hubs",
    "real estate consultancy",
    "property legitimacy check"
  ],
  openGraph: {
    title: "Famocity Group Ltd",
    description:
      "Five specialist arms across real estate, property agency, interior decor, solar energy, and technology.",
    type: "website",
    url: "https://famocitygroup.org",
    siteName: "Famocity Group Ltd",
    images: [
      {
        url: "/famocity-header-logo-cropped.png",
        width: 304,
        height: 117,
        alt: "Famocity Group Ltd"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Famocity Group Ltd",
    description:
      "Real estate, property agency, interior decor, solar energy, technology, and structured savings.",
    images: ["/famocity-header-logo-cropped.png"]
  }
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "RealEstateAgent"],
  name: "Famocity Group Ltd",
  alternateName: "Famocity Group",
  url: "https://famocitygroup.org",
  logo: "https://famocitygroup.org/famocity-header-logo-cropped.png",
  image: "https://famocitygroup.org/famocity-header-logo-cropped.png",
  description:
    "Famocity Group Ltd helps clients through real estate, property agency, interior decor, solar energy facilitation, technology solutions, and Famosave.",
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
    "Property agency",
    "Real estate consultancy",
    "Property legitimacy checks",
    "Interior decor",
    "Solar energy",
    "Technology hubs",
    "Structured savings"
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Famocity Real Estate"
      }
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Famocity Property Agency"
      }
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Famocity Interior Decor"
      }
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Famocity Solar Energy"
      }
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Ouscraft Technology Hubs"
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
  name: "Famocity Group Ltd",
  url: "https://famocitygroup.org",
  description:
    "Official website of Famocity Group Ltd."
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
