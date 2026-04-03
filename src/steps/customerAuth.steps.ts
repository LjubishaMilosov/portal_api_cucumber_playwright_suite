import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { apiGet } from '../utils/request';


When('I make a GET request to fetch user online token', async function (this: CustomWorld) {
  const userId = Number(process.env.INTERNALID);
  if (!userId) throw new Error('INTERNALID must be set in environment variables');
  await apiGet(this, '/customer/GetUserOnlineToken', { userID: userId });
});

Then('I expect the  response to contain the correct user online token', async function (this: CustomWorld) {
  expect(this.responseBody).toBeTruthy();
  expect(typeof this.responseBody).toBe('string');
  expect(this.responseBody.length).toBeGreaterThan(10);
});