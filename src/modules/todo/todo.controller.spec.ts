import { TodoService } from './todo.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';

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
              getById: jest.fn(() => { return todoList.find((todo)=>todo.uid = '2')}),
              create: jest.fn(() => {return todoList.find((todo)=>todo.uid = '1')}),
              edit: jest.fn(() => {return todoList.find((todo)=>todo.uid = '1')}),
              editStatus: jest.fn(() => {return todoList.find((todo)=>todo.uid = '1')})
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
        expect(await todoController.getAll()).toEqual(todoList);
      }
    )
  })
  describe('getById', () => {
    it(
      'must return a todo',
      async () => {
        expect(await todoController.getById({uid:'2'})).toEqual(todoList.find((todo) => todo.uid = '2'));
      }
    )
  })
  describe('create', () => {
    it(
      'must return a todo',
      async () => {
        expect(await todoController.create(todoList.at(1))).toEqual(todoList.find((todo) => todo.uid = '1'));
      }
    )
  })
  describe('edit', () => {
    it(
      'must return a todo',
      async () => {
        expect(await todoController.edit(todoList.at(1))).toEqual(todoList.find((todo) => todo.uid = '1'));
      }
    )
  })
  describe('editStatus', () => {
    it(
      'must return a todo',
      async () => {
        expect(await todoController.editStatus({uid:'1'})).toEqual(todoList.find((todo) => todo.uid = '1'));
      }
    )
  })
})