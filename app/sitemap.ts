import type { MetadataRoute } from "next";
import { projects } from "./portfolio-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://harshdobariya.com";

  return [
    {
      url: baseUrl,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${baseUrl}/work/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
