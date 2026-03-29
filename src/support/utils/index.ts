/**
 * Utils Index
 * Central export point for all utilities
 * Maintains backward compatibility with existing imports
 */

// Configuration utilities
export { baseUrl, apiKey, getInternalID, getDefaultGameCode, config } from './configUtils';

// File utilities
export { writeDataToFile, readDataFromFile, ensureDirectoryExists } from './fileUtils';

// Logger
export { APILogger } from './logger';

// API utilities
export { makeGetRequest, makePostRequest, assertStatusCode } from './apiUtils';

// Fetch handler (reduced duplication in step definitions)
export { executeFetch } from './fetchHandler';

// Dynamic test data generation
export {
  generateTestEmail,
  generateTestUsername,
  generateTestPassword,
  generateRegistrationPayload,
} from './dynamicTestData';

// Data validators
export {
  compareDataTables,
  handleResponse,
  verifyStatusCode,
  verifyResponseProperty,
} from './dataValidators';

// Re-export from original utilityFunctions for backward compatibility
export { APILogger as UtilityAPILogger } from './logger';

// For tests that still import from utilityFunctions
export { compareDataTables as legacyCompareDataTables } from './dataValidators';
