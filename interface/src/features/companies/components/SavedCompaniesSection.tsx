import { useEffect, useState } from 'react';
import { useCompanies } from '../hooks/useCompanies';
import { useCompanyContext } from '@/shared/contexts/CompanyContext';
import { SearchInput } from '@/features/company-search/components/SearchInput';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { SAVED_COMPANIES_MESSAGES } from '@/shared/constants/messages';
import { SavedCompaniesList } from './SavedCompaniesList';
import { SavedCompaniesPagination } from './SavedCompaniesPagination';

export function SavedCompaniesSection() {
  const { companies, isLoading, error, fetchCompanies, removeCompany, totalPages } = useCompanies();
  const [expandedCompanyId, setExpandedCompanyId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 4;
  const { selectSavedCompany, notifyCompanyDeleted } = useCompanyContext();

  // Filter companies based on search query
  const filteredCompanies = companies.filter((company) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      company.name.toLowerCase().includes(query) ||
      company.organizationNumber.includes(query) ||
      company.address?.toLowerCase().includes(query)
    );
  });

  // Handle search with loading indicator
  const handleSearchChange = async (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      setIsSearching(true);
      // Simulate search delay for UI feedback
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsSearching(false);
    } else {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    fetchCompanies(currentPage, PAGE_SIZE);
  }, [fetchCompanies, currentPage]);

  useEffect(() => {
    const handleCompanySaved = () => {
      fetchCompanies(currentPage, PAGE_SIZE);
    };

    window.addEventListener('company-saved', handleCompanySaved);
    return () => {
      window.removeEventListener('company-saved', handleCompanySaved);
    };
  }, [fetchCompanies]);

  const handleDelete = async (id: string, companyName: string) => {
    if (window.confirm(SAVED_COMPANIES_MESSAGES.CONFIRM_DELETE.replace('{companyName}', companyName))) {
      try {
        await removeCompany(id);
        notifyCompanyDeleted(id);
        // refresh current page after deletion
        await fetchCompanies(currentPage, PAGE_SIZE);
      } catch (err) {
        console.error('Failed to delete company:', err);
      }
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedCompanyId(expandedCompanyId === id ? null : id);
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm h-[720px] flex flex-col">
      <h2 className="text-2xl font-bold mb-6">{SAVED_COMPANIES_MESSAGES.TITLE}</h2>
      
      <SearchInput value={searchQuery} onChange={handleSearchChange} />

      {/* Fixed-height flex container like SearchResultsPanel to avoid jumps */}
      <div className="flex-1 flex flex-col min-h-0">
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <LoadingSpinner size="md" message={SAVED_COMPANIES_MESSAGES.LOADING} />
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-full">
            <div className="text-red-500 text-sm text-center px-4">
              <div className="font-medium mb-2">{SAVED_COMPANIES_MESSAGES.ERROR}</div>
              <div>{error}</div>
            </div>
          </div>
        )}

        {!isLoading && !error && isSearching && searchQuery && (
          <div className="flex items-center justify-center h-full">
            <LoadingSpinner size="md" message={SAVED_COMPANIES_MESSAGES.SEARCHING} />
          </div>
        )}

        {!isLoading && !error && companies.length === 0 && (
          <div className="text-gray-500 text-center flex items-center justify-center h-full">{SAVED_COMPANIES_MESSAGES.EMPTY}</div>
        )}

        {!isLoading && !error && companies.length > 0 && filteredCompanies.length === 0 && (
          <div className="text-gray-500 text-center flex items-center justify-center h-full">{SAVED_COMPANIES_MESSAGES.NO_SEARCH_RESULTS}</div>
        )}

        <SavedCompaniesList
          companies={companies}
          filteredCompanies={filteredCompanies}
          expandedCompanyId={expandedCompanyId}
          onToggleExpand={toggleExpand}
          onSelect={selectSavedCompany}
          onDelete={handleDelete}
        />

        {/* Pagination controls for saved companies (infer when backend doesn't return total) */}
        <SavedCompaniesPagination
          currentPage={currentPage}
          setPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
