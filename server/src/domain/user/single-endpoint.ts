import { Logger } from 'pino';

import { Endpoint } from '@local/interfaces/networking/endpoint';
import { Request } from '@local/interfaces/networking/request';
import { AuthToken } from '@local/auth/auth-token';
import { Response } from '@local/interfaces/networking/response';
import { UserHandler } from '@local/domain/user/handler';

export class UserEndpoint implements Endpoint {
  public static readonly PATH = '/users/:id';

  public getHandler(request: Request, authToken: AuthToken, logger: Logger): Promise<Response> {
    logger.info({ request, authToken }, 'UserEndpoint getHandler');

    const userId = request.urlParameters['id'];
    const handler = new UserHandler(logger);

    return handler.handleGet(userId);
  }
}
