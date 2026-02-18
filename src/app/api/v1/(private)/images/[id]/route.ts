// app/api/v1/images/[id]/route.ts — DELETE

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { images } from "@/db/schemas/image";
import { and, eq } from "drizzle-orm";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  // ── Auth ───────────────────────────────────────────────────────────────────
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const { id } = await params;

  if (!id?.trim()) {
    return NextResponse.json(
      { error: "Image ID is required." },
      { status: 400 },
    );
  }

  // ── Fetch record (scoped to this user) ─────────────────────────────────────
  const [image] = await db
    .select()
    .from(images)
    .where(and(eq(images.id, id), eq(images.userId, userId)))
    .limit(1);

  if (!image) {
    // Intentionally vague — don't reveal whether the image exists for another user
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }

  // ── Delete from Cloudinary ─────────────────────────────────────────────────
  const publicId =
    (image.metadata as Record<string, string> | null)?.publicId ?? null;

  if (publicId) {
    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    } catch (err) {
      // Log but don't abort — still remove the DB record
      console.error("[images/delete] Cloudinary destroy failed:", err);
    }
  }

  // ── Delete from DB ─────────────────────────────────────────────────────────
  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, userId)));

  return NextResponse.json({ success: true, id }, { status: 200 });
}
