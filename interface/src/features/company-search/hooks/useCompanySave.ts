import { useCallback, useState } from 'react';
import { useCompanies } from '@/features/companies/hooks/useCompanies';
import { useNote } from '@/features/notes/hooks/useNote';
import { ensureMinimumLoadingTime } from '@/shared/utils/loadingTime';
import { ERROR_MESSAGES } from '@/shared/constants/messages';
import type { Company } from '../types';

interface SaveCompanyParams {
  selectedCompany: Company | null;
  selectedCompanyId: string | null;
  noteText: string;
  onSuccess?: () => void;
}

export function useCompanySave() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const { createNewCompany } = useCompanies();
  const { note, isLoading: isLoadingNote, fetchNote, saveNote, reset: resetNote } = useNote();

  const clearSaveMessage = useCallback(() => {
    setSaveMessage(null);
  }, []);

  const saveCompany = useCallback(
    async ({ selectedCompany, selectedCompanyId, noteText, onSuccess }: SaveCompanyParams) => {
      if (!selectedCompany) return;

      setIsSaving(true);
      setSaveMessage(null);

      try {
        const startTime = Date.now();
        
        if (selectedCompanyId) {
          if (noteText.trim()) {
            await saveNote(selectedCompanyId, { content: noteText });
          }
        } else {
          const createdCompany = await createNewCompany({
            organizationNumber: selectedCompany.organizationNumber,
            name: selectedCompany.name,
            address: selectedCompany.businessAddress?.city || undefined,
          });

          if (noteText.trim()) {
            await saveNote(createdCompany.id, { content: noteText });
          }

          window.dispatchEvent(new Event('company-saved'));
        }

        await ensureMinimumLoadingTime(startTime, 200);

        onSuccess?.();
        setSaveMessage(null);
      } catch (err) {
        console.error('Failed to save company:', err);
        let message: string = ERROR_MESSAGES.SAVE_COMPANY_ERROR;
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
    },
    [createNewCompany, saveNote]
  );

  return {
    isSaving,
    saveMessage,
    clearSaveMessage,
    saveCompany,
    note,
    isLoadingNote,
    fetchNote,
    resetNote,
  };
}
