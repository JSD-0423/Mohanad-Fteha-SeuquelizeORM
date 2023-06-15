import express, { NextFunction, Request, Response, Router } from "express"
import { createBook, getBooks } from "../controllers/book.controller";

const bookRouter: Router = express.Router();

bookRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  getBooks(res, next);
})

bookRouter.post('/', (req, res) => {
  createBook(req, res);
})

export default bookRouter