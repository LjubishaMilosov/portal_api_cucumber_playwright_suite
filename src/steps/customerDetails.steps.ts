/**
 * Customer API Steps
 * GetDetails
 */

import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../world';
import { fetchCustomerDetails } from '../api/endpoints/customer.api';
import { executeFetch, getInternalID } from '../support/utils';
import { customerDetailsSchema } from '../api/schemas/customer.schema';
import { validateSchema } from '../validators/schemaValidator';

When('I make a POST request to get customer details', async function (this: ICustomWorld) {
  const playerId = getInternalID();
  console.log(`Using playerId: ${playerId} for GetDetails request`);
  await executeFetch(
    this,
    (world) => fetchCustomerDetails(world, playerId),
    './reports/debug/details.json',
  );
});

Then('I expect the response to have customer information', async function (this: ICustomWorld) {
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
