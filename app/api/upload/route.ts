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

    // Create a Telegram-like download link (mock implementation)
    // In production, you would integrate with actual Telegram Bot API
    const encodedTitle = encodeURIComponent(title.trim());
    const encodedUrl = encodeURIComponent(videoUrl);
    
    // Generate a mock Telegram-style link
    // This could be replaced with actual Telegram Bot API integration
    const telegramLink = `https://t.me/share/url?url=${encodedUrl}&text=Watch%20${encodedTitle}%20-%%20Download%20Now`;

    // Return success response with Telegram link
    return NextResponse.json(
      {
        success: true,
        telegramLink,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API Upload Error]:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
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
