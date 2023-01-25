import { Logger } from 'pino';

import { DatabaseRepositories } from '@local/interfaces/database/repositories';
import { OverallStatisticsRepository } from '@local/domain/statistics/overall-statistics/database/repository';
import { HandlerResponse } from '@local/interfaces/networking/endpoint-handler';
import { OverallStatistics } from '@local/domain/statistics/overall-statistics/database/model';
import { HttpResponseCode } from '@local/express/http/http-response-code';

export class OverallStatisticsHandler {
  public constructor(
    private readonly repositories: Pick<DatabaseRepositories, 'overallStatistics'>,
    private readonly logger: Logger
  ) {}

  private get overallStatisticsRepository(): OverallStatisticsRepository {
    return this.repositories.overallStatistics;
  }

  public async handleGet(): Promise<HandlerResponse<{ overallStatistics: OverallStatistics[] }>> {
    this.logger.info('Handling GET request...');

    const statistics = await this.overallStatisticsRepository.getOverallStatistics({});

    return { code: HttpResponseCode.OK, payload: { overallStatistics: statistics } };
  }
}
