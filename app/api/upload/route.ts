import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, videoUrl } = body;

    // ✅ Validation
    if (!title || !videoUrl) {
      return NextResponse.json(
        { success: false, error: "Title and Video URL required" },
        { status: 400 }
      );
    }

    try {
      new URL(videoUrl);
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid video URL" },
        { status: 400 }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const channel = process.env.TELEGRAM_CHANNEL_ID;

    if (!token || !channel) {
      return NextResponse.json(
        { success: false, error: "Telegram is not configured on the server" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendVideo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: channel,
          video: videoUrl,
          caption: title,
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok || !data.ok || !data.result?.message_id) {
      return NextResponse.json(
        {
          success: false,
          error: data.description || "Telegram could not send this video",
        },
        { status: response.status >= 400 ? response.status : 502 }
      );
    }

    const messageId = data.result.message_id;
    const configuredChannel = channel.trim();
    const telegramLink = configuredChannel.startsWith("@")
      ? `https://t.me/${configuredChannel.slice(1)}/${messageId}`
      : configuredChannel.startsWith("-100")
        ? `https://t.me/c/${configuredChannel.slice(4)}/${messageId}`
        : null;

    if (!telegramLink) {
      return NextResponse.json(
        {
          success: false,
          error: "Telegram upload succeeded, but TELEGRAM_CHANNEL_ID must be a public @username or -100... channel ID to build the download link",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      telegramLink,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// ❌ Optional: handle GET
export async function GET() {
  return NextResponse.json(
    { success: false, error: "Use POST method" },
    { status: 405 }
  );
}
