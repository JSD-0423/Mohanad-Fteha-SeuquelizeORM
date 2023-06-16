import express, { Application, Request } from "express"
import bookRouter from "./routes/book.route";
import { errorHandler } from "./middlewares/errorHandle.middleware";

const app: Application = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/books', bookRouter);
app.use(errorHandler)

app.listen(3000, () => console.log("Successfully connected to the server"))
