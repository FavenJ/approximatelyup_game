import type { Config } from "tailwindcss";

/**
 * Theme colors per research doc (Approximately_Up_Wiki_开发信息.md):
 *   --nav-theme:        190 80% 45%
 *   --nav-theme-light:  190 80% 58%
 * Dark theme is the default.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}", "./content/**/*.mdx"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0a0e14",
          surface: "#0f1722",
          card: "#131e2b",
          theme: "hsl(190 80% 45% / <alpha-value>)",
          "theme-light": "hsl(190 80% 58% / <alpha-value>)",
          accent: "#e94560",
          green: "#22c55e",
          // legacy alias: previous gold accents now map to the researched theme color
          gold: "hsl(190 80% 58% / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-oswald)", "sans-serif"],
      },
      // 全站字体比原始大一点点（1.25 倍）：仅缩放字号比例（基于 Tailwind 默认字号 x1.25），
      // 不影响 spacing/padding 等使用 rem 的间距，避免布局被整体撑大。
      fontSize: {
        xs: ["0.9375rem", { lineHeight: "1.25rem" }],
        sm: ["1.09375rem", { lineHeight: "1.5625rem" }],
        base: ["1.25rem", { lineHeight: "1.875rem" }],
        lg: ["1.40625rem", { lineHeight: "2.1875rem" }],
        xl: ["1.5625rem", { lineHeight: "2.1875rem" }],
        "2xl": ["1.875rem", { lineHeight: "2.5rem" }],
        "3xl": ["2.34375rem", { lineHeight: "2.8125rem" }],
        "4xl": ["2.8125rem", { lineHeight: "3.125rem" }],
        "5xl": ["3.75rem", { lineHeight: "1" }],
        "6xl": ["4.6875rem", { lineHeight: "1" }],
        "7xl": ["5.625rem", { lineHeight: "1" }],
        "8xl": ["7.5rem", { lineHeight: "1" }],
        "9xl": ["10rem", { lineHeight: "1" }],
      },
    },
  },
  plugins: [],
};

export default config;
