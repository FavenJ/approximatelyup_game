"use client";

import { useEffect, useState } from "react";
import { AdBannerSlot, type AdSlot } from "./AdBanner";

/**
 * 响应式广告位：根据视口宽度只挂载「桌面」或「移动」其中一个广告位，
 * 避免两套脚本在移动端 / 桌面端同时触发（省流量，也避免重复计费 / 无效展示）。
 *
 * 用法：
 *   <ResponsiveAdBanner desktop={adsterra.banner} mobile={adsterra.bannerMobile} />
 */
export function ResponsiveAdBanner({
  desktop,
  mobile,
  label = "Advertisement",
}: {
  desktop?: AdSlot;
  mobile?: AdSlot;
  label?: string;
}) {
  const [viewport, setViewport] = useState<"desktop" | "mobile" | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setViewport(mq.matches ? "mobile" : "desktop");
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // SSR / 首帧不渲染，等客户端确定视口后再挂载，避免水合不一致与重复触发
  if (viewport === null) return null;

  const slot = viewport === "mobile" ? mobile : desktop;
  if (!slot) return null;
  return <AdBannerSlot slot={slot} label={label} />;
}
