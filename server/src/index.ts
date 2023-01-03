// At the very beginning of the index.ts file we need to setup an alias which will be used to avoid using relative paths in imports
import 'module-alias/register';

import express from 'express';

import { ExternalSystemApiVerifier } from '@local/auth/auth-verifier/external-system-api-verifier';
import { ExpressAppBuilder } from '@local/express/express-app-builder';
import { AuthenticationMiddlewareFactory } from '@local/express/middleware/authentication-middleware-factory';
import { VersionTag } from '@local/express/routing/routes';
import { MODULE_NAME, PORT, DATABASE_URL, DATABASE_NAME } from './constants';
import { getLogger } from './logging/logger';
import { MongoConnection } from '@local/database/mongo-connection';
import { UserEndpoint } from '@local/domain/user/single-endpoint';

if (!MODULE_NAME || !PORT || !DATABASE_URL || !DATABASE_NAME) {
  throw new Error('Required environments variables are not set');
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
    .withGeneralRoute('api', VersionTag.v1, [
      authenticationMiddlewareFactory.getForApiKey(externalSystemVerifier),
    ])
    .withGeneralRouteEndpoints('api', VersionTag.v1, {
      [UserEndpoint.PATH]: new UserEndpoint(),
    })
    .build();
};

main().then((app) =>
  app.listen(PORT, () => {
    logger.info(`Express server is listening on the port ${PORT}`);
  })
);
