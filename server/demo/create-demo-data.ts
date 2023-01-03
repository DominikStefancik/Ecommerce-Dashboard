import 'module-alias/register';

import { MongoConnection } from '@local/database/mongo-connection';
import { getLogger } from '@local/logging/logger';
import { UserModel } from '@local/domain/user/database/model';
import { dataUser } from './data/user-demo-data';

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
