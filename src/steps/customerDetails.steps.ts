/**
 * Customer API Steps
 * GetDetails
 */

import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { apiGet } from '../utils/request';
import { config } from '../utils/config';
import { CustomWorld } from '../world';
import { customerDetailsSchema } from '../api/schemas/customer.schema';
import { validateSchema } from '../validators/schemaValidator';

When('I make a GET request to get customer details', async function (this: CustomWorld) {
  const playerId = config.internalId;
  if (!playerId) {
    throw new Error('INTERNALID must be set in environment variables');
  }

  console.log(`Using playerId: ${playerId} for GetDetails request`);
  await apiGet(this, '/customer/GetDetails', {
    playerID: playerId,
    returnSegments: false,
    checkIsLoggedIn: false,
  });
});

Then('I expect the response to have customer information', async function (this: CustomWorld) {
  const data = this.responseBody;
  expect(data).toBeTruthy();
  expect(data.Customer).toBeTruthy();
  expect(data.Customer.Account).toBeTruthy();
  expect(data.Customer.Account.InternalID).toBeTruthy();
  expect(data.Customer.Account.Username).toBeTruthy();
  expect(data.Customer.Account.Email).toBeTruthy();

  // Validate against schema
  validateSchema(customerDetailsSchema, this.responseBody, 'CustomerDetails');
});
