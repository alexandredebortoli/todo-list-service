import { EditTodoDTO } from './dto/edit-todo.dto';
import { TodoService } from './todo.service';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { TodoDTO } from './dto/todo.dto';

@Controller()
export class TodoController {
  constructor(private todoService: TodoService) {}

  @GrpcMethod('TodoService', 'getAll')
  async getAll(): Promise<{ todos: TodoDTO[] }> {
    return this.todoService.getAll();
  }

  @GrpcMethod('TodoService', 'getById')
  async getById({ uid }: { uid: string }): Promise<TodoDTO> {
    return this.todoService.getById(uid);
  }

  @GrpcMethod('TodoService', 'create')
  async create(todo: TodoDTO): Promise<TodoDTO> {
    return await this.todoService.create(todo);
  }

  @GrpcMethod('TodoService', 'edit')
  async edit(todo: EditTodoDTO): Promise<TodoDTO> {
    return await this.todoService.edit(todo);
  }
  @GrpcMethod('TodoService', 'editStatus')
  async editStatus({ uid }: { uid: string }): Promise<TodoDTO> {
    return await this.todoService.editStatus(uid);
  }
}
