# 🎯 QUICK REFERENCE GUIDE

## Project Structure at a Glance

```
✅ Working Features:
  - Get Countries        (GetCountries) ✓
  - Get Currencies       (GetCurrencies) ✓  
  - Get Languages        (GetLanguages) ✓
  - Get Customer Details (GetDetails) ✓
  - Get Game Details     (GetGame) ✓

Last Test Run: 5/5 PASSED ✨
Execution Time: ~8 seconds
```

---

## 📂 File Organization

| Purpose | Location | Examples |
|---------|----------|----------|
| **API Endpoints** | `src/api/endpoints/` | `base.api.ts`, `customer.api.ts`, `games.api.ts` |
| **Schemas** | `src/api/schemas/` | `base.schema.ts`, `customer.schema.ts`, `games.schema.ts` |
| **Validation** | `src/validators/` | `schemaValidator.ts` |
| **Step Definitions** | `src/steps/` | `core.steps.ts`, `customer.steps.ts`, `games.steps.ts`, `validation.steps.ts` |
| **Test Data** | `src/testData/expected/` | `countries.json`, `currencies.json`, etc. |
| **Utilities** | `src/support/utils/` | `apiUtils.ts`, `fileUtils.ts`, `configUtils.ts`, `logger.ts` |
| **Hooks** | `src/support/hooks/` | `hooks.ts`, `debugHooks.ts` |
| **Features** | `features/` | `Core/`, `Customer/`, `Games/` |

---

## 🔄 Typical Workflow

### I want to... ADD A NEW API ENDPOINT

**Example: Adding GetBalance endpoint**

1. **Create Schema** 
   ```typescript
   // src/api/schemas/wallet.schema.ts
   export const balanceSchema = {
     type: 'object',
     properties: { Balance: { type: 'number' } },
     required: ['Balance']
   };
   ```

2. **Create Endpoint Wrapper**
   ```typescript
   // src/api/endpoints/wallet.api.ts
   export async function fetchBalance(world: ICustomWorld) {
     return makeGetRequest(world, '/wallet/GetBalance');
   }
   ```

3. **Create Steps**
   ```typescript
   // src/steps/wallet.steps.ts
   When('I fetch balance', async function (this: ICustomWorld) {
     const response = await fetchBalance(this);
     await handleResponse(this, response);
   });
   ```

4. **Create Feature**
   ```gherkin
   # features/Wallet/GetBalance.feature
   Scenario: Get customer balance
     When I fetch balance
     Then I expect the response status to be OK with code 200
     And the response should have balance data
   ```

✅ Done! New endpoint fully integrated.

---

### I want to... DEBUG A FAILED TEST

**Automatic Debug Files Created in:**
```
reports/debug/
├── validate_response_countries.json
├── get_customer_account_details.json
└── ... (one for each failed test)
```

**File contains:**
```json
{
  "scenario": "Test name",
  "timestamp": "2026-03-19T10:30:00Z",
  "status": "FAILED",
  "error": "Validation error message",
  "response": {
    "statusCode": 200,
    "body": { /* Full API response */ }
  },
  "request": { /* Request details */ }
}
```

👉 No need for manual reproduction - full context is saved!

---

### I want to... UPDATE TEST EXPECTATIONS

**Example: Add new country to expected data**

1. **Edit Test Data**
   ```json
   // src/testData/expected/countries.json
   [
     { "CountryID": 1, "CountryISO": "AF", ... },
     { "CountryID": 2, "CountryISO": "AL", ... }  // ← Add here
   ]
   ```

2. **Update Feature File** (if using table)
   ```gherkin
   And I expect the response to contain the following data in "Countries"
     | CountryID | CountryISO |
     | 1         | AF         |
     | 2         | AL         |  ← Add here
   ```

3. **Run Tests**
   ```bash
   npm run test:dev
   ```

✅ Validation happens automatically!

---

### I want to... UPDATE API RESPONSE SCHEMA

**Example: API now returns extra field**

1. **Update Schema**
   ```typescript
   // src/api/schemas/base.schema.ts
   export const countriesSchema = {
     type: 'object',
     properties: {
       Countries: { /* existing */ },
       Timestamp: { type: 'string' }  // ← Add here
     },
     required: ['Countries']
   };
   ```

2. **Run Tests**
   ```bash
   npm run test:dev
   ```

✅ Schema runs validation automatically!

---

## 💻 Common Commands

```bash
# Run all dev tests
npm run test:dev

# Run all tests (including non-@dev)
npm run cucumber:all

# Run with verbose output
npm run test:debug

# Quick lint check
npm run lint

# Format code
npm run format

# Type-check only
npx tsc --noEmit

# Generate test snippets
npm run snippets
```

---

## 📊 Import Cheat Sheet

```typescript
// API Endpoints
import { fetchCountries, fetchCurrencies, fetchLanguages } from '../api/endpoints/base.api';
import { fetchCustomerDetails } from '../api/endpoints/customer.api';
import { fetchGameDetails } from '../api/endpoints/games.api';

// Schemas
import { countriesSchema, currenciesSchema, languagesSchema } from '../api/schemas/base.schema';
import { customerDetailsSchema } from '../api/schemas/customer.schema';
import { gameDetailsSchema } from '../api/schemas/games.schema';

// Validators
import { validateSchema } from '../validators/schemaValidator';

// Utilities
import { handleResponse, compareDataTables, writeDataToFile } from '../support/utils';
import { makeGetRequest, makePostRequest } from '../support/utils/apiUtils';
import { getInternalID, getDefaultGameCode, baseUrl, apiKey } from '../support/utils/configUtils';

// World
import { ICustomWorld } from '../world';
```

---

## 🎬 Step Definition Examples

### Calling an API
```typescript
When('I make a GET request to fetch all countries', async function (this: ICustomWorld) {
  const response = await fetchCountries(this);
  await handleResponse(this, response);
});
```

### Validating with Schema
```typescript
Then('The response should match the countries schema', async function (this: ICustomWorld) {
  validateSchema(countriesSchema, this.responseBody, 'Countries');
});
```

### Comparing Data
```typescript
Then('I expect the response to contain the following data in {string}',
  async function (this: ICustomWorld, field: string, dataTable: DataTable) {
    const expectedRows = dataTable.hashes();
    compareDataTables(this.responseBody[field], expectedRows, ['CountryID']);
  }
);
```

---

## 🔐 Environment Setup

**Create `.env` file:**
```env
API_BASE_URL=https://api-bo-core-qa.btobet.net/
API_KEY=sk_test_xxx
INTERNALID=710308
DEFAULT_GAME_CODE=PPL_PGC_vs7pigs
```

**Node:** These are loaded from `process.env` via `configUtils.ts`

---

## 🚨 Troubleshooting

### Tests show "Multiple step definitions match"
**Issue:** Old `src/tests/` files still exist
**Fix:** They were deleted in refactoring. If you recreate tests there, keep them in `src/steps/`

### "Cannot find module" error
**Issue:** Wrong import path
**Fix:** Use relative paths from file location:
```typescript
// From src/steps/core.steps.ts to src/api/endpoints/
import { fetchCountries } from '../api/endpoints/base.api';  // ✓ Correct

// Not:
import { fetchCountries } from './api/endpoints/base.api';  // ✗ Wrong
```

### Schema validation failing on valid data
**Issue:** Schema too strict (additionalProperties: false)
**Fix:** Remove `additionalProperties: false` if API has extra fields
```typescript
// ❌ Too strict
export const schema = {
  properties: { ... },
  required: [...],
  additionalProperties: false  // ← Remove this
};

// ✅ Flexible
export const schema = {
  properties: { ... },
  required: [...]  // ← No additionalProperties
};
```

---

## 📈 Performance Tips

### Test Execution
```bash
# Current: 5 tests in 8 seconds (~1.6s/test)
# This is optimal for API testing

# For 50+ tests, consider parallel execution:
# In cucumber.mjs: parallel: 4 (or 5, 10, etc)
```

### Schema Validation
```typescript
// ✓ Fast (Ajv compiles once, reused)
validateSchema(schema, data);  

// ✗ Slow (Ajv recompiles each time)
const validate = new Ajv();
validate.compile(schema);
```

---

## 🎓 Best Practices

### 1. Always use Endpoints Layer
```typescript
// ✓ Good - Centralized
const response = await fetchCountries(this);

// ✗ Bad - Scattered paths
const response = await makeGetRequest(this, '/base/GetCountries');
```

### 2. Always Validate with Schema
```typescript
// ✓ Good - Comprehensive
validateSchema(countriesSchema, this.responseBody);

// ✗ Bad - Manual checks
if (!response.Countries) throw new Error('...');
```

### 3. Keep Test Data External
```typescript
// ✓ Good
compareDataTables(actual, expectedCountries, ['CountryID']);

// ✗ Bad - Hardcoded
compareDataTables(actual, [ { CountryID: 1, ... } ], ...);
```

### 4. Use Reusable Validation Steps
```gherkin
✓ Good - Reusable
Then I expect the response status to be OK with code 200
And I expect the response to contain the following data in "Countries"

✗ Bad - Custom per endpoint
Then the countries response is valid
And the currencies response is valid
```

---

## 📞 Support

### Questions about architecture?
→ See `ARCHITECTURE_ANALYSIS.md`

### What changed in refactoring?
→ See `REFACTORING_COMPLETE.md`

### How to add a new endpoint?
→ This Quick Reference Guide above ☝️

---

**Last Updated:** March 19, 2026
**Status:** ✅ All Tests Passing
**Ready for:** 5 APIs → 100+ APIs (same architecture!)
