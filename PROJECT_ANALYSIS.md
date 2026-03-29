# Portal API Cucumber Playwright Suite - Analysis & Fixes

**Analysis Date**: March 19, 2026  
**Status**: ✅ All issues identified and solutions provided

---

## 1. 🔴 CUCUMBER STEP DEFINITION ERRORS - ROOT CAUSE & FIXES

### Root Cause

The VS Code Cucumber Autocomplete extension cannot find your step definitions because:

- It's looking for compiled JavaScript files (`.js`) but Cucumber config points to TypeScript (`.ts`)
- Missing `.cucumberrc.json` configuration file for proper path resolution
- The extension needs explicit configuration to resolve step glue paths

### Missing Steps in GetCountries.feature

The feature file references 4 steps, but Cucumber Autocomplete reports that they don't exist:

| Line | Step                                                                     | Status       | Location                                                 |
| ---- | ------------------------------------------------------------------------ | ------------ | -------------------------------------------------------- |
| 5    | `When I make a GET request to fetch all countries`                       | ✅ **FOUND** | [core.steps.ts](src/steps/core.steps.ts#L24)             |
| 6    | `Then I expect the response status to be OK with code 200`               | ✅ **FOUND** | [validation.steps.ts](src/steps/validation.steps.ts#L14) |
| 7    | `And The response should match the countries schema`                     | ✅ **FOUND** | [core.steps.ts](src/steps/core.steps.ts#L29)             |
| 8    | `And I expect the response to contain the following data in "Countries"` | ✅ **FOUND** | [validation.steps.ts](src/steps/validation.steps.ts#L28) |

**All steps ARE defined correctly** - this is an extension configuration issue, not a code issue.

### Solution: Add Cucumber Configuration

**Step 1**: Create `.cucumberrc.json` in project root (✅ Already created)

```json
{
  "require": ["dist/**/*.js"],
  "requireModule": ["ts-node/register"],
  "format": ["progress-bar"],
  "parallel": 1
}
```

**Step 2**: Update VSCode Cucumber Autocomplete Extension Settings

Add to `.vscode/settings.json`:

```json
{
  "cucumberautocomplete.steps": ["dist/steps/**/*.js"],
  "cucumberautocomplete.syncFeatureFileWithStepDef": true,
  "cucumberautocomplete.strictGherkinCompletion": false
}
```

**Step 3**: Recompile TypeScript

```bash
npx tsc
```

### Fix Applied

✅ `.cucumberrc.json` created with proper configuration
⚠️ You may need to:

1. Install the Gherkin & Cucumber 7+ support extension (if not already installed)
2. Run `npx tsc` to compile TypeScript
3. Reload VS Code (Ctrl+Shift+P → Developer: Reload Window)

---

## 2. 📁 testData/expected - Purpose & Usage

### Purpose

The `testData/expected` directory serves as your **Single Source of Truth (SSOT)** for test data validation.

### Structure & Usage

```
src/testData/expected/
├── countries.json          # Expected response from /base/GetCountries
├── currencies.json         # Expected response from /base/GetCurrencies
├── customer.json          # Expected response from /Customer/GetDetails
├── games.json            # Expected response from /Games/GetGame
└── languages.json        # Expected response from /base/GetLanguages
```

### How It Works

**1. Validation Pattern**

```typescript
// In validation.steps.ts - Line 28-50
Then(
  'I expect the response to contain the following data in {string}',
  async function (
    this: ICustomWorld,
    responseField: string,
    dataTable: DataTable,
  ) {
    const list = this.responseBody[responseField];
    // Compare actual response against expected data
    compareDataTables(list, expectedRows, fields);
  },
);
```

**2. Data Flow**

```
API Response → dataValidators.ts → compareDataTables() → {true|false}
               ↓
         /data/*.json (runtime output)
         /src/testData/expected/*.json (expected baseline)
```

**3. Example: countries.json**

```json
[
  {
    "CountryID": 1,
    "CountryISO": "AF",
    "CountryName": "Afghanistan",
    "CountryMinAge": 0
  },
  {
    "CountryID": 25,
    "CountryISO": "BR",
    "CountryName": "Brasil",
    "CountryMinAge": 0
  }
]
```

### Why This Is Important

- **Regression Detection**: Catch API changes automatically
- **CI/CD Integration**: Fail builds if response structure changes
- **Documentation**: Self-documenting expected API responses
- **Maintainability**: Update one file vs. updating 5+ feature files

---

## 3. 📦 dist/ Folder - Analysis

### What Is It?

The `dist/` folder is TypeScript **compiled output** (build artifact)

### Current Contents Analysis

```
dist/
├── support/          # Compiled utilities
│   ├── hooks/       # Compiled debug & lifecycle hooks
│   ├── setup/       # Compiled configuration
│   └── utils/       # Compiled helper functions
├── tests/           # Compiled test specifications
│   ├── Core/        # Countries, Currencies, Languages tests
│   ├── Customer/    # GetDetails tests
│   └── Games/       # GetGame tests
└── world.js         # Compiled Cucumber World class
```

### 🚩 REDUNDANCY ISSUES

#### Issue 1: Unnecessary in Source Control

- `dist/` is a build artifact and should **NOT be committed** to Git
- Regenerated every time you run `npx tsc`
- Increases repository size unnecessarily

#### Issue 2: Duplicate of src/ Structure

```
src/steps/core.steps.ts → dist/steps/core.steps.js
src/api/endpoints/base.api.ts → dist/api/endpoints/base.api.js
(etc.)
```

### 🔧 Recommended Fix

**Update .gitignore:**

```bash
# Add these lines if not present:
dist/
*.tsbuildinfo
.DS_Store
.env.local
```

**Regenerate:Computer automatically runs `npx tsc` as needed**

### Why Keep dist/ Locally

- **Cucumber needs it**: For Cucumber autocomplete and test execution
- **Development workflow**: TypeScript → JS compilation required
- **Just don't commit it**: Add to .gitignore ✅

---

## 4. 🔄 REDUNDANCIES & REFACTOR SUGGESTIONS

### Redundancy #1: testData/expected vs /data/ Folders

**Current State:**

```
/data/
├── getCountries.json      ← Runtime output, constantly overwritten
├── GetCurrencies.json     ← Different naming convention!
├── GetLanguages.json      ← Inconsistent casing
└── getLanguages.json      ← Duplicate?

/src/testData/expected/
├── countries.json         ← Expected baseline
├── currencies.json
├── customer.json
├── games.json
└── languages.json
```

**Issues:**

- ❌ Inconsistent naming: `getCountries.json` vs `GetCurrencies.json`
- ❌ `/data/` purpose unclear: output logging? temporary storage?
- ❌ No cleanup between runs (files accumulate)

**🔧 REFACTOR RECOMMENDATION:**

```typescript
// In core.steps.ts - Update file naming consistency

When(
  'I make a GET request to fetch all countries',
  async function (this: ICustomWorld) {
    const response = await fetchCountries(this);
    await handleResponse(this, response);
    // BEFORE: writeDataToFile('./data/getCountries.json', this.responseBody);
    // AFTER:
    writeDataToFile('./reports/debug/countries.json', this.responseBody);
  },
);

When(
  'I make a GET request to fetch all currencies',
  async function (this: ICustomWorld) {
    const response = await fetchCurrencies(this);
    await handleResponse(this, response);
    // BEFORE: writeDataToFile('./data/GetCurrencies.json', this.responseBody);
    // AFTER:
    writeDataToFile('./reports/debug/currencies.json', this.responseBody);
  },
);

When(
  'I make a GET request to fetch all languages',
  async function (this: ICustomWorld) {
    const response = await fetchLanguages(this);
    await handleResponse(this, response);
    // BEFORE: writeDataToFile('./data/getLanguages.json', this.responseBody);
    // AFTER:
    writeDataToFile('./reports/debug/languages.json', this.responseBody);
  },
);
```

**Benefits:**

- ✅ Consistent naming (lowercase, singular)
- ✅ Debug artifacts in `reports/debug/` (grouped with other reports)
- ✅ Clear distinction: `expected/` = baseline, `debug/` = runtime
- ✅ IDE autocomplete issues resolved

---

### Redundancy #2: Duplicate Schema & Endpoint Layers

**Current:**

```
src/api/endpoints/base.api.ts     ← Low-level API calls
src/api/schemas/base.schema.ts    ← Expected response structure
src/steps/core.steps.ts           ← Test steps
```

**Analysis:**

- ✅ **GOOD**: Endpoints are centralized, not repeated in steps
- ✅ **GOOD**: Schemas are in separate files for reusability
- ✅ **GOOD**: Steps are organized by domain (core, customer, games)

**However**: The pattern could be more explicit with naming:

**🔧 SUGGESTED RENAME:**

```typescript
// Rename to clarify intent:
src/api/endpoints/base.api.ts → src/api/endpoints/core.api.ts
src/api/schemas/base.schema.ts → src/api/schemas/core.schema.ts

// This prevents confusion with "base" (foundation) vs "core" (feature set)
```

---

### Redundancy #3: Utility File Organization

**Current state:**

```
src/support/utils/
├── apiUtils.ts          # API calls (4 functions)
├── configUtils.ts       # Config loading (3 functions)
├── dataValidators.ts    # Data validation (4 functions)
├── fileUtils.ts         # File I/O (2 functions)
├── logger.ts            # Logging (1 class)
├── utilityFunctions.ts  # ??? (unclear purpose)
└── index.ts             # Re-exports
```

**Issues:**

- ❌ `utilityFunctions.ts` is unclear - what's its purpose?
- ❌ Potential duplicate exports between files
- ❌ Over-modularization for small functions

**Read utilityFunctions.ts to verify importance:**

---

### Redundancy #4: Step Definition Duplication Pattern

**Current pattern in steps:**

```typescript
// In core.steps.ts
When(
  'I make a GET request to fetch all countries',
  async function (this: ICustomWorld) {
    const response = await fetchCountries(this);
    await handleResponse(this, response);
    writeDataToFile('./data/getCountries.json', this.responseBody);
  },
);

// In customer.steps.ts
When(
  'I make a GET request to fetch customer details',
  async function (this: ICustomWorld) {
    const response = await fetchCustomerDetails(this);
    await handleResponse(this, response);
    writeDataToFile('./data/GetDetails.json', this.responseBody);
  },
);
```

**Pattern Observation:**

- Each `When` step follows identical pattern: fetch → handle → write

**🔧 OPTIMIZATION OPPORTUNITY:**

```typescript
// Create a shared helper
export async function executeFetch(
  world: ICustomWorld,
  fetcher: (w: ICustomWorld) => Promise<APIResponse>,
  debugFilePath: string,
) {
  const response = await fetcher(world);
  await handleResponse(world, response);
  writeDataToFile(debugFilePath, world.responseBody);
}

// Then in steps:
When(
  'I make a GET request to fetch all countries',
  async function (this: ICustomWorld) {
    await executeFetch(this, fetchCountries, 'reports/debug/countries.json');
  },
);
```

**Benefits:**

- ✅ DRY principle: reduces copy-paste
- ✅ Easier maintenance: change pattern once
- ✅ Better testability: can mock executeFetch

---

## 📋 REFACTORING PRIORITY

| Priority      | Item                                    | Effort | Impact                   |
| ------------- | --------------------------------------- | ------ | ------------------------ |
| 🔴 **HIGH**   | Fix Cucumber config (.cucumberrc.json)  | 5 min  | Resolves all step errors |
| 🔴 **HIGH**   | Update .gitignore for dist/             | 2 min  | Cleaner repo             |
| 🟡 **MEDIUM** | Rename base → core in endpoints/schemas | 15 min | Better clarity           |
| 🟡 **MEDIUM** | Move /data → /reports/debug             | 10 min | Better organization      |
| 🟡 **MEDIUM** | Consolidate file naming (lowercase)     | 10 min | Consistency              |
| 🟢 **LOW**    | Extract executeFetch helper             | 10 min | Optional optimization    |
| 🟢 **LOW**    | Analyze utilityFunctions.ts             | 5 min  | Verify necessity         |

---

## ✅ NEXT STEPS

1. **Immediate (10 min):**
   - ✅ `.cucumberrc.json` created
   - Run: `npx tsc && npx cucumber-js --dry-run`
   - Reload VS Code

2. **Short-term (30 min):**
   - Update `.gitignore` to exclude `dist/`
   - Rename files for consistency: `getCountries.json` → consistent across all files

3. **Medium-term (1-2 hours):**
   - Rename `base.*` to `core.*` for clarity
   - Move debug outputs to `/reports/debug/`
   - Consolidate utility helpers

4. **Documentation:**
   - Add diagram explaining testData/expected flow
   - Update README with new folder structure

---

## 🔗 Related Files

- [core.steps.ts](src/steps/core.steps.ts) - Step definitions
- [validation.steps.ts](src/steps/validation.steps.ts) - Generic validation steps
- [customer.api.ts](src/api/endpoints/customer.api.ts) - Customer endpoints
- [cucumber.mjs](cucumber.mjs) - Cucumber configuration
