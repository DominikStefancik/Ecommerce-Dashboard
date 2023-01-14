import { User } from '@local/domain/user/database/model';

export interface UsersPerCountry {
  countryCode: string;
  usersCount: number;
  users: Pick<User, 'firstName' | 'lastName'>[];
}
