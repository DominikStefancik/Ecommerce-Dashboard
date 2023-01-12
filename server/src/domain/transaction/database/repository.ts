import { Logger } from 'pino';
import { Model } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose/lib/types';

import { Transaction, TransactionModel } from '@local/domain/transaction/database/model';
import { Pagination } from '@local/interfaces/database/pagination';

export class TransactionRepository {
  private readonly model: Model<DocumentType<Transaction>>;

  public constructor(private readonly logger: Logger) {
    this.model = TransactionModel;
  }

  public async getTransaction(id: string): Promise<Transaction> {
    this.logger.info({ id }, 'Fetching a single transaction from the database');

    const transaction = await this.model.findById(id);

    if (!transaction) {
      // TODO: Create a domain error + its hierarchy
      throw Error('Transaction not found');
    }

    return transaction;
  }

  public async getTransactions(filter: any, pagination?: Pagination): Promise<Transaction[]> {
    this.logger.info({ filter, pagination }, 'Fetching transactions from the database');

    if (pagination) {
      const { page, pageSize, sort } = pagination;

      return this.model
        .find(filter)
        .sort(sort ? { [sort.field]: sort.order } : {})
        .skip(page * pageSize)
        .limit(pageSize);
    } else {
      return this.model.find(filter);
    }
  }

  public async getAllTransactions(): Promise<Transaction[]> {
    return this.getTransactions({});
  }

  public async getTotalCount(search: string): Promise<number> {
    this.logger.info(
      { search },
      'Fetching total count of transactions based on the search parameter'
    );

    return this.model.countDocuments({ name: { $regex: search, $option: 'i' } });
  }
}
