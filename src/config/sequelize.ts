import { Sequelize } from 'sequelize-typescript';
import { Todo } from 'src/modules/todo/models/todo.model';

export const createDb = [
  {
    provide: 'SEQUELIZE',
    useFactory: async ()=>{
      const db = new Sequelize({
        dialect: 'sqlite',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'tododb',
        storage: ':memory:'
      });
      db.addModels([
        Todo
      ]);
      await db.sync();
      return db;
    },

  }
]