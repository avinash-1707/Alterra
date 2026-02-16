// src/app/api/contexts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { contexts } from "@/db";
import { authClient } from "@/lib/server-auth-client";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// --- SCHEMAS ---

const updateContextSchema = z.object({
  name: z.string().min(1).optional(),
  structuredData: z.record(z.string(), z.unknown()).optional(),
  aiPromptBlock: z.string().min(1).optional(),
  tags: z.array(z.string()).optional(),
  model: z.string().optional(),
  aspectRatio: z.string().optional(),
});

type UpdateContextInput = z.infer<typeof updateContextSchema>;

// --- TYPES ---

interface ContextResponse {
  id: string;
  userId: string;
  name: string;
  structuredData: Record<string, unknown>;
  aiPromptBlock: string;
  tags: string[] | null;
  model: string | null;
  aspectRatio: string | null;
  usageCount: number;
  createdAt: string;
}

interface SuccessResponse<T = ContextResponse> {
  success: true;
  data: T;
}

interface DeleteSuccessResponse {
  success: true;
  message: string;
}

interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code: string;
    details?: unknown;
  };
}

// --- HELPER FUNCTIONS ---

/**
 * Formats context data for API response
 */
function formatContextResponse(
  context: typeof contexts.$inferSelect,
): ContextResponse {
  return {
    id: context.id,
    userId: context.userId,
    name: context.name,
    structuredData: context.structuredData as Record<string, unknown>,
    aiPromptBlock: context.aiPromptBlock,
    //@ts-ignore
    tags: context.tags,
    model: context.model,
    aspectRatio: context.aspectRatio,
    usageCount: context.usageCount,
    createdAt: context.createdAt.toISOString(),
  };
}

/**
 * Verifies user owns the context
 */
async function verifyContextOwnership(contextId: string, userId: string) {
  const [context] = await db
    .select()
    .from(contexts)
    .where(and(eq(contexts.id, contextId), eq(contexts.userId, userId)))
    .limit(1);

  return context;
}

// --- GET HANDLER (Get single context) ---

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  try {
    const session = await authClient.getSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Unauthorized - Please sign in to access contexts",
            code: "UNAUTHORIZED",
          },
        },
        { status: 401 },
      );
    }

    const contextId = params.id;
    const userId = session.user.id;

    const context = await verifyContextOwnership(contextId, userId);

    if (!context) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Context not found",
            code: "NOT_FOUND",
          },
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: formatContextResponse(context),
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "private, max-age=0, must-revalidate",
        },
      },
    );
  } catch (error) {
    console.error("Error fetching context:", error);

    if (error instanceof Error && error.message.includes("database")) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Database error occurred",
            code: "DATABASE_ERROR",
          },
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "An unexpected error occurred",
          code: "INTERNAL_SERVER_ERROR",
        },
      },
      { status: 500 },
    );
  }
}

// --- PATCH HANDLER (Update context) ---

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  try {
    const session = await authClient.getSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Unauthorized - Please sign in to update contexts",
            code: "UNAUTHORIZED",
          },
        },
        { status: 401 },
      );
    }

    const contextId = params.id;
    const userId = session.user.id;

    // Verify ownership
    const existingContext = await verifyContextOwnership(contextId, userId);

    if (!existingContext) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Context not found",
            code: "NOT_FOUND",
          },
        },
        { status: 404 },
      );
    }

    // Parse and validate request body
    let body: UpdateContextInput;

    try {
      const rawBody = await request.json();
      body = updateContextSchema.parse(rawBody);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            error: {
              message: "Invalid request body",
              code: "VALIDATION_ERROR",
            },
          },
          { status: 400 },
        );
      }
      throw error;
    }

    // Check if there's anything to update
    if (Object.keys(body).length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "No fields to update",
            code: "VALIDATION_ERROR",
          },
        },
        { status: 400 },
      );
    }

    // Update context
    const [updated] = await db
      .update(contexts)
      .set({
        ...body,
        // Ensure structuredData is properly typed
        ...(body.structuredData && { structuredData: body.structuredData }),
      })
      .where(and(eq(contexts.id, contextId), eq(contexts.userId, userId)))
      .returning();

    if (!updated) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Failed to update context",
            code: "UPDATE_FAILED",
          },
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: formatContextResponse(updated),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating context:", error);

    if (error instanceof Error && error.message.includes("database")) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Database error occurred",
            code: "DATABASE_ERROR",
          },
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "An unexpected error occurred",
          code: "INTERNAL_SERVER_ERROR",
        },
      },
      { status: 500 },
    );
  }
}

// --- DELETE HANDLER (Delete context) ---

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<DeleteSuccessResponse | ErrorResponse>> {
  try {
    const session = await authClient.getSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Unauthorized - Please sign in to delete contexts",
            code: "UNAUTHORIZED",
          },
        },
        { status: 401 },
      );
    }

    const contextId = params.id;
    const userId = session.user.id;

    // Verify ownership
    const existingContext = await verifyContextOwnership(contextId, userId);

    if (!existingContext) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Context not found",
            code: "NOT_FOUND",
          },
        },
        { status: 404 },
      );
    }

    // Delete context
    await db
      .delete(contexts)
      .where(and(eq(contexts.id, contextId), eq(contexts.userId, userId)));

    return NextResponse.json(
      {
        success: true,
        message: "Context deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting context:", error);

    if (error instanceof Error && error.message.includes("database")) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Database error occurred",
            code: "DATABASE_ERROR",
          },
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          message: "An unexpected error occurred",
          code: "INTERNAL_SERVER_ERROR",
        },
      },
      { status: 500 },
    );
  }
}
