import { UserRepository } from '@local/domain/user/database/repository';
import { ProductRepository } from '@local/domain/product/database/repository';
import { ProductStatisticsRepository } from '@local/domain/statistics/product-statistics/database/repository';

export interface DatabaseRepositories {
  user: UserRepository;
  product: ProductRepository;
  productStatistics: ProductStatisticsRepository;
}
