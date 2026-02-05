import { useState, useCallback } from 'react';
import {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} from '../api/companies.api';
import { ensureMinimumLoadingTime } from '@/shared/utils/loadingTime';
import type { SavedCompany, CreateCompanyRequest, UpdateCompanyRequest, SavedCompanyesResponse } from '../types';

interface UseCompaniesState {
  companies: SavedCompany[];
  selectedCompany: SavedCompany | null;
  isLoading: boolean;
  error: string | null;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface UseCompaniesReturn extends UseCompaniesState {
  fetchCompanies: (page?: number, pageSize?: number, query?: string) => Promise<void>;
  fetchCompanyById: (id: string) => Promise<void>;
  createNewCompany: (data: CreateCompanyRequest) => Promise<SavedCompany>;
  updateExistingCompany: (id: string, data: UpdateCompanyRequest) => Promise<SavedCompany>;
  removeCompany: (id: string) => Promise<void>;
  reset: () => void;
}

/**
 * Hook for managing saved companies CRUD operations
 */
export const useCompanies = (): UseCompaniesReturn => {
  const [state, setState] = useState<UseCompaniesState>({
    companies: [],
    selectedCompany: null,
    isLoading: false,
    error: null,
    totalCount: 0,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
  });

  const fetchCompanies = useCallback(async (page = 1, pageSize = 10, query?: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    const startTime = Date.now();
    try {
      // small delay so spinner can render
      await new Promise((r) => setTimeout(r, 50));

      const response: SavedCompanyesResponse = await getCompanies(page, pageSize, query);
      await ensureMinimumLoadingTime(startTime);

      setState((prev) => ({
        ...prev,
        companies: response.items,
        totalCount: response.totalItems,
        totalPages: response.totalPages,
        hasNext: response.hasNext,
        hasPrevious: response.hasPrevious,
        isLoading: false,
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch companies';
      setState((prev) => ({ ...prev, error: errorMessage, isLoading: false }));
    }
  }, []);

  const fetchCompanyById = useCallback(async (id: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const company = await getCompanyById(id);
      setState((prev) => ({
        ...prev,
        selectedCompany: company,
        isLoading: false,
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch company';
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
    }
  }, []);

  const createNewCompany = useCallback(async (data: CreateCompanyRequest): Promise<SavedCompany> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const newCompany = await createCompany(data);
      setState((prev) => ({
        ...prev,
        companies: [newCompany, ...prev.companies],
        isLoading: false,
      }));
      return newCompany;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create company';
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      throw err;
    }
  }, []);

  const updateExistingCompany = useCallback(
    async (id: string, data: UpdateCompanyRequest): Promise<SavedCompany> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const updated = await updateCompany(id, data);
        setState((prev) => ({
          ...prev,
          companies: prev.companies.map((c) => (c.id === id ? updated : c)),
          selectedCompany: prev.selectedCompany?.id === id ? updated : prev.selectedCompany,
          isLoading: false,
        }));
        return updated;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update company';
        setState((prev) => ({
          ...prev,
          error: errorMessage,
          isLoading: false,
        }));
        throw err;
      }
    },
    []
  );

  const removeCompany = useCallback(async (id: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      await deleteCompany(id);
      setState((prev) => ({
        ...prev,
        companies: prev.companies.filter((c) => c.id !== id),
        selectedCompany: prev.selectedCompany?.id === id ? null : prev.selectedCompany,
        isLoading: false,
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete company';
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      throw err;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      companies: [],
      selectedCompany: null,
      isLoading: false,
      error: null,
      totalCount: 0,
      totalPages: 0,
      hasNext: false,
      hasPrevious: false,
    });
  }, []);

  return {
    ...state,
    fetchCompanies,
    fetchCompanyById,
    createNewCompany,
    updateExistingCompany,
    removeCompany,
    reset,
  };
};
