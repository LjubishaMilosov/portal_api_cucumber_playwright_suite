/**
 * Core API Endpoints
 * Centralizes: GetCountries, GetCurrencies, GetLanguages (Core feature set)
 * Pattern: All endpoints return APIResponse for flexibility in handling
 *
 * Note: This replaces base.api.ts for improved naming clarity.
 * "Core" indicates these are fundamental/core APIs, not "base" (foundation).
 */

import { ICustomWorld } from '../../world';
import { makeGetRequest } from '../../support/utils/apiUtils';

/**
 * Fetches all countries
 * GET /base/GetCountries
 */
export async function fetchCountries(world: ICustomWorld) {
  return makeGetRequest(world, '/base/GetCountries');
}

/**
 * Fetches all currencies
 * GET /base/GetCurrencies
 */
export async function fetchCurrencies(world: ICustomWorld) {
  return makeGetRequest(world, '/base/GetCurrencies');
}

/**
 * Fetches all languages
 * GET /base/GetLanguages
 */
export async function fetchLanguages(world: ICustomWorld) {
  return makeGetRequest(world, '/base/GetLanguages');
}
