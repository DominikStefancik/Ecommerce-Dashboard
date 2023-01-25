import { Logger } from 'pino';
import { Model } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose/lib/types';

import {
  OverallStatistics,
  OverallStatisticsModel,
} from '@local/domain/statistics/overall-statistics/database/model';

export class OverallStatisticsRepository {
  private readonly model: Model<DocumentType<OverallStatistics>>;

  public constructor(private readonly logger: Logger) {
    this.model = OverallStatisticsModel;
  }

  public async getSingleOverallStatistics(productId: string): Promise<OverallStatistics | null> {
    this.logger.info({ productId }, 'Fetching a single overall statistics from the database');

    const statistics = await this.model.findOne({ productId });

    return statistics;
  }

  public async getOverallStatistics(filter: any): Promise<OverallStatistics[]> {
    this.logger.info({ filter }, 'Fetching overall statistics from the database');

    const statistics = await this.model.find(filter);

    return statistics;
  }
}
