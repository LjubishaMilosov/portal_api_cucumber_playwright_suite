import { Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { compareDataTables } from '../utils/dataValidators';


Then('I expect the response status to be OK with code {int}', async function (
  this: CustomWorld,
  expectedStatus: number,
) {
  expect(this.status).toBe(expectedStatus);
});


Then('I expect the response status to be one of {string}', async function (
  this: CustomWorld,
  statusCodes: string,
) {
  const validStatuses = statusCodes.split(',').map((code) => parseInt(code.trim(), 10));
  expect(validStatuses).toContain(this.status);
});


Then('I expect the response to contain the following data in {string}', async function (
  this: CustomWorld,
  responseField: string,
  dataTable: DataTable,
) {
  const list = this.responseBody[responseField];

  expect(
    list,
    `Response does not contain field "${responseField}". Available fields: ${Object.keys(
      this.responseBody,
    ).join(', ')}`,
  ).toBeTruthy();

  expect(Array.isArray(list)).toBe(true);

  const expectedRows = dataTable.hashes();
  const fields = Object.keys(expectedRows[0]);

  compareDataTables(list, expectedRows, fields);
});


Then('the response should contain at least {int} items in {string}', async function (
  this: CustomWorld,
  minCount: number,
  field: string,
) {
  const items = this.responseBody[field];
  expect(Array.isArray(items)).toBe(true);
  expect(items.length).toBeGreaterThanOrEqual(minCount);
});


Then('the {string} field should not be empty', async function (this: CustomWorld, field: string) {
  const value = this.responseBody[field];
  expect(value).toBeTruthy();
});
