import type { SavedCompany } from '@/features/companies/types';
import { SEARCH_MESSAGES, SAVED_COMPANIES_MESSAGES } from '@/shared/constants/messages';

interface Props {
  company: SavedCompany;
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
  onSelect: (company: SavedCompany) => void;
  onDelete: (id: string, name: string) => void;
}

export function SavedCompanyItem({ company, isExpanded, onToggleExpand, onSelect, onDelete }: Props) {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg overflow-hidden">
      <div className="p-4 flex justify-between items-center">
        <div
          className="flex-1 cursor-pointer"
          onClick={() => {
            onToggleExpand(company.id);
            onSelect(company);
          }}
        >
          <h3 className="font-bold text-lg">{company.name}</h3>
          <p className="text-sm text-gray-600">{SEARCH_MESSAGES.ORG_NR_LABEL} {company.organizationNumber}</p>
          {company.address && (
            <p className="text-sm text-gray-500 mt-1">{company.address}</p>
          )}
        </div>
        <button
          onClick={() => onDelete(company.id, company.name)}
          className="text-red-500 hover:text-red-700 px-3 py-1 text-sm font-medium"
        >
          {SAVED_COMPANIES_MESSAGES.DELETE_BUTTON}
        </button>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-300 bg-gray-50">
          <p className="text-sm text-gray-600">
            {SAVED_COMPANIES_MESSAGES.CREATED_AT} {new Date(company.createdAt).toLocaleDateString('nb-NO')}
          </p>
        </div>
      )}
    </div>
  );
}
