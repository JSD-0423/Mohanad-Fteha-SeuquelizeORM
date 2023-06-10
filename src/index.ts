import express, { Application } from "express"
import bookRouter from "./routes/book.route";

const app: Application = express();
app.use('/books', bookRouter);

app.listen(3000, () => console.log("Successfully connected to the server"))
