import { When } from "@cucumber/cucumber";
import { config } from '../config/config';
import { CustomWorld } from "../support/world";
import { apiPost } from "../utils/request";


When('I make a POST request to update the user', async function (this: CustomWorld) {
  const playerId = config.internalId;
  if (!playerId) throw new Error('INTERNALID must be set in environment variables');
  await apiPost(this, '/customer/UpdateUser', {
    PlayerID: Number(playerId),
    Note: 'updatednote',
  });
});
