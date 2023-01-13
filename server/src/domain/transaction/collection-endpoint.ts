import { Logger } from 'pino';

import { Endpoint } from '@local/interfaces/networking/endpoint';
import { Request } from '@local/interfaces/networking/request';
import { AuthToken } from '@local/auth/auth-token';
import { Response } from '@local/interfaces/networking/response';
import { TransactionRepository } from '@local/domain/transaction/database/repository';
import { TransactionHandler } from '@local/domain/transaction/handler';

export class TransactionCollectionEndpoint implements Endpoint {
  public static readonly PATH = '/transactions';

  public async getHandler(
    request: Request,
    authToken: AuthToken,
    logger: Logger
  ): Promise<Response> {
    logger.info({ request, authToken }, 'TransactionCollectionEndpoint getHandler');
    const {
      page = 1,
      pageSize = 20,
      sort = null,
      // 'search' represents a search string sent by the caller of the endpoint
      search = '',
    } = request.queryParameters;
    const pagination = {
      page: Number(page),
      pageSize: Number(pageSize),
      sort: JSON.parse((sort as string) ?? ''),
      search: search as string,
    };

    const repositories = {
      transaction: new TransactionRepository(logger),
    };
    const handler = new TransactionHandler(repositories, logger);

    return handler.handleGet({
      pagination,
    });
  }
}
