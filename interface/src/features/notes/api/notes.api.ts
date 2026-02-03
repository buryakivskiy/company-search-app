import { FetchClient } from '@/shared/utils/fetchClient';
import type { Note, CreateOrUpdateNoteRequest } from '../types';

const client = new FetchClient();

/**
 * Get note for a company
 */
export const getNoteForCompany = async (companyId: string): Promise<Note> => {
  return client.get<Note>(`/api/companies/${companyId}/note`);
};

/**
 * Create or update note for a company
 */
export const saveNoteForCompany = async (
  companyId: string,
  data: CreateOrUpdateNoteRequest
): Promise<Note> => {
  return client.put<Note>(`/api/companies/${companyId}/note`, data);
};

/**
 * Delete note for a company
 */
export const deleteNoteForCompany = async (companyId: string): Promise<void> => {
  await client.delete(`/api/companies/${companyId}/note`);
};
