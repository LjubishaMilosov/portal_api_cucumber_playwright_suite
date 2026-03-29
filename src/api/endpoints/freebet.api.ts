import { ICustomWorld } from '../../world';
import { makeGetRequest } from '../../support/utils/apiUtils';

export async function fetchFreeBetBonuses(world: ICustomWorld) {
  return makeGetRequest(world, '/freebet/GetAllFreeBetBonuses');
}
