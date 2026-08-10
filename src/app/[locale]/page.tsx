import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { site } from "@/config/site";

type StartCard = {
  number: string;
  title: string;
  description: string;
  href: string;
};

export default function HomePage() {
  const t = useTranslations("home");

  const heroStats = t.raw("heroStats") as string[];
  const startCards = t.raw("startCards") as StartCard[];
  const aboutStats = t.raw("aboutStats") as { label: string; value: string }[];

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="absolute inset-0" aria-hidden="true">
          {/* Hero space background image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/hero-bg.png')" }}
          />
          {/* Deep blue overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/60 via-[#050a12]/80 to-brand-dark" />
          {/* Vignette darkening around the edges */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, transparent 0%, transparent 40%, #020617 95%)",
            }}
          />
          {/* Subtle theme glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-brand-theme/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[250px] bg-brand-theme/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-theme/10 border border-brand-theme/30 text-brand-theme text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
            {t("heroEyebrow")}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight mb-6 drop-shadow-lg">
            {t("heroTitle")}
            <br />
            <span className="text-brand-theme">Wiki</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow">
            {t("heroDescription")}
          </p>

          <div className="flex flex-row items-center justify-center gap-4">
            <Link
              href="/beginner-guide"
              className="inline-flex items-center gap-2 rounded-lg border border-brand-theme/40 bg-gradient-to-r from-brand-theme/90 to-brand-theme/70 px-8 py-4 text-lg font-bold text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
            >
              {t("heroPrimary")}
            </Link>
            <Link href="/guide" className="btn-gradient text-base">
              {t("heroGuides")} →
            </Link>
          </div>

          {/* Quick stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {heroStats.map((s) => (
              <div
                key={s}
                className="bg-brand-dark/70 backdrop-blur-sm border border-white/15 rounded-full py-2 px-4 text-sm text-gray-200"
              >
                <span className="text-brand-theme mr-1.5" aria-hidden="true">
                  ✦
                </span>
                {s}
              </div>
            ))}
          </div>

          {/* Official media */}
          <div className="mt-10 max-w-2xl mx-auto">
            <a
              href={site.steamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card group flex items-center justify-between gap-4 hover:border-brand-theme/40"
            >
              <span className="text-gray-400 text-sm">
                {t("videoLabel")} · Steam
              </span>
              <span className="text-brand-theme text-sm font-medium group-hover:underline">
                {t("heroTertiary")} →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Start Here */}
      <section className="bg-brand-surface/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-block badge bg-brand-theme/15 text-brand-theme mb-3">
              {t("startEyebrow")}
            </div>
            <h2 className="section-title">{t("startTitle")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {startCards.map((c) => (
              <Link
                key={c.number}
                href={c.href}
                className="card group flex flex-col gap-3 hover:scale-[1.02] transition-transform duration-200"
              >
                <div className="text-brand-theme font-display font-bold text-3xl">
                  {c.number}
                </div>
                <h3 className="text-white font-display font-semibold text-lg group-hover:text-brand-theme transition-colors">
                  {c.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">
                  {c.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What is Approximately Up */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="section-title mb-4">{t("aboutTitle")}</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              {t("aboutP1")}
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              {t("aboutP2")}
            </p>
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 text-brand-theme hover:underline font-semibold"
            >
              {t("aboutCta")} →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {aboutStats.map((s) => (
              <div key={s.label} className="card">
                <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">
                  {s.label}
                </div>
                <div className="text-white font-semibold text-sm">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="card text-center py-12 px-6 bg-gradient-to-b from-brand-card to-brand-surface">
          <h2 className="section-title mb-4">{t("finalTitle")}</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            {t("finalDescription")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/beginner-guide" className="btn-primary">
              {t("finalPrimary")}
            </Link>
            <a
              href={site.steamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              {t("finalSecondary")}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
