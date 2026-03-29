/**
 * Freebet API Steps
 * GetAllFreeBetBonuses
 */

import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../world';
import { fetchFreeBetBonuses } from '../api/endpoints/freebet.api';
import { executeFetch } from '../support/utils';
import { freeBetBonusesSchema } from '../api/schemas/freebet.schema';
import { validateSchema } from '../validators/schemaValidator';

// ==================== GetAllFreeBetBonuses ====================

When('I make a GET request to fetch all freebet bonuses', async function (this: ICustomWorld) {
  await executeFetch(this, fetchFreeBetBonuses, './reports/debug/freebets.json');
});

Then('The response should match the freebet bonuses schema', async function (this: ICustomWorld) {
  validateSchema(freeBetBonusesSchema, this.responseBody, 'FreebetBonuses');
});

Then('I expect the response to contain freebet bonuses data', async function (this: ICustomWorld) {
  const data = this.responseBody;
  expect(data).toBeTruthy();
  expect(data.Bonuses).toBeTruthy();
  expect(Array.isArray(data.Bonuses)).toBe(true);
  expect(data.Bonuses.length).toBeGreaterThan(0);
  expect(data.FreeRounds).toBeDefined();
  expect(data.FreePlays).toBeDefined();
  expect(data.RequestID).toBeTruthy();
  validateSchema(freeBetBonusesSchema, this.responseBody, 'FreebetBonuses');
});

Then('the freebet bonus list should contain at least {int} bonuses', async function (
  this: ICustomWorld,
  minCount: number,
) {
  const bonuses = this.responseBody.Bonuses;
  expect(Array.isArray(bonuses)).toBe(true);
  expect(bonuses.length).toBeGreaterThanOrEqual(minCount);
});

Then('each freebet bonus should have required fields', async function (this: ICustomWorld) {
  const bonuses = this.responseBody.Bonuses;
  const requiredFields = [
    'BonusType',
    'BonusID',
    'CurrentVersionID',
    'Trigger',
    'Name',
    'AppliedOn',
    'ActivatesOn',
    'MinAmount',
    'MaxAmount',
    'Percentage',
    'Turnover',
    'ExpiryDaysAfterAwarding',
    'OccurenceID',
    'OccurenceNumber',
  ];

  bonuses.forEach((bonus: any, index: number) => {
    requiredFields.forEach((field) => {
      expect(bonus[field], `Bonus at index ${index} missing required field: ${field}`).toBeDefined();
    });
  });
});
