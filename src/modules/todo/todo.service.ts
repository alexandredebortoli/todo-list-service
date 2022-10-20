import { Todo } from './models/todo.model';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_REPOSITORY')
    private todoRepository: typeof Todo
  ) {}

  private logger = new Logger(TodoService.name);
  
  async getAll() {
    const todos = await this.todoRepository.findAll();
    return { todos };
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
