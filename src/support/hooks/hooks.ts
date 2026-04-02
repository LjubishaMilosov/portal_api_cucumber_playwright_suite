import { Before, After, AfterAll, Status } from '@cucumber/cucumber';
import { request } from '@playwright/test';
import { config } from '../../config/config';
import { CustomWorld } from '../world';
import fs from 'fs';
import path from 'path';

// Ensure reports folder exists
const reportsDir = path.join(process.cwd(), 'reports');

Before(async function (this: CustomWorld) {
  this.apiContext = await request.newContext({
    baseURL: config.apiBaseUrl.replace(/\/+$/, ''),
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey,
    },
  });
});

After(async function (this: CustomWorld, { result, pickle }) {
  After(async function (this: CustomWorld, { result }) {
  if (result?.status === 'FAILED') {
    await this.attach(
      JSON.stringify(this.responseBody, null, 2),
      'application/json'
    );
  }
});

  await this.apiContext?.dispose();
});

AfterAll(async () => {
  console.log('✅ Test run completed. Reports available in /reports');
});