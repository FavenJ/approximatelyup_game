import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { listArticleSlugs } from "@/lib/mdx";

const SITE_URL = "https://www.approximatelyup.space";

/** Reserved slugs that have their own dedicated routes. */
const RESERVED = new Set(["guide", "legal", "beginner-guide"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "guide", "legal", "beginner-guide"];
  const articleSlugs = listArticleSlugs().filter((s) => !RESERVED.has(s));

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${SITE_URL}/${locale}${path ? `/${path}` : ""}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "daily" : "weekly",
        priority: path === "" ? 1 : 0.8,
      });
    }

    for (const slug of articleSlugs) {
      entries.push({
        url: `${SITE_URL}/${locale}/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
