import { MetadataRoute } from "next";
import { db } from "@/lib/db";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://textfix.org";
  const corrections = db.getCorrections({ publicationStatus: "Published" }).items;

  const correctionUrls = corrections.map((c) => ({
    url: `${baseUrl}/grades/grade-11/biology/unit-1/${c.refCode.toLowerCase()}`,
    lastModified: new Date(c.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/grades/grade-11/biology/unit-1`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/textbooks`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/methodology`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
    { url: `${baseUrl}/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...correctionUrls,
  ];
}
