import type { Metadata } from "next";
import { Poppins, Roboto } from "next/font/google";
import "./globals.css";

const display = Poppins({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"]
});

const body = Roboto({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://famocitygroup.org"),
  title: "Famocity Real Estate and Construction Limited",
  description:
    "Premium real estate and construction company helping people build wealth through property, construction, gadgets, and disciplined savings.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png"
  },
  keywords: [
    "Famocity",
    "real estate Nigeria",
    "Delta State real estate",
    "construction company",
    "land investment",
    "Famosave"
  ],
  openGraph: {
    title: "Famocity Real Estate and Construction Limited",
    description:
      "Build smart. Own assets. Live better with a premium real estate and construction brand focused on long-term value.",
    type: "website",
    url: "https://famocitygroup.org"
  },
  twitter: {
    card: "summary_large_image",
    title: "Famocity Real Estate and Construction Limited",
    description:
      "Helping you build wealth through real estate, construction, smart savings, and future-focused investments."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${display.variable} ${body.variable} bg-white text-slate-800 antialiased`}>
        {children}
      </body>
    </html>
  );
}
