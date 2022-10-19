import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Todo extends Model {
  @Column({
    primaryKey: true,
    type: 'string'
  })
  id: string;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  time: string;

  @Column
  completed: boolean;

  @Column
  uid: string;
}