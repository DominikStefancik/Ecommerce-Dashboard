import { Logger } from 'pino';

import { Endpoint } from '@local/interfaces/networking/endpoint';
import { Request } from '@local/interfaces/networking/request';
import { AuthToken } from '@local/auth/auth-token';
import { Response } from '@local/interfaces/networking/response';
import { DashboardStatisticsHandler } from '@local/domain/statistics/dashboard-statistics/handler';
import { TransactionRepository } from '@local/domain/transaction/database/repository';
import { OverallStatisticsRepository } from '@local/domain/statistics/overall-statistics/database/repository';

export class DashboardStatisticsEndpoint implements Endpoint {
  public static readonly PATH = '/dashboard-statistics';

  public getHandler(request: Request, authToken: AuthToken, logger: Logger): Promise<Response> {
    logger.info({ request, authToken }, 'DashboardStatisticsEndpoint getHandler');

    const repositories = {
      transaction: new TransactionRepository(logger),
      overallStatistics: new OverallStatisticsRepository(logger),
    };
    const handler = new DashboardStatisticsHandler(repositories, logger);
    const year = request.queryParameters['year'] ?? '';

    return handler.handleGet(year as string);
  }
}
