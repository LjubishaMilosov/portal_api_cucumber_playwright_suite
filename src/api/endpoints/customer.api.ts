/**
 * Customer API Endpoints
 * Centralizes: GetDetails
 */

import { ICustomWorld } from '../../world';
import { makeGetRequest } from '../../support/utils/apiUtils';

/**
 * Fetches customer details
 * GET /customer/GetDetails?playerId=XXX
 */
export async function fetchCustomerDetails(world: ICustomWorld, playerId: string) {
  return makeGetRequest(world, '/customer/GetDetails', { playerId });
}
