import type { Company } from '@/features/company-search/types';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { NOTE_MESSAGES } from '@/shared/constants/messages';

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
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 h-[520px] flex flex-col">
      {selectedCompany ? (
        <>
          <h3 className="font-bold text-gray-700 mb-2">{selectedCompany.name}</h3>
          <p className="text-sm text-gray-600 mb-4">{NOTE_MESSAGES.SELECTED_COMPANY_LABEL} {selectedCompany.organizationNumber}</p>
          {isLoadingNote && selectedCompanyId && (
            <div className="flex justify-center py-4">
              <LoadingSpinner size="sm" message={NOTE_MESSAGES.LOADING} />
            </div>
          )}
          {!isLoadingNote && (
            <>
              <textarea
                value={noteText}
                onChange={(e) => onNoteChange(e.target.value)}
                placeholder={NOTE_MESSAGES.PLACEHOLDER}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 resize-none flex-1"
                rows={5}
              />
              <div className="flex gap-3 justify-end">
                <button
                  onClick={onCancel}
                  disabled={isSaving}
                  className="px-6 py-2 text-black border border-gray-300 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {NOTE_MESSAGES.CANCEL_BUTTON}
                </button>
                <button
                  onClick={onSave}
                  disabled={isSaving}
                  className="px-6 py-2 bg-blue-600 text-black rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 animate-spin">
                        <div className="w-full h-full rounded-full border-2 border-white border-t-transparent"></div>
                      </div>
                      {NOTE_MESSAGES.SAVING}
                    </>
                  ) : selectedCompanyId ? (
                    NOTE_MESSAGES.SAVE_BUTTON
                  ) : (
                    NOTE_MESSAGES.SAVE_AND_CREATE_BUTTON
                  )}
                </button>
              </div>
              {saveMessage && (
                <div className="mt-3 bg-red-50 border border-red-200 rounded p-2 text-sm text-red-700">
                  {saveMessage}
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          {NOTE_MESSAGES.NO_COMPANY_SELECTED}
        </div>
      )}
    </div>
  );
}
