import express, { NextFunction, Request, Response, Router } from "express"
import { getBooks } from "../controllers/book.controller";

const bookRouter: Router = express.Router();

bookRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  getBooks(res, next);
})

export default bookRouter