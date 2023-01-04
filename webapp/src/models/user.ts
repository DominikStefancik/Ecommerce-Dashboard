export enum UserRole {
  USER,
  ADMIN,
  SUPER_ADMIN,
}

export interface User {
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  city?: string;
  state?: string;
  country?: string;
  occupation?: string;
  phoneNumber?: string;
  transactions?: string[];
  role: UserRole;
}
