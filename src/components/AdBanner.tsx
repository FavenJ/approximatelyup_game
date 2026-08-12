"use client";

import Script from "next/script";
import { adsterra } from "@/config/ads";

type AdSlot = {
  enabled: boolean;
  containerId: string;
  src: string;
  inlineScript: string;
};

/**
 * Adsterra 广告位组件。
 *
 * 同时支持两种 Adsterra 代码形态：
 *  - src 模式：Adsterra 给的是 <script async src="https://cdn.adsterra.com/.../xxx.js">
 *    （Native Banner / 新版异步 Banner 常用）
 *  - inlineScript 模式：Adsterra 给的是一段内联 JS，例如
 *    (function(d,z,s){ s.src='https://'+d+'/400/'+z; ... })('cdn.adsterra.com', 1234567, ...)
 *    （经典 Banner "Direct" 代码常用）
 *
 * 只填其中一种即可；未启用（enabled=false）或两项都为空时，组件不渲染任何内容。
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
      {/* Adsterra 会把广告注入到这个容器里 */}
      <div id={slot.containerId} className="w-full flex justify-center" />
      {slot.src ? (
        <Script
          id={`ad-${slot.containerId}`}
          src={slot.src}
          strategy="afterInteractive"
        />
      ) : (
        <Script
          id={`ad-${slot.containerId}`}
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: slot.inlineScript }}
        />
      )}
    </div>
  );
}
