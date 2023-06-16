import express, { NextFunction, Request, Response, Router } from "express"
import { createBook, getBooks } from "../controllers/book.controller";
import Book from "../dto/book.dto";

const bookRouter: Router = express.Router();

bookRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log(req.query);
  getBooks(res, next);
})

bookRouter.post('/', (req: Request<{}, {}, Book>, res: Response) => {
  createBook(req, res);
})

export default bookRouter