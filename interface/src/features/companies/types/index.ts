/**
 * Companies Feature Types
 * Types for managing saved companies
 */

export interface SavedCompany {
  id: string;
  organizationNumber: string;
  name: string;
  address?: string;
  createdAt: string;
}

export interface CreateCompanyRequest {
  organizationNumber: string;
  name: string;
  address?: string;
}

export interface UpdateCompanyRequest {
  name?: string;
  address?: string;
}

/**
 * Search response with pagination
 */
export interface SavedCompanyesResponse {
  items: SavedCompany[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

