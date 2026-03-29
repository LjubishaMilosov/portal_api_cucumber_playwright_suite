/**
 * JSON Schemas for Core API endpoints
 * Validates: GetCountries, GetCurrencies, GetLanguages (Core feature set)
 *
 * Note: This replaces base.schema.ts for improved naming clarity.
 * "Core" indicates these are fundamental/core APIs, not "base" (foundation).
 */

export const countriesSchema = {
  type: 'object',
  properties: {
    Countries: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        properties: {
          CountryID: { type: 'number' },
          CountryISO: { type: 'string', minLength: 2 },
          CountryName: { type: 'string', minLength: 1 },
          CountryMinAge: { type: 'number', minimum: 0 },
        },
        required: ['CountryID', 'CountryISO', 'CountryName', 'CountryMinAge'],
      },
    },
  },
  required: ['Countries'],
};

export const currenciesSchema = {
  type: 'object',
  properties: {
    Currencies: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        properties: {
          CurrencyID: { type: 'number' },
          CurrencyISO: { type: 'string', minLength: 2 },
          CurrencyName: { type: 'string', minLength: 1 },
          CurrencySymbol: { type: 'string' },
          IsBaseCurrency: { type: 'boolean' },
        },
        required: ['CurrencyID', 'CurrencyISO', 'CurrencyName', 'CurrencySymbol', 'IsBaseCurrency'],
      },
    },
  },
  required: ['Currencies'],
};

export const languagesSchema = {
  type: 'object',
  properties: {
    Languages: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        properties: {
          LanguageID: { type: 'number' },
          LanguageISO: { type: 'string', minLength: 1 },
          LanguageName: { type: 'string', minLength: 1 },
          LanguageCulture: { type: 'string', pattern: '^[a-z]{2}-[A-Z]{2}$' },
          IsBaseLanguage: { type: 'boolean' },
        },
        required: ['LanguageID', 'LanguageISO', 'LanguageName', 'LanguageCulture', 'IsBaseLanguage'],
      },
    },
  },
  required: ['Languages'],
};
