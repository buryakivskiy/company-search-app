import { useState, useEffect } from 'react';
import { useCompanySearch } from '../hooks/useCompanySearch';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useCompanies } from '@/features/companies/hooks/useCompanies';
import { useNote } from '@/features/notes/hooks/useNote';
import { useCompanyContext } from '@/shared/contexts/CompanyContext';
import { SearchInput } from './SearchInput';
import { SearchResultsPanel } from './SearchResultsPanel';
import { NotePanel } from '@/features/notes/components/NotePanel';

export function CompanySearchSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 500);
  const { companies, isLoading, error, search } = useCompanySearch();
  const [noteText, setNoteText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const { createNewCompany } = useCompanies();
  const { note, isLoading: isLoadingNote, saveNote, reset: resetNote } = useNote();
  const { selectedCompany, selectedCompanyId, selectSearchCompany, clearSelection } = useCompanyContext();

  useEffect(() => {
    if (debouncedQuery) {
      search(debouncedQuery);
    }
  }, [debouncedQuery, search]);

  useEffect(() => {
    if (selectedCompanyId) {
      setNoteText(note?.content ?? '');
    }
  }, [note, selectedCompanyId]);

  const handleSaveCompany = async () => {
    if (!selectedCompany) return;

    setIsSaving(true);
    setSaveMessage(null);
    try {
      if (selectedCompanyId) {
        if (noteText.trim()) {
          await saveNote(selectedCompanyId, { content: noteText });
        }
      } else {
        // Create the company
        const createdCompany = await createNewCompany({
          organizationNumber: selectedCompany.organizationNumber,
          name: selectedCompany.name,
          address: selectedCompany.businessAddress?.city || undefined,
        });

        // Save the note if provided
        if (noteText.trim()) {
          await saveNote(createdCompany.id, { content: noteText });
        }

        // Notify saved list to refresh
        window.dispatchEvent(new Event('company-saved'));
      }

      // Reset form
      clearSelection();
      setNoteText('');
      setSearchQuery('');
      resetNote();

      setSaveMessage(null);
    } catch (err) {
      console.error('Failed to save company:', err);
      let message = 'Feil ved lagring av kunde';
      if (err instanceof Error) {
        try {
          const parsed = JSON.parse(err.message) as { message?: string };
          if (parsed?.message) {
            message = parsed.message;
          }
        } catch {
          // ignore parse errors
        }
      }
      setSaveMessage(message);
    } finally {
      setIsSaving(false);
    }
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
          selectedOrganizationNumber={selectedCompany?.organizationNumber}
          onSelectCompany={(company) => {
            selectSearchCompany(company);
            setNoteText('');
            setSaveMessage(null);
            resetNote();
          }}
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
            setSaveMessage(null);
            resetNote();
          }}
          onSave={handleSaveCompany}
        />
      </div>
    </div>
  );
}
