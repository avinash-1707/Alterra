export interface GetContextsParams {
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "name" | "usageCount";
  sortOrder?: "asc" | "desc";
  search?: string;
  tags?: string;
}

export interface Context {
  id: string;
  userId: string;
  name: string;
  structuredData: unknown;
  aiPromptBlock: string;
  tags: unknown;
  usageCount: number;
  createdAt: string;
}

export interface PaginatedContextsResponse {
  success: true;
  data: Context[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
