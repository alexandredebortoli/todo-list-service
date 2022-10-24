import { TodoService } from './todo.service';
import { Metadata, ServerUnaryCall } from "@grpc/grpc-js";
import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { Todo } from './models/todo.model';

@Controller()
export class TodoController {
  constructor(private todoService: TodoService) {}

  @GrpcMethod('TodoService', 'getAll')
  getAll() {
    return this.todoService.getAll();
  }

  @GrpcMethod('TodoService', 'getById')
  getById({uid}: {uid: string}) {
    return this.todoService.getById(uid);
  }

  @GrpcMethod('TodoService', 'create')
  create(todo: Todo) {
    return this.todoService.create(todo);
  }

  @GrpcMethod('TodoService', 'edit')
  edit(todo: Todo) {
    return this.todoService.edit(todo);
  }
  @GrpcMethod('TodoService', 'editStatus')
  editStatus({uid}: {uid: string}) {
    return this.todoService.editStatus(uid);
  }
}