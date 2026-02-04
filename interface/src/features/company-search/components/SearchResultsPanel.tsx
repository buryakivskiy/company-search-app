import type { Company } from '../types';

interface SearchResultsPanelProps {
  companies: Company[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  selectedOrganizationNumber?: string | null;
  onSelectCompany: (company: Company) => void;
}

export function SearchResultsPanel({
  companies,
  isLoading,
  error,
  searchQuery,
  selectedOrganizationNumber,
  onSelectCompany,
}: SearchResultsPanelProps) {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 min-h-80 overflow-y-auto max-h-[600px]">
      <h3 className="font-bold text-gray-700 mb-4">Søkeresultater fra Brønnøysund</h3>

      {isLoading && (
        <div className="text-gray-500 text-center py-8">Søker...</div>
      )}

      {error && (
        <div className="text-red-500 text-sm py-4">{error}</div>
      )}

      {!isLoading && !error && companies.length === 0 && searchQuery && (
        <div className="text-gray-500 text-center py-8">Ingen resultater funnet</div>
      )}

      {!isLoading && !error && companies.length === 0 && !searchQuery && (
        <div className="text-gray-500 text-center py-8">Skriv inn firmanavn for å søke</div>
      )}

      <div className="space-y-2">
        {companies.map((company) => (
          <div
            key={company.organizationNumber}
            onClick={() => onSelectCompany(company)}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              selectedOrganizationNumber === company.organizationNumber
                ? 'bg-blue-100 border-2 border-blue-500'
                : 'bg-white border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <div className="font-semibold text-gray-900">{company.name}</div>
            <div className="text-sm text-gray-600">Org.nr: {company.organizationNumber}</div>
            {company.businessAddress?.city && (
              <div className="text-sm text-gray-500">{company.businessAddress.city}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
