// ============================================================
// API types
// ============================================================

export interface ApiResponse<T> {
  data: T;
  error?: never;
}

export interface ApiError {
  data?: never;
  error: string;
  details?: string;
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface FilterParams {
  status?: string;
  priority?: string;
  cluster?: string;
  reqType?: string;
  level?: string;
  category?: string;
  decisionType?: string;
  docType?: string;
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface SearchResult {
  id: string;
  entityType: string;
  caseId: string;
  title: string;
  matchField: string;
  matchSnippet: string;
}

export interface ExportOptions {
  format: "csv" | "xlsx" | "json";
  entityTypes?: string[];
  includeTraceLinks?: boolean;
}

export interface ImportResult {
  created: number;
  updated: number;
  errors: string[];
}
