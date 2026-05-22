export const DEPARTMENTS = [
  'Engineering',
  'HR',
  'Sales',
  'Marketing',
  'Finance',
  'Operations',
  'IT',
  'Customer Support'
];

export const EMPLOYEE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  TERMINATED: 'terminated'
};

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  EMPLOYEE: 'employee'
};

export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  CHANGE_PASSWORD: '/auth/change-password',
  GET_ME: '/auth/me',
  EMPLOYEES: '/employees',
  DASHBOARD_STATS: '/dashboard/stats',
  DEPARTMENT_DISTRIBUTION: '/dashboard/department-distribution'
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMIT_OPTIONS: [10, 25, 50, 100]
};