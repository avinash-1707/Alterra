import { useQuery } from "@tanstack/react-query";
import type { GetContextsParams, PaginatedContextsResponse } from "@/types/api";

export function useContexts(params?: GetContextsParams) {
  return useQuery({
    queryKey: ["contexts", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();

      if (params?.page) searchParams.set("page", params.page.toString());
      if (params?.limit) searchParams.set("limit", params.limit.toString());
      if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
      if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);
      if (params?.search) searchParams.set("search", params.search);
      if (params?.tags) searchParams.set("tags", params.tags);

      const response = await fetch(`/api/contexts?${searchParams}`);

      if (!response.ok) {
        throw new Error("Failed to fetch contexts");
      }

      return response.json() as Promise<PaginatedContextsResponse>;
    },
  });
}
