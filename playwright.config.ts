import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

    fullyParallel: false,

  forbidOnly: !!process.env.CI,
 
  retries: process.env.CI ? 2 : 0,
 
  workers: process.env.CI ? 1 : undefined,

  reporter: [['html'], ['list']],


  use: {
       trace: 'on-first-retry',
  },

  projects: [

    {
      name: 'API-testing',
    },
  ],

});

