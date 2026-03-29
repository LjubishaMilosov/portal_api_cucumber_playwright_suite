/**
 * Login/Register API Steps
 * RegisterAccount
 */

import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../world';
import { registerNewAccount } from '../api/endpoints/login-register.api';
import { executeFetch } from '../support/utils';
import { registerAccountResponseSchema } from '../api/schemas/login-register.schema';
import { validateSchema } from '../validators/schemaValidator';

// ==================== RegisterAccount ====================

When('I register a new account with dynamic test user data', async function (this: ICustomWorld) {
  await executeFetch(this, registerNewAccount, './reports/debug/register-account.json');
});

Then('The response should match the register account schema', async function (this: ICustomWorld) {
  // Only validate success schema (200)
  validateSchema(registerAccountResponseSchema, this.responseBody, 'RegisterAccountResponse');
});

Then('the registered account should have a valid InternalID', async function (this: ICustomWorld) {
  const response = this.responseBody;
  expect(response).toBeTruthy();
  expect(response.Customer).toBeTruthy();
  expect(response.Customer.InternalID).toBeTruthy();
  expect(typeof response.Customer.InternalID).toBe('string');
  expect(response.Customer.InternalID.length).toBeGreaterThan(0);
});

Then('the registered account should be logged in with a valid token', async function (
  this: ICustomWorld,
) {
  const response = this.responseBody;
  expect(response.Customer.IsLoggedIn).toBe(false);//for the being user is not loggedin after registration
  expect(response.Customer.Token).toBeTruthy();
  expect(typeof response.Customer.Token).toBe('string');
  expect(response.Customer.Token.length).toBeGreaterThan(0);
});

Then('the registration response should contain activation information', async function (
  this: ICustomWorld,
) {
  const response = this.responseBody;
  expect(response.Activation).toBeTruthy();
  expect(response.Activation.IsActivated).toBeDefined();
  expect(typeof response.Activation.IsActivated).toBe('boolean');
});

Then('I should be able to access the generated user credentials', async function (
  this: ICustomWorld,
) {
  expect(this.testData).toBeTruthy();
  expect(this.testData.email).toBeTruthy();
  expect(this.testData.username).toBeTruthy();
  expect(this.testData.password).toBeTruthy();
  expect(this.testData.email).toMatch(/@btobet\.net$/);
  expect(this.testData.email).toContain('testuser_');
});

Then('the response RequestID should be present and valid', async function (this: ICustomWorld) {
  // For 200 responses, RequestID is at the top level
  const response = this.responseBody;
  expect(response.RequestID).toBeTruthy();
  expect(typeof response.RequestID).toBe('string');
  expect(response.RequestID.length).toBeGreaterThan(0);
});
