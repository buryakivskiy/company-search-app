import { useState, useCallback } from 'react';
import {
  getNoteForCompany,
  saveNoteForCompany,
  deleteNoteForCompany,
} from '../api/notes.api';
import type { Note, CreateOrUpdateNoteRequest } from '../types';

interface UseNoteState {
  note: Note | null;
  isLoading: boolean;
  error: string | null;
  isSaving: boolean;
}

interface UseNoteReturn extends UseNoteState {
  fetchNote: (companyId: string) => Promise<void>;
  saveNote: (companyId: string, data: CreateOrUpdateNoteRequest) => Promise<Note>;
  removeNote: (companyId: string) => Promise<void>;
  reset: () => void;
}

/**
 * Hook for managing note operations for a company
 */
export const useNote = (): UseNoteReturn => {
  const [state, setState] = useState<UseNoteState>({
    note: null,
    isLoading: false,
    error: null,
    isSaving: false,
  });

  const fetchNote = useCallback(async (companyId: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const note = await getNoteForCompany(companyId);
      setState((prev) => ({
        ...prev,
        note,
        isLoading: false,
      }));
    } catch (err) {
      // Note might not exist yet, which is fine
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch note';
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
    }
  }, []);

  const saveNote = useCallback(
    async (companyId: string, data: CreateOrUpdateNoteRequest): Promise<Note> => {
      setState((prev) => ({ ...prev, isSaving: true, error: null }));

      try {
        const savedNote = await saveNoteForCompany(companyId, data);
        setState((prev) => ({
          ...prev,
          note: savedNote,
          isSaving: false,
        }));
        return savedNote;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to save note';
        setState((prev) => ({
          ...prev,
          error: errorMessage,
          isSaving: false,
        }));
        throw err;
      }
    },
    []
  );

  const removeNote = useCallback(async (companyId: string) => {
    setState((prev) => ({ ...prev, isSaving: true, error: null }));

    try {
      await deleteNoteForCompany(companyId);
      setState((prev) => ({
        ...prev,
        note: null,
        isSaving: false,
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete note';
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        isSaving: false,
      }));
      throw err;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      note: null,
      isLoading: false,
      error: null,
      isSaving: false,
    });
  }, []);

  return {
    ...state,
    fetchNote,
    saveNote,
    removeNote,
    reset,
  };
};
