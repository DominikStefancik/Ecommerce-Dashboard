import { UserRole } from '@local/pages/models/user';

export const getRoleString = (value: UserRole): string => {
  switch (value) {
    case UserRole.USER:
      return 'User';
    case UserRole.ADMIN:
      return 'Admin';
    case UserRole.SUPER_ADMIN:
      return 'Super Admin';
    default:
      return 'Unknown role';
  }
};
