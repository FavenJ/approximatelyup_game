"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

export type AdSlot = {
  enabled: boolean;
  containerId: string;
  src: string;
  inlineScript: string;
  /** true = 仅加载脚本、不渲染可见容器（Popunder / Social Bar / Smartlink 等） */
  scriptOnly?: boolean;
};

/**
 * Adsterra 广告位组件。
 *
 * 支持两种 Adsterra 代码形态（按后台给的代码填对应环境变量）：
 *
 *  1) Native Banner（仅异步 src）：
 *     <script async src="https://xxx.effectivecpmnetwork.com/.../invoke.js"></script>
 *     → 填 _SRC，_SCRIPT 留空。用 next/script 加载。
 *
 *  2) 经典 Banner 横幅（atOptions + invoke.js 双脚本）：
 *     <script>atOptions = { key:'...', format:'iframe', height:90, width:728 };</script>
 *     <script src="https://www.highperformanceformat.com/.../invoke.js"></script>
 *     → 填 _SCRIPT 和 _SRC。用 useEffect + document.createElement('script')
 *       在容器旁边动态注入两个 <script> 并立即执行。
 *       （不能用 dangerouslySetInnerHTML —— React 不会执行其中的 <script>）
 *
 *  3) 脚本型（Popunder / Social Bar / Smartlink 等，无可见容器）：
 *     <script async src="https://.../invoke.js" data-cfasync="false"></script>
 *     或 <script>atOptions = {...};</script>
 *     → 设 _SCRIPT_ONLY=true，并填 _SRC 或 _SCRIPT。组件只加载脚本、不渲染任何可见元素。
 *
 * 未启用（enabled=false）或 src 与 inlineScript 都为空时，组件不渲染任何内容。
 */
export function AdBannerSlot({
  slot,
  label = "Advertisement",
  className,
  scriptId,
}: {
  slot: AdSlot;
  label?: string;
  className?: string;
  /** 脚本型广告位的唯一 id（内联脚本必需，避免多个脚本型广告位 id 冲突） */
  scriptId?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const injected = useRef(false);

  // ── 模式 3：脚本型（Popunder / Social Bar / Smartlink），无可见容器 ──
  if (slot.scriptOnly) {
    if (!slot.enabled) return null;
    if (slot.src) {
      return (
        <Script
          src={slot.src}
          strategy="afterInteractive"
          data-cfasync="false"
        />
      );
    }
    if (slot.inlineScript) {
      return (
        <Script
          id={scriptId ?? `adsterra-${label}`}
          strategy="afterInteractive"
          data-cfasync="false"
        >
          {slot.inlineScript}
        </Script>
      );
    }
    return null;
  }

  // ── 模式 2：atOptions + invoke.js（经典 Banner 横幅）───────────────
  // 用 useEffect 在挂载后动态创建 <script> 元素并插入 DOM，
  // 这样浏览器才会真正执行脚本内容。
  useEffect(() => {
    if (
      !slot.enabled ||
      !slot.inlineScript ||
      !slot.src ||
      !containerRef.current ||
      injected.current
    ) {
      return;
    }
    injected.current = true;

    const parent = containerRef.current.parentElement;
    if (!parent) return;

    // ① 先注入内联脚本（设置 atOptions 等全局配置）
    const inlineEl = document.createElement("script");
    inlineEl.text = slot.inlineScript; // .text 比 .innerHTML 更安全
    parent.insertBefore(inlineEl, containerRef.current.nextSibling);

    // ② 再注入外部脚本（invoke.js 会读取 atOptions 并创建广告 iframe）
    const srcEl = document.createElement("script");
    srcEl.src = slot.src;
    srcEl.async = true;
    parent.insertBefore(srcEl, inlineEl.nextSibling);

    // 清理函数：卸载时移除注入的脚本（避免 SSR/hydration 重复注入）
    return () => {
      inlineEl.remove();
      srcEl.remove();
      injected.current = false;
    };
  }, [slot.enabled, slot.inlineScript, slot.src]);

  if (!slot.enabled || (!slot.src && !slot.inlineScript)) return null;

  // ── 模式 1：仅异步 src（Native Banner 等）──────────────────────
  if (!slot.inlineScript) {
    return (
      <div
        className={`adsterra-slot my-8 flex flex-col items-center gap-2 ${className ?? ""}`}
      >
        <span className="text-[11px] uppercase tracking-widest text-white/40">
          {label}
        </span>
        <div id={slot.containerId} className="w-full flex justify-center overflow-hidden" />
        <Script
          id={`ad-src-${slot.containerId}`}
          src={slot.src}
          strategy="afterInteractive"
        />
      </div>
    );
  }

  // ── 模式 2 渲染：容器 + useEffect 注入脚本 ──────────────────────
  return (
    <div
      className={`adsterra-slot my-8 flex flex-col items-center gap-2 ${className ?? ""}`}
    >
      <span className="text-[11px] uppercase tracking-widest text-white/40">
        {label}
      </span>
      {/* 容器 div：useEffect 会在这个容器后面紧邻注入两个 <script> */}
      <div
        ref={containerRef}
        id={slot.containerId}
        className="w-full flex justify-center overflow-hidden"
        style={{ minHeight: slot.inlineScript.includes("height") ? undefined : "0px" }}
      />
    </div>
  );
}
