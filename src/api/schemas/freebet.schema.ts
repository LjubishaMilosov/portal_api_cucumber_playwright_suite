/**
 * JSON Schemas for Freebet API endpoints
 * Validates: GetAllFreeBetBonuses
 */

export const freeBetBonusesSchema = {
  type: 'object',
  properties: {
    Bonuses: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        properties: {
          BonusType: { type: 'number' },
          BonusID: { type: 'number' },
          CurrentVersionID: { type: 'number' },
          Trigger: { type: 'string' },
          Name: { type: 'string' },
          AppliedOn: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}' },
          ActivatesOn: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}' },
          ExpiresOn: { type: ['string', 'null'], pattern: '^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}' },
          MinAmount: { type: 'number', minimum: 0 },
          MaxAmount: { type: 'number', minimum: 0 },
          Percentage: { type: 'number', minimum: 0 },
          Turnover: { type: 'number', minimum: 0 },
          ExpiryDaysAfterAwarding: { type: 'number', minimum: 0 },
          OccurenceID: { type: 'number' },
          ReccurencePaternNbOfOcc: { type: ['number', 'null'] },
          OccurenceNumber: { type: 'number' },
        },
        required: [
          'BonusType',
          'BonusID',
          'CurrentVersionID',
          'Trigger',
          'Name',
          'AppliedOn',
          'ActivatesOn',
          'MinAmount',
          'MaxAmount',
          'Percentage',
          'Turnover',
          'ExpiryDaysAfterAwarding',
          'OccurenceID',
          'OccurenceNumber',
        ],
      },
    },
    FreeRounds: { type: 'array' },
    FreePlays: { type: 'array' },
    RequestID: { type: 'string' },
  },
  required: ['Bonuses', 'FreeRounds', 'FreePlays', 'RequestID'],
};
