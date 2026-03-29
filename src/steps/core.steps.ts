import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { apiGet } from '../utils/request';
import { CustomWorld } from '../world';
import { countriesSchema, currenciesSchema, languagesSchema } from '../api/schemas/core.schema';
import { validateSchema } from '../validators/schemaValidator';

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
