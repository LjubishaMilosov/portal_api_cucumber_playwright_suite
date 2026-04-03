import { Before, After, AfterAll, Status } from '@cucumber/cucumber';
import { request } from '@playwright/test';
import { config } from '../../config/config';
import { CustomWorld } from '../world';

Before(async function (this: CustomWorld) {
  this.apiContext = await request.newContext({
    baseURL: config.apiBaseUrl.replace(/\/+$/, ''),
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey,
    },
  });
});

After(async function (this: CustomWorld, { result }) {
  if (result?.status === Status.FAILED) {
    const attachment =
      this.responseBody === undefined
        ? 'No response body captured.'
        : JSON.stringify(this.responseBody, null, 2);
    await this.attach(attachment, 'application/json');
  }

  await this.apiContext?.dispose();
});

AfterAll(async () => {
});