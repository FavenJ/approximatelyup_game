"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import Image from "next/image";
import { site } from "@/config/site";

const NAV_KEYS = [
  { href: "/guide", key: "guide" },
  { href: "/beginner-guide", key: "beginnerGuide" },
  { href: "/ship-building", key: "shipBuilds" },
  { href: "/missions", key: "missions" },
  { href: "/multiplayer", key: "multiplayer" },
] as const;

const LOCALES = [
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
  { code: "ja", label: "日本語" },
  { code: "es", label: "Español" },
] as const;

function SteamIcon() {
  return (
    <svg
      className="w-4 h-4 flex-shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z" />
    </svg>
  );
}

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand-dark/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label={`${site.gameName} Wiki - Home`}
          >
            <Image
              src="/images/logo.svg"
              alt={site.gameName}
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span className="font-display font-bold text-lg text-brand-theme leading-tight hidden sm:block">
              Approximately Up<span className="text-white"> Wiki</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation">
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_KEYS.map(({ href, key }) => {
                const active = pathname === href;
                return (
                  <li key={key}>
                    <Link
                      href={href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                        active
                          ? "text-brand-theme bg-brand-theme/10"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {t(key)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* CTA + Lang + Mobile toggle */}
          <div className="flex items-center gap-3">
            {/* Language dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-gray-300 hover:text-brand-theme border border-white/15 rounded-md px-2.5 py-1.5 transition-colors"
                aria-label="Switch language"
                aria-expanded={langOpen}
              >
                {locale.toUpperCase()}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {langOpen && (
                <ul className="absolute right-0 mt-2 w-32 rounded-md border border-white/10 bg-brand-surface shadow-lg py-1 z-50">
                  {LOCALES.map((l) => (
                    <li key={l.code}>
                      <Link
                        href={pathname}
                        locale={l.code}
                        onClick={() => setLangOpen(false)}
                        className={`block px-3 py-1.5 text-xs transition-colors ${
                          l.code === locale
                            ? "text-brand-theme font-semibold"
                            : "text-gray-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <a
              href={site.steamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-[#1b2838] text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#2a475e] transition-colors border border-[#4c6b8a]/50"
              aria-label={`Get ${site.gameName} on Steam`}
            >
              <SteamIcon />
              {t("getOnSteam")}
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={open}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-6 h-6 ${open ? "hidden" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-6 h-6 ${open ? "" : "hidden"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden border-t border-white/10 bg-brand-dark ${
          open ? "" : "hidden"
        }`}
      >
        <nav aria-label="Mobile navigation">
          <ul className="px-4 py-3 space-y-1">
            {NAV_KEYS.map(({ href, key }) => (
              <li key={key}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-300 hover:text-white hover:bg-white/5"
                >
                  {t(key)}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-white/10">
              <a
                href={site.steamUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-sm font-bold text-brand-theme"
              >
                {t("buyOnSteam")} →
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
