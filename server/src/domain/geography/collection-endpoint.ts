import { Logger } from 'pino';

import { Endpoint } from '@local/interfaces/networking/endpoint';
import { Request } from '@local/interfaces/networking/request';
import { AuthToken } from '@local/auth/auth-token';
import { UserRepository } from '@local/domain/user/database/repository';
import { Response } from '@local/interfaces/networking/response';
import { GeographyHandler } from '@local/domain/geography/handler';

export class GeographyCollectionEndpoint implements Endpoint {
  public static readonly PATH = '/geography-stats';

  public async getHandler(
    request: Request,
    authToken: AuthToken,
    logger: Logger
  ): Promise<Response> {
    logger.info({ request, authToken }, 'GeographyCollectionEndpoint getHandler');

    const repositories = {
      user: new UserRepository(logger),
    };
    const handler = new GeographyHandler(repositories, logger);

    return handler.handleGet();
  }
}
