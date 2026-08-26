export const TELEGRAM_BOT_USERNAME = "onemoviebylalit_bot";
const PUBLIC_CHANNEL_POST_PATTERN =
  /^https?:\/\/t\.me\/onemoviedownloa\/(\d+)\/?(?:[?#].*)?$/i;
const PRIVATE_CHANNEL_POST_PATTERN =
  /^https?:\/\/t\.me\/c\/3845134502\/(\d+)\/?(?:[?#].*)?$/i;

export function getBotDeepLink(parameter: string) {
  return `https://t.me/${TELEGRAM_BOT_USERNAME}?start=${encodeURIComponent(parameter)}`;
}

function getTelegramMessageId(downloadUrl: string) {
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
