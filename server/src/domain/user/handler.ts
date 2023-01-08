import { Logger } from 'pino';

import { HandlerResponse } from '@local/interfaces/networking/endpoint-handler';
import { HttpResponseCode } from '@local/express/http/http-response-code';
import { UserRepository } from '@local/domain/user/database/repository';
import { User } from '@local/domain/user/database/model';

export class UserHandler {
  public constructor(
    private readonly repository: UserRepository,
    private readonly logger: Logger
  ) {}

  public async handleGet(id: string): Promise<HandlerResponse<User>> {
    this.logger.info({ id }, 'Handling GET request...');

    const user = await this.repository.getUser(id, { password: false });

    return { code: HttpResponseCode.OK, payload: user };
  }
}
