import type { Company } from '../types';

interface SearchResultsPanelProps {
  companies: Company[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  currentPage: number;
  hasNext: boolean;
  totalPages: number;
  selectedOrganizationNumber?: string | null;
  onSelectCompany: (company: Company) => void;
  onPageChange: (page: number) => void;
}

export function SearchResultsPanel({
  companies,
  isLoading,
  error,
  searchQuery,
  currentPage,
  hasNext,
  totalPages,
  selectedOrganizationNumber,
  onSelectCompany,
  onPageChange,
}: SearchResultsPanelProps) {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 h-[520px] flex flex-col">
      <h3 className="font-bold text-gray-700 mb-4">Søkeresultater fra Brønnøysund</h3>

      {/* Fixed height container for all states */}
      <div className="flex-1 flex flex-col min-h-0">
        {isLoading && (
          <div className="text-gray-500 text-center flex items-center justify-center h-full">Søker...</div>
        )}

        {error && (
          <div className="text-red-500 text-sm flex items-center justify-center h-full">{error}</div>
        )}

        {!isLoading && !error && companies.length === 0 && searchQuery && (
          <div className="text-gray-500 text-center flex items-center justify-center h-full">Ingen resultater funnet</div>
        )}

        {!isLoading && !error && companies.length === 0 && !searchQuery && (
          <div className="text-gray-500 text-center flex items-center justify-center h-full">Skriv inn firmanavn for å søke</div>
        )}

        {!isLoading && !error && companies.length > 0 && (
          <>
            <div className="space-y-2 overflow-y-auto flex-1 min-h-0">
              {companies.map((company) => (
                <div
                  key={company.organizationNumber}
                  onClick={() => onSelectCompany(company)}
                  className={`p-2 rounded-lg cursor-pointer transition-colors ${
                    selectedOrganizationNumber === company.organizationNumber
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-white border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-semibold text-gray-900 text-sm">{company.name}</div>
                  <div className="text-xs text-gray-600">Org.nr: {company.organizationNumber}</div>
                  {company.businessAddress?.city && (
                    <div className="text-xs text-gray-500">{company.businessAddress.city}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination controls - always at the bottom */}
            {searchQuery && (
              <div className="flex justify-between items-center pt-4 border-t border-gray-300 flex-shrink-0">
                <button
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Forrige
                </button>
                <span className="text-sm text-gray-600">Side {currentPage} av {totalPages}</span>
                <button
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={!hasNext}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Neste
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
