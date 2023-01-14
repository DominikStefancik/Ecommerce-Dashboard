import { Logger } from 'pino';

import { Endpoint } from '@local/interfaces/networking/endpoint';
import { Request } from '@local/interfaces/networking/request';
import { AuthToken } from '@local/auth/auth-token';
import { Response } from '@local/interfaces/networking/response';
import { OverallStatisticsRepository } from '@local/domain/statistics/overal-statistics/database/repository';
import { OverallStatisticsHandler } from '@local/domain/statistics/overal-statistics/handler';

export class OverallStatisticsCollectionEndpoint implements Endpoint {
  public static readonly PATH = '/statistics/overall';

  public async getHandler(
    request: Request,
    authToken: AuthToken,
    logger: Logger
  ): Promise<Response> {
    logger.info({ request, authToken }, 'OverallStatisticsCollectionEndpoint getHandler');

    const repositories = {
      overallStatistics: new OverallStatisticsRepository(logger),
    };
    const handler = new OverallStatisticsHandler(repositories, logger);

    return handler.handleGet();
  }
}
