import 'dotenv/config';

export const config = {
  apiBaseUrl: process.env.API_BASE_URL || 'https://api-bo-core-qa.btobet.net',
  apiKey: process.env.API_KEY || '',
  internalId: process.env.INTERNALID || '',
  defaultUsername: process.env.DEFAULT_USERNAME || '',
  defaultEmail: process.env.DEFAULT_EMAIL || '',
  defaultPhoneNumber: process.env.DEFAULT_PHONENUMBER || '',
  defaultGameCode: process.env.DEFAULT_GAME_CODE || '',
  defaultGameId: process.env.DEFAULT_GAME_ID || '',
  defaultAmount: process.env.DEFAULT_AMOUNT || '',
  defaultCurrencyId: process.env.DEFAULT_CURRENCY_ID || '',
  defaultPaymentCurrencyId: process.env.DEFAULT_PAYMENT_CURRENCY_ID || '',
  defaultPaymentGatewayId: process.env.DEFAULT_PAYMENT_GATEWAY_ID || '',
  defaultPaymentMethodId: process.env.DEFAULT_PAYMENT_METHOD_ID || '',
  returnSegmentsTrue: process.env.RETURN_SEGMENTS_TRUE === 'true',
  checksIsLoggedIn: process.env.CHECKS_IS_LOGGED_IN === 'true',
  userBalance: process.env.USER_BALANCE || '',
};