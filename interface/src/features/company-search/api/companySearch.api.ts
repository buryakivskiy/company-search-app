import { FetchClient } from '@/shared/utils/fetchClient';
import type { CompanySearchResponse } from '../types';

const client = new FetchClient();

/**
 * Search for companies in external registry
 */
export const searchCompanies = async (
  query: string,
  page: number = 1,
  pageSize: number = 10
): Promise<CompanySearchResponse> => {
  const params = new URLSearchParams({
    query,
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  return client.get<CompanySearchResponse>(`/api/companySearch?${params.toString()}`);
};
