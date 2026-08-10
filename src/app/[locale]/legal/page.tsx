import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "legal" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default function LegalPage() {
  const t = useTranslations("legal");
  const sections = t.raw("sections") as { h: string; p: string }[];

  return (
    <main>
      <div className="bg-gradient-to-b from-brand-surface to-brand-dark pt-12 pb-10 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-brand-theme transition-colors">
              {t("breadcrumbHome")}
            </Link>
            <span>/</span>
            <span className="text-gray-300">{t("breadcrumbCurrent")}</span>
          </div>
          <span className="badge bg-brand-theme/15 text-brand-theme mb-4 inline-block">
            {t("badge")}
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">{t("subtitle")}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        {sections.map((s) => (
          <section key={s.h} className="card">
            <h2 className="text-white font-display font-semibold text-xl mb-2">
              {s.h}
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">{s.p}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
