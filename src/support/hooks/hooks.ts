import { Before, After } from '@cucumber/cucumber';
import { request } from '@playwright/test';
import { ICustomWorld } from '../../world';
import 'dotenv/config';

Before(async function (this: ICustomWorld) {
  const baseApiUrl = process.env.API_BASE_URL;
  this.apiContext = await request.newContext({ baseURL: baseApiUrl });
});

After(async function (this: ICustomWorld) {
  if (this.apiContext) {
    await this.apiContext.dispose();
  }
});