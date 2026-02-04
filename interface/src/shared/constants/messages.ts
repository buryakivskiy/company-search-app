/**
 * Shared UI Messages and Strings (Norwegian)
 * Centralized place for all user-facing text strings
 */

export const SEARCH_MESSAGES = {
  // Search states
  SEARCHING: 'Søker...',
  NO_RESULTS: 'Ingen resultater funnet',
  EMPTY_SEARCH: 'Skriv inn firmanavn for å søke',
  SEARCH_PLACEHOLDER: 'Søk etter firma...',
  SEARCH_RESULTS_TITLE: 'Søkeresultater fra Brønnøysund',
  SEARCH_ERROR: 'Søkefeil',
  
  // Pagination
  PREVIOUS_BUTTON: 'Forrige',
  NEXT_BUTTON: 'Neste',
  PAGE_OF: 'Side',
  
  // Status
  ORG_NR_LABEL: 'Org.nr:',
} as const;

export const SAVED_COMPANIES_MESSAGES = {
  // Section header
  TITLE: 'Mine kunder',
  
  // States
  LOADING: 'Laster kunder...',
  SEARCHING: 'Søker kunder...',
  ERROR: 'Feil ved lasting av kunder',
  EMPTY: 'Ingen lagrede kunder ennå',
  NO_SEARCH_RESULTS: 'Ingen kunder funnet for søket',
  
  // Actions
  DELETE_BUTTON: 'Slett',
  CONFIRM_DELETE: 'Er du sikker på at du vil slette "{companyName}"?',
  
  // Date
  CREATED_AT: 'Lagt til:',
} as const;

export const NOTE_MESSAGES = {
  // Section
  SELECTED_COMPANY_LABEL: 'Org.nr:',
  NO_COMPANY_SELECTED: 'Velg et firma fra søkeresultatene',
  
  // Loading
  LOADING: 'Laster notat...',
  
  // Textarea
  PLACEHOLDER: 'Legg til notat om kunden her...',
  
  // Buttons
  CANCEL_BUTTON: 'Avbryt',
  SAVE_BUTTON: 'Lagre notat',
  SAVE_AND_CREATE_BUTTON: 'Lagre og legg til',
  SAVING: 'Lagrer...',
} as const;

export const COMPANY_SEARCH_SECTION = {
  TITLE: 'Legg til ny kunde',
} as const;

export const ERROR_MESSAGES = {
  SAVE_COMPANY_ERROR: 'Feil ved lagring av kunde',
} as const;
