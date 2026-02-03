/**
 * Shared API Types
 */

/**
 * Generic API Response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  statusCode: number;
  message?: string;
}

/**
 * API Error response
 */
export interface ApiError {
  statusCode: number;
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
