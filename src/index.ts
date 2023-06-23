import express, { Application } from "express"
import bookRouter from "./routes/book.route"
import userRoute from "./routes/user.route"
import { errorHandler } from "./middlewares/errorHandle.middleware"
import connection from "./db/connect"
import passport from "passport"
import rentBookRoute from "./routes/rentBook.route"
import cookieParser from "cookie-parser"

const app: Application = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(passport.initialize())

require("./auth/passport")

app.use('/books', bookRouter)
app.use('/users', userRoute)
app.use('/userBooks', rentBookRoute)
app.use(errorHandler)

connection
  .sync()
  .then(() => {
    console.log("Database successfully connected")
  })
  .catch((err) => {
    console.log("Error", err)
  })

app.listen(3000, () => console.log("Successfully connected to the server"))