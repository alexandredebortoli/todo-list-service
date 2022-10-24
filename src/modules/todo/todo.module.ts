import { Module } from "@nestjs/common";
import { TodoController } from './todo.controller';
import { TodoService } from "./todo.service";
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