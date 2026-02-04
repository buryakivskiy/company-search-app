import type { SavedCompany } from '@/features/companies/types';
import { SavedCompanyItem } from './SavedCompanyItem';

interface Props {
  companies: SavedCompany[];
  filteredCompanies: SavedCompany[];
  expandedCompanyId: string | null;
  onToggleExpand: (id: string) => void;
  onSelect: (company: SavedCompany) => void;
  onDelete: (id: string, name: string) => void;
}

export function SavedCompaniesList({ companies, filteredCompanies, expandedCompanyId, onToggleExpand, onSelect, onDelete }: Props) {
  return (
    <div className="space-y-3 overflow-y-auto flex-1 min-h-0">
      {filteredCompanies.map((company) => (
        <SavedCompanyItem
          key={company.id}
          company={company}
          isExpanded={expandedCompanyId === company.id}
          onToggleExpand={onToggleExpand}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
