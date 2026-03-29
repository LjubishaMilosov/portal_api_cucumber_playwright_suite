/**
 * API Utilities
 * Core HTTP request functions
 * CI/CD appropriate: Reusable, testable, with consistent error handling
 */

import { APIResponse, expect } from '@playwright/test';
import { ICustomWorld } from '../../world';
import { baseUrl, apiKey } from './configUtils';
import { APILogger } from './logger';

/**
 * Makes a GET request
 *
 * @param world - Cucumber world with API context
 * @param endpoint - API endpoint (e.g., '/base/GetCountries')
 * @param queryParams - Optional query parameters
 * @param expectedStatus - Optional status code to assert
 * @param logger - Optional logger for debugging
 * @returns APIResponse from Playwright
 */
export async function makeGetRequest(
  world: ICustomWorld,
  endpoint: string,
  queryParams: Record<string, string> = {},
  expectedStatus?: number,
  logger?: APILogger,
): Promise<APIResponse> {
  const baseApiUrl = baseUrl();
  const url = new URL(`${baseApiUrl}api${endpoint}`);
  const key = apiKey();

  // Add query parameters
  Object.keys(queryParams).forEach((paramKey) => url.searchParams.append(paramKey, queryParams[paramKey]));

  if (!world.apiContext) {
    throw new Error('API context not initialized. Ensure hooks are configured.');
  }

  const headers = {
    accept: '*/*',
    ...(key && { 'X-API-KEY': key }),
  };

  if (logger) {
    logger.logRequest('GET', url.toString(), headers);
  }

  const response = await world.apiContext.get(url.toString(), {
    headers,
    timeout: 60000,
  });

  if (logger) {
    const responseBody = await response.text();
    logger.logResponse(response.status(), responseBody);
  }

  if (expectedStatus !== undefined) {
    expect(response.status()).toBe(expectedStatus);
  }

  return response;
}

/**
 * Makes a POST request
 *
 * @param world - Cucumber world with API context
 * @param endpoint - API endpoint
 * @param body - Request body
 * @param queryParams - Optional query parameters
 * @param expectedStatus - Optional status code to assert
 * @param logger - Optional logger for debugging
 * @returns APIResponse from Playwright
 */
export async function makePostRequest(
  world: ICustomWorld,
  endpoint: string,
  body: any,
  queryParams: Record<string, string> = {},
  expectedStatus?: number,
  logger?: APILogger,
): Promise<APIResponse> {
  const baseApiUrl = baseUrl();
  const url = new URL(`${baseApiUrl}api${endpoint}`);
  const key = apiKey();

  Object.keys(queryParams).forEach((paramKey) => url.searchParams.append(paramKey, queryParams[paramKey]));

  if (!world.apiContext) {
    throw new Error('API context not initialized. Ensure hooks are configured.');
  }

  const headers = {
    accept: '*/*',
    'Content-Type': 'application/json',
    ...(key && { 'X-API-KEY': key }),
  };

  if (logger) {
    logger.logRequest('POST', url.toString(), headers, body);
  }

  const response = await world.apiContext.post(url.toString(), {
    data: body,
    headers,
    timeout: 60000,
  });

  if (logger) {
    const responseBody = await response.text();
    logger.logResponse(response.status(), responseBody);
  }

  if (expectedStatus !== undefined) {
    expect(response.status()).toBe(expectedStatus);
  }

  return response;
}

/**
 * Asserts HTTP status code
 *
 * @param response - APIResponse to check
 * @param expectedStatus - Expected status code
 */
export function assertStatusCode(response: APIResponse, expectedStatus: number): void {
  expect(response.status()).toBe(expectedStatus);
}

export default {
  makeGetRequest,
  makePostRequest,
  assertStatusCode,
};
