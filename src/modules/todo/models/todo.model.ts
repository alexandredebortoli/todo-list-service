import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Todo extends Model {
  @Column({
    primaryKey: true,
    type: 'string',
    allowNull: false
  })
  uid!: string;

  @Column({
    allowNull: false
  })
  title!: string;

  @Column({
    allowNull: false
  })
  description!: string;

  @Column({
    allowNull: false
  })
  time!: string; // Date

  @Column({
    allowNull: false
  })
  completed!: boolean;
}