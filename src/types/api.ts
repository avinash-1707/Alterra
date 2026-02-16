import { Context } from "./context";

// src/types/api.ts
export interface GetContextsParams {
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "name" | "usageCount";
  sortOrder?: "asc" | "desc";
  search?: string;
  tags?: string; // comma-separated
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiListSuccessResponse<T> {
  success: true;
  data: T[];
  meta: PaginationMeta;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code: string;
    details?: unknown;
  };
}

export type PaginatedContextsResponse = ApiListSuccessResponse<Context>;
export type SingleContextResponse = ApiSuccessResponse<Context>;
export type DeleteContextResponse = {
  success: true;
  message: string;
};
