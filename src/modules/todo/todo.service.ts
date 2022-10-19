import { Todo } from './models/todo.model';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TODO_REPOSITORY')
    private todoRepository: typeof Todo
    ) {}

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
