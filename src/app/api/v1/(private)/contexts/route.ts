// src/app/api/contexts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { eq, desc, asc, sql } from "drizzle-orm";
import { z } from "zod";
import { contexts } from "@/db";
import { authClient } from "@/lib/server-auth-client";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// --- SCHEMAS ---

const queryParamsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

const createContextSchema = z.object({
  name: z.string().min(1),
  structuredData: z.record(z.string(), z.unknown()).optional(),
  aiPromptBlock: z.string().min(1),
  tags: z.array(z.string()).optional(),
  model: z.string().optional(),
  aspectRatio: z.string().optional(),
});

type QueryParams = z.infer<typeof queryParamsSchema>;
type CreateContextInput = z.infer<typeof createContextSchema>;

// --- TYPES ---

interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

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

interface ListSuccessResponse {
  success: true;
  data: ContextResponse[];
  meta: PaginationMeta;
}

interface CreateSuccessResponse {
  success: true;
  data: ContextResponse;
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
 * Validates and parses query parameters from URL search params
 */
function parseQueryParams(searchParams: URLSearchParams): QueryParams {
  const params = {
    page: searchParams.get("page"),
    limit: searchParams.get("limit"),
    sortOrder: searchParams.get("sortOrder"),
  };

  return queryParamsSchema.parse(params);
}

/**
 * Builds the ORDER BY clause for sorting by createdAt
 */
function buildOrderByClause(params: QueryParams) {
  return params.sortOrder === "asc"
    ? asc(contexts.createdAt)
    : desc(contexts.createdAt);
}

/**
 * Calculates pagination metadata
 */
function calculatePaginationMeta(
  totalCount: number,
  currentPage: number,
  pageSize: number,
): PaginationMeta {
  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    currentPage,
    totalPages,
    totalCount,
    pageSize,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}

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

// --- GET HANDLER (List contexts) ---

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ListSuccessResponse | ErrorResponse>> {
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

    const userId = session.user.id;
    let params: QueryParams;

    try {
      params = parseQueryParams(request.nextUrl.searchParams);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            success: false,
            error: {
              message: "Invalid query parameters",
              code: "VALIDATION_ERROR",
            },
          },
          { status: 400 },
        );
      }
      throw error;
    }

    const whereClause = eq(contexts.userId, userId);
    const orderByClause = buildOrderByClause(params);

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(contexts)
      .where(whereClause);

    const totalCount = count ?? 0;

    // Early return if no results
    if (totalCount === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        meta: calculatePaginationMeta(0, params.page, params.limit),
      });
    }

    const offset = (params.page - 1) * params.limit;

    const userContexts = await db
      .select()
      .from(contexts)
      .where(whereClause)
      .orderBy(orderByClause)
      .limit(params.limit)
      .offset(offset);

    const formattedContexts = userContexts.map(formatContextResponse);
    const paginationMeta = calculatePaginationMeta(
      totalCount,
      params.page,
      params.limit,
    );

    return NextResponse.json(
      {
        success: true,
        data: formattedContexts,
        meta: paginationMeta,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "private, max-age=0, must-revalidate",
        },
      },
    );
  } catch (error) {
    console.error("Error fetching contexts:", error);

    // Database errors
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

    // Generic error fallback
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

// --- POST HANDLER (Create context) ---

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateSuccessResponse | ErrorResponse>> {
  try {
    // Authenticate user
    const session = await authClient.getSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Unauthorized - Please sign in to create contexts",
            code: "UNAUTHORIZED",
          },
        },
        { status: 401 },
      );
    }

    // Parse and validate request body
    let body: CreateContextInput;

    try {
      const rawBody = await request.json();
      body = createContextSchema.parse(rawBody);
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

    // Insert into database
    const [inserted] = await db
      .insert(contexts)
      .values({
        userId: session.user.id,
        name: body.name,
        structuredData: body.structuredData,
        aiPromptBlock: body.aiPromptBlock,
        tags: body.tags ?? null,
        model: body.model ?? null,
        aspectRatio: body.aspectRatio ?? null,
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        data: formatContextResponse(inserted),
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating context:", error);

    // Database errors
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

    // Generic error fallback
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
