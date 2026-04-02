import 'dotenv/config';

export const config = {
  apiBaseUrl: process.env.API_BASE_URL || 'https://api-bo-core-qa.btobet.net',
  apiKey: process.env.API_KEY || '',
  internalId: process.env.INTERNALID || '',
  defaultGameCode: process.env.DEFAULT_GAME_CODE || '',
};