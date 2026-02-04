import { CompanySearchSection } from '@/features/company-search/components/CompanySearchSection'
import { SavedCompaniesSection } from '@/features/companies/components/SavedCompaniesSection'
import { CompanyProvider } from '@/shared/contexts/CompanyContext'

export default function App() {
  return (
    <CompanyProvider>
      <div className="min-h-screen bg-gray-200">
        <div className="p-12 max-w-5xl mx-auto space-y-12">
          <CompanySearchSection />
          <SavedCompaniesSection />
        </div>
      </div>
    </CompanyProvider>
  );
}
