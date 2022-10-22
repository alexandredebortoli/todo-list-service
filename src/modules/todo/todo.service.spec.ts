import { createTestDb } from '../../config/testing-helpers/sequelize-test';
import { Sequelize } from 'sequelize-typescript';
import { TodoService } from './todo.service';
import { Todo } from './models/todo.model';
import { createTodo } from 'src/config/testing-helpers/modelFactories';

describe('TodoService', () => {
  let todoService: TodoService;
  let testDb: Sequelize;

  beforeAll(async () => {
    // Initiate Sequelize with SQLite and our models
    testDb = await createTestDb();

    // Creation of our todos
    await createTodo('1', 'Café', 'primeira refeição do dia', '07:00am', true);
    await createTodo('2', 'Almoço', 'segunda refeição do dia', '12:00pm', true);
    await createTodo('3', 'Janta', 'última refeição do dia', '07:00pm', false);

    // Instantiate our service with our model
    todoService = new TodoService(Todo);
  });
  afterAll(() => testDb.close());

  describe('getAll', () => {
    it('should return a list with every todo', async () => {

      const actual = await todoService.getAll();
      console.log(actual);
      expect(actual.todos.length).toEqual(3);
    });
  });
  describe('getById', () => {
    it('should return a todo', async () => {
      const actual = await todoService.getById('2');
      expect(actual).toBeTruthy();
    });
    it('should return a error', async () => {
      try {
        await todoService.getById('4');
      } catch (error) {
        expect(error.message).toMatch('id not found');
      }
    });
  });
});