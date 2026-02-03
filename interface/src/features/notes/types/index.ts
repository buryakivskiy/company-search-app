/**
 * Notes Feature Types
 * Types for managing company notes
 */

export interface Note {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrUpdateNoteRequest {
  content: string;
}
