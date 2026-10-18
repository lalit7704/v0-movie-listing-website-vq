export const TELEGRAM_BOT_USERNAME = "onemoviebylalit_bot";
const PUBLIC_CHANNEL_POST_PATTERN =
  /^https?:\/\/t\.me\/onemoviedownloa\/(\d+)\/?(?:[?#].*)?$/i;
const PRIVATE_CHANNEL_POST_PATTERN =
  /^https?:\/\/t\.me\/c\/3845134502\/(\d+)\/?(?:[?#].*)?$/i;

export function getBotDeepLink(parameter: string) {
  return `https://t.me/${TELEGRAM_BOT_USERNAME}?start=${encodeURIComponent(parameter)}`;
}

export function getTelegramMessageId(downloadUrl: string) {
  return (
    downloadUrl.match(PUBLIC_CHANNEL_POST_PATTERN)?.[1] ||
    downloadUrl.match(PRIVATE_CHANNEL_POST_PATTERN)?.[1]
  );
}

export function resolveDownloadUrl(downloadUrl: string) {
  const messageId = getTelegramMessageId(downloadUrl);

  return messageId
    ? getBotDeepLink(`m_${messageId}`)
    : getBotDeepLink("unavailable");
}

/** Channel posts of a series' episodes, ascending and without repeats, as copyMessages needs them. */
export function getEpisodeMessageIds(episodes: { downloadUrl: string }[] = []) {
  const ids = episodes
    .map((episode) => Number(getTelegramMessageId(episode.downloadUrl)))
    .filter((id) => id > 0);
  return [...new Set(ids)].sort((a, b) => a - b);
}

/** The bot sends every episode of the series with this id in one go. */
export function getSeriesDownloadUrl(videoId: string) {
  return getBotDeepLink(`s_${videoId}`);
}
