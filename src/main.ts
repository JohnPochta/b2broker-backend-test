import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from '@infrastructure/app.module';
import { LoggerProvider } from './shared/providers/logger.provider';

const appName = process.env.APP_NAME || 'COINFLIP';
const logger = new LoggerProvider(appName);

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ ignoreTrailingSlash: true }),
    {
      cors: true,
      logger,
    },
  );

  await app.listen(Number(process.env.APP_PORT || 3000), '0.0.0.0');
}

bootstrap()
  .then(() => logger.log(`${appName} is ready to fly!`))
  .catch((error) => {
    console.log(error);
    logger.error(`Failed to initialize ${appName}: ${error?.message}`);
    throw error;
  });

process.on('uncaughtException', (error) => {
  console.log(error);

  logger.error(`Uncaught exception caught: ${error?.message}`);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection at: ${JSON.stringify(promise)}, reason: ${reason}`);
}); 