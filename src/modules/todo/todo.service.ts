import { Todo } from './models/todo.model';
import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RpcException } from '@nestjs/microservices';
import { UUIDV4 } from 'sequelize';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_REPOSITORY')
    private todoRepository: typeof Todo
  ) {}

  private logger = new Logger(TodoService.name);
  
  async getAll(): Promise<{ todos: Todo[] }> {
    this.logger.debug('grpc request: get all')
    try {
      const todos = await this.todoRepository.findAll();
      return { todos };
    } catch (error) {
      this.logger.error(`grpc response: ${error.message}`);
    }
  }

  async getById(id): Promise<Todo> {
    this.logger.debug('grpc request: get by id');
    try {
      const todo = await this.todoRepository.findOne({ where: { uid: id.uid } });
      if(!todo) {
        throw new RpcException('id not found');
      }
      return todo;
    } catch (error) {
      this.logger.error(`grpc response: ${error.message}`);
    }
  }
  
  async create(todo: Todo): Promise<void> {
    this.logger.debug('grpc request: create');
    try {
      await this.todoRepository.create({
        uid: todo.uid,
        title: todo.title,
        description: todo.description,
        time: todo.time,
        completed: todo.completed
      });
      this.logger.debug('grpc response: new todo created successfully')
    } catch (error) {
      this.logger.error('grpc response: todo missing required attributes');
    }
  }

  async edit(todo: Todo) {
    this.logger.debug('grpc request: edit');
    try {
      const originalTodo = await this.todoRepository.findOne({ where: { uid: todo.uid } });
      if (!originalTodo) {
        throw new RpcException("id not found");
      }
      originalTodo.update(todo);
      originalTodo.save();
    } catch (error) {
      this.logger.error(`grpc response: ${error.message}`);
    }
  }

  async editStatus(id) {
    this.logger.debug('grpc request: edit status');
    try {
      const todo = await this.todoRepository.findOne({ where: { uid: id.uid } });
      if (!todo) {
        throw new RpcException("id not found");
      }
      todo.update({ completed: !todo.completed });
      todo.save();
    } catch (error) {
      this.logger.error(`grpc response: ${error.message}`);
    }
  }
}
