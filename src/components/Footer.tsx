import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { site } from "@/config/site";

const GUIDE_LINKS = [
  { href: "/beginner-guide", key: "beginnerGuide" },
  { href: "/ship-builds", key: "shipBuilds" },
  { href: "/missions", key: "missions" },
  { href: "/multiplayer", key: "multiplayer" },
] as const;

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-brand-surface border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.svg"
                alt={site.gameName}
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="font-display font-bold text-xl text-brand-theme">
                Approximately Up Wiki
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
            <p className="text-gray-600 text-xs mt-4">{t("disclaimer")}</p>
          </div>

          {/* Guides */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t("guides")}
            </h3>
            <ul className="space-y-2">
              {GUIDE_LINKS.map(({ href, key }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-gray-400 hover:text-brand-theme text-sm transition-colors"
                  >
                    {t(`links.${key}`)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/legal"
                  className="text-gray-400 hover:text-brand-theme text-sm transition-colors"
                >
                  {t("links.legal")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Community — only confirmed links are linked; the rest are marked TBC */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t("community")}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={site.steamCommunityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-brand-theme text-sm transition-colors"
                >
                  {t("steamCommunity")}
                </a>
              </li>
              <li className="text-gray-500 text-sm">
                {t("discord")} ·{" "}
                <span className="text-gray-600 text-xs">{t("tbc")}</span>
              </li>
              <li className="text-gray-500 text-sm">
                {t("youtube")} ·{" "}
                <span className="text-gray-600 text-xs">{t("tbc")}</span>
              </li>
              <li className="text-gray-500 text-sm">
                {t("reddit")} ·{" "}
                <span className="text-gray-600 text-xs">{t("tbc")}</span>
              </li>
            </ul>
            <div className="mt-6">
              <a
                href={site.steamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-brand-theme hover:underline"
              >
                {t("viewOnSteam")} →
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">{t("copyright")}</p>
          <p className="text-gray-600 text-xs">{t("credit")}</p>
        </div>
      </div>
    </footer>
  );
}
