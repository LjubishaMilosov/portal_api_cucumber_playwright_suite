/**
 * Games API Endpoints
 * Centralizes: GetGame
 */

import { ICustomWorld } from '../../world';
import { makeGetRequest } from '../../support/utils/apiUtils';

/**
 * Fetches game details
 * GET /games/GetGame?gameCode=XXX
 */
export async function fetchGameDetails(world: ICustomWorld, gameCode: string) {
  return makeGetRequest(world, '/games/GetGame', { gameCode });
}
