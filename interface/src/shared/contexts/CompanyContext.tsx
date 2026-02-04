import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Company } from '@/features/company-search/types';
import type { SavedCompany } from '@/features/companies/types';

interface CompanyContextType {
  // Selected company from search or saved list
  selectedCompany: Company | null;
  selectedCompanyId: string | null;
  
  // Actions
  selectSearchCompany: (company: Company) => void;
  selectSavedCompany: (company: SavedCompany) => void;
  clearSelection: () => void;
  notifyCompanyDeleted: (id: string) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

  const selectSearchCompany = useCallback((company: Company) => {
    setSelectedCompany(company);
    setSelectedCompanyId(null);
  }, []);

  const selectSavedCompany = useCallback((company: SavedCompany) => {
    setSelectedCompany({
      organizationNumber: company.organizationNumber,
      name: company.name,
      businessAddress: company.address ? { city: company.address } : undefined,
      registeredInVatRegister: false,
      bankrupt: false,
      underLiquidation: false,
      underCompulsoryLiquidationOrDissolution: false,
    });
    setSelectedCompanyId(company.id);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedCompany(null);
    setSelectedCompanyId(null);
  }, []);

  const notifyCompanyDeleted = useCallback((deletedId: string) => {
    if (selectedCompanyId === deletedId) {
      clearSelection();
    }
  }, [selectedCompanyId, clearSelection]);

  const value: CompanyContextType = {
    selectedCompany,
    selectedCompanyId,
    selectSearchCompany,
    selectSavedCompany,
    clearSelection,
    notifyCompanyDeleted,
  };

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompanyContext() {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompanyContext must be used within CompanyProvider');
  }
  return context;
}
