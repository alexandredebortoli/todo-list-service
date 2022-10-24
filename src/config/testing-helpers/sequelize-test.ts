import { Sequelize } from 'sequelize-typescript';
import { Todo } from 'src/modules/todo/models/todo.model';

export async function createTestDb() {
  const testDb = new Sequelize({
    dialect: 'sqlite',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'testdb',
    storage: ':memory:'
  });
  testDb.addModels([
    Todo
  ]);
  await testDb.sync();
  return testDb;
}
