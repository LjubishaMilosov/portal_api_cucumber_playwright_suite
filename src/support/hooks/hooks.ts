import { Before, After } from '@cucumber/cucumber';
import { request } from '@playwright/test';
import { config } from '../../utils/config';
import { CustomWorld } from '../../world';

Before(async function (this: CustomWorld) {
  const baseApiUrl = config.baseURL.replace(/\/+$/, '');

  this.apiContext = await request.newContext({
    baseURL: baseApiUrl,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  });
});

After(async function (this: CustomWorld) {
  if (this.apiContext) {
    await this.apiContext.dispose();
  }
});