import { Table, Column, Model, DataType } from 'sequelize-typescript'

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
}