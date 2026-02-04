import { useEffect, useState } from 'react';
import { useCompanies } from '../hooks/useCompanies';
import { useCompanyContext } from '@/shared/contexts/CompanyContext';

export function SavedCompaniesSection() {
  const { companies, isLoading, error, fetchCompanies, removeCompany } = useCompanies();
  const [expandedCompanyId, setExpandedCompanyId] = useState<string | null>(null);
  const { selectSavedCompany, notifyCompanyDeleted } = useCompanyContext();

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
    if (window.confirm(`Er du sikker på at du vil slette "${companyName}"?`)) {
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
      <h2 className="text-2xl font-bold mb-6">Mine kunder</h2>
      
      {isLoading && (
        <div className="text-gray-500 text-center py-8">Laster kunder...</div>
      )}

      {error && (
        <div className="text-red-500 text-sm py-4">{error}</div>
      )}

      {!isLoading && !error && companies.length === 0 && (
        <div className="text-gray-500 text-center py-8">Ingen lagrede kunder ennå</div>
      )}

      <div className="space-y-3">
        {companies.map((company) => (
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
                <p className="text-sm text-gray-600">Org.nr: {company.organizationNumber}</p>
                {company.address && (
                  <p className="text-sm text-gray-500 mt-1">{company.address}</p>
                )}
              </div>
              <button 
                onClick={() => handleDelete(company.id, company.name)}
                className="text-red-500 hover:text-red-700 px-3 py-1 text-sm font-medium"
              >
                Slett
              </button>
            </div>
            
            {expandedCompanyId === company.id && (
              <div className="px-4 pb-4 pt-2 border-t border-gray-300 bg-gray-50">
                <p className="text-sm text-gray-600">
                  Lagt til: {new Date(company.createdAt).toLocaleDateString('nb-NO')}
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
