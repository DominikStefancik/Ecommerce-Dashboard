import { Logger } from 'pino';

import { Endpoint } from '@local/interfaces/networking/endpoint';
import { Request } from '@local/interfaces/networking/request';
import { AuthToken } from '@local/auth/auth-token';
import { Response } from '@local/interfaces/networking/response';
import { CustomerHandler } from '@local/domain/customer/handler';
import { UserRepository } from '@local/domain/user/database/repository';

export class CustomerCollectionEndpoint implements Endpoint {
  public static readonly PATH = '/customers';

  public async getHandler(
    request: Request,
    authToken: AuthToken,
    logger: Logger
  ): Promise<Response> {
    logger.info({ request, authToken }, 'CustomerCollectionEndpoint getHandler');

    const repositories = {
      user: new UserRepository(logger),
    };
    const handler = new CustomerHandler(repositories, logger);

    return handler.handleGet();
  }
}
