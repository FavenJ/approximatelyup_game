import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="card py-12 px-6">
        <h1 className="section-title mb-4">{t("title")}</h1>
        <p className="text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
          {t("text")}
        </p>
        <Link href="/" className="btn-primary">
          {t("back")}
        </Link>
      </div>
    </main>
  );
}
