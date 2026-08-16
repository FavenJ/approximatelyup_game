import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AdBannerSlot } from "@/components/AdBanner";
import { ResponsiveAdBanner } from "@/components/ResponsiveAdBanner";
import { adsterra } from "@/config/ads";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL("https://www.approximatelyup.space"),
    title: {
      default: t("siteTitle"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("siteDescription"),
    keywords: t("keywords"),
    icons: { icon: "/images/logo.svg", apple: "/images/logo.svg" },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as "en" | "de" | "ja" | "es")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${oswald.variable}`}>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
        <NextIntlClientProvider messages={messages}>
          <Header />
          {/* 顶部 Banner：桌面 728x90 / 移动 320x50 自适应，只挂载对应的一套脚本 */}
          <ResponsiveAdBanner
            desktop={adsterra.banner}
            mobile={adsterra.bannerMobile}
            label="Advertisement"
          />
          {children}
          {/* 底部 Native Banner（原生信息流广告） */}
          <AdBannerSlot slot={adsterra.native} label="Sponsored" />
          <Footer />
          {/* Smartlink 智能链接：渲染为低调的「Sponsored」链接（非脚本） */}
          {adsterra.smartlink.enabled && adsterra.smartlink.src && (
            <div className="flex justify-center pb-6">
              <a
                href={adsterra.smartlink.src}
                target="_blank"
                rel="nofollow noopener"
                className="text-[11px] uppercase tracking-widest text-white/30 transition-colors hover:text-white/50"
              >
                Sponsored
              </a>
            </div>
          )}
          {/* 站点级脚本型广告：未配置（enabled=false）时自动不渲染 */}
          <AdBannerSlot slot={adsterra.popunder} scriptId="adsterra-popunder" />
          <AdBannerSlot slot={adsterra.socialBar} scriptId="adsterra-social-bar" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
