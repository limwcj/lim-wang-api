import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { requestMiddleware } from './common/middlewares/request.middleware';
import { config } from './config';

const logger = new Logger('main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableCors();
  app.use(requestMiddleware);

  const port = config.port;
  try {
    await app.listen(port, () => {
      logger.log(`Server is listening at ${port}`);
    });
  } catch (e) {
    console.error('app error: ', e);
  }
}

bootstrap();

process.on('uncaughtException', (err: Error) => {
  if (Object.keys(err).length) {
    logger.error(err);
  }
});

process.on('unhandledRejection', (err: any, p: Promise<any>) => {
  if (Object.keys(err).length) {
    logger.error(err);
  }
});
