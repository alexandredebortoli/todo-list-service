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
            useValue: {getAll: jest.fn(() => {
              return todoList;
            }
            )} 
          }
        ]
      }
    ).compile();
    todoController = app.get(TodoController);
  });

  describe('getAll', () => {
    it(
      'deve retornar lista de todos',
      async () => {
        const actual = await todoController.getAll();
        expect(actual).toEqual(todoList);
      }
    )
  })
})