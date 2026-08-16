/**
 * Adsterra 广告配置（仅读取 NEXT_PUBLIC_* 环境变量，可在客户端安全使用）。
 *
 * 在 .env.local 中按需填写，未填写 / 未启用时广告位自动不渲染。
 *
 * 变量说明：
 *   _ENABLED    : "true" 才显示该广告位
 *   _CONTAINER  : Adsterra 代码里的容器 div 的 id（如 container-1234567）
 *   _SRC        : 异步脚本地址（Native Banner / 异步 Banner 用）
 *   _SCRIPT     : 内联 JS 代码（经典 Banner "Direct" 代码用）
 *   _SCRIPT_ONLY : "true" 时只加载脚本、不渲染可见容器（Popunder / Social Bar / Smartlink）
 *
 * 注意：同一广告位只需填 _SRC 或 _SCRIPT 之一，二者都填时优先用 _SRC。
 */

type AdSlot = {
  enabled: boolean;
  containerId: string;
  src: string;
  inlineScript: string;
  /** true = 仅加载脚本、不渲染可见容器（Popunder / Social Bar / Smartlink 等） */
  scriptOnly: boolean;
};

function readSlot(prefix: string): AdSlot {
  const k = `NEXT_PUBLIC_ADSTERRA_${prefix}`;
  return {
    enabled: process.env[`${k}_ENABLED`] === "true",
    containerId: process.env[`${k}_CONTAINER`] ?? "",
    src: process.env[`${k}_SRC`] ?? "",
    inlineScript: process.env[`${k}_SCRIPT`] ?? "",
    scriptOnly: process.env[`${k}_SCRIPT_ONLY`] === "true",
  };
}

export const adsterra = {
  /** 顶部 Banner - 桌面端 728x90 横幅 */
  banner: readSlot("BANNER"),
  /** 顶部 Banner - 移动端 320x50 横幅 */
  bannerMobile: readSlot("BANNER_MOBILE"),
  /** 底部 Native Banner（原生信息流广告） */
  native: readSlot("NATIVE"),
  /** Popunder 弹窗广告（脚本型，无可见容器） */
  popunder: readSlot("POPUNDER"),
  /** Smartlink 智能链接 */
  smartlink: readSlot("SMARTLINK"),
  /** Social Bar 社交浮动栏 */
  socialBar: readSlot("SOCIAL_BAR"),
};
