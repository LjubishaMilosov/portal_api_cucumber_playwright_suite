import { IWorldOptions, World, setWorldConstructor } from '@cucumber/cucumber';

import { APIRequestContext, APIResponse } from '@playwright/test';



export interface ICustomWorld extends World {

  apiContext?: APIRequestContext;

  response?: APIResponse;

  responseBody?: any;

  responseData?: any;

  status?: number;

  testData?: any;

}



export class CustomWorld extends World implements ICustomWorld {

  apiContext?: APIRequestContext;

  response?: APIResponse;

  responseBody?: any;

  responseData?: any;

  status?: number;

  testData?: any;



  constructor(options: IWorldOptions) {

    super(options);

  }

}



setWorldConstructor(CustomWorld);

