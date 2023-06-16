import express, { NextFunction, Request, Response, Router } from "express"
import { createBook, getBooks } from "../controllers/book.controller";

const bookRouter: Router = express.Router();

bookRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  getBooks(res, next);
})

bookRouter.post('/', (req: Request, res: Response) => {
  createBook(req.body, res);
})

export default bookRouter