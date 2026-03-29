/**
 * Games API Steps
 * GetGame
 */

import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../world';
import { fetchGameDetails } from '../api/endpoints/games.api';
import { executeFetch, getDefaultGameCode } from '../support/utils';
import { gameDetailsSchema } from '../api/schemas/games.schema';
import { validateSchema } from '../validators/schemaValidator';

When('I make a GET request to fetch game details with default game code', async function (this: ICustomWorld) {
  const gameCode = getDefaultGameCode();
  await executeFetch(
    this,
    (world) => fetchGameDetails(world, gameCode),
    './reports/debug/game.json',
  );
});

Then('I expect the response to have game information', async function (this: ICustomWorld) {
  const data = this.responseBody;
  expect(data).toBeTruthy();
  expect(data.Game).toBeTruthy();
  expect(data.Game.GameCode).toBeTruthy();
  expect(data.Game.GameName).toBeTruthy();

  // Validate against schema
  validateSchema(gameDetailsSchema, this.responseBody, 'GameDetails');
});
