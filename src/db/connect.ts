import { Sequelize } from "sequelize-typescript"
import { User, UserBooks, Book } from "./models/models"

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  database: "nodemysql",
  logging: false,
  models: [User, Book, UserBooks],
})

export default connection