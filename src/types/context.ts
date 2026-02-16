export type ContextStructuredData = Record<string, unknown>;

export interface Context<T = ContextStructuredData> {
  id: string;
  userId: string;
  name: string;

  structuredData: T;
  aiPromptBlock: string;

  tags: string[] | null;

  model: string | null;
  aspectRatio: string | null;

  usageCount: number;

  createdAt: Date;
}

export interface CreateContextDTO<T = ContextStructuredData> {
  name: string;
  structuredData: T;
  aiPromptBlock: string;

  tags?: string[];

  model?: string;
  aspectRatio?: string;
}

export interface UpdateContextDTO<T = ContextStructuredData> {
  name?: string;
  structuredData?: T;
  aiPromptBlock?: string;

  tags?: string[];

  model?: string;
  aspectRatio?: string;
}
