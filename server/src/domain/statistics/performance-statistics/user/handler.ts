import { Logger } from 'pino';

import { DatabaseRepositories } from '@local/interfaces/database/repositories';
import { HandlerResponse } from '@local/interfaces/networking/endpoint-handler';
import { HttpResponseCode } from '@local/express/http/http-response-code';
import { UserRepository } from '@local/domain/user/database/repository';
import { Types, PipelineStage } from 'mongoose';
import { User } from '@local/domain/user/database/model';

export class UserPerformanceStatisticsHandler {
  public constructor(
    private readonly repositories: Pick<DatabaseRepositories, 'user'>,
    private readonly logger: Logger
  ) {}

  private get userRepository(): UserRepository {
    return this.repositories.user;
  }

  public async handleGet(userId?: string): Promise<HandlerResponse<{ userWithStatistics: User }>> {
    this.logger.info({ userId }, 'Handling GET request...');

    const userAggregateStages = this.getUserAggregateStages(userId ?? '');
    const usersWithStatistics = await this.userRepository.getAggregate(userAggregateStages);

    return {
      code: HttpResponseCode.OK,
      payload: { userWithStatistics: usersWithStatistics[0] },
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
}
