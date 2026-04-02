const accountSchema = {
  type: 'object',
  properties: {
    InternalID: { type: 'number' },
    ExternalID: { type: 'string' },
    FirstName: { type: 'string' },
    LastName: { type: 'string' },
    Email: { type: 'string', format: 'email' },
    Username: { type: 'string' },
    Gender: { type: 'string', enum: ['Male', 'Female', 'Other', 'NotSpecified'] },
    DateOfBirth: { type: 'string' },
    Address: { type: 'string' },
    City: { type: 'string' },
    PostCode: { type: 'string' },
    PhoneNumber: { type: ['string', 'null'] },
    MobileNumber: { type: ['string', 'null'] },
    CountryISO: { type: 'string', minLength: 2 },
    LanguageISO: { type: 'string', minLength: 1 },
    CurrencyISO: { type: 'string', minLength: 2 },
    IsTestCustomer: { type: 'boolean' },
    KYCStatus: { type: 'string' },
    IdentityStatus: { type: 'string' },
    RegisteredOn: { type: 'string' },
    LastLoginDate: { type: ['string', 'null'] },
    IsAccountVerified: { type: 'boolean' },
    NetEntID: { type: ['string', 'null'] },
  },
  required: [
    'InternalID',
    'ExternalID',
    'FirstName',
    'LastName',
    'Email',
    'Username',
    'CountryISO',
    'LanguageISO',
    'CurrencyISO',
    'IsTestCustomer',
  ],
};

const balanceSchema = {
  type: 'object',
  properties: {
    Real: { type: 'number', minimum: 0 },
    Bonus: { type: 'number', minimum: 0 },
    BonusWinLocked: { type: 'number', minimum: 0 },
    WithdrawableAmount: { type: 'number', minimum: 0 },
    CurrencyISO: { type: 'string', minLength: 3 },
    RequestID: { type: 'string' },
  },
  required: ['Real', 'Bonus', 'WithdrawableAmount', 'CurrencyISO'],
};

const fraudSchema = {
  type: 'object',
  properties: {
    Points: { type: 'number', minimum: 0 },
    BlockTransaction: { type: 'boolean' },
    BlockGamePlay: { type: 'boolean' },
    BlockLogin: { type: 'boolean' },
    MaxAllowedDeposit: { type: 'number', minimum: 0 },
    MaxAllowedWithdraw: { type: 'number', minimum: 0 },
  },
  required: ['Points', 'BlockTransaction', 'BlockGamePlay', 'BlockLogin'],
};

const activationSchema = {
  type: 'object',
  properties: {
    IsActivated: { type: 'boolean' },
    ActivationCode: { type: 'string' },
  },
  required: ['IsActivated'],
};

const customerSchema = {
  type: 'object',
  properties: {
    Segments: { type: 'array' },
    Bonuses: { type: 'array' },
    Promotional: { type: 'object' },
    Account: accountSchema,
    Fraud: fraudSchema,
    Activation: activationSchema,
    Balance: balanceSchema,
    Token: { type: ['string', 'null'] },
    SocialProviders: { type: 'array' },
    BrandID: { type: 'number' },
    IsAccountVerified: { type: 'boolean' },
  },
  required: ['Account', 'Fraud', 'Activation', 'Balance'],
};

export const customerDetailsSchema = {
  type: 'object',
  properties: {
    Customer: customerSchema,
    RequestID: { type: 'string' },
  },
  required: ['Customer'],
};
