import { TodoService } from './todo.service';
import { Metadata, ServerUnaryCall } from "@grpc/grpc-js";
import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";

@Controller()
export class TodoController {
  constructor(private todoService: TodoService) {}

  @GrpcMethod('TodoService', 'getAll')
  getAll() {
    return this.todoService.getAll();
  }

  @GrpcMethod('TodoService', 'getById')
  getById(id) {
    return this.todoService.getById(id);
  }

  @GrpcMethod('TodoService', 'create')
  create(todo) {
    return this.todoService.create(todo);
  }

  @GrpcMethod('TodoService', 'edit')
  edit(todo) {
    return this.todoService.edit(todo);
  }
  @GrpcMethod('TodoService', 'editStatus')
  editStatus(id) {
    return this.todoService.editStatus(id);
  }
}