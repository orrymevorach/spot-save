export const COOKIES = {
  USER_RECORD: 'userRecord',
};

export const ROUTES = {
  HOME: '/',
  CABIN_SELECTION: '/cabin-selection',
  RESERVE: '/reserve',
  SUMMARY: '/summary',
};

export const AIRTABLE_TABLES = {
  OFFICES: 'Offices',
  USERS: 'Users',
};

export const transformedFields = {
  [AIRTABLE_TABLES.OFFICES]: {
    Unit: 'unit',
    Availability: 'availability',
    'Total Beds': 'totalBeds',
    Status: 'status',
    'Additional Information': 'additionalInformation',
    Name: 'name',
    'Reserved Beds': 'reservedBeds',
    Images: 'images',
    'Open Beds': 'openBeds',
    'Desk One': 'deskOne',
    'Desk Two': 'deskTwo',
  },
  [AIRTABLE_TABLES.USERS]: {
    Name: 'name',
    Status: 'status',
    'Email Address': 'emailAddress',
    Password: 'password',
    'Discount Code': 'discountCode',
    Amount: 'amount',
    Environment: 'environment',
    'Desk One': 'deskOne',
    'Desk Two': 'deskTwo',
  },
};
