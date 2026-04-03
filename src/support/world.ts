import { setWorldConstructor, World } from '@cucumber/cucumber';
import { APIRequestContext, APIResponse } from '@playwright/test';

export class CustomWorld extends World {
  apiContext!: APIRequestContext;
  response!: APIResponse;
  responseBody!: any;
  status!: number;
}

setWorldConstructor(CustomWorld);

