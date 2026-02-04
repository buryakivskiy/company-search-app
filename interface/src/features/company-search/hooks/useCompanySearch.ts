import { useState, useCallback } from 'react';
import { searchCompanies } from '../api/companySearch.api';
import { ensureMinimumLoadingTime } from '@/shared/utils/loadingTime';
import type { Company, CompanySearchResponse } from '../types';

interface UseCompanySearchState {
  companies: Company[];
  isLoading: boolean;
  error: string | null;
  hasNext: boolean;
  totalItems: number;
  totalPages: number;
}

interface UseCompanySearchReturn extends UseCompanySearchState {
  search: (query: string, page?: number) => Promise<void>;
  reset: () => void;
}

/**
 * Hook for managing company search state and operations
 */
export const useCompanySearch = (): UseCompanySearchReturn => {
  const [state, setState] = useState<UseCompanySearchState>({
    companies: [],
    isLoading: false,
    error: null,
    hasNext: false,
    totalItems: 0,
    totalPages: 0,
  });

  const search = useCallback(async (query: string, page = 1) => {
    if (!query.trim()) {
      setState((prev) => ({ ...prev, companies: [], error: null }));
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const startTime = Date.now();
      
      // Fetch data
      const response: CompanySearchResponse = await searchCompanies(query, page, 4);
      
      // Ensure minimum loading time of 500ms for UI feedback
      await ensureMinimumLoadingTime(startTime);
      
      console.log('Search response:', response);
      setState((prev) => ({
        ...prev,
        companies: response.items || [],
        hasNext: response.hasNext || false,
        totalItems: response.totalItems || 0,
        totalPages: response.totalPages || 0,
        isLoading: false,
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search companies';
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      companies: [],
      isLoading: false,
      error: null,
      hasNext: false,
      totalItems: 0,
      totalPages: 0,
    });
  }, []);

  return {
    ...state,
    search,
    reset,
  };
};
