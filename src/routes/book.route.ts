import express, { Response, Router } from "express"
import { getBooks } from "../controllers/book.controller";

const bookRouter: Router = express.Router();

bookRouter.get('/', (_, res: Response) => {
  getBooks(res);
})

export default bookRouter