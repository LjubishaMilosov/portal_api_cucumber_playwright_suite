import { config } from '../config/config';

export function getInternalID() {
  const internalId = config.internalId;
  if (!internalId) {
    throw new Error('INTERNAL_ID is not defined in config');
  }
  return internalId;
}

export function getDefaultUsername() {
  const defaultUsername = config.defaultUsername;
  if (!defaultUsername) {
    throw new Error('DEFAULT_USERNAME is not defined in config');
  }
  return defaultUsername;
}

export function getDefaultEmail() {
  const defaultEmail = config.defaultEmail;
  if (!defaultEmail) {
    throw new Error('DEFAULT_EMAIL is not defined in config');
  }
  return defaultEmail;
}

export function getDefaultPhoneNumber() {
  const defaultPhoneNumber = config.defaultPhoneNumber;
  if (!defaultPhoneNumber) {
    throw new Error('DEFAULT_PHONENUMBER is not defined in config');
  }
  return defaultPhoneNumber;
}

export function getDefaultGameCode() {
  const defaultGameCode = config.defaultGameCode;
  if (!defaultGameCode) {
    throw new Error('DEFAULT_GAME_CODE is not defined in config');
  }
  return defaultGameCode;
}

export function getDefaultGameID() {
  const defaultGameID = config.defaultGameId;
  if (!defaultGameID) {
    throw new Error('DEFAULT_GAME_ID is not defined in config');
  }
  return defaultGameID;
}

export function getDefaultAmount() {
  const defaultAmount = config.defaultAmount;
  if (!defaultAmount) {
    throw new Error('DEFAULT_AMOUNT is not defined in config');
  }
  return defaultAmount;
}

export function getDefaultCurrencyID() {
  const defaultCurrencyID = config.defaultCurrencyId;
  if (!defaultCurrencyID) {
    throw new Error('DEFAULT_CURRENCY_ID is not defined in config');
  }
  return defaultCurrencyID;
}

export function getDefaultPaymentCurrencyID() {
  const defaultPaymentCurrencyID = config.defaultPaymentCurrencyId;
  if (!defaultPaymentCurrencyID) {
    throw new Error('DEFAULT_PAYMENT_CURRENCY_ID is not defined in config');
  }
  return defaultPaymentCurrencyID;
}

export function getDefaultPaymentGatewayID() {
  const defaultPaymentGatewayID = config.defaultPaymentGatewayId;
  if (!defaultPaymentGatewayID) {
    throw new Error('DEFAULT_PAYMENT_GATEWAY_ID is not defined in config');
  }
  return defaultPaymentGatewayID;
}

export function getDefaultPaymentMethodID() {
  const defaultPaymentMethodID = config.defaultPaymentMethodId;
  if (!defaultPaymentMethodID) {
    throw new Error('DEFAULT_PAYMENT_METHOD_ID is not defined in config');
  }
  return defaultPaymentMethodID;
}

export function returnSegmentsTrue(): boolean {
  const returnSegments = config.returnSegmentsTrue;
  if (returnSegments === undefined) {
    return true;
  }
  return returnSegments;
}

export function returnkIsLoggedInTrue(): boolean {
  const checkIsLoggedIn = config.checksIsLoggedIn;
  if (checkIsLoggedIn === undefined) {
    return true;
  }
  return checkIsLoggedIn;
}

export function getUserBalance(): number {
  const userBalance = Number(config.userBalance);
  if (isNaN(userBalance)) {
    throw new Error('USER_BALANCE is not defined or not a number in config');
  }
  return userBalance;
}

