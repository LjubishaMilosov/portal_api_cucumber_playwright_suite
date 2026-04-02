import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { apiGet } from '../utils/request';
import { config } from '../config/config';
import { CustomWorld } from '../support/world';

When('I make a GET request to fetch game details with default game code', async function (this: CustomWorld) {
  if (!config.defaultGameCode) {
    throw new Error('DEFAULT_GAME_CODE must be set in environment variables');
  }

  await apiGet(this, '/games/GetGame', { gameCode: config.defaultGameCode });
});

Then('I expect the response to have game information', async function (this: CustomWorld) {
  const data = this.responseBody;
  expect(data).toBeTruthy();
  expect(data.Game).toBeTruthy();
  expect(data.Game.GameCode).toBeTruthy();
  expect(data.Game.GameName).toBeTruthy();
});
