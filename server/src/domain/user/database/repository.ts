import { Logger } from 'pino';
import { mongoose } from '@typegoose/typegoose';

import { User, UserModel } from '@local/domain/user/database/model';
import { DocumentType } from '@typegoose/typegoose/lib/types';

export class UserRepository {
  private readonly model: mongoose.Model<DocumentType<User>>;

  constructor(private readonly logger: Logger) {
    this.model = UserModel;
  }

  public async getUser(id: string): Promise<User> {
    this.logger.info({ id }, 'Fetching user from the database');

    const user = await this.model.findById(id);

    if (!user) {
      // TODO: Create a domain error + its hierarchy
      throw Error('User not found');
    }

    return user;
  }
}
