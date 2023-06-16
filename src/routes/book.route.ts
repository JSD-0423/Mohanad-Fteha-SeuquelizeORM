import express, { NextFunction, Request, Response, Router } from "express"
import { createBook, getBooks, getBookById, deleteBook } from "../controllers/book.controller"
import Book from "../dto/book.dto"

const bookRouter: Router = express.Router()

bookRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  getBooks(res, next)
})

bookRouter.post('/', (req: Request<{}, {}, Book>, res: Response, next: NextFunction) => {
  createBook(req, res, next)
})

bookRouter.get('/:id', (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
  getBookById(req, res, next)
})

bookRouter.delete("/:id", (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
  deleteBook(req, res, next)
})

export default bookRouter