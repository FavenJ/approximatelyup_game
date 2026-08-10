import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getArticle } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx";
import type { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const article = getArticle("beginner-guide", locale);
  if (!article) return {};
  const { frontmatter } = article;
  return {
    title: frontmatter.metaTitle ?? frontmatter.title,
    description: frontmatter.metaDescription ?? frontmatter.subtitle,
  };
}

export default function BeginnerGuidePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const article = getArticle("beginner-guide", locale);
  if (!article) notFound();

  const t = useTranslations("article");
  const { frontmatter, content } = article;

  return (
    <main>
      {/* Article header */}
      <div className="bg-gradient-to-b from-brand-surface to-brand-dark pt-12 pb-10 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-brand-theme transition-colors">
              {t("breadcrumbHome")}
            </Link>
            <span>/</span>
            <span className="text-gray-300">{frontmatter.title}</span>
          </div>
          <span className="badge bg-brand-green text-white mb-4 inline-block">
            {frontmatter.badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            {frontmatter.title}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            {frontmatter.subtitle}
          </p>
          <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-400">
            <span>{t("metaTbc")}</span>
          </div>
        </div>
      </div>

      {/* Article body (MDX) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <MDXRemote source={content} components={mdxComponents} />
      </div>
    </main>
  );
}
