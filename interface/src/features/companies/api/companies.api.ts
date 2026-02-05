import { FetchClient } from '@/shared/utils/fetchClient';
import type { SavedCompany, CreateCompanyRequest, UpdateCompanyRequest } from '../types';
import type { PaginatedResponse } from '@/shared/types/api.types';

const client = new FetchClient();

/**
 * Search saved companies with optional query and pagination
 */
export const getCompanies = async (
  page: number = 1,
  pageSize: number = 10,
  query?: string
): Promise<PaginatedResponse<SavedCompany>> => {
  const queryParams = new URLSearchParams();
  queryParams.append('page', page.toString());
  queryParams.append('pageSize', pageSize.toString());
  if (query?.trim()) {
    queryParams.append('query', query);
  }
  return client.get<PaginatedResponse<SavedCompany>>(
    `/api/companies?${queryParams.toString()}`
  );
};

/**
 * Get a single company by id
 */
export const getCompanyById = async (id: string): Promise<SavedCompany> => {
  return client.get<SavedCompany>(`/api/companies/${id}`);
};

/**
 * Create a new company
 */
export const createCompany = async (data: CreateCompanyRequest): Promise<SavedCompany> => {
  return client.post<SavedCompany>('/api/companies', data);
};

/**
 * Update an existing company
 */
export const updateCompany = async (
  id: string,
  data: UpdateCompanyRequest
): Promise<SavedCompany> => {
  return client.put<SavedCompany>(`/api/companies/${id}`, data);
};

/**
 * Delete a company
 */
export const deleteCompany = async (id: string): Promise<void> => {
  await client.delete(`/api/companies/${id}`);
};
