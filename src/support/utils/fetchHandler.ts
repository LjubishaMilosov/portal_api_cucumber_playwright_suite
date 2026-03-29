/**
 * Fetch Handler Utility
 * Centralized fetch pattern: request → handle → write debug file
 * Reduces code duplication across step definitions
 * CI/CD appropriate: Reusable, testable, with consistent error handling
 */

import { APIResponse } from '@playwright/test';
import { ICustomWorld } from '../../world';
import { handleResponse, writeDataToFile } from './index';

/**
 * Executes a fetch operation with standard pattern:
 * 1. Calls API fetcher function
 * 2. Handles response (sets world.status, world.responseBody)
 * 3. Writes response to debug file for troubleshooting
 *
 * @param world - Cucumber world instance
 * @param fetcher - Function that returns APIResponse promise
 * @param debugFilePath - Path to write debug output (e.g., './reports/debug/countries.json')
 * @example
 * When('I fetch countries', async function (this: ICustomWorld) {
 *   await executeFetch(this, (w) => fetchCountries(w), './reports/debug/countries.json');
 * });
 */
export async function executeFetch(
  world: ICustomWorld,
  fetcher: (world: ICustomWorld) => Promise<APIResponse>,
  debugFilePath: string,
): Promise<void> {
  const response = await fetcher(world);
  await handleResponse(world, response);
  writeDataToFile(debugFilePath, world.responseBody);
}
