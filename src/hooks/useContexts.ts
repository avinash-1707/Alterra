// src/hooks/useContexts.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type {
  GetContextsParams,
  PaginatedContextsResponse,
  SingleContextResponse,
  DeleteContextResponse,
} from "@/types/api";
import { CreateContextDTO, UpdateContextDTO } from "@/types/context";

// Fetch all contexts (existing)
export function useContexts(params?: GetContextsParams) {
  return useQuery({
    queryKey: ["contexts", params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();

      if (params?.page) searchParams.set("page", params.page.toString());
      if (params?.limit) searchParams.set("limit", params.limit.toString());
      if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);

      const response = await axios.get<PaginatedContextsResponse>(
        `/api/v1/contexts?${searchParams}`,
      );

      return response.data;
    },
  });
}

// Fetch single context
export function useContext(id: string | null) {
  return useQuery({
    queryKey: ["contexts", id],
    queryFn: async () => {
      if (!id) return null;

      const response = await axios.get<SingleContextResponse>(
        `/api/v1/contexts/${id}`,
      );

      return response.data.data;
    },
    enabled: !!id,
  });
}

// Create context
export function useCreateContext() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newContext: CreateContextDTO) => {
      const response = await axios.post<SingleContextResponse>(
        "/api/v1/contexts",
        newContext,
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contexts"] });
    },
  });
}

// Update context
export function useUpdateContext() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateContextDTO;
    }) => {
      const response = await axios.patch<SingleContextResponse>(
        `/api/v1/contexts/${id}`,
        data,
      );
      return response.data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["contexts"] });
      queryClient.invalidateQueries({ queryKey: ["contexts", variables.id] });
    },
  });
}

// Delete context
export function useDeleteContext() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete<DeleteContextResponse>(
        `/api/v1/contexts/${id}`,
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contexts"] });
    },
  });
}
