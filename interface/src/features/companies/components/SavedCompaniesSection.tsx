import { useEffect, useState } from 'react';
import { useCompanies } from '../hooks/useCompanies';
import { useCompanyContext } from '@/shared/contexts/CompanyContext';
import { SearchInput } from '@/features/company-search/components/SearchInput';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { SAVED_COMPANIES_MESSAGES, SEARCH_MESSAGES } from '@/shared/constants/messages';

export function SavedCompaniesSection() {
  const { companies, isLoading, error, fetchCompanies, removeCompany } = useCompanies();
  const [expandedCompanyId, setExpandedCompanyId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
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
    fetchCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    const handleCompanySaved = () => {
      fetchCompanies();
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
      } catch (err) {
        console.error('Failed to delete company:', err);
      }
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedCompanyId(expandedCompanyId === id ? null : id);
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm">
      <h2 className="text-2xl font-bold mb-6">{SAVED_COMPANIES_MESSAGES.TITLE}</h2>
      
      <SearchInput value={searchQuery} onChange={handleSearchChange} />
      
      {isLoading && (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="md" message={SAVED_COMPANIES_MESSAGES.LOADING} />
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
          <div className="text-red-800 font-medium mb-1">{SAVED_COMPANIES_MESSAGES.ERROR}</div>
          <div className="text-red-700 text-sm">{error}</div>
        </div>
      )}

      {!isLoading && !error && isSearching && searchQuery && (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="md" message={SAVED_COMPANIES_MESSAGES.SEARCHING} />
        </div>
      )}

      {!isLoading && !error && !isSearching && companies.length === 0 && (
        <div className="text-gray-500 text-center py-8">{SAVED_COMPANIES_MESSAGES.EMPTY}</div>
      )}

      {!isLoading && !error && !isSearching && companies.length > 0 && filteredCompanies.length === 0 && (
        <div className="text-gray-500 text-center py-8">{SAVED_COMPANIES_MESSAGES.NO_SEARCH_RESULTS}</div>
      )}

      <div className="space-y-3">
        {filteredCompanies.map((company) => (
          <div 
            key={company.id}
            className="bg-gray-100 border border-gray-300 rounded-lg overflow-hidden"
          >
            <div className="p-4 flex justify-between items-center">
              <div 
                className="flex-1 cursor-pointer"
                onClick={() => {
                  toggleExpand(company.id);
                  selectSavedCompany(company);
                }}
              >
                <h3 className="font-bold text-lg">{company.name}</h3>
                <p className="text-sm text-gray-600">{SEARCH_MESSAGES.ORG_NR_LABEL} {company.organizationNumber}</p>
                {company.address && (
                  <p className="text-sm text-gray-500 mt-1">{company.address}</p>
                )}
              </div>
              <button 
                onClick={() => handleDelete(company.id, company.name)}
                className="text-red-500 hover:text-red-700 px-3 py-1 text-sm font-medium"
              >
                {SAVED_COMPANIES_MESSAGES.DELETE_BUTTON}
              </button>
            </div>
            
            {expandedCompanyId === company.id && (
              <div className="px-4 pb-4 pt-2 border-t border-gray-300 bg-gray-50">
                <p className="text-sm text-gray-600">
                  {SAVED_COMPANIES_MESSAGES.CREATED_AT} {new Date(company.createdAt).toLocaleDateString('nb-NO')}
                </p>
                {/* Future: Add note display here */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
