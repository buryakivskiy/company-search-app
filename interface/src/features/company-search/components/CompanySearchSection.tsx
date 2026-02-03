import { useState, useEffect } from 'react';
import { useCompanySearch } from '../hooks/useCompanySearch';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useCompanies } from '@/features/companies/hooks/useCompanies';
import { useNote } from '@/features/notes/hooks/useNote';
import type { Company } from '../types';

export function CompanySearchSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 500);
  const { companies, isLoading, error, search } = useCompanySearch();
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const { createNewCompany } = useCompanies();
  const { note, isLoading: isLoadingNote, fetchNote, saveNote, reset: resetNote } = useNote();

  useEffect(() => {
    if (debouncedQuery) {
      search(debouncedQuery);
    }
  }, [debouncedQuery, search]);

  useEffect(() => {
    const handleCompanySelected = (event: Event) => {
      const customEvent = event as CustomEvent<{
        id: string;
        name: string;
        organizationNumber: string;
        address?: string;
      }>;

      const detail = customEvent.detail;
      if (!detail) return;

      setSelectedCompany({
        organizationNumber: detail.organizationNumber,
        name: detail.name,
        businessAddress: detail.address ? { city: detail.address } : undefined,
        registeredInVatRegister: false,
        bankrupt: false,
        underLiquidation: false,
        underCompulsoryLiquidationOrDissolution: false,
      });
      setSelectedCompanyId(detail.id);
      setSaveMessage(null);
      fetchNote(detail.id);
    };

    window.addEventListener('company-selected', handleCompanySelected);
    return () => {
      window.removeEventListener('company-selected', handleCompanySelected);
    };
  }, [fetchNote]);

  useEffect(() => {
    const handleCompanyDeleted = (event: Event) => {
      const customEvent = event as CustomEvent<{ id: string }>;
      const deletedId = customEvent.detail?.id;
      if (!deletedId) return;

      if (selectedCompanyId === deletedId) {
        setSelectedCompany(null);
        setSelectedCompanyId(null);
        setNoteText('');
        setSaveMessage(null);
        resetNote();
      }
    };

    window.addEventListener('company-deleted', handleCompanyDeleted);
    return () => {
      window.removeEventListener('company-deleted', handleCompanyDeleted);
    };
  }, [resetNote, selectedCompanyId]);

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
      setSelectedCompany(null);
      setSelectedCompanyId(null);
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
      
      {/* Search input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Søk etter firma..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left: Search results */}
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
                onClick={() => {
                  setSelectedCompany(company);
                  setSelectedCompanyId(null);
                  setNoteText('');
                  setSaveMessage(null);
                  resetNote();
                }}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedCompany?.organizationNumber === company.organizationNumber
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

        {/* Right: Notes */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 min-h-80">
          {selectedCompany ? (
            <>
              <h3 className="font-bold text-gray-700 mb-2">{selectedCompany.name}</h3>
              <p className="text-sm text-gray-600 mb-4">Org.nr: {selectedCompany.organizationNumber}</p>
              {isLoadingNote && selectedCompanyId && (
                <div className="text-sm text-gray-500 mb-3">Laster notat...</div>
              )}
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Legg til notat om kunden her..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
                rows={5}
              />
              <div className="flex gap-3 justify-end">
                <button 
                  onClick={() => {
                    setSelectedCompany(null);
                    setSelectedCompanyId(null);
                    setNoteText('');
                    setSaveMessage(null);
                    resetNote();
                  }}
                  disabled={isSaving}
                  className="px-6 py-2 text-black border border-gray-300 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50"
                >
                  Avbryt
                </button>
                <button 
                  onClick={handleSaveCompany}
                  disabled={isSaving}
                  className="px-6 py-2 bg-blue-600 text-black rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSaving ? 'Lagrer...' : selectedCompanyId ? 'Lagre notat' : 'Lagre og legg til'}
                </button>
              </div>
              {saveMessage && (
                <div className="mt-3 text-sm text-red-500">
                  {saveMessage}
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Velg et firma fra søkeresultatene
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
