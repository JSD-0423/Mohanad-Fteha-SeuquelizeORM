import express, { NextFunction, Request, Response, Router } from "express"
import { createBook, getBooks } from "../controllers/book.controller";
import Book from "../dto/book.dto";

const bookRouter: Router = express.Router();

bookRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  getBooks(res, next);
})

bookRouter.post('/', (req: Request<{}, {}, Book>, res: Response, next: NextFunction) => {
  createBook(req, res, next);
})

export default bookRouter