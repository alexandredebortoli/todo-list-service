import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices'
import { join } from 'path';
import { Logger } from '@nestjs/common';
import { createDb } from './config/sequelize';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: `todoService`,
      url: `0.0.0.0:5000`,
      protoPath: join(__dirname, 'proto/todo-service.proto')
    }
  })
  await app.listen()
    .then(() => {
      Logger.debug(`gRPC Server 5000`)
    });
}
bootstrap();
