import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Todo extends Model {
  @Column({
    primaryKey: true,
    type: 'string'
  })
  uid!: string;

  @Column
  title!: string;

  @Column
  description!: string;

  @Column
  time!: string; // Date

  @Column
  completed!: boolean;
}