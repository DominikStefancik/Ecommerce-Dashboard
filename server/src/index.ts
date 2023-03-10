// At the very beginning of the index.ts file we need to setup an alias which will be used to avoid using relative paths in imports
import 'module-alias/register';

import express from 'express';

import { ExternalSystemApiVerifier } from '@local/auth/auth-verifier/external-system-api-verifier';
import { ExpressAppBuilder } from '@local/express/express-app-builder';
import { AuthenticationMiddlewareFactory } from '@local/express/middleware/authentication-middleware-factory';
import { VersionTag, RoutePrefix } from '@local/express/routing/routes';
import { MODULE_NAME, PORT, DATABASE_URL, DATABASE_NAME } from './constants';
import { getLogger } from './logging/logger';
import { MongoConnection } from '@local/database/mongo-connection';
import { UserEndpoint } from '@local/domain/user/single-endpoint';
import { ProductCollectionEndpoint } from '@local/domain/product/collection-endpoint';
import { CustomerCollectionEndpoint } from '@local/domain/customer/collection-endpoint';
import { TransactionCollectionEndpoint } from '@local/domain/transaction/collection-endpoint';
import { GeographyUserCollectionEndpoint } from '@local/domain/geography/user/collection-endpoint';
import { OverallStatisticsCollectionEndpoint } from '@local/domain/statistics/overall-statistics/collection-endpoint';
import { AdminCollectionEndpoint } from '@local/domain/admin/collection-endpoint';
import { UserPerformanceStatisticsEndpoint } from '@local/domain/statistics/performance-statistics/user/single-endpoint';
import { DashboardStatisticsEndpoint } from '@local/domain/statistics/dashboard-statistics/endpoint';

if (!MODULE_NAME || !PORT || !DATABASE_URL || !DATABASE_NAME) {
  throw new Error('Required environment variables are not set');
}

const logger = getLogger(MODULE_NAME);

const main = async (): Promise<express.Express> => {
  const authenticationMiddlewareFactory = new AuthenticationMiddlewareFactory();
  const externalSystemVerifier = new ExternalSystemApiVerifier(logger);
  const dbConnection = new MongoConnection(
    {
      databaseUrl: DATABASE_URL ?? '',
      databaseName: DATABASE_NAME ?? '',
    },
    logger
  );
  await dbConnection.connect();

  return new ExpressAppBuilder(logger)
    .withManagementRoute(RoutePrefix.api, VersionTag.v1, [
      authenticationMiddlewareFactory.getForApiKey(externalSystemVerifier),
    ])
    .withManagementRouteEndpoints(RoutePrefix.api, VersionTag.v1, {
      [AdminCollectionEndpoint.PATH]: new AdminCollectionEndpoint(),
      [UserPerformanceStatisticsEndpoint.PATH]: new UserPerformanceStatisticsEndpoint(),
    })
    .withClientRoute(RoutePrefix.api, VersionTag.v1, [
      authenticationMiddlewareFactory.getForApiKey(externalSystemVerifier),
    ])
    .withClientRouteEndpoints(RoutePrefix.api, VersionTag.v1, {
      [CustomerCollectionEndpoint.PATH]: new CustomerCollectionEndpoint(),
      [ProductCollectionEndpoint.PATH]: new ProductCollectionEndpoint(),
      [TransactionCollectionEndpoint.PATH]: new TransactionCollectionEndpoint(),
      [GeographyUserCollectionEndpoint.PATH]: new GeographyUserCollectionEndpoint(),
    })
    .withSalesRoute(RoutePrefix.api, VersionTag.v1, [
      authenticationMiddlewareFactory.getForApiKey(externalSystemVerifier),
    ])
    .withSalesRouteEndpoints(RoutePrefix.api, VersionTag.v1, {
      [OverallStatisticsCollectionEndpoint.PATH]: new OverallStatisticsCollectionEndpoint(),
    })
    .withGeneralRoute(RoutePrefix.api, VersionTag.v1, [
      authenticationMiddlewareFactory.getForApiKey(externalSystemVerifier),
    ])
    .withGeneralRouteEndpoints(RoutePrefix.api, VersionTag.v1, {
      [UserEndpoint.PATH]: new UserEndpoint(),
      [DashboardStatisticsEndpoint.PATH]: new DashboardStatisticsEndpoint(),
    })
    .build();
};

main().then((app) =>
  app.listen(PORT, () => {
    logger.info(`Express server is listening on the port ${PORT}`);
  })
);
