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

    // Instantiate our service with our model
    todoService = new TodoService(Todo);
  });
  afterAll(() => testDb.close());

  // TEST CREATE
  describe('create', () => {
    it('should return each todo added', async () => {
      const newTodo: Todo = new Todo({
        uid: '3',
        title: 'Janta',
        description: 'última refeição do dia',
        time: '07:00pm',
        completed: false
      });
      const actual = await todoService.create(newTodo);
      expect(actual).toBeTruthy();
    });
    it('should return an error', async () => {
      try {
        const newTodo: Todo = new Todo({
          description: 'última refeição do dia',
          time: '07:00pm',
          completed: false
        });
        await todoService.create(newTodo);
      } catch (error) {
        expect(error.message).toMatch('todo missing required attributes');
      }
    });
  });
  // TEST GET ALL
  describe('getAll', () => {
    it('should return a list with every todo', async () => {

      const actual = await todoService.getAll();
      console.log(actual);
      expect(actual.todos.length).toEqual(2);
    });
  });
  // TEST GET BY ID
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
  // TEST EDIT
  describe('edit', () => {
    it('should return a todo', async () => {
      const editTodo: Todo = new Todo({
        uid: '2', 
        title: 'almoco editado'
      });
      const actual = await todoService.edit(editTodo);
      expect(actual).toBeTruthy();
    });
    it('should return a error', async () => {
      try {
        const editTodo: Todo = new Todo({
          uid: '5', 
          title: 'tentando editar'
        });
        await todoService.edit(editTodo);
      } catch (error) {
        expect(error.message).toMatch('id not found');
      }
    });
  });
  // TESTE STATUS
  describe('status', () => {
    it('should return a todo', async () => {
      const editTodoStatus: Todo = new Todo({
        uid: '2'
      });
      const actual = await todoService.edit(editTodoStatus);
      expect(actual).toBeTruthy();
    });
    it('should return a error', async () => {
      try {
        const editTodoStatus: Todo = new Todo({
          uid: '9'
        });
        await todoService.edit(editTodoStatus);
      } catch (error) {
        expect(error.message).toMatch('id not found');
      }
    });
  });
});