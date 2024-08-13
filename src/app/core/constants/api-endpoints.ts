export const API_ENDPOINTS = {
  // Auth Endpoints
  login: '/auth/login',
  register: {
    clients: '/auth/signup/clients',
    owners: '/auth/signup/owners',
    managers: '/auth/signup/managers',
  },
  inviteManager: '/auth/invite/manager',

  // Companies Endpoints
  companies: '/companies',
  openingHours: '/opening-hours/location/{companyLocationId}',
  availableHours: '/opening-hours/location',

  // Services Endpoints
  services: '/services',
  servicesByCompany: '/services/companies',

  // Reservations Endpoints
  reservations: '/reservations',

  // Admin Role Endpoints
  roles: '/admin/v1/roles',
  addRole: '/admin/v1/roles',

  // Admin User Endpoints
  users: '/admin/v1/users',
  getAllOwners: '/admin/v1/users/owners',
  getAllManagers: '/admin/v1/users/managers',
  getAllClients: '/admin/v1/users/clients',
  addOwner: '/admin/v1/users/owners',
  addManager: '/admin/v1/users/managers',
  addClient: '/admin/v1/users/clients',

  // Other Endpoints
  serviceTypes: '/service-types',
  subServiceTypes: '/sub-service-types',
  locations: '/locations/search',
};
