import 'dotenv/config';

export const config = {
  baseURL: process.env.API_BASE_URL || 'https://api-bo-core-qa.btobet.net/',
  apiKey: process.env.API_KEY || '',
  internalId: process.env.INTERNALID || '710308',
  defaultGameCode: process.env.DEFAULT_GAME_CODE || 'PPL_PGC_vs7pigs',
};
