
import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { apiGet, apiPost } from '../utils/request';
import { config } from '../config/config';
import { CustomWorld } from '../support/world';
import { customerDetailsSchema } from '../schemas/customer.schema';
import { validateSchema } from '../utils/schemaValidator';

// Steps for migrated GetBalance.feature
When('I make a GET request to fetch user\'s balance', async function (this: CustomWorld) {
  const playerId = config.internalId;
  if (!playerId) throw new Error('INTERNALID must be set in environment variables');
  await apiGet(this, '/customer/GetBalance', { playerID: playerId });
});

Then('I expect the response to have correct user\'s balance details', async function (this: CustomWorld) {
  const data = this.responseBody;
  expect(data).toBeTruthy();
  expect(data.Real).toBeDefined();
  expect(typeof data.Real).toBe('number');
  expect(data.Bonus).toBeDefined();
  expect(typeof data.Bonus).toBe('number');
  expect(data.CurrencyISO).toBeDefined();
  expect(typeof data.CurrencyISO).toBe('string');
  expect(data.KYCStatus).toBeDefined();
  expect(typeof data.KYCStatus).toBe('string');
  expect(data.WithdrawableAmount).toBeDefined();
  expect(typeof data.WithdrawableAmount).toBe('number');
  expect(data.IdentityStatus).toBeDefined();
  expect(typeof data.IdentityStatus).toBe('string');
});

// Steps for migrated GetBalanceWithTax.feature
When('I make a GET request to get user\'s balance with tax', async function (this: CustomWorld) {
  const playerId = config.internalId;
  if (!playerId) throw new Error('INTERNALID must be set in environment variables');
  await apiGet(this, '/customer/GetBalanceWithTax', { playerID: playerId });
});

Then('I expect the response to have the correct user\'s balance details with tax', async function (this: CustomWorld) {
  const data = this.responseBody;
  expect(data).toBeTruthy();
  expect(data.WithdrawableAmount).toBeDefined();
  expect(typeof data.WithdrawableAmount).toBe('number');
  expect(data.TaxAmount).toBeDefined();
  expect(typeof data.TaxAmount).toBe('number');
  expect(data.WithdrawableAmountFormated).toBeDefined();
  expect(typeof data.WithdrawableAmountFormated).toBe('string');
  expect(data.TaxAmountFormated).toBeDefined();
  expect(typeof data.TaxAmountFormated).toBe('string');
  expect(data.CurrencySymbol).toBeDefined();
  expect(typeof data.CurrencySymbol).toBe('string');
});

// Steps for migrated GetDetailsAlternative.feature
When('I make a GET request to fetch user details alternative', async function (this: CustomWorld) {
  const email = config.defaultEmail;
  if (!email) throw new Error('DEFAULT_EMAIL must be set in environment variables');
  await apiGet(this, '/customer/GetDetailsAlternative', { email });
});

Then('I expect the  Get User Details and Get User Detail Alternative responses to have correct user details', async function (this: CustomWorld, dataTable) {
  const data = this.responseBody;
  expect(data).toBeTruthy();
  expect(data.Customer).toBeTruthy();
  // Optionally: compareDataTables([data.Customer], dataTable.hashes(), Object.keys(dataTable.hashes()[0]));
});

When('I make a GET request to get customer details', async function (this: CustomWorld) {
  const playerId = config.internalId;
  const returnSegments = config.returnSegmentsTrue;
  const checkIsLoggedIn = config.checksIsLoggedIn;
  if (!playerId) throw new Error('INTERNALID must be set in environment variables');
  await apiGet(this, '/customer/GetDetails', {
    playerID: playerId,
    returnSegments: returnSegments,
    checkIsLoggedIn: checkIsLoggedIn,
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

