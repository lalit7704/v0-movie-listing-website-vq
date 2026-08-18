import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Supabase environment variables are missing");
}

const supabase = createClient(
  supabaseUrl,
  supabaseServiceRoleKey
);

// Allow browser requests from other websites
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "x-api-key, Content-Type",
    },
  });
}

export async function GET(request: NextRequest) {
  try {
    // -----------------------------
    // 1. Get API key
    // -----------------------------

    const apiKey = request.headers.get("x-api-key");

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error: "API key is required",
        },
        {
          status: 401,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // -----------------------------
    // 2. Verify API key
    // -----------------------------

    const { data: keyData, error: keyError } = await supabase
      .from("api_keys")
      .select("id, name, active")
      .eq("api_key", apiKey)
      .eq("active", true)
      .maybeSingle();

    if (keyError) {
      console.error("API key verification error:", keyError);

      return NextResponse.json(
        {
          success: false,
          error: "API authentication failed",
        },
        {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    if (!keyData) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid API key",
        },
        {
          status: 401,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // -----------------------------
    // 3. Read URL parameters
    // -----------------------------

    const { searchParams } = new URL(request.url);

    const page = Math.max(
      Number(searchParams.get("page")) || 1,
      1
    );

    const limit = Math.min(
      Math.max(Number(searchParams.get("limit")) || 20, 1),
      100
    );

    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // -----------------------------
    // 4. Query movies
    // -----------------------------

    let query = supabase
      .from("movies")
      .select(
        `
        id,
        title,
        slug,
        video_url,
        poster,
        description,
        category,
        year,
        duration,
        rating,
        genre,
        language,
        quality,
        seo_description,
        featured,
        director,
        cast_members,
        keywords
        `,
        { count: "exact" }
      );

    // Category filter
    if (category) {
      query = query.eq("category", category);
    }

    // Search by title
    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    // Pagination
    query = query
      .order("title", { ascending: true })
      .range(from, to);

    const {
      data: movies,
      error: moviesError,
      count,
    } = await query;

    if (moviesError) {
      console.error("Movies query error:", moviesError);

      return NextResponse.json(
        {
          success: false,
          error: "Failed to fetch movies",
        },
        {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // -----------------------------
    // 5. Send response
    // -----------------------------

    return NextResponse.json(
      {
        success: true,

        api: {
          key_name: keyData.name,
        },

        pagination: {
          page,
          limit,
          total: count || 0,
          total_pages: Math.ceil((count || 0) / limit),
        },

        movies: movies || [],
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers":
            "x-api-key, Content-Type",
          "Cache-Control":
            "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}