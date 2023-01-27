import { Logger } from 'pino';
import { SortOrder } from 'mongoose';

import { HandlerResponse } from '@local/interfaces/networking/endpoint-handler';
import { HttpResponseCode } from '@local/express/http/http-response-code';
import { DatabaseRepositories } from '@local/interfaces/database/repositories';
import { TransactionRepository } from '@local/domain/transaction/database/repository';
import { OverallStatisticsRepository } from '@local/domain/statistics/overall-statistics/database/repository';
import { Transaction } from '@local/domain/transaction/database/model';
import { OverallStatistics } from '@local/domain/statistics/overall-statistics/database/model';

export class DashboardStatisticsHandler {
  public constructor(
    private readonly repositories: Pick<DatabaseRepositories, 'transaction' | 'overallStatistics'>,
    private readonly logger: Logger
  ) {}

  private get transactionRepository(): TransactionRepository {
    return this.repositories.transaction;
  }

  private get overallStatisticsRepository(): OverallStatisticsRepository {
    return this.repositories.overallStatistics;
  }

  public async handleGet(
    year: string
  ): Promise<
    HandlerResponse<{ transactions: Transaction[]; overallStatistics: OverallStatistics | null }>
  > {
    this.logger.info({ year }, 'Handling GET request...');

    const transactionPagination = {
      page: 0,
      pageSize: 50,
      sort: { field: 'createdOn', order: 'descending' as SortOrder },
      search: '',
    };
    const transactions = await this.transactionRepository.getTransactions(
      {},
      transactionPagination
    );

    const overallStatistics = await this.overallStatisticsRepository.getSingleOverallStatistics({
      year,
    });

    return {
      code: HttpResponseCode.OK,
      payload: {
        transactions,
        overallStatistics,
      },
    };
  }
}
