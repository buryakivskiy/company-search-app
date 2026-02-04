import { useState, useEffect } from 'react';
import { useCompanySearch } from '../hooks/useCompanySearch';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useCompanyContext } from '@/shared/contexts/CompanyContext';
import { SearchInput } from './SearchInput';
import { SearchResultsPanel } from './SearchResultsPanel';
import { NotePanel } from '@/features/notes/components/NotePanel';
import { useCompanySave } from '../hooks/useCompanySave';

export function CompanySearchSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedQuery = useDebounce(searchQuery, 500);
  const { companies, isLoading, error, hasNext, totalPages, search } = useCompanySearch();
  const [noteText, setNoteText] = useState('');
  const { isSaving, saveMessage, clearSaveMessage, saveCompany, note, isLoadingNote, resetNote } = useCompanySave();
  const { selectedCompany, selectedCompanyId, selectSearchCompany, clearSelection } = useCompanyContext();

  useEffect(() => {
    if (debouncedQuery) {
      setCurrentPage(1);
      search(debouncedQuery, 1);
    }
  }, [debouncedQuery, search]);

  useEffect(() => {
    if (selectedCompanyId) {
      setNoteText(note?.content ?? '');
    }
  }, [note, selectedCompanyId]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    search(searchQuery, newPage);
  };

  const handleSaveCompany = async () => {
    await saveCompany({
      selectedCompany,
      selectedCompanyId,
      noteText,
      onSuccess: () => {
        clearSelection();
        setNoteText('');
        setSearchQuery('');
        resetNote();
      },
    });
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Legg til ny kunde</h2>
      
      <SearchInput value={searchQuery} onChange={setSearchQuery} />

      {/* Two columns */}
      <div className="grid grid-cols-2 gap-6">
        <SearchResultsPanel
          companies={companies}
          isLoading={isLoading}
          error={error}
          searchQuery={searchQuery}
          currentPage={currentPage}
          hasNext={hasNext}
          totalPages={totalPages}
          selectedOrganizationNumber={selectedCompany?.organizationNumber}
          onSelectCompany={(company) => {
            selectSearchCompany(company);
            setNoteText('');
            clearSaveMessage();
            resetNote();
          }}
          onPageChange={handlePageChange}
        />

        <NotePanel
          selectedCompany={selectedCompany}
          selectedCompanyId={selectedCompanyId}
          noteText={noteText}
          isLoadingNote={isLoadingNote}
          isSaving={isSaving}
          saveMessage={saveMessage}
          onNoteChange={setNoteText}
          onCancel={() => {
            clearSelection();
            setNoteText('');
            clearSaveMessage();
            resetNote();
          }}
          onSave={handleSaveCompany}
        />
      </div>
    </div>
  );
}
