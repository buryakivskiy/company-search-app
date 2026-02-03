/**
 * Companies Feature Types
 * Types for managing saved companies
 */

export interface SavedCompany {
  id: string;
  organizationNumber: string;
  name: string;
  address?: string;
  createdAt: string;
}

export interface CreateCompanyRequest {
  organizationNumber: string;
  name: string;
  address?: string;
}

export interface UpdateCompanyRequest {
  name?: string;
  address?: string;
}
