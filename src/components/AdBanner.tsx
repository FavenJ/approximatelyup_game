"use client";

import Script from "next/script";

export type AdSlot = {
  enabled: boolean;
  containerId: string;
  src: string;
  inlineScript: string;
};

/**
 * Adsterra 广告位组件。
 *
 * 支持三种 Adsterra 代码形态（按后台给的代码填对应环境变量）：
 *  - 仅 src：<script async src="https://cdn.adsterra.com/.../xxx.js">（Native / 异步 Banner）
 *  - 仅 inlineScript：一段内联 JS，如经典 Banner "Direct" 的
 *    (function(d,z,s){...})('cdn.adsterra.com', 1234567, ...)
 *  - 两者都有：atOptions 全局变量 + invoke.js（经典 Banner 横幅，如 728x90）。
 *    此时会依次渲染内联脚本（先设 atOptions）再加载 invoke.js，二者都生效。
 *
 * 未启用（enabled=false）或 src 与 inlineScript 都为空时，组件不渲染任何内容。
 */
export function AdBannerSlot({
  slot,
  label = "Advertisement",
  className,
}: {
  slot: AdSlot;
  label?: string;
  className?: string;
}) {
  if (!slot.enabled || (!slot.src && !slot.inlineScript)) return null;

  return (
    <div
      className={`adsterra-slot my-8 flex flex-col items-center gap-2 ${className ?? ""}`}
    >
      <span className="text-[11px] uppercase tracking-widest text-white/40">
        {label}
      </span>
      {/* Adsterra 会把广告注入到这个容器 div（id 需与后台给出的 container id 一致） */}
      <div
        id={slot.containerId}
        className="w-full flex justify-center overflow-hidden"
      />
      {/* 内联脚本（如 Banner 的 atOptions 全局配置）必须先于 invoke.js 执行 */}
      {slot.inlineScript && (
        <Script
          id={`ad-inline-${slot.containerId}`}
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: slot.inlineScript }}
        />
      )}
      {/* 异步加载广告脚本（invoke.js 等） */}
      {slot.src && (
        <Script
          id={`ad-src-${slot.containerId}`}
          src={slot.src}
          strategy="afterInteractive"
        />
      )}
    </div>
  );
}
