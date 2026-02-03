/**
 * API Configuration
 */

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:5062',
  timeout: 10000,
};

/**
 * Get full API endpoint URL
 */
export const getApiUrl = (path: string): string => {
  return `${API_CONFIG.baseUrl}${path}`;
};
