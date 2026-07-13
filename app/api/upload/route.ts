import { NextRequest, NextResponse } from "next/server";
import { TELEGRAM_CHANNEL_INVITE_URL } from "@/lib/telegram";

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

    // 🔥 TOKEN (isko .env me rakhna better hai)
    const TOKEN = "8564702752:AAGQWoG0-2cDc49AzhvFb-lQvl5KlEK9Iq0";
    const CHANNEL = "@onemoviedownloa";

    const response = await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendVideo`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHANNEL,
          video: videoUrl,
          caption: title,
        }),
      }
    );

    const data = await response.json();

    if (!data.ok) {
      return NextResponse.json(
        { success: false, error: data.description },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      telegramLink: TELEGRAM_CHANNEL_INVITE_URL,
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
