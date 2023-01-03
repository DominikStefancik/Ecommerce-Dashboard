import { pino } from 'pino';
import * as mongoose from 'mongoose';

export interface IConnectionProperties {
  databaseUrl: string;
  databaseName: string;
}

/**
 * Class for connecting to MongoDb database
 */
export class MongoConnection {
  constructor(
    private readonly config: IConnectionProperties,
    private readonly logger: pino.Logger
  ) {}

  public async connect() {
    this.logger.info('Connecting to the database...');
    await mongoose.connect(this.config.databaseUrl, {
      dbName: this.config.databaseName,
    });
    this.logger.info('Database connected.');
  }

  public async disconnect() {
    this.logger.info('Disconnecting from the database...');
    await mongoose.disconnect();
    this.logger.info('Database disconnected.');
  }

  public async dropDatabase() {
    this.logger.info('Dropping database...');
    await mongoose.connection.dropDatabase();
    this.logger.info('Database dropped.');
  }
}
