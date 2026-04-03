// Utility to convert string 'null'/'undefined' to JS null/undefined in expectedRows
function normalizeNulls(rows: any[]): any[] {
  return rows.map(row =>
    Object.fromEntries(
      Object.entries(row).map(([k, v]) => [
        k,
        v === 'null' ? null : v === 'undefined' ? undefined : v,
      ])
    )
  );
}
import { Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { compareDataTables } from '../utils/dataValidators';


Then('I expect the response status to be OK with code {int}', async function (
  this: CustomWorld,
  expectedStatus: number,
) {
  if (this.status !== expectedStatus) {
  }
  expect(this.status).toBe(expectedStatus);
});


Then('I expect the response status to be one of {string}', async function (
  this: CustomWorld,
  statusCodes: string,
) {
  const validStatuses = statusCodes.split(',').map((code) => parseInt(code.trim(), 10));
  if (!validStatuses.includes(this.status)) {
  }
  expect(validStatuses).toContain(this.status);
});


Then('I expect the response to contain the following data in {string}', async function (
  this: CustomWorld,
  responseField: string,
  dataTable: DataTable,
) {
  const list = this.responseBody[responseField];
  if (!list) {
  }

  expect(
    list,
    `Response does not contain field "${responseField}". Available fields: ${Object.keys(
      this.responseBody,
    ).join(', ')}`,
  ).toBeTruthy();

  expect(Array.isArray(list)).toBe(true);

  const expectedRows = normalizeNulls(dataTable.hashes());
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
