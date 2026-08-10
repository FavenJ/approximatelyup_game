import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type ArticleFrontmatter = {
  title: string;
  badge: string;
  subtitle: string;
  metaTitle?: string;
  metaDescription?: string;
};

export function getArticle(slug: string, locale: string) {
  const candidates = [
    path.join(CONTENT_DIR, locale, `${slug}.mdx`),
    path.join(CONTENT_DIR, "en", `${slug}.mdx`),
  ];

  for (const file of candidates) {
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, "utf-8");
      const { data, content } = matter(raw);
      return { frontmatter: data as ArticleFrontmatter, content };
    }
  }

  return null;
}

export type ArticleMeta = {
  slug: string;
  title: string;
  badge: string;
  subtitle: string;
};

/** Lists all articles that have an English MDX source (content source of truth). */
export function listArticles(): ArticleMeta[] {
  const enDir = path.join(CONTENT_DIR, "en");
  if (!fs.existsSync(enDir)) return [];

  return fs
    .readdirSync(enDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(enDir, f), "utf-8");
      const { data } = matter(raw);
      return {
        slug: f.replace(/\.mdx$/, ""),
        title: data.title ?? f,
        badge: data.badge ?? "",
        subtitle: data.subtitle ?? "",
      };
    });
}

export function listArticleSlugs(): string[] {
  return listArticles().map((a) => a.slug);
}
