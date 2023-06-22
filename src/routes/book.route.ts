import express, { Router } from "express"
import { createBook, getBooks, getBookById, deleteBook, updateBook } from "../controllers/book.controller"

const bookRouter: Router = express.Router()

bookRouter.get('/', getBooks)

bookRouter.post('/', createBook)

bookRouter.get('/:id', getBookById)

bookRouter.patch('/:id', updateBook)

bookRouter.delete("/:id", deleteBook)

export default bookRouter