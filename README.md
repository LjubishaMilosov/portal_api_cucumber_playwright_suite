# BtoBet API Automation Testing Suite



This project is a BDD-style API automation testing suite using Cucumber and Playwright for testing GP Portal API.



## Project Structure



```

.

├── features/              # Gherkin feature files organized by domain

│   ├── Core/             # Core API endpoints (GetCountries, GetCurrencies, etc.)

│   ├── Customer/         # Customer endpoints

│   └── Games/            # Games endpoints

├── src/

│   ├── world.ts          # Cucumber world setup

│   ├── support/

│   │   ├── hooks/        # Cucumber hooks (Before, After)

│   │   ├── setup/        # Configuration

│   │   └── utils/        # Shared utility functions

│   ├── tests/            # Step definitions organized by domain

│   │   ├── shared.tests.ts

│   │   ├── Core/

│   │   ├── Customer/

│   │   └── Games/

│   └── pages/            # Page Object Model (optional)

├── data/                 # Response data files (generated during tests)

├── reports/              # Test reports (generated)

├── .env                  # Environment variables (not in repo)

├── cucumber.mjs          # Cucumber configuration

└── package.json

```



## Setup



### 1. Install Dependencies



```bash

npm install

```



### 2. Configure Environment Variables



Edit `.env` file with your credentials:



```env

API_KEY=your_api_key_here

API_BASE_URL=your_url_here

INTERNALID=your_internal_id

DEFAULT_GAME_CODE=your_default_game_code

```



### 3. Run Tests



**Run all tests:**



```bash

npm test

```



**Run only @dev tagged tests:**



```bash

npm run test:dev

```



**Run with debug output:**



```bash

npm run test:debug

```



**Generate test snippets:**



```bash

npm run snippets

```



## Key Features



- **BDD Approach**: Tests are written in Gherkin language for readability

- **Organized Structure**: Features and step definitions organized by API domain

- **Advanced API Utilities**: Fluent request builder, automatic assertions, and integrated logging

- **Environment Management**: Credentials and configuration via `.env` file

- **Reusable Utilities**: Helper functions for common API operations

- **Data Management**: Test data stored in `data/` folder for reference

- **HTML Reports**: Cucumber reports generated in `reports/` folder



## Advanced API Testing Features



### Request Builder (Fluent API)



For complex API workflows with incremental request building:



```typescript

import {

  RequestBuilder,

  APILogger,

} from './src/support/utils/utilityFunctions';



const logger = new APILogger();

const response = await new RequestBuilder(world)

  .path('/api/users')

  .params({ page: '1', limit: '10' })

  .header('Authorization', 'Bearer token')

  .data({ filter: 'active' })

  .expectStatus(200)

  .withLogger(logger)

  .post();

```



### Automatic Assertions



Built-in status code validation reduces boilerplate:



```typescript

// Automatic assertion

const response = await makeGetRequest(world, '/countries', {}, 200);

```



### Integrated Logging



Detailed request/response logging for debugging:



```typescript

const logger = new APILogger();

await makePostRequest(world, '/users', userData, {}, 201, logger);

console.log(logger.getRecentLogs());

```



## VS Code Configuration



For optimal development experience, configure VS Code with these settings:



### Editor Settings



- Tab Size: 2 spaces

- Format on Save: Enabled

- Default Formatter: Prettier for TypeScript/JavaScript



### Code Quality



- ESLint: Enabled with auto-fix on save

- Prettier: Configured for consistent formatting



### Cucumber Support



- Feature files auto-synced from `features/**/*.feature`

- Step definitions detected from `src/tests/**/*.ts`



## Security Guidelines



### Never Commit These Files



- `.env` (API keys and credentials)

- `data/*.json` (API responses may contain sensitive data)

- `reports/` (test data)

- Any files containing JWT tokens, passwords, or certificates



### Environment Setup



1. Clone repository

2. Copy `.env.example` to `.env`

3. Add your API credentials to `.env`



## Integration & Architecture Changes



### Recent Improvements



- **Cucumber Config**: Centralized in `cucumber.mjs`

- **World Setup**: Proper TypeScript implementation extending Cucumber's World

- **Environment Management**: All credentials in `.env`

- **Utilities**: Shared functions for GET, POST, PUT requests

- **Organization**: Domain-based folder structure

- **Hooks**: Per-scenario setup/cleanup

- **Reports**: HTML and JUnit XML generation



### Directory Structure



```

src/

  ├── world.ts                      # Cucumber world with proper typing

  ├── support/

  │   ├── hooks/

  │   │   └── hooks.ts             # Before/After hooks

  │   ├── setup/

  │   │   └── config.ts            # Centralized config

  │   └── utils/

  │       └── utilityFunctions.ts   # Shared API helpers

  └── tests/

      ├── shared.tests.ts          # Common test utilities

      ├── Core/                    # Core API endpoints

      ├── Customer/               # Customer endpoints

      └── Games/                  # Games endpoints



features/

  ├── Core/

  ├── Customer/

  └── Games/



data/                             # Test data responses (generated)

reports/                          # Test reports (generated)

```



- `verifyStatusCode()`: Assert response status codes



## Writing New Tests



### 1. Create a Feature File



Create a new file in `features/YourDomain/YourFeature.feature`:



```gherkin

@dev

Feature: Your Feature Description



  Scenario: Your scenario description

    When I make a GET request to fetch data

    Then I expect the response status to be OK with code 200

```



### 2. Create Step Definitions



Create a new file in `src/tests/YourDomain/yourFeature.tests.ts`:



```typescript

import { ICustomWorld } from '../../../world';

import { When, Then } from '@cucumber/cucumber';

import { APIResponse, expect } from '@playwright/test';

import {

  makeGetRequest,

  writeDataToFile,

} from '../../support/utils/utilityFunctions';



When('I make a GET request to fetch data', async function (this: ICustomWorld) {

  const responseBody = await makeGetRequest('/your/endpoint');

  this.response = responseBody;

  this.responseData = await responseBody.json();

});



Then(

  'I expect the response status to be OK with code {int}',

  async function (this: ICustomWorld, expectedStatus: number) {

    const response = this.response as APIResponse;

    expect(response.status()).toBe(expectedStatus);

  },

);

```



### 3. Use Tags for Organization



- `@dev`: Development/quick tests

- `@prod`: Production-level tests

- `@smoke`: Smoke tests

- Add custom tags as needed



## Testing Best Practices



1. **Keep scenarios small and focused**: Each scenario should test one behavior

2. **Use data tables for complex data**: For validating multiple rows/records

3. **Separate concerns**: Use utility functions for repeated API calls

4. **Tag scenarios appropriately**: For easy filtering

5. **Store response data**: Use `writeDataToFile()` for debugging and reference



## Continuous Integration



The project is set up to integrate with CI/CD pipelines:



- Tests generate JUnit XML reports for CI tools

- HTML reports are generated for visual inspection

- Use `--tags` flag in CI to run specific test sets



## Troubleshooting



### Environment Variables Not Loading



- Ensure `.env` file exists in project root

- Check that keys match exactly: `API_KEY`, `API_BASE_URL`, etc.

- Restart the test runner after modifying `.env`



### API Requests Failing



- Verify API credentials in `.env`

- Check API endpoint paths in step definitions

- Review response data in `data/` folder for actual response structure



### Import Errors



- Run `npm install` to ensure all dependencies are installed

- Check that `ts-node` is listed in devDependencies

- Verify TypeScript compilation: `npx tsc --noEmit`



## Resources



- [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)

- [Playwright API Testing](https://playwright.dev/docs/api-testing)

- [BDD Best Practices](https://cucumber.io/docs/bdd/)

