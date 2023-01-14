import { Logger } from 'pino';

import { DatabaseRepositories } from '@local/interfaces/database/repositories';
import { UserRepository } from '@local/domain/user/database/repository';
import { HandlerResponse } from '@local/interfaces/networking/endpoint-handler';
import { HttpResponseCode } from '@local/express/http/http-response-code';
import { User } from '@local/domain/user/database/model';
import { getCountryISO3 } from '@local/utils/country-codes';
import { UsersPerCountry } from '@local/domain/geography/model/geography-user-statistics';

export class GeographyHandler {
  public constructor(
    private readonly repositories: Pick<DatabaseRepositories, 'user'>,
    private readonly logger: Logger
  ) {}

  private get userRepository(): UserRepository {
    return this.repositories.user;
  }

  public async handleGet(): Promise<HandlerResponse<{ userStatistics: UsersPerCountry[] }>> {
    this.logger.info('Handling GET request...');

    const users = await this.userRepository.getAllUsers();
    const mappedLocations: { [countryCode: string]: number } = users.reduce(
      (accumulator: { [countryCode: string]: number }, { country }: User): object => {
        if (!accumulator[country]) {
          accumulator[country] = 0;
        }
        accumulator[country]++;

        return accumulator;
      },
      {}
    );
    const usersPerCountryStats = Object.entries(mappedLocations).map(([countryCode, count]) => {
      const countryCodeISO3 = getCountryISO3(countryCode);
      const usersWithCountryCode = users
        .filter((user) => user.country === countryCode)
        .map((user) => ({ firstName: user.firstName ?? '', lastName: user.lastName ?? '' }));
      return { countryCode: countryCodeISO3, usersCount: count, users: usersWithCountryCode };
    });

    return { code: HttpResponseCode.OK, payload: { userStatistics: usersPerCountryStats } };
  }
}
