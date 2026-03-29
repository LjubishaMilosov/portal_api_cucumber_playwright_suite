/**
 * Data Validators
 * Business logic validation for API responses
 * CI/CD appropriate: Thrown errors include full context for troubleshooting
 */

import { APIResponse, expect } from '@playwright/test';
import { CustomWorld } from '../../world';

/**
 * Compares actual data with expected data using primary key matching
 * Throws detailed error on mismatch
 *
 * @param actual - Actual data array from API
 * @param expected - Expected data array
 * @param matchFields - Fields to match and compare
 * @throws Error with detailed mismatch information
 */
export function compareDataTables(actual: any[], expected: any[], matchFields: string[]): void {
  if (!Array.isArray(actual)) {
    throw new Error(
      `Expected an array but got ${typeof actual}. Actual value: ${JSON.stringify(actual)}`,
    );
  }

  if (!Array.isArray(expected)) {
    throw new Error('Expected must be an array');
  }

  expected.forEach((expectedRow) => {
    // Use first field as primary key
    const primaryKey = matchFields[0];
    const primaryKeyValue = expectedRow[primaryKey];

    const matchingRow = actual.find(
      (actualRow) => actualRow[primaryKey]?.toString() === primaryKeyValue?.toString(),
    );

    if (!matchingRow) {
      throw new Error(
        `Row not found for ${primaryKey}=${primaryKeyValue}\n` +
        `Expected row: ${JSON.stringify(expectedRow)}\n` +
        `Available rows with key=${primaryKey}:\n${actual.map((row) => `  - ${row[primaryKey]}`).join('\n')}`,
      );
    }

    // Compare each field
    const mismatches: string[] = [];
    matchFields.forEach((field) => {
      const actualValue = matchingRow[field]?.toString() ?? 'undefined';
      const expectedValue = expectedRow[field]?.toString() ?? 'undefined';

      if (actualValue !== expectedValue) {
        mismatches.push(`Field "${field}": expected "${expectedValue}", got "${actualValue}"`);
      }
    });

    if (mismatches.length > 0) {
      throw new Error(
        `Data mismatch for ${primaryKey}=${primaryKeyValue}:\n  ${mismatches.join('\n  ')}`,
      );
    }
  });
}

/**
 * Handles API response and stores status/body in world
 *
 * @param world - Cucumber world
 * @param response - Playwright APIResponse
 * @returns Parsed JSON response body
 */
export async function handleResponse(world: CustomWorld, response: APIResponse): Promise<any> {
  world.status = response.status();
  world.response = response;

  try {
    world.responseBody = await response.json();
  } catch (error) {
    // If response is not JSON, store as text
    world.responseBody = await response.text();
  }

  return world.responseBody;
}

/**
 * Verifies status code
 *
 * @param world - Cucumber world
 * @param expectedStatus - Expected HTTP status code
 */
export function verifyStatusCode(world: CustomWorld, expectedStatus: number): void {
  expect(world.status).toBe(expectedStatus);
}

/**
 * Verifies a nested property in response
 *
 * @param response - Response object
 * @param propertyPath - Path to property (e.g., 'Customer.Account.Email')
 * @param expectedValue - Optional expected value
 * @returns The property value
 */
export function verifyResponseProperty(response: any, propertyPath: string, expectedValue?: any): any {
  const keys = propertyPath.split('.');
  let value = response;

  for (const key of keys) {
    expect(value).toHaveProperty(key);
    value = value[key];
  }

  if (expectedValue !== undefined) {
    expect(value).toBe(expectedValue);
  }

  return value;
}

export default {
  compareDataTables,
  handleResponse,
  verifyStatusCode,
  verifyResponseProperty,
};
