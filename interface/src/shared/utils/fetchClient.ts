/**
 * Fetch Client Wrapper
 * Centralized HTTP client with error handling
 */

import type { ApiError } from '@/shared/types/api.types';
import { API_CONFIG } from '@/app/api/config';

class FetchClient {
  /**
   * Parse error response
   */
  private async parseError(response: Response): Promise<ApiError> {
    try {
      const data = await response.json();
      return {
        statusCode: response.status,
        message: data.message || 'An error occurred',
        errors: data.errors,
      };
    } catch {
      return {
        statusCode: response.status,
        message: `HTTP ${response.status}: ${response.statusText}`,
      };
    }
  }

  /**
   * Generic fetch method with error handling
   */
  private async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await this.parseError(response);
        throw new Error(JSON.stringify(error));
      }

      if (response.status === 204) {
        return undefined as T;
      }

      const text = await response.text();
      if (!text) {
        return undefined as T;
      }

      return JSON.parse(text) as T;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network request failed');
    }
  }

  /**
   * GET request
   */
  async get<T>(path: string): Promise<T> {
    return this.request<T>(`${API_CONFIG.baseUrl}${path}`, {
      method: 'GET',
    });
  }

  /**
   * POST request
   */
  async post<T>(path: string, body?: Record<string, any>): Promise<T> {
    return this.request<T>(`${API_CONFIG.baseUrl}${path}`, {
      method: 'POST',
      body: JSON.stringify(body || {}),
    });
  }

  /**
   * PUT request
   */
  async put<T>(path: string, body?: Record<string, any>): Promise<T> {
    return this.request<T>(`${API_CONFIG.baseUrl}${path}`, {
      method: 'PUT',
      body: JSON.stringify(body || {}),
    });
  }

  /**
   * DELETE request
   */
  async delete<T = void>(path: string): Promise<T> {
    return this.request<T>(`${API_CONFIG.baseUrl}${path}`, {
      method: 'DELETE',
    });
  }
}

export { FetchClient };
export const client = new FetchClient();
