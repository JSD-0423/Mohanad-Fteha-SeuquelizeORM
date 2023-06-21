import express, { NextFunction, Request, Response, Router } from "express"
import { createBook, getBooks, getBookById, deleteBook, updateBook } from "../controllers/book.controller"
import { Book } from "../db/models/Book"

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

bookRouter.patch('/:id', (req: Request<{ id: number }, {}, Partial<Book>>, res: Response, next: NextFunction) => {
  updateBook(req, res, next)
})

bookRouter.delete("/:id", (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
  deleteBook(req, res, next)
})

export default bookRouter