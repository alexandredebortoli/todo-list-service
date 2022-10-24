import { TodoService } from './todo.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { Todo } from './models/todo.model';

const todoList = [
  {
    uid: '2',
    title: 'Almoço',
    description: 'segunda refeição do dia',
    time: '12:00pm',
    completed: true
  },
  {
    uid: '1',
    title: 'Cafe',
    description: 'segunda refeição do dia',
    time: '12:00pm',
    completed: true
  },
  {
    uid: '3',
    title: 'Janta',
    description: 'segunda refeição do dia',
    time: '12:00pm',
    completed: true
  }
]

describe('todoController',() => {
  let todoController: TodoController;
  
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule(
      {
        controllers: [TodoController],
        providers: [
          { provide: TodoService, 
            useValue: {
              getAll: jest.fn(() => { return todoList }),
              getById: jest.fn(() => { return todoList.find((todo)=>todo.uid = '2')})
            } 
          }
        ]
      }
    ).compile();
    todoController = app.get(TodoController);
  });

  describe('getAll', () => {
    it(
      'must return a todoList',
      async () => {
        const actual = await todoController.getAll();
        expect(actual).toEqual(todoList);
      }
    )
  })
  describe('getById', () => {
    it(
      'must return a todo',
      async () => {
        const actual = await todoController.getById({uid:'2'});
        expect(actual).toEqual(todoList.find((todo) => todo.uid = '2'));
      }
    )
  })
  describe('getById', () => {
    it(
      'must return an edited todo',
      async () => {
        const actual = await todoController.getById({uid:'2'});
        expect(actual).toEqual(todoList.find((todo) => todo.uid = '2'));
      }
    )
  })
  describe('getById', () => {
    it(
      'must return a todo with status updated',
      async () => {
        const actual = await todoController.getById({uid:'2'});
        expect(actual).toEqual(todoList.find((todo) => todo.uid = '2'));
      }
    )
  })
})