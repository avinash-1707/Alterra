"use client";

import { useState } from "react";
import axios from "axios";
import GlassCard from "@/components/common/GlassCard";
import ContextUpload from "../context-manager/ContextUpload";
import ExtractedContext from "../context-manager/ExtractedContext";
import SavedContexts from "../context-manager/SavedContexts";
import ContextModal from "../context-manager/ContextModal";
import { ExtractedContextInterface } from "@/utils/ai/extractImageContext";
import { Context, CreateContextDTO, UpdateContextDTO } from "@/types/context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContexts } from "@/hooks/useContexts";

export default function ContextManager() {
  const queryClient = useQueryClient();

  const [extractedContext, setExtractedContext] =
    useState<ExtractedContextInterface | null>(null);
  const [selectedContext, setSelectedContext] = useState<Context | null>(null);

  // Pagination state
  const [page, setPage] = useState(1);

  // Fetch contexts with pagination
  const {
    data: contextsData,
    isLoading,
    isError,
    error,
  } = useContexts({
    page,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const savedContexts = contextsData?.data ?? [];
  const meta = contextsData?.meta;

  // Create context mutation
  const createContextMutation = useMutation({
    mutationFn: async (newContext: CreateContextDTO) => {
      const response = await axios.post("/api/v1/contexts", newContext);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch contexts
      queryClient.invalidateQueries({ queryKey: ["contexts"] });
      setExtractedContext(null);
    },
    onError: (error) => {
      console.error("Failed to create context:", error);
      throw new Error("Failed to save context");
    },
  });

  // Update context mutation
  const updateContextMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateContextDTO;
    }) => {
      const response = await axios.patch(`/api/v1/contexts/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contexts"] });
    },
    onError: (error) => {
      console.error("Failed to update context:", error);
      throw new Error("Failed to update context");
    },
  });

  // Delete context mutation
  const deleteContextMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`/api/v1/contexts/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contexts"] });
    },
    onError: (error) => {
      console.error("Failed to delete context:", error);
      throw new Error("Failed to delete context");
    },
  });

  // Extract context from image
  const handleExtractContext = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post("/api/v1/contexts/extract", formData);
      const data = response.data as ExtractedContextInterface;

      setExtractedContext(data);
    } catch (error) {
      console.error("Failed to extract context:", error);
      throw new Error("Extraction failed");
    }
  };

  // Save extracted context
  const handleSaveContext = async (contextData: CreateContextDTO) => {
    try {
      await createContextMutation.mutateAsync(contextData);
    } catch (error) {
      console.error("Failed to save context:", error);
    }
  };

  // Update existing context
  const handleUpdateContext = async (id: string, updates: UpdateContextDTO) => {
    try {
      await updateContextMutation.mutateAsync({ id, data: updates });

      // Update selected context if it's the one being updated
      if (selectedContext?.id === id) {
        const response = await axios.get(`/api/v1/contexts/${id}`);
        setSelectedContext(response.data.data);
      }
    } catch (error) {
      console.error("Failed to update context:", error);
    }
  };

  // Delete context
  const handleDeleteContext = async (id: string) => {
    try {
      await deleteContextMutation.mutateAsync(id);

      // Clear selected context if it was deleted
      if (selectedContext?.id === id) {
        setSelectedContext(null);
      }
    } catch (error) {
      console.error("Failed to delete context:", error);
    }
  };

  // Select context and fetch full details
  const handleContextClick = async (context: Context) => {
    try {
      // Fetch full context details
      const response = await axios.get(`/api/v1/contexts/${context.id}`);
      setSelectedContext(response.data.data);
    } catch (error) {
      console.error("Failed to fetch context details:", error);
      // Fallback to the context from list
      setSelectedContext(context);
    }
  };
  // Pagination handlers
  const handleNextPage = () => {
    if (meta?.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (meta?.hasPreviousPage) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <GlassCard>
        <div className="p-8">
          <ContextUpload onExtract={handleExtractContext} />

          {extractedContext && (
            <ExtractedContext
              context={extractedContext}
              onSave={handleSaveContext}
              onDiscard={() => setExtractedContext(null)}
            />
          )}
        </div>
      </GlassCard>

      {/* Saved Contexts */}
      <SavedContexts
        contexts={savedContexts}
        onContextClick={handleContextClick}
        onDelete={handleDeleteContext}
        isLoading={isLoading}
        isError={isError}
        error={error}
        // Pagination props
        pagination={
          meta && {
            currentPage: meta.currentPage,
            totalPages: meta.totalPages,
            totalCount: meta.totalCount,
            hasNextPage: meta.hasNextPage,
            hasPreviousPage: meta.hasPreviousPage,
            onNext: handleNextPage,
            onPrevious: handlePreviousPage,
          }
        }
      />

      {/* Context Modal */}
      {selectedContext && (
        <ContextModal
          context={selectedContext}
          onClose={() => setSelectedContext(null)}
        />
      )}
    </div>
  );
}
