import { TodoService } from './todo.service';
import { Metadata, ServerUnaryCall } from "@grpc/grpc-js";
import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";

@Controller()
export class TodoController {
  constructor(private todoService: TodoService) {}

  @GrpcMethod('TodoService', 'FindOne')
  findOne() {
      return this.todoService.getTodos();
  }

  @GrpcMethod('TodoService', 'createTodo')
  createTodo() {
    return this.todoService.createTodo();
  }
}