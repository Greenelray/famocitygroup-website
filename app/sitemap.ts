import type { MetadataRoute } from "next";
import { businessPillars, propertyListings } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://famocitygroup.org";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${baseUrl}/properties`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9
    },
    ...propertyListings.map((property) => ({
      url: `${baseUrl}/properties/${property.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85
    })),
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85
    },
    ...businessPillars.map((pillar) => ({
      url: `${baseUrl}/services/${pillar.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8
    })),
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75
    }
  ];
}
