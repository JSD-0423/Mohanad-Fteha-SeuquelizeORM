import { Table, Column, Model, DataType, BelongsToMany } from 'sequelize-typescript';
import { User } from './User';
import { UserBooks } from './UserBooks';

@Table({
  timestamps: false,
  tableName: "Book",
})

export class Book extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  isbn!: string;

  @BelongsToMany(() => User, () => UserBooks)
  users!: User[];

  public addUser(user: User) {
    return this.$add('user', user);
  }
}