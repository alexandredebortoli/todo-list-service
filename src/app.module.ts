import { TodoModule } from './modules/todo/todo.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { createDb } from './config/sequelize';

@Module({
  imports: [
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...createDb],
})
export class AppModule {}
