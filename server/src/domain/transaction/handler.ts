import { Logger } from 'pino';

import { DatabaseRepositories } from '@local/interfaces/database/repositories';
import { TransactionRepository } from '@local/domain/transaction/database/repository';
import { HandlerResponse } from '@local/interfaces/networking/endpoint-handler';
import { Transaction } from '@local/domain/transaction/database/model';
import { HttpResponseCode } from '@local/express/http/http-response-code';
import { Pagination } from '@local/interfaces/database/pagination';
import { InvalidRequestError } from '@local/express/http/http-errors';

export interface GetParameters {
  id?: string;
  pagination?: Pagination;
}

export class TransactionHandler {
  public constructor(
    private readonly repositories: Pick<DatabaseRepositories, 'transaction'>,
    private readonly logger: Logger
  ) {}

  private get transactionRepository(): TransactionRepository {
    return this.repositories.transaction;
  }

  public async handleGet(
    parameters: GetParameters
  ): Promise<HandlerResponse<{ transactions: Transaction[]; totalCount: number }>> {
    this.logger.info({ parameters }, 'Handling GET request...');

    const { id, pagination } = parameters;
    let transactions: Transaction[];
    let totalCount: number;

    if (id) {
      const transaction = await this.transactionRepository.getTransaction(id);
      transactions = [transaction];
      totalCount = 1;
    } else if (pagination) {
      const { search } = pagination;
      const filter = {
        $or: this.getOrArray(search),
      };
      transactions = await this.transactionRepository.getTransactions(filter, pagination);
      totalCount = await this.transactionRepository.getTotalCount(search);
    } else {
      throw new InvalidRequestError('Id or pagination must be provided');
    }

    return { code: HttpResponseCode.OK, payload: { transactions, totalCount } };
  }

  private getOrArray(search: string): { [field: string]: any }[] {
    const orArray: { [field: string]: any }[] = [{ userId: new RegExp(search, 'i') }];
    const number = Number(search);

    if (search && !Number.isNaN(number)) {
      orArray.push({ cost: number });
    }

    return orArray;
  }
}
