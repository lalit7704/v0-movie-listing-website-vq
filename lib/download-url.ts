const TELEGRAM_BOT_USERNAME = "onemoviebylalit_bot";
const CHANNEL_POST_PATTERN = /^https:\/\/t\.me\/onemoviedownloa\/(\d+)\/?$/;

export function resolveDownloadUrl(downloadUrl: string) {
  const match = downloadUrl.match(CHANNEL_POST_PATTERN);

  return match
    ? `https://t.me/${TELEGRAM_BOT_USERNAME}?start=m_${match[1]}`
    : downloadUrl;
}
