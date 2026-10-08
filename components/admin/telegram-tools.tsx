"use client";

import { useState, type FormEvent } from "react";
import { Bot, Link2, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Notice } from "@/components/admin/notice";

interface UploadResponse {
  success: boolean;
  telegramLink?: string;
  error?: string;
}

interface WebhookResponse {
  success: boolean;
  webhookUrl?: string;
  error?: string;
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return (await response.json()) as T;
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Network error" } as T;
  }
}

export function TelegramTools() {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [upload, setUpload] = useState<UploadResponse | null>(null);
  const [isConfiguringWebhook, setIsConfiguringWebhook] = useState(false);
  const [webhook, setWebhook] = useState<WebhookResponse | null>(null);

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsUploading(true);
    setUpload(null);
    const data = await postJson<UploadResponse>("/api/upload", { title, videoUrl });
    setUpload(data);
    if (data.success) {
      setTitle("");
      setVideoUrl("");
    }
    setIsUploading(false);
  }

  async function configureWebhook() {
    setIsConfiguringWebhook(true);
    setWebhook(null);
    setWebhook(await postJson<WebhookResponse>("/api/telegram/setup", {}));
    setIsConfiguringWebhook(false);
  }

  return (
    <div className="space-y-5">
      <form onSubmit={handleUpload} className="rounded-lg border border-border bg-card p-4 sm:p-5">
        <h2 className="mb-1 text-base font-semibold text-foreground">Upload video to Telegram</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Sends an MP4 link to the download channel and gives back the post link for the Download URL field.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="telegram-title">Movie title</Label>
            <Input
              id="telegram-title"
              required
              value={title}
              disabled={isUploading}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="telegram-video">Video URL (MP4 link)</Label>
            <Input
              id="telegram-video"
              type="url"
              required
              placeholder="https://example.com/movie.mp4"
              value={videoUrl}
              disabled={isUploading}
              onChange={(event) => setVideoUrl(event.target.value)}
            />
          </div>
        </div>
        <Button type="submit" className="mt-4 gap-2" disabled={isUploading}>
          {isUploading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Upload className="h-4 w-4" aria-hidden="true" />}
          {isUploading ? "Uploading..." : "Upload to Telegram"}
        </Button>

        {upload?.success && upload.telegramLink && (
          <div className="mt-4">
            <Notice tone="success">
              <p className="mb-2 font-semibold">Uploaded. Telegram link:</p>
              <p className="flex items-center gap-2 break-all font-mono text-xs">
                <Link2 className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <a href={upload.telegramLink} target="_blank" rel="noopener noreferrer" className="underline">
                  {upload.telegramLink}
                </a>
              </p>
            </Notice>
          </div>
        )}
        {upload?.success === false && (
          <div className="mt-4">
            <Notice tone="error">{upload.error || "Upload failed"}</Notice>
          </div>
        )}
      </form>

      <section className="rounded-lg border border-border bg-card p-4 sm:p-5">
        <h2 className="mb-1 flex items-center gap-2 text-base font-semibold text-foreground">
          <Bot className="h-5 w-5 text-primary" aria-hidden="true" />
          Telegram bot hosting
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Connects the bot to this live site so downloads work without your computer.
        </p>
        <Button
          type="button"
          variant="outline"
          className="gap-2"
          disabled={isConfiguringWebhook}
          onClick={() => void configureWebhook()}
        >
          {isConfiguringWebhook ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Bot className="h-4 w-4" aria-hidden="true" />}
          {isConfiguringWebhook ? "Connecting..." : "Enable 24/7 Bot Webhook"}
        </Button>
        {webhook && (
          <div className="mt-4">
            <Notice tone={webhook.success ? "success" : "error"}>
              {webhook.success
                ? `Bot webhook connected to ${webhook.webhookUrl}`
                : webhook.error || "Webhook setup failed"}
            </Notice>
          </div>
        )}
      </section>
    </div>
  );
}
