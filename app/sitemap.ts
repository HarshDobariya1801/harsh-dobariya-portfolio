import type { MetadataRoute } from "next";
import { poems } from "./poems/poems-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://harshdobariya.com";

  return [
    {
      url: baseUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/poems`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...poems.map((poem) => ({
      url: `${baseUrl}/poems/${poem.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];
}
