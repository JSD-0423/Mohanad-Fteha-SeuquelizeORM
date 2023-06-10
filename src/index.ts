import express, { Application } from "express"
import bookRouter from "./routes/book.route";
import { errorHandler } from "./middlewares/errorHandle.middleware";

const app: Application = express();
app.use('/books', bookRouter);
app.use(errorHandler)

app.listen(3000, () => console.log("Successfully connected to the server"))
