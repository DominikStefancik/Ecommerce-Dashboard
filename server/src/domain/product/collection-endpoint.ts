import { Logger } from 'pino';

import { Endpoint } from '@local/interfaces/networking/endpoint';
import { Request } from '@local/interfaces/networking/request';
import { AuthToken } from '@local/auth/auth-token';
import { Response } from '@local/interfaces/networking/response';
import { ProductRepository } from '@local/domain/product/database/repository';
import { ProductHandler } from '@local/domain/product/handler';
import { ProductStatisticsRepository } from '@local/domain/statistics/product-statistics/database/repository';

export class ProductCollectionEndpoint implements Endpoint {
  public static readonly PATH = '/products';

  public async getHandler(
    request: Request,
    authToken: AuthToken,
    logger: Logger
  ): Promise<Response> {
    logger.info({ request, authToken }, 'ProductCollectionEndpoint getHandler');

    const repositories = {
      product: new ProductRepository(logger),
      productStatistics: new ProductStatisticsRepository(logger),
    };
    const handler = new ProductHandler(repositories, logger);

    return handler.handleGet();
  }
}
