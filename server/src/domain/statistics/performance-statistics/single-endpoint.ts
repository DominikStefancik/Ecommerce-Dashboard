import { Logger } from 'pino';

import { Endpoint } from '@local/interfaces/networking/endpoint';
import { Request } from '@local/interfaces/networking/request';
import { AuthToken } from '@local/auth/auth-token';
import { Response } from '@local/interfaces/networking/response';
import { PerformanceStatisticsHandler } from '@local/domain/statistics/performance-statistics/handler';
import { UserRepository } from '@local/domain/user/database/repository';

export class PerformanceStatisticsEndpoint implements Endpoint {
  public static readonly PATH = '/statistics/performance/:userId';

  public async getHandler(
    request: Request,
    authToken: AuthToken,
    logger: Logger
  ): Promise<Response> {
    logger.info({ request, authToken }, 'PerformanceStatisticsEndpoint getHandler');

    const repositories = {
      user: new UserRepository(logger),
    };
    const handler = new PerformanceStatisticsHandler(repositories, logger);
    const userId = request.urlParameters['userId'];

    return handler.handleGet(userId);
  }
}
