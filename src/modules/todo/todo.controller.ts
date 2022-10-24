import { EditTodoDTO } from './dto/edit-todo.dto';
import { TodoService } from './todo.service';
import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { TodoDTO } from './dto/todo.dto';

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
  async create(todo: TodoDTO) {
    return this.todoService.create(todo);
  }

  @GrpcMethod('TodoService', 'edit')
  edit(todo: EditTodoDTO) {
    return this.todoService.edit(todo);
  }
  @GrpcMethod('TodoService', 'editStatus')
  editStatus({uid}: {uid: string}) {
    return this.todoService.editStatus(uid);
  }
}