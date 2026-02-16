// src/app/api/contexts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { eq, desc, asc, sql, and, ilike, or } from "drizzle-orm";
import { z } from "zod";
import { contexts } from "@/db";
import { authClient } from "@/lib/server-auth-client";
import { db } from "@/lib/db";

const queryParamsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  sortBy: z.enum(["createdAt", "name", "usageCount"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  search: z.string().optional(),
  tags: z.string().optional(), // comma-separated tags
});

type QueryParams = z.infer<typeof queryParamsSchema>;

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
  structuredData: unknown;
  aiPromptBlock: string;
  tags: unknown;
  usageCount: number;
  createdAt: string;
}

interface SuccessResponse {
  success: true;
  data: ContextResponse[];
  meta: PaginationMeta;
}

interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code: string;
    details?: unknown;
  };
}

/**
 * Validates and parses query parameters from URL search params
 */
function parseQueryParams(searchParams: URLSearchParams): QueryParams {
  const params = {
    page: searchParams.get("page"),
    limit: searchParams.get("limit"),
    sortBy: searchParams.get("sortBy"),
    sortOrder: searchParams.get("sortOrder"),
    search: searchParams.get("search"),
    tags: searchParams.get("tags"),
  };

  return queryParamsSchema.parse(params);
}

/**
 * Builds the WHERE clause for filtering contexts
 */
function buildWhereClause(userId: string, params: QueryParams) {
  const conditions = [eq(contexts.userId, userId)];

  // Search filter (searches in name and tags)
  if (params.search) {
    const searchTerm = `%${params.search}%`;
    conditions.push(
      or(
        ilike(contexts.name, searchTerm),
        sql`${contexts.tags}::text ILIKE ${searchTerm}`,
      )!,
    );
  }

  // Tags filter (checks if any of the provided tags exist in the tags array)
  if (params.tags) {
    const tagList = params.tags.split(",").map((tag) => tag.trim());
    conditions.push(
      sql`${contexts.tags} ?| array[${sql.join(
        tagList.map((tag) => sql`${tag}`),
        sql`, `,
      )}]`,
    );
  }

  return and(...conditions);
}

/**
 * Builds the ORDER BY clause for sorting
 */
function buildOrderByClause(params: QueryParams) {
  const column = contexts[params.sortBy];
  return params.sortOrder === "asc" ? asc(column) : desc(column);
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
    structuredData: context.structuredData,
    aiPromptBlock: context.aiPromptBlock,
    tags: context.tags,
    usageCount: context.usageCount,
    createdAt: context.createdAt.toISOString(),
  };
}

export async function GET(
  request: NextRequest,
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

    const whereClause = buildWhereClause(userId, params);
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
