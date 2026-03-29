/**
 * Debug Hooks
 * Auto-capture failed test context for CI/CD debugging
 * Saves response data and error details on failure
 */

import { After } from '@cucumber/cucumber';
import { ICustomWorld } from '../../world';
import { writeDataToFile, ensureDirectoryExists } from '../utils/fileUtils';

/**
 * On test failure, save debug information
 * Creates: reports/debug/<scenario-name>.json
 */
After(async function (this: ICustomWorld, scenario) {
  if (scenario.result?.status === 'FAILED') {
    // Ensure debug directory exists
    ensureDirectoryExists('./reports/debug');

    const debugFileName = scenario.pickle.name.replace(/[^a-z0-9_-]/gi, '_').toLowerCase();
    const debugFilePath = `./reports/debug/${debugFileName}.json`;

    const debugData = {
      scenario: scenario.pickle.name,
      timestamp: new Date().toISOString(),
      status: scenario.result.status,
      error: scenario.result.message || 'Unknown error',
      request: {
        endpoint: '<check logs>',
        method: '<check logs>',
      },
      response: {
        statusCode: this.status || 'no request made',
        body: this.responseBody || 'no response body',
      },
      world: {
        apiContextInitialized: !!this.apiContext,
        hasResponseBody: !!this.responseBody,
      },
    };

    try {
      writeDataToFile(debugFilePath, debugData);
      console.error(`\n❌ Test Failed. Debug info saved to: ${debugFilePath}\n`);
    } catch (error: any) {
      console.error(`Failed to write debug file: ${error.message}`);
    }
  } else if (scenario.result?.status === 'PASSED') {
    // Optional: Log successful tests
    console.log(`✅ ${scenario.pickle.name}`);
  }
});
