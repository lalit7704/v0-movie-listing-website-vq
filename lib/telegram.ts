export const TELEGRAM_CHANNEL_INVITE_URL = "https://t.me/+8EWeghQ0Zqg2OTk1";

export function resolveDownloadUrl(downloadUrl: string) {
  return downloadUrl.startsWith("https://t.me/onemoviedownloa/")
    ? TELEGRAM_CHANNEL_INVITE_URL
    : downloadUrl;
}
