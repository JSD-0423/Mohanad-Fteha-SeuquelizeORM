import { Sequelize } from "sequelize"

const conn = new Sequelize("nodemysql", "root", "", {
  host: 'localhost',
  dialect: 'mysql'
})

conn.authenticate().then(() => {
  console.log("Successfully connected to the database")
}).catch(e => {
  console.log("Error connecting to a database", e)
})

export default conn