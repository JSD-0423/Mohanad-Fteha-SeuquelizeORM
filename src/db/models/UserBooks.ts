
import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from './User';
import { Book } from './Book';

@Table({
  timestamps: false,
  tableName: "UserBooks"
})

export class UserBooks extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @ForeignKey(() => Book)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  bookId!: number;
}

