// app/api/v1/images/explore/route.ts — GET (public, all images with creator info)

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { images } from "@/db/schemas/image";
import { and, eq, lt, desc, ilike, SQL } from "drizzle-orm";
import { user } from "@/db/schemas/auth-schema";

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

export async function GET(req: NextRequest) {
  // ── Query params ──────────────────────────────────────────────────────────
  const { searchParams } = req.nextUrl;

  const limitRaw = parseInt(
    searchParams.get("limit") ?? String(DEFAULT_LIMIT),
    10,
  );
  const limit = Math.min(
    isNaN(limitRaw) || limitRaw < 1 ? DEFAULT_LIMIT : limitRaw,
    MAX_LIMIT,
  );

  const cursor = searchParams.get("cursor") ?? null;
  const search = searchParams.get("search")?.trim() ?? null;

  // ── Build filters ─────────────────────────────────────────────────────────
  const filters: SQL[] = [eq(images.status, "COMPLETED")];

  if (cursor) {
    filters.push(lt(images.createdAt, new Date(cursor)));
  }

  if (search) {
    filters.push(ilike(images.prompt, `%${search}%`));
  }

  // ── Query ─────────────────────────────────────────────────────────────────
  const rows = await db
    .select({
      id: images.id,
      originalUrl: images.originalUrl,
      transformedUrl: images.transformedUrl,
      prompt: images.prompt,
      modelUsed: images.modelUsed,
      processingTimeMs: images.processingTimeMs,
      metadata: images.metadata,
      createdAt: images.createdAt,
      creator: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
    })
    .from(images)
    .innerJoin(user, eq(images.userId, user.id))
    .where(and(...filters))
    .orderBy(desc(images.createdAt))
    .limit(limit + 1);

  const hasNextPage = rows.length > limit;
  const items = hasNextPage ? rows.slice(0, limit) : rows;
  const nextCursor =
    hasNextPage && items.length > 0
      ? items[items.length - 1].createdAt.toISOString()
      : null;

  return NextResponse.json({
    items,
    pagination: {
      limit,
      hasNextPage,
      nextCursor,
    },
  });
}
