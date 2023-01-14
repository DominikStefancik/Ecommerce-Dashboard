import { User } from '@local/pages/models/user';

export interface UsersPerCountry {
  countryCode: string;
  usersCount: number;
  users: Pick<User, 'firstName' | 'lastName'>[];
}
