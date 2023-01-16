import { Logger } from 'pino';

import { Endpoint } from '@local/interfaces/networking/endpoint';
import { Request } from '@local/interfaces/networking/request';
import { AuthToken } from '@local/auth/auth-token';
import { Response } from '@local/interfaces/networking/response';
import { UserRepository } from '@local/domain/user/database/repository';
import { AdminHandler } from '@local/domain/admin/handler';

export class AdminCollectionEndpoint implements Endpoint {
  public static readonly PATH = '/admins';

  public async getHandler(
    request: Request,
    authToken: AuthToken,
    logger: Logger
  ): Promise<Response> {
    logger.info({ request, authToken }, 'AdminCollectionEndpoint getHandler');

    const repositories = {
      user: new UserRepository(logger),
    };
    const handler = new AdminHandler(repositories, logger);

    return handler.handleGet();
  }
}
