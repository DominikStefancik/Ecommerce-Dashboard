import { Logger } from 'pino';

import { Endpoint } from '@local/interfaces/networking/endpoint';
import { Request } from '@local/interfaces/networking/request';
import { AuthToken } from '@local/auth/auth-token';
import { Response } from '@local/interfaces/networking/response';
import { UserHandler } from '@local/domain/user/handler';
import { UserRepository } from '@local/domain/user/database/repository';

export class UserEndpoint implements Endpoint {
  public static readonly PATH = '/users/:id';

  public getHandler(request: Request, authToken: AuthToken, logger: Logger): Promise<Response> {
    logger.info({ request, authToken }, 'UserEndpoint getHandler');

    const repository = new UserRepository(logger);
    const handler = new UserHandler(repository, logger);
    const userId = request.urlParameters['id'];

    return handler.handleGet(userId);
  }
}
