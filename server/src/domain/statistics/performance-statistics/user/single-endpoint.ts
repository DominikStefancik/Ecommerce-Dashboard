import { Logger } from 'pino';

import { Endpoint } from '@local/interfaces/networking/endpoint';
import { Request } from '@local/interfaces/networking/request';
import { AuthToken } from '@local/auth/auth-token';
import { Response } from '@local/interfaces/networking/response';
import { UserPerformanceStatisticsHandler } from '@local/domain/statistics/performance-statistics/user/handler';
import { UserRepository } from '@local/domain/user/database/repository';

export class UserPerformanceStatisticsEndpoint implements Endpoint {
  public static readonly PATH = '/statistics/performance/users/:userId';

  public async getHandler(
    request: Request,
    authToken: AuthToken,
    logger: Logger
  ): Promise<Response> {
    logger.info({ request, authToken }, 'UserPerformanceStatisticsEndpoint getHandler');

    const repositories = {
      user: new UserRepository(logger),
    };
    const handler = new UserPerformanceStatisticsHandler(repositories, logger);
    const userId = request.urlParameters['userId'];

    return handler.handleGet(userId);
  }
}
