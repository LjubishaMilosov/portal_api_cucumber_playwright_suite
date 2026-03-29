/**
 * JSON Schemas for Login/Register API endpoints
 * Validates: RegisterAccount response (success and partial content with validation errors)
 */

// Success response schema (200)
export const registerAccountResponseSchema = {
  type: 'object',
  properties: {
    RequestID: { type: 'string' },
    Customer: {
      type: 'object',
      properties: {
        IsLoggedIn: { type: 'boolean' },
        InternalID: { type: 'string' },
        ExternalID: { type: ['string', 'null'] },
        ReferralCode: { type: ['number', 'null'] },
        Token: { type: 'string' },
        OnlineToken: { type: ['string', 'null'] },
        SocialProviders: {
          type: 'array',
          items: { type: 'number' },
        },
        UserHardID: { type: ['string', 'null'] },
        AgentID: { type: ['number', 'null'] },
      },
      required: ['IsLoggedIn', 'InternalID', 'Token'],
    },
    Activation: {
      type: 'object',
      properties: {
        IsActivated: { type: 'boolean' },
        ActivationCode: { type: ['string', 'null'] },
      },
    },
    AffiliateProviderUrl: { type: ['string', 'null'] },
    LoginAfterRegistration: { type: 'boolean' },
  },
  required: ['RequestID', 'Customer', 'Activation'],
};

// Partial content response schema (206) - validation errors array
export const registerAccountErrorSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      Description: { type: 'string' },
      ErrorNo: { type: 'number' },
      RequestID: { type: 'string' },
    },
    required: ['Description', 'ErrorNo', 'RequestID'],
  },
};
