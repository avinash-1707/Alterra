import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contexts } from "@/db";
import { authClient } from "@/lib/server-auth-client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // Authenticate user
    const session = await authClient.getSession();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse JSON body with edited/confirmed context data
    const body = await req.json();
    const { name, structuredData, aiPromptBlock, tags } = body;

    // Validate required fields
    if (!name || !structuredData || !aiPromptBlock || !Array.isArray(tags)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate structuredData has all required fields
    const requiredFields = [
      "subject",
      "environment",
      "lighting",
      "colorPalette",
      "camera",
      "composition",
      "mood",
      "style",
      "materials",
      "era",
      "renderType",
    ];

    for (const field of requiredFields) {
      if (!(field in structuredData)) {
        return NextResponse.json(
          { error: `Missing field in structuredData: ${field}` },
          { status: 400 },
        );
      }
    }

    // Validate colorPalette is an array
    if (!Array.isArray(structuredData.colorPalette)) {
      return NextResponse.json(
        { error: "colorPalette must be an array" },
        { status: 400 },
      );
    }

    // Insert into database
    const inserted = await db
      .insert(contexts)
      .values({
        userId: session.user.id,
        name,
        structuredData,
        aiPromptBlock,
        tags,
      })
      .returning();

    return NextResponse.json(inserted[0], { status: 201 });
  } catch (error) {
    console.error("Context save error:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Failed to save context" },
      { status: 500 },
    );
  }
}
