/**
 * CompanySearch Feature Types
 * Types for searching companies in Brønnøysund Register
 * These match the API response structure from backend CompanySearchResponse
 */

export interface OrganizationForm {
  code: string;
  description: string;
}

export interface Address {
  country?: string;
  countryCode?: string;
  postalCode?: string;
  city?: string;
  addressLines?: string[];
  municipality?: string;
  municipalityNumber?: string;
}

/**
 * Company data as returned by API (mapped from external API)
 */
export interface Company {
  organizationNumber: string;
  name: string;
  organizationForm?: OrganizationForm;
  website?: string;
  businessAddress?: Address;
  establishmentDate?: string;
  registeredInVatRegister: boolean;
  bankrupt: boolean;
  underLiquidation: boolean;
  underCompulsoryLiquidationOrDissolution: boolean;
}

/**
 * Search request parameters
 */
export interface CompanySearchRequest {
  query: string;
  page?: number;
  pageSize?: number;
}

/**
 * Search response with pagination
 */
export interface CompanySearchResponse {
  items: Company[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

