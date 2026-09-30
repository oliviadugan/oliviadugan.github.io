import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/lib/site";
import { essays } from "@/app/writing/essays";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/writing/`, changeFrequency: "weekly", priority: 0.8 },
    ...essays.map((e) => ({
      url: `${SITE_URL}/writing/${e.slug}/`,
      lastModified: e.date,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
