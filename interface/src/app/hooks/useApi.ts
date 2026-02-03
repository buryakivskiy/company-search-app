/**
 * useApi Hook
 * Generic hook for handling API calls with loading, error, and data states
 */

import { useState, useCallback } from 'react';
import type { ApiError } from '@/shared/types/api.types';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

/**
 * Generic hook for API operations
 */
export function useApi<T>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  /**
   * Execute async function with loading and error handling
   */
  const execute = useCallback(
    async (asyncFunction: () => Promise<T>) => {
      setState({ data: null, loading: true, error: null });
      try {
        const result = await asyncFunction();
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err) {
        const error = err instanceof Error ? JSON.parse(err.message) : { message: 'Unknown error' };
        setState({ data: null, loading: false, error });
        throw error;
      }
    },
    []
  );

  /**
   * Reset state
   */
  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
