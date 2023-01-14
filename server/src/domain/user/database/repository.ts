import { Logger } from 'pino';
import { ProjectionFields, Model } from 'mongoose';

import { User, UserModel } from '@local/domain/user/database/model';
import { DocumentType } from '@typegoose/typegoose/lib/types';

export class UserRepository {
  private readonly model: Model<DocumentType<User>>;

  constructor(private readonly logger: Logger) {
    this.model = UserModel;
  }

  public async getUser(id: string, projection?: ProjectionFields<User>): Promise<User> {
    this.logger.info({ id }, 'Fetching user from the database');

    const user = await this.model.findById(id, projection);

    if (!user) {
      // TODO: Create a domain error + its hierarchy
      throw Error('User not found');
    }

    return user;
  }

  public async getUsers(filter: any, projection?: ProjectionFields<User>): Promise<User[]> {
    this.logger.info({ filter }, 'Fetching users with the filter from the database');

    const users = await this.model.find(filter, projection);

    return users;
  }

  public async getAllUsers(): Promise<User[]> {
    return this.getUsers({});
  }
}
