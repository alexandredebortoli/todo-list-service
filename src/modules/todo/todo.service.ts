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
  
  async getAll():Promise<{ todos: Todo[] }> {
    this.logger.debug('grpc request: get all')
    const todos = await this.todoRepository.findAll();
    return { todos };
  }

  async getById(id: string) {
    this.logger.debug('grpc request: get by id');
    const todo = await this.todoRepository.findOne({ where: { uid: id }});
    return todo;
    // try {
    //   const todo = this.todoRepository.findByPk(id);

    //   if (!todo) {
    //     throw new RpcException("id not found");
    //   }

    //   return {...todo};
    // } catch (error) {
    //   this.logger.error(error.message);
    // }
  }
  
  async create(todo: Todo) {
    this.logger.debug('grpc request: create');
    await this.todoRepository.create({
      title: todo.title,
      description: todo.description,
      time: todo.time,
      completed: todo.completed,
      uid: todo.uid
    });
    // try {
    //   const prevLength = this.todoRepository.length;

    //   this.todoRepository.create({ todo });

    //   if (prevLength == this.todoRepository.length) {
    //     throw new RpcException("unable to create todo");
    //   }

    //   return true;
    // } catch (error) {
    //   this.logger.error(error.message);
    //   return false;
    // }
  }

  async edit(todo: Todo) {
    this.logger.debug('grpc request: edit');



    const oldTodo = await this.todoRepository.findByPk(todo.uid);
    oldTodo.update(todo);
    oldTodo.save();
    
    // try {
    //   const todo = this.getById(id);

    //   if (!todo) {
    //     throw new RpcException("id not found");
    //   }

    // } catch (error) {
    //   this.logger.error(error.message);
    // }
  }

  async editStatus(id) {
    this.logger.debug('grpc request: edit status');

    const todo = await this.todoRepository.findOne({ where: { uid: id } });
    todo.update({ completed: !todo.completed });
    todo.save();
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
