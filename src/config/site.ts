/**
 * Single source of truth for brand / official links.
 * All values come from the research doc (Approximately_Up_Wiki_开发信息.md).
 * null = 官方信息待确认 (not yet confirmed — never fabricate).
 */
export const site = {
  gameName: "Approximately Up",
  developer: "Approximately Games",
  steamUrl: "https://store.steampowered.com/app/3904850/",
  steamCommunityUrl: "https://store.steampowered.com/app/3904850/",
  discordUrl: null as string | null, // 暂无确认公开官方 Discord
  youtubeUrl: null as string | null, // 暂无确认公开 YouTube 频道
  redditUrl: null as string | null, // 暂无确认官方 subreddit
  release: "August 2026",
  domain: "approximatelyup.wiki",
};
