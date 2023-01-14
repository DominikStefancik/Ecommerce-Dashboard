import { Logger } from 'pino';
import { Model } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose/lib/types';

import {
  ProductStatistics,
  ProductStatisticsModel,
} from '@local/domain/statistics/product-statistics/database/model';

export class ProductStatisticsRepository {
  private readonly model: Model<DocumentType<ProductStatistics>>;

  public constructor(private readonly logger: Logger) {
    this.model = ProductStatisticsModel;
  }

  public async getSingleProductStatistics(productId: string): Promise<ProductStatistics | null> {
    this.logger.info({ productId }, 'Fetching a single product statistics from the database');

    const statistics = await this.model.findOne({ productId });

    return statistics;
  }

  public async getProductsStatistics(filter: any): Promise<ProductStatistics[]> {
    this.logger.info({ filter }, 'Fetching product statistics from the database');

    const statistics = await this.model.find(filter);

    return statistics;
  }

  public async getAllProductsStatistics(): Promise<ProductStatistics[]> {
    return this.getProductsStatistics({});
  }
}
