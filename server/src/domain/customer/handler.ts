import { Logger } from 'pino';

import { HandlerResponse } from '@local/interfaces/networking/endpoint-handler';
import { HttpResponseCode } from '@local/express/http/http-response-code';
import { DatabaseRepositories } from '@local/interfaces/database/repositories';
import { UserRepository } from '@local/domain/user/database/repository';
import { User, UserRole } from '@local/domain/user/database/model';

export class CustomerHandler {
  public constructor(
    private readonly repositories: Pick<DatabaseRepositories, 'user'>,
    private readonly logger: Logger
  ) {}

  private get userRepository(): UserRepository {
    return this.repositories.user;
  }

  public async handleGet(id?: string): Promise<HandlerResponse<User[]>> {
    this.logger.info({ id }, 'Handling GET request...');

    const users = await this.userRepository.getUsers({ role: UserRole.USER }, { password: false });

    return { code: HttpResponseCode.OK, payload: users };
  }
}
