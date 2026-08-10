import Image from "next/image";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/* ---------- Section headings & paragraphs ---------- */

export function H2({ children, className = "", ...props }: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2 className={`section-title mb-6 ${className}`.trim()} {...props}>
      {children}
    </h2>
  );
}

export function P({ children, className = "", ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p className={`text-gray-300 leading-relaxed mb-6 last:mb-0 ${className}`.trim()} {...props}>
      {children}
    </p>
  );
}

export function Strong({ children, className = "", ...props }: ComponentPropsWithoutRef<"strong">) {
  return (
    <strong className={`text-white ${className}`.trim()} {...props}>
      {children}
    </strong>
  );
}

export function H3({ children, className = "", ...props }: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3 className={`text-white font-display font-semibold text-xl mb-3 ${className}`.trim()} {...props}>
      {children}
    </h3>
  );
}

export function Ul({ children, className = "", ...props }: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul className={`text-gray-400 text-sm space-y-1.5 list-disc list-inside mb-6 leading-relaxed ${className}`.trim()} {...props}>
      {children}
    </ul>
  );
}

export function Ol({ children, className = "", ...props }: ComponentPropsWithoutRef<"ol">) {
  return (
    <ol className={`text-gray-400 text-sm space-y-1.5 list-decimal list-inside mb-6 leading-relaxed ${className}`.trim()} {...props}>
      {children}
    </ol>
  );
}

export function A({
  href,
  children,
  className = "",
  ...props
}: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      href={href}
      className={`text-brand-theme hover:underline ${className}`.trim()}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  );
}

/* ---------- Callout boxes ---------- */

export function GoldBox({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-brand-theme/10 border border-brand-theme/30 rounded-xl p-6">
      <h2 className="text-brand-theme font-display font-bold text-xl mb-3">
        {title}
      </h2>
      <div className="text-white font-medium leading-relaxed">{children}</div>
    </div>
  );
}

export function RedBox({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-brand-accent/10 border border-brand-accent/30 rounded-xl p-4">
      <p className="text-white font-semibold text-sm">{title}</p>
      <p className="text-gray-300 text-sm mt-1">{children}</p>
    </div>
  );
}

export function GoldListBox({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="bg-brand-theme/10 border border-brand-theme/30 rounded-xl p-4 mb-6">
      <p className="text-brand-theme font-semibold text-sm mb-2">{title}</p>
      <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ol>
    </div>
  );
}

/* ---------- Figure ---------- */

export function Figure({
  src,
  alt,
  caption,
  aspect = "video",
}: {
  src: string;
  alt: string;
  caption: string;
  aspect?: "video" | "43";
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-white/10 bg-brand-card">
      <Image
        src={src}
        alt={alt}
        width={1920}
        height={aspect === "video" ? 1080 : 1440}
        className={`w-full ${
          aspect === "video" ? "aspect-video" : "aspect-[4/3]"
        } object-cover`}
      />
      <figcaption className="px-4 py-3 text-sm text-gray-400">
        {caption}
      </figcaption>
    </figure>
  );
}

export function FigureGrid({ children }: { children: ReactNode }) {
  return <div className="grid md:grid-cols-2 gap-4 mb-6">{children}</div>;
}

/* ---------- Numbered steps ---------- */

export function Steps({ children }: { children: ReactNode }) {
  return <div className="space-y-3">{children}</div>;
}

export function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-4 card">
      <div className="text-brand-theme font-display font-bold text-2xl w-8 flex-shrink-0">
        {n}
      </div>
      <div>
        <h3 className="text-white font-semibold mb-1">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

/* ---------- Stat cards ---------- */

export function StatGrid({ children }: { children: ReactNode }) {
  return <div className="grid sm:grid-cols-2 gap-4">{children}</div>;
}

export function Stat({
  label,
  value,
  desc,
}: {
  label: string;
  value: string;
  desc: string;
}) {
  return (
    <div className="card">
      <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className="text-white font-semibold mb-1">{value}</div>
      <div className="text-gray-400 text-xs leading-relaxed">{desc}</div>
    </div>
  );
}

/* ---------- Roles list ---------- */

export function RolesCard({
  title,
  roles,
}: {
  title: string;
  roles: { role: string; desc: string }[];
}) {
  return (
    <div className="card mb-6">
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <div className="space-y-2">
        {roles.map((r) => (
          <div
            key={r.role}
            className="flex gap-3 py-2 border-b border-white/5 last:border-0"
          >
            <span className="text-brand-theme font-semibold text-sm w-28 flex-shrink-0">
              {r.role}
            </span>
            <span className="text-gray-400 text-sm">{r.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Table ---------- */

export function Table({ children, className = "", ...props }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="overflow-x-auto mb-6">
      <table className={`w-full border-collapse rounded-xl overflow-hidden border border-white/10 bg-brand-card text-sm ${className}`.trim()} {...props}>
        {children}
      </table>
    </div>
  );
}

export function Thead({ children, className = "", ...props }: ComponentPropsWithoutRef<"thead">) {
  return <thead className={`bg-brand-surface ${className}`.trim()} {...props}>{children}</thead>;
}

export function Tbody({ children, className = "", ...props }: ComponentPropsWithoutRef<"tbody">) {
  return <tbody className={className.trim()} {...props}>{children}</tbody>;
}

export function Tr({ children, className = "", ...props }: ComponentPropsWithoutRef<"tr">) {
  return <tr className={`border-b border-white/10 last:border-0 ${className}`.trim()} {...props}>{children}</tr>;
}

export function Th({ children, className = "", ...props }: ComponentPropsWithoutRef<"th">) {
  return (
    <th className={`text-left text-white font-semibold py-3 px-4 ${className}`.trim()} {...props}>
      {children}
    </th>
  );
}

export function Td({ children, className = "", ...props }: ComponentPropsWithoutRef<"td">) {
  return <td className={`py-3 px-4 text-gray-300 ${className}`.trim()} {...props}>{children}</td>;
}

export function RiskBadge({ level }: { level: string }) {
  const color =
    level === "High"
      ? "text-brand-accent"
      : level === "Medium"
      ? "text-brand-green"
      : "text-gray-400";
  return (
    <span className={`text-xs font-medium ${color}`}>{level}</span>
  );
}

export function GamesTable({
  head,
  rows,
}: {
  head: string[];
  rows: { game: string; floor: string; risk: string; take: string }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10">
            {head.map((h, i) => (
              <th
                key={h}
                className={`text-left text-gray-400 font-medium py-3 ${
                  i < head.length - 1 ? "pr-4" : ""
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.game}
              className="border-b border-white/5 hover:bg-white/2"
            >
              <td className="py-3 pr-4 text-white font-medium">{r.game}</td>
              <td className="py-3 pr-4">
                <span className="badge bg-brand-theme/20 text-brand-theme">
                  {r.floor}
                </span>
              </td>
              <td className="py-3 pr-4">
                <RiskBadge level={r.risk} />
              </td>
              <td className="py-3 text-gray-400">{r.take}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Item cards ---------- */

export function ItemCards({ children }: { children: ReactNode }) {
  return <div className="space-y-3">{children}</div>;
}

export function ItemCard({
  name,
  desc,
  tip,
}: {
  name: string;
  desc: string;
  tip: string;
}) {
  return (
    <div className="card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-white font-semibold text-sm mb-1">{name}</h3>
          <p className="text-gray-400 text-sm">{desc}</p>
        </div>
      </div>
      <p className="text-brand-theme/80 text-xs mt-2 pt-2 border-t border-white/5">
        {tip}
      </p>
    </div>
  );
}

/* ---------- Info cards (green/gold/red bordered) ---------- */

export function InfoCard({
  title,
  tone = "green",
  children,
}: {
  title: string;
  tone?: "green" | "gold" | "red";
  children: ReactNode;
}) {
  const styles = {
    green: "border-brand-green/30 text-brand-green",
    gold: "border-brand-theme/30 text-brand-theme",
    red: "border-brand-accent/30 text-brand-accent",
  }[tone];
  return (
    <div className={`card ${styles.split(" ")[0]}`}>
      <h3 className={`font-semibold mb-2 ${styles.split(" ")[1]}`}>{title}</h3>
      <div className="text-gray-400 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export function CardGrid({ children }: { children: ReactNode }) {
  return <div className="grid sm:grid-cols-2 gap-4">{children}</div>;
}

export function CardGrid3({ children }: { children: ReactNode }) {
  return <div className="grid sm:grid-cols-3 gap-4 mb-6">{children}</div>;
}

/* ---------- Checklist card ---------- */

export function ListCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="card mt-4 bg-brand-surface">
      <h3 className="text-white font-semibold mb-3">{title}</h3>
      <ol className="text-gray-400 text-sm space-y-1 list-decimal list-inside">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ol>
    </div>
  );
}

export function BulletCard({
  title,
  tone = "green",
  items,
}: {
  title: string;
  tone?: "green" | "gold" | "red";
  items: string[];
}) {
  const styles = {
    green: "border-brand-green/30 text-brand-green",
    gold: "border-brand-theme/30 text-brand-theme",
    red: "border-brand-accent/30 text-brand-accent",
  }[tone];
  return (
    <div className={`card ${styles.split(" ")[0]}`}>
      <h3 className={`font-semibold mb-3 ${styles.split(" ")[1]}`}>{title}</h3>
      <ul className="text-gray-400 text-sm space-y-1">
        {items.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Solo vs Co-op ---------- */

export function ModeCard({
  title,
  desc,
  note,
}: {
  title: string;
  desc: string;
  note: string;
}) {
  return (
    <div className="card">
      <h3 className="text-brand-theme font-display font-semibold text-lg mb-2">
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-3">{desc}</p>
      <p className="text-white text-xs font-medium border-t border-white/10 pt-3">
        {note}
      </p>
    </div>
  );
}

/* ---------- Mistakes ---------- */

export function Mistake({
  title,
  why,
  fix,
  whyLabel,
  fixLabel,
}: {
  title: string;
  why: string;
  fix: string;
  whyLabel: string;
  fixLabel: string;
}) {
  return (
    <div className="card">
      <h3 className="text-brand-accent font-semibold text-sm mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-2">
        <span className="text-gray-500">{whyLabel}</span> {why}
      </p>
      <p className="text-brand-green text-sm">
        <span className="text-gray-500">{fixLabel}</span> {fix}
      </p>
    </div>
  );
}

/* ---------- FAQ ---------- */

export function Faq({ q, children }: { q: string; children: ReactNode }) {
  return (
    <details className="card group cursor-pointer">
      <summary className="flex items-center justify-between text-white font-semibold list-none">
        <span>{q}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-brand-theme flex-shrink-0 ml-4 transition-transform group-open:rotate-180"
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
      </summary>
      <div className="text-gray-400 text-sm leading-relaxed mt-3">
        {children}
      </div>
    </details>
  );
}

export function Stack({ children }: { children: ReactNode }) {
  return <div className="space-y-3">{children}</div>;
}

export const mdxComponents = {
  h2: H2,
  h3: H3,
  p: P,
  strong: Strong,
  ul: Ul,
  ol: Ol,
  a: A,
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: Tr,
  th: Th,
  td: Td,
  GoldBox,
  RedBox,
  GoldListBox,
  Figure,
  FigureGrid,
  Steps,
  Step,
  StatGrid,
  Stat,
  RolesCard,
  GamesTable,
  ItemCards,
  ItemCard,
  InfoCard,
  CardGrid,
  CardGrid3,
  ModeCard,
  Mistake,
  Faq,
  Stack,
  ListCard,
  BulletCard,
};
