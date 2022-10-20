import { Todo } from './models/todo.model';
import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_REPOSITORY')
    private todoRepository: typeof Todo
  ) {}

  private logger = new Logger(TodoService.name);
  
  async getAll() {
    this.logger.debug('grpc request: get all')
    const todos = await this.todoRepository.findAll();
    return { todos };
  }

  getById(id: string) {
    this.logger.debug('grpc request: get by id')
    try {
      const todo = this.todoRepository.findByPk(id);

      if (!todo) {
        throw new RpcException("id not found");
      }

      return todo;
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  createTodo() {
    this.todoRepository.create({
      title: 'novo',
      description: 'descr',
      time: 'time',
      completed: false,
      uid: '1234'
    });
  }

  async getTodos() {
    const todos = await this.todoRepository.findAll();
    return {
      todos
    };
  }
}
