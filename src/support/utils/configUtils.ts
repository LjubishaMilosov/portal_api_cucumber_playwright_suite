/**
 * Configuration Utilities
 * Loads and provides environment configuration
 * CI/CD appropriate: All values from env vars with validation
 */

import 'dotenv/config';

/**
 * Gets API base URL from environment
 */
export function baseUrl(): string {
  const apiUrl = process.env.API_BASE_URL;
  if (!apiUrl) {
    throw new Error('API_BASE_URL is not defined in environment variables');
  }
  return apiUrl;
}

/**
 * Gets API key from environment
 */
export function apiKey(): string {
  return process.env.API_KEY || '';
}

/**
 * Gets internal ID (player/customer ID) from environment
 */
export function getInternalID(): string {
  const internalId = process.env.INTERNALID;
  if (!internalId) {
    throw new Error('INTERNALID is not defined in environment variables');
  }
  return internalId;
}

/**
 * Gets default game code from environment
 */
export function getDefaultGameCode(): string {
  const defaultGameCode = process.env.DEFAULT_GAME_CODE;
  if (!defaultGameCode) {
    throw new Error('DEFAULT_GAME_CODE is not defined in environment variables');
  }
  return defaultGameCode;
}

export const config = {
  apiBaseUrl: baseUrl,
  apiKey,
  internalId: getInternalID,
  defaultGameCode: getDefaultGameCode,
};
