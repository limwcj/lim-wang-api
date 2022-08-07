import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import express from 'express';
import xmlparser from 'express-xml-bodyparser';
import { Logger as PinoLogger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { config } from './config';

const logger = new Logger('main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.setGlobalPrefix('api');
  app.enableCors();
  app.useLogger(app.get(PinoLogger));
  app.use(express.json());
  app.use(express.urlencoded());
  xmlparser.regexp = /^text\/xml$/i;
  app.use(xmlparser({ explicitArray: false, normalize: false, normalizeTags: false, trim: true }));

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
  logger.error(err);
});

process.on('unhandledRejection', (err: any, p: Promise<any>) => {
  logger.error(err);
});
