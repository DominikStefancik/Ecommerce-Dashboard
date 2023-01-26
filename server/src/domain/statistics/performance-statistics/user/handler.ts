import { Logger } from 'pino';

import { DatabaseRepositories } from '@local/interfaces/database/repositories';
import { HandlerResponse } from '@local/interfaces/networking/endpoint-handler';
import { HttpResponseCode } from '@local/express/http/http-response-code';
import { UserRepository } from '@local/domain/user/database/repository';
import { Types, PipelineStage } from 'mongoose';
import { User } from '@local/domain/user/database/model';
import { TransactionRepository } from '@local/domain/transaction/database/repository';
import { Transaction } from '@local/domain/transaction/database/model';

type UserAggregate = User & {
  performanceStatistics: { affiliateSales: (string | Transaction)[] };
};

export class UserPerformanceStatisticsHandler {
  public constructor(
    private readonly repositories: Pick<DatabaseRepositories, 'user' | 'transaction'>,
    private readonly logger: Logger
  ) {}

  private get userRepository(): UserRepository {
    return this.repositories.user;
  }

  private get transactionRepository(): TransactionRepository {
    return this.repositories.transaction;
  }

  public async handleGet(
    userId?: string
  ): Promise<HandlerResponse<{ userWithStatistics: UserAggregate }>> {
    this.logger.info({ userId }, 'Handling GET request...');

    const userAggregateStages = this.getUserAggregateStages(userId ?? '');

    // first get a user aggregate with 'affiliateSales' representing a list of transaction ids
    const userAggregates = await this.userRepository.getAggregate(userAggregateStages);
    let userWithStatistics = userAggregates[0] as UserAggregate;

    // then take the transaction ids and replace them with transaction objects
    userWithStatistics = await this.enrichWithTransactions(userWithStatistics);

    return {
      code: HttpResponseCode.OK,
      payload: { userWithStatistics },
    };
  }

  private getUserAggregateStages(userId: string): PipelineStage[] {
    return [
      {
        // grab details about a particular user
        $match: {
          _id: new Types.ObjectId(userId),
        },
      },
      {
        // we want to lookup in the 'performance-statistics' collection
        $lookup: {
          from: 'user-performance-statistics',
          localField: '_id',
          foreignField: 'userId',
          // return the looked up information as
          as: 'performanceStatistics',
        },
      },
      // '$unwind' just flattens a given array
      { $unwind: '$performanceStatistics' },
    ];
  }

  private async enrichWithTransactions(user: UserAggregate): Promise<UserAggregate> {
    const transactionsFilter = {
      _id: { $in: user.performanceStatistics.affiliateSales },
    };
    const transactions = await this.transactionRepository.getTransactions(transactionsFilter);

    return {
      ...user,
      performanceStatistics: {
        ...user.performanceStatistics,
        affiliateSales: transactions,
      },
    };
  }
}
