import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from "@nestjs/common";
import { TodoController } from './todo.controller';
import { TodoService } from "./todo.service";
import { Todo } from './models/todo.model';
import { todoProviders } from './models/todo.providers';


@Module({
  imports: [],
  controllers: [TodoController],
  providers: [
    TodoService,
    ...todoProviders
  ]
})
export class TodoModule {}