import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { apiGet } from '../utils/request';
import { CustomWorld } from '../world';
import { freeBetBonusesSchema } from '../api/schemas/freebet.schema';
import { validateSchema } from '../validators/schemaValidator';

// ==================== GetAllFreeBetBonuses ====================

When('I make a GET request to fetch all freebet bonuses', async function (this: CustomWorld) {
  await apiGet(this, '/freebet/GetAllFreeBetBonuses');
});

Then('The response should match the freebet bonuses schema', async function (this: CustomWorld) {
  validateSchema(freeBetBonusesSchema, this.responseBody, 'FreebetBonuses');
});

Then('I expect the response to contain freebet bonuses data', async function (this: CustomWorld) {
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
  this: CustomWorld,
  minCount: number,
) {
  const bonuses = this.responseBody.Bonuses;
  expect(Array.isArray(bonuses)).toBe(true);
  expect(bonuses.length).toBeGreaterThanOrEqual(minCount);
});

Then('each freebet bonus should have required fields', async function (this: CustomWorld) {
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
