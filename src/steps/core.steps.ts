/**
 * Core API Steps
 * GetCountries, GetCurrencies, GetLanguages
 */

import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../world';
import {
  fetchCountries,
  fetchCurrencies,
  fetchLanguages,
} from '../api/endpoints/core.api';
import { executeFetch } from '../support/utils';
import {
  countriesSchema,
  currenciesSchema,
  languagesSchema,
} from '../api/schemas/core.schema';
import { validateSchema } from '../validators/schemaValidator';

// ==================== GetCountries ====================

When('I make a GET request to fetch all countries', async function (this: ICustomWorld) {
  await executeFetch(this, fetchCountries, './reports/debug/countries.json');
});

Then('The response should match the countries schema', async function (this: ICustomWorld) {
  validateSchema(countriesSchema, this.responseBody, 'Countries');
});

// ==================== GetCurrencies ====================

When('I make a GET request to fetch all currencies', async function (this: ICustomWorld) {
  await executeFetch(this, fetchCurrencies, './reports/debug/currencies.json');
});

Then('I expect the response to have currencies data', async function (this: ICustomWorld) {
  const data = this.responseBody;
  expect(data).toBeTruthy();
  expect(data.Currencies).toBeTruthy();
  expect(Array.isArray(data.Currencies)).toBe(true);
  expect(data.Currencies.length).toBeGreaterThan(0);
  validateSchema(currenciesSchema, this.responseBody, 'Currencies');
});

// ==================== GetLanguages ====================

When('I make a GET request to fetch all languages', async function (this: ICustomWorld) {
  await executeFetch(this, fetchLanguages, './reports/debug/languages.json');
});

Then('I expect the response to have languages data', async function (this: ICustomWorld) {
  const data = this.responseBody;
  expect(data).toBeTruthy();
  expect(data.Languages).toBeTruthy();
  expect(Array.isArray(data.Languages)).toBe(true);
  expect(data.Languages.length).toBeGreaterThan(0);
  validateSchema(languagesSchema, this.responseBody, 'Languages');
});
