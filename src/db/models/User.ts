
import { Table, Column, Model, DataType, BeforeCreate, BelongsToMany } from 'sequelize-typescript';
import { hashPassword } from '../../utils/bcrypt';
import { Book } from './Book';
import { UserBooks } from './UserBooks';

@Table({
  timestamps: false,
  tableName: "User"
})

export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @BelongsToMany(() => Book, () => UserBooks)
  books!: Book[];

  @BeforeCreate
  static hashPassword(user: User) {
    const hash = hashPassword(user.password);
    user.password = hash;
  }

  public addBook(book: Book) {
    return this.$add('book', book);
  }
}