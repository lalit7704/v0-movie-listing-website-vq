export const TELEGRAM_BOT_USERNAME = "onemoviebylalit_bot";
const CHANNEL_POST_PATTERN = /^https:\/\/t\.me\/onemoviedownloa\/(\d+)\/?$/;

export function getBotDeepLink(parameter: string) {
  return `https://t.me/${TELEGRAM_BOT_USERNAME}?start=${encodeURIComponent(parameter)}`;
}

export function resolveDownloadUrl(downloadUrl: string) {
  const normalizedUrl = downloadUrl?.trim();

  if (!normalizedUrl) {
    return getBotDeepLink("unavailable");
  }

  const match = normalizedUrl.match(CHANNEL_POST_PATTERN);

  if (match) {
    return getBotDeepLink(`m_${match[1]}`);
  }

  if (normalizedUrl.startsWith("http://") || normalizedUrl.startsWith("https://")) {
    return normalizedUrl;
  }

  return getBotDeepLink("unavailable");
}
