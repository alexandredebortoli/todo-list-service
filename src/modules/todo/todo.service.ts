import { TodoDTO } from './dto/todo.dto';
import { Todo } from './models/todo.model';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { EditTodoDTO } from './dto/edit-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_REPOSITORY')
    private todoRepository: typeof Todo
  ) {}

  private logger = new Logger(TodoService.name);
  
  async getAll(): Promise<{ todos: Todo[] }> {
    this.logger.debug('grpc request: get all');
      const todos = await this.todoRepository.findAll();
      return { todos };
  }

  async getById(uid: string): Promise<Todo> {
    this.logger.debug('grpc request: get by id');
    try {
      const todo = await this.todoRepository.findOne({ where: { uid } });
      if(!todo)
        throw new RpcException('id not found');
      return todo;
    } catch (error) {
      this.logger.error(`grpc response: ${error.message}`);
      throw new RpcException(error);
    }
  }
  
  async create(todo: TodoDTO): Promise<TodoDTO> {
    this.logger.debug('grpc request: create');
    try {
      const todoExists = await this.todoRepository.findOne({ where: { uid: todo.uid } });
      if (todoExists)
        throw new RpcException('uid already exists')
      await this.todoRepository.create({ ...todo });
      this.logger.debug('grpc response: new todo created successfully');
      return await this.getById(todo.uid);
    } catch (error) {
      this.logger.error(`grpc response: ${error.message}`);
      throw new RpcException(error);
    }
  }

  async edit(todo: EditTodoDTO): Promise<TodoDTO> {
    this.logger.debug('grpc request: edit');
    try {
      const originalTodo = await this.todoRepository.findOne({ where: { uid: todo.uid } });
      if (!originalTodo)
        throw new RpcException("id not found");
      originalTodo.update(todo);
      return this.getById(todo.uid);
    } catch (error) {
      this.logger.error(`grpc response: ${error.message}`);
      throw new RpcException(error);
    }
  }

  async editStatus(uid: string): Promise<Todo> {
    this.logger.debug('grpc request: edit status');
    try {
      const todo = await this.todoRepository.findOne({ where: { uid } });
      if (!todo)
        throw new RpcException("id not found");
      todo.update({ completed: !todo.completed });
      return todo;
    } catch (error) {
      this.logger.error(`grpc response: ${error.message}`);
      throw new RpcException(error);
    }
  }
}
