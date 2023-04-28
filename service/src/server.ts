import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { FastifyInstance } from 'fastify';
import { AppModule } from './app.module';
import { auth } from './common/modules/auth/middleware';
class Server {
  app: INestApplication;
  fastify: FastifyInstance;
  async run(): Promise<INestApplication> {
    this.app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({ logger: true, bodyLimit: 50 * 1024 * 1024 }),
    );

    this.app.enableShutdownHooks();

    this.app.use(auth());

    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    // shouldn't do this in prod
    this.app.enableCors({
      allowedHeaders: '*',
      origin: '*',
    });
    // this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    // for real app, you should use nestjs config service for these env
    await this.app.listen(process.env.PORT, process.env.HOST);
    return this.app;
  }

  async stop(): Promise<void> {
    if (this.app) {
      await this.app.close();
    }
  }
}

export const server = new Server();
