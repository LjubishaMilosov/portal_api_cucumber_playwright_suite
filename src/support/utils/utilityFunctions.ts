/**
 * Utility Functions (Backward Compatibility Module)
 * 
 * Re-exports all utilities from refactored modules
 * Ensures backward compatibility with existing test code
 * 
 * New code should import from specific modules:
 *  - import { makeGetRequest } from './apiUtils'
 *  - import { writeDataToFile } from './fileUtils'
 *  - import { validateSchema } from '../../validators/schemaValidator'
 */

// Re-export everything from refactored modules

// Configuration
export {
  baseUrl,
  apiKey,
  getInternalID,
  getDefaultGameCode,
  config,
} from './configUtils';

// File operations
export { writeDataToFile, readDataFromFile, ensureDirectoryExists } from './fileUtils';

// Logging
export { APILogger } from './logger';

// API utilities
export { makeGetRequest, makePostRequest, assertStatusCode } from './apiUtils';

// Data validation
export {
  compareDataTables,
  handleResponse,
  verifyStatusCode,
  verifyResponseProperty,
} from './dataValidators';
