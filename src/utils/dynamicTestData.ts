/**
 * Dynamic Test Data Generator
 * Generates random, non-hardcoded test user data for registration tests
 */

function generateTimestamp(): string {
  const now = new Date();
  return now.toISOString().replace(/[-T:]/g, '').slice(0, 14);
}

function generateRandomSuffix(): string {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}

function generateTestEmail(): string {
  const timestamp = generateTimestamp();
  const suffix = generateRandomSuffix();
  return `testuser_${timestamp}_${suffix}@btobet.net`;
}

function generateTestUsername(): string {
  const timestamp = generateTimestamp();
  const suffix = generateRandomSuffix();
  return `user_${timestamp}_${suffix}`;
}

function generateTestPassword(): string {
  const chars = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    special: '!@#$%^&*',
  };

  let password = '';
  password += chars.uppercase[Math.floor(Math.random() * chars.uppercase.length)];
  password += chars.lowercase[Math.floor(Math.random() * chars.lowercase.length)];
  password += chars.numbers[Math.floor(Math.random() * chars.numbers.length)];
  password += chars.special[Math.floor(Math.random() * chars.special.length)];

  const allChars = Object.values(chars).join('');
  for (let i = password.length; i < 12; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}

function generateAddress(): string {
  const streets = ['Main', 'Oak', 'Elm', 'Maple', 'Pine', 'Cedar', 'Birch', 'Walnut', 'Spruce', 'Ash'];
  const street = streets[Math.floor(Math.random() * streets.length)];
  const number = Math.floor(Math.random() * 9000) + 1000;
  return `${number} ${street} Street`;
}

function generatePhoneNumber(): string {
  const operators = ['080', '081', '090', '091'];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  const eightDigits = Math.floor(Math.random() * 99999999) + 10000000;
  return `${operator}${eightDigits}`;
}

function generateFirstName(): string {
  const firstNames = [
    'John',
    'Mary',
    'James',
    'Patricia',
    'Robert',
    'Jennifer',
    'Michael',
    'Linda',
    'William',
    'Barbara',
    'David',
    'Elizabeth',
    'Richard',
    'Susan',
    'Joseph',
    'Jessica',
  ];
  return firstNames[Math.floor(Math.random() * firstNames.length)];
}

function generateLastName(): string {
  const lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Rodriguez',
    'Martinez',
    'Hernandez',
    'Lopez',
    'Gonzalez',
    'Wilson',
    'Anderson',
    'Thomas',
  ];
  return lastNames[Math.floor(Math.random() * lastNames.length)];
}

function generateGender(): string {
  const genders = ['Male', 'Female'];
  return genders[Math.floor(Math.random() * genders.length)];
}

function generateDateOfBirth(): string {
  const today = new Date();
  const minAge = 18;
  const maxAge = 80;
  const ageSpan = maxAge - minAge;
  const randomAge = minAge + Math.floor(Math.random() * ageSpan);
  const randomMonth = Math.floor(Math.random() * 12);
  const randomDay = Math.floor(Math.random() * 28) + 1;

  const birthDate = new Date(today.getFullYear() - randomAge, randomMonth, randomDay);
  return birthDate.toISOString().split('T')[0];
}

function generateCity(): string {
  const cities = [
    'Lagos',
    'Abuja',
    'Kano',
    'Ibadan',
    'Port Harcourt',
    'Benin City',
    'Ilorin',
    'Abeokuta',
    'Kaduna',
    'Ogbomosho',
  ];
  return cities[Math.floor(Math.random() * cities.length)];
}

function generateCountryISO(): string {
  return 'MK';
}

function generateLanguageISO(): string {
  return 'EN';
}

function generateCurrencyISO(): string {
  return 'EUR';
}

function generateIPAddress(): string {
  return '192.142.185.115';
}

export function generateRegistrationPayload() {
  const phoneNumber = generatePhoneNumber();
  const mobileNumber = generatePhoneNumber();

  return {
    Customer: {
      CustomerDetails: {
        FirstName: generateFirstName(),
        LastName: generateLastName(),
        Gender: generateGender(),
        DateOfBirth: generateDateOfBirth(),
        Address: generateAddress(),
        City: generateCity(),
        Postcode: Math.random().toString().slice(2, 7),
        PhoneNumber: phoneNumber,
        MobileNumber: mobileNumber,
        CountryISO: 'MK',
        LanguageISO: 'EN',
        CurrencyISO: 'EUR',
        TimeZoneName: 'Central European Summer Time',
        Email: generateTestEmail(),
        Password: generateTestPassword(),
        IPAddress: generateIPAddress(),
        Username: generateTestUsername(),
        Longitude: null,
        Latitude: null,
        CivilIdentificationCode: Math.random().toString().slice(2, 12),
        Note: '',
        EmploymentStatus: 1,
        Browser: 'Google Chrome',
        Profession: 'QA Engineer',
        PassportNumber: '',
        IsTestCustomer: false,
      },
      UserDetails: {
        MiddleName: null,
        SecondLastName: null,
        MunicipalityID: null,
        ProvinceID: null,
        DepartmentID: null,
        CountyOfBirthISO: 'MK',
        DepartmentOfBirthID: null,
        MunicipalityOfBirthID: null,
        ProvinceOfBirthID: null,
        CityOfBirth: generateCity(),
        Colony: null,
        Nationality: 'Macedonia',
        State: 'Macedonia',
        IsAccordingToLaw: true,
        OccupationCode: '33',
        TermAndConditionsAccepted: true,
        NIFcode: Math.random().toString().slice(2, 12),
        IBAN: 'MK89183920923',
        PoliticallyExposed: false,
        BelieveIn: 0,
        SourceOfIncome: 0,
        VerificationExpirationDate: '2061-08-20T09:37:18.373Z',
        IsAccountVerified: true,
        IsExpirationEmailSent: true,
        BonusConsent: true,
      },
      MarketingDetails: {
        Voucher: '',
        BTag: null,
        FacebookID: '',
        GooglePlusID: '',
        ReferredFromCode: '',
        AffiliatePromoCode: '',
        MarketViaEmail: null,
        ReceiveSportsbookNewsletter: null,
        ReceiveCasinoNewsletter: null,
        ReceivePromotionalBySMS: null,
        MarketViaPhone: null,
        MarketViaMobile: null,
        GAcid: null,
        ReferralSourceID: 0,
        MarketViaMobileOnRegistration: false,
      },
    },
    ExternalRegistrationSessions: [
      {
        SessionType: 1,
        Session: '',
      },
    ],
    PortalUrl: 'https://qa.btobet.net',
    BrandID: 1,
    deviceType: 'Default',
    cloudfrontCountry: null,
    deviceModel: 'Unknown',
    deviceOS: 'Windows',
    screenSize: '',
    PinCode: '',
  };
}
