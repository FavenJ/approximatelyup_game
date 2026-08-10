import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { listArticles } from "@/lib/mdx";
import type { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "guide" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default function GuidePage() {
  const t = useTranslations("guide");
  const articles = listArticles();

  return (
    <main>
      {/* Page header */}
      <div className="bg-gradient-to-b from-brand-surface to-brand-dark pt-12 pb-10 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-brand-theme transition-colors">
              {t("breadcrumbHome")}
            </Link>
            <span>/</span>
            <span className="text-gray-300">{t("breadcrumbCurrent")}</span>
          </div>
          <span className="badge bg-brand-green text-white mb-4 inline-block">
            {t("badge")}
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl">{t("subtitle")}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Intro — from official wiki guide hub material */}
        <p className="text-gray-300 leading-relaxed max-w-3xl">{t("intro")}</p>

        {/* All tutorials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/${a.slug}`}
              className="card group block hover:border-brand-theme/40"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-white font-display font-semibold text-lg group-hover:text-brand-theme transition-colors">
                  {a.title}
                </h3>
                {a.badge && (
                  <span className="badge bg-brand-theme/15 text-brand-theme flex-shrink-0">
                    {a.badge}
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {a.subtitle}
              </p>
              <span className="text-brand-theme text-sm font-medium mt-4 block">
                {t("openGuide")}
              </span>
            </Link>
          ))}
        </div>

        <div className="card border-brand-theme/20">
          <p className="text-gray-400 text-sm leading-relaxed">{t("tbcNote")}</p>
        </div>
      </div>
    </main>
  );
}
