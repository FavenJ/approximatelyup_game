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
 * 支持两种 Adsterra 代码形态（按后台给的代码填对应环境变量）：
 *
 *  1) Native Banner（仅异步 src）：
 *     <script async src="https://xxx.effectivecpmnetwork.com/.../invoke.js"></script>
 *     → 填 _SRC，_SCRIPT 留空。用 next/script 加载，广告注入到容器 div。
 *
 *  2) 经典 Banner 横幅（atOptions + invoke.js 双脚本）：
 *     <script>atOptions = { key:'...', format:'iframe', height:90, width:728 };</script>
 *     <script src="https://www.highperformanceformat.com/.../invoke.js"></script>
 *     → 填 _SCRIPT 和 _SRC。用原位 <script> 标签渲染（不用 next/script），
 *       确保 invoke.js 在容器旁边创建 iframe 广告，不会跑到页面底部。
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

  // ── 模式 2：atOptions + invoke.js（经典 Banner 横幅）───────────────
  // 必须用原位 <script> 标签，不能走 next/script（后者会把脚本搬到 </body> 末尾，
  // 导致 invoke.js 创建的 iframe 跑到页面底部而不是容器位置）
  if (slot.inlineScript && slot.src) {
    return (
      <div
        className={`adsterra-slot my-8 flex flex-col items-center gap-2 ${className ?? ""}`}
      >
        <span className="text-[11px] uppercase tracking-widest text-white/40">
          {label}
        </span>
        {/* 容器：invoke.js 可能会往这里或紧邻的脚本后面插入广告 iframe */}
        <div
          id={slot.containerId}
          className="w-full flex justify-center overflow-hidden"
          /* eslint-disable-next-line react/no-danger */
          dangerouslySetInnerHTML={{
            __html: [
              `<script>${slot.inlineScript}</script>`,
              `<script src="${slot.src}"><\/script>`,
            ].join("\n"),
          }}
        />
      </div>
    );
  }

  // ── 模式 1：仅异步 src（Native Banner 等）──────────────────────
  return (
    <div
      className={`adsterra-slot my-8 flex flex-col items-center gap-2 ${className ?? ""}`}
    >
      <span className="text-[11px] uppercase tracking-widest text-white/40">
        {label}
      </span>
      <div id={slot.containerId} className="w-full flex justify-center overflow-hidden" />
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
