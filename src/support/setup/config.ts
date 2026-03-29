import 'dotenv/config';

export const API_BASE_URL =
  process.env.API_BASE_URL || 'https://api-bo-core-qa.btobet.net/';
export const API_KEY = process.env.API_KEY || '';
export const INTERNAL_ID = process.env.INTERNALID || '';
export const DEFAULT_GAME_CODE = process.env.DEFAULT_GAME_CODE || '';

export const config = {
  apiBaseUrl: API_BASE_URL,
  apiKey: API_KEY,
  internalId: INTERNAL_ID,
  defaultGameCode: DEFAULT_GAME_CODE,
};

