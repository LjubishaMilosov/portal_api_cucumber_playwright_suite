/**
 * Login/Register API Endpoints
 * RegisterAccount
 */

import { ICustomWorld } from '../../world';
import { makePostRequest } from '../../support/utils/apiUtils';
import { generateRegistrationPayload } from '../../support/utils/dynamicTestData';

/**
 * Registers a new account with dynamically generated user data
 * POST /customer/RegisterAccount
 */
export async function registerNewAccount(world: ICustomWorld) {
  const payload = generateRegistrationPayload();
  // Store the generated credentials in the world for later verification
  world.testData = {
    registrationPayload: payload,
    email: payload.Customer.CustomerDetails.Email,
    username: payload.Customer.CustomerDetails.Username,
    password: payload.Customer.CustomerDetails.Password,
  };
  console.log('=== RegisterAccount Request Payload ===');
  console.log(JSON.stringify(payload, null, 2));
  console.log('========================================');
  return makePostRequest(world, '/customer/RegisterAccount', payload);
}
