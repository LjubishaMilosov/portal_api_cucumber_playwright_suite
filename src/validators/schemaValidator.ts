/**
 * Schema Validator Utility
 * Uses Ajv for comprehensive JSON schema validation
 * CI/CD appropriate: Non-blocking exceptions with detailed error messages
 */

import Ajv from 'ajv';
import addFormats from 'ajv-formats';

// Initialize Ajv with strict mode
const ajv = new Ajv({
  strict: true,
  allErrors: true,
  verbose: true,
});

// Add format validators for email, date, etc.
addFormats(ajv);

/**
 * Validates data against a JSON schema
 * Throws detailed error on validation failure
 *
 * @param schema - JSON Schema object
 * @param data - Data to validate
 * @param schemaName - Optional name for better error messaging
 * @returns true if valid
 * @throws Error with detailed validation errors
 */
export function validateSchema(schema: any, data: any, schemaName: string = 'Schema'): boolean {
  try {
    const validate = ajv.compile(schema);
    const isValid = validate(data);

    if (!isValid) {
      const errorMessages = validate.errors
        ?.map((error) => {
          const path = error.instancePath || '/';
          const message = error.message;
          return `  ❌ ${path} - ${message}`;
        })
        .join('\n');

      throw new Error(
        `${schemaName} validation failed:\n${errorMessages || 'Unknown validation error'}`,
      );
    }

    return true;
  } catch (error: any) {
    // Re-throw Ajv compilation errors with context
    if (error.message.includes('schema')) {
      throw new Error(`Schema compilation error: ${error.message}`);
    }
    throw error;
  }
}

/**
 * Validates and returns validation result (non-throwing version)
 * Useful for conditional validation logic
 *
 * @param schema - JSON Schema object
 * @param data - Data to validate
 * @returns { isValid: boolean, errors: string[] }
 */
export function validateSchemaQuiet(
  schema: any,
  data: any,
): { isValid: boolean; errors: string[] } {
  try {
    const validate = ajv.compile(schema);
    const isValid = validate(data);

    if (!isValid) {
      const errors = (validate.errors || []).map((error) => {
        const path = error.instancePath || '/';
        return `${path} - ${error.message}`;
      });
      return { isValid: false, errors };
    }

    return { isValid: true, errors: [] };
  } catch (error: any) {
    return {
      isValid: false,
      errors: [`Schema error: ${error.message}`],
    };
  }
}

export default {
  validateSchema,
  validateSchemaQuiet,
};
