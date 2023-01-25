import 'module-alias/register';

import { MongoConnection } from '@local/database/mongo-connection';
import { getLogger } from '@local/logging/logger';
import { UserModel } from '@local/domain/user/database/model';
import { ProductModel } from '@local/domain/product/database/model';
import { ProductStatisticsModel } from '@local/domain/statistics/product-statistics/database/model';
import { dataUser } from './data/user-demo-data';
import { dataProduct } from './data/product-demo-data';
import { dataProductStatistics } from './data/product-statistics-demo-data';
import { TransactionModel } from '@local/domain/transaction/database/model';
import { dataTransaction } from './data/transaction-demo-data';
import { OverallStatisticsModel } from '@local/domain/statistics/overall-statistics/database/model';
import { dataOverallStatistics } from './data/overall-statistics-demo-data';
import { UserPerformanceStatisticsModel } from '@local/domain/statistics/performance-statistics/user/database/model';
import { dataUserPerformanceStatistics } from './data/user-performance-statistics-demo-data';

const logger = getLogger('demo');
const dbConnection = new MongoConnection(
  {
    databaseUrl: '',
    databaseName: '',
  },
  logger
);

const importDemoData = async () => {
  await dbConnection.connect();

  // Before inserting, drop the database
  await dbConnection.dropDatabase();

  // Users
  logger.info('Importing users...');
  await UserModel.insertMany(dataUser);
  logger.info(`Imported ${dataUser.length} users`);

  // Products
  logger.info('Importing products...');
  await ProductModel.insertMany(dataProduct);
  logger.info(`Imported ${dataProduct.length} products`);

  // Product Statistics
  logger.info('Importing product statistics...');
  await ProductStatisticsModel.insertMany(dataProductStatistics);
  logger.info(`Imported ${dataProductStatistics.length} product statistics`);

  // Transactions
  logger.info('Importing transactions...');
  await TransactionModel.insertMany(dataTransaction);
  logger.info(`Imported ${dataTransaction.length} transactions`);

  // Overall Statistics
  logger.info('Importing overall statistics...');
  await OverallStatisticsModel.insertMany(dataOverallStatistics);
  logger.info(`Imported ${dataOverallStatistics.length} overall statistics`);

  // User Performance Statistics
  logger.info('Importing user performance statistics...');
  await UserPerformanceStatisticsModel.insertMany(dataUserPerformanceStatistics);
  logger.info(`Imported ${dataUserPerformanceStatistics.length} user performance statistics`);

  logger.info('All data imported');

  await dbConnection.disconnect();
};

importDemoData()
  .then(() => {
    process.exit();
  })
  .catch((error) => {
    logger.error({ error }, 'Error while importing data to db');
    process.exit(1);
  });
