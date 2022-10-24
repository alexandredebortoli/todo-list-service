import { EditTodoDTO } from './dto/edit-todo.dto';
import { TodoDTO } from './dto/todo.dto';
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

  // TEST CREATE
  describe('create', () => {

    it('should return the added todo', async () => {
      const newTodo: TodoDTO = {
        uid: '3',
        title: 'Janta',
        description: 'última refeição do dia',
        time: '07:00pm',
        completed: false
      }
      const actual = await todoService.create(newTodo);
      expect(actual).toBeTruthy();
    });

    it('should return an error', async () => {
      try {
        const newTodo: TodoDTO = {
          uid: '3',
          title: 'Janta',
          description: 'última refeição do dia',
          time: '07:00pm',
          completed: false
        }
        await todoService.create(newTodo);
      } catch (error) {
        expect(error.message).toMatch('uid already exists');
      }
    });
    // não consigo testar passando todo com parâmetros faltando
  });

  // TEST EDIT
  describe('edit', () => {

    it('should return a todo', async () => {
      const editTodo: EditTodoDTO = {
        uid: '3',
        title: 'Janta editada'
      }
      expect(todoService.edit(editTodo)).toBeTruthy();
    });

    it('should return a error', async () => {
      try {
        const editTodo: EditTodoDTO = {
          uid: '7',
          title: 'Janta editada'
        }
        await todoService.edit(editTodo);
      } catch (error) {
        expect(error.message).toMatch('id not found');
      }
    });
  });

  // TESTE STATUS
  describe('editStatus', () => {

    it('should return a todo', async () => {
      expect(await todoService.editStatus('3')).toBeTruthy();
    });
  
    it('should return a error', async () => {
      try {
        await todoService.editStatus('7');
      } catch (error) {
        expect(error.message).toMatch('id not found');
      }
    });
  });
});