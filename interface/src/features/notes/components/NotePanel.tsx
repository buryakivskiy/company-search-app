import type { Company } from '@/features/company-search/types';

interface NotePanelProps {
  selectedCompany: Company | null;
  selectedCompanyId: string | null;
  noteText: string;
  isLoadingNote: boolean;
  isSaving: boolean;
  saveMessage: string | null;
  onNoteChange: (value: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

export function NotePanel({
  selectedCompany,
  selectedCompanyId,
  noteText,
  isLoadingNote,
  isSaving,
  saveMessage,
  onNoteChange,
  onCancel,
  onSave,
}: NotePanelProps) {
  return (
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
            onChange={(e) => onNoteChange(e.target.value)}
            placeholder="Legg til notat om kunden her..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
            rows={5}
          />
          <div className="flex gap-3 justify-end">
            <button
              onClick={onCancel}
              disabled={isSaving}
              className="px-6 py-2 text-black border border-gray-300 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50"
            >
              Avbryt
            </button>
            <button
              onClick={onSave}
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
  );
}
