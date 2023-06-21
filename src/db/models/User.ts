
import { Table, Column, Model, DataType, BeforeCreate } from 'sequelize-typescript'
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

  @BeforeCreate
  static hashPassword(user: User) {
    const hash = hashPassword(user.password)
    user.password = hash
  }
}