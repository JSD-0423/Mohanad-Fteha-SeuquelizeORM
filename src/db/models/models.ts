
import { Table, Column, Model, DataType, BeforeCreate, BelongsToMany, ForeignKey } from 'sequelize-typescript'
import { hashPassword } from '../../utils/bcrypt'

@Table({
  timestamps: false,
  tableName: "User"
})

export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  })
  email!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string

  @BelongsToMany(() => Book, () => UserBooks)
  books!: Book[]

  @BeforeCreate
  static hashPassword(user: User) {
    const hash = hashPassword(user.password)
    user.password = hash
  }

  public addBook(book: Book) {
    return this.$add('book', book)
  }
}

@Table({
  timestamps: false,
  tableName: "Book",
})

export class Book extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  author!: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  isbn!: string

  @BelongsToMany(() => User, () => UserBooks)
  users!: User[]

  public addUser(user: User) {
    return this.$add('user', user)
  }
}

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
  userId!: number

  @ForeignKey(() => Book)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  bookId!: number
}