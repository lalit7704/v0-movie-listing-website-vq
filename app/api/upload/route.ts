import { NextRequest, NextResponse } from "next/server";

interface UploadRequest {
  title: string;
  videoUrl: string;
}

interface UploadResponse {
  success: boolean;
  telegramLink?: string;
  error?: string;
}

/**
 * POST /api/upload
 * 
 * Handles movie upload requests and generates Telegram links
 * 
 * Request body:
 * - title: string - Movie title
 * - videoUrl: string - MP4 video URL
 * 
 * Response:
 * - success: boolean
 * - telegramLink?: string - Generated Telegram link (if successful)
 * - error?: string - Error message (if failed)
 */
export async function POST(request: NextRequest): Promise<NextResponse<UploadResponse>> {
  try {
    // Parse request body
    const body: UploadRequest = await request.json();
    const { title, videoUrl } = body;

    // Validate required fields
    if (!title || !videoUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "Movie title and video URL are required",
        },
        { status: 400 }
      );
    }

    // Validate title format
    if (typeof title !== "string" || title.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Movie title must be a non-empty string",
        },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(videoUrl);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid video URL format",
        },
        { status: 400 }
      );
    }
    import { NextRequest, NextResponse } from "next/server";

    export async function POST(request) {
      try {
        const body = await request.json();
        const { title, videoUrl } = body;

        if (!title || !videoUrl) {
          return NextResponse.json(
            { success: false, error: "Title and Video URL required" },
            { status: 400 }
          );
        }

        // 🔥 YAHAN TOKEN PASTE KARO (NEW TOKEN)
        const TOKEN = "YAHAN_APNA_NEW_TOKEN_DALO";
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
            {
              success: false,
              error: data.description || "Telegram upload failed",
            },
            { status: 500 }
          );
        }

        const messageId = data.result.message_id;
        const telegramLink = `https://t.me/onemoviedownloa/${messageId}`;

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
    /**
     * Handle other HTTP methods
     */
    export async function GET(): Promise<NextResponse> {
      return NextResponse.json(
        {
          success: false,
          error: "Method GET not allowed. Use POST to upload movies.",
        },
        { status: 405 }
      );
    }
