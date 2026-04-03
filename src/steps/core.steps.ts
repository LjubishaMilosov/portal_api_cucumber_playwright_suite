
import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { apiGet } from '../utils/request';
import { CustomWorld } from '../support/world';
import { countriesSchema, currenciesSchema, languagesSchema } from '../schemas/core.schema';
import { validateSchema } from '../utils/schemaValidator';

When('I make a GET request to fetch all countries', async function (this: CustomWorld) {
  await apiGet(this, '/base/GetCountries');
});

Then('The response should match the countries schema', async function (this: CustomWorld) {
  validateSchema(countriesSchema, this.responseBody, 'Countries');
});

When('I make a GET request to fetch all currencies', async function (this: CustomWorld) {
  await apiGet(this, '/base/GetCurrencies');
});

Then('I expect the response to have currencies data', async function (this: CustomWorld) {
  const data = this.responseBody;
  expect(data).toBeTruthy();
  expect(data.Currencies).toBeTruthy();
  expect(Array.isArray(data.Currencies)).toBe(true);
  expect(data.Currencies.length).toBeGreaterThan(0);
  validateSchema(currenciesSchema, this.responseBody, 'Currencies');
});

When('I make a GET request to fetch all languages', async function (this: CustomWorld) {
  await apiGet(this, '/base/GetLanguages');
});

Then('I expect the response to have languages data', async function (this: CustomWorld) {
  const data = this.responseBody;
  expect(data).toBeTruthy();
  expect(data.Languages).toBeTruthy();
  expect(Array.isArray(data.Languages)).toBe(true);
  expect(data.Languages.length).toBeGreaterThan(0);
  validateSchema(languagesSchema, this.responseBody, 'Languages');
});

// Updated endpoints for new API paths
When('I make a GET request to fetch the calculated exchange amount', async function (this: CustomWorld) {
  await apiGet(this, '/api/base/GetCalculatedExchangeAmount');
});

When('I make a GET request to fetch the calculated original amount', async function (this: CustomWorld) {
  await apiGet(this, '/api/base/GetCalculatedOriginalAmount');
});

When('I make a GET request to fetch All game providers', async function (this: CustomWorld) {
  await apiGet(this, '/api/base/GetGameProviders');
});

When('I make a GET request to fetch all portal brands', async function (this: CustomWorld) {
  await apiGet(this, '/api/base/GetPortalBrands');
});

// ...existing code...

// Validate exchange amount and request ID
Then('I expect the response to have a valid exchange amount and request ID', async function (this: CustomWorld) {
  expect(this.responseBody).toBeTruthy();
  expect(this.responseBody.ExchangeAmount).toBeDefined();
  expect(typeof this.responseBody.ExchangeAmount).toBe('number');
  expect(this.responseBody.RequestID).toBeDefined();
});



// ...existing code...