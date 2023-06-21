import { Sequelize } from "sequelize-typescript"
import { User } from "./models/User"
import { Book } from "./models/Book"

const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  database: "nodemysql",
  logging: false,
  models: [Book, User],
})

export default connection