import { NextFunction, Request, Response } from "express"
import Book from "../db/models/Book"
import BookDTO from "../dto/book.dto"
import { ValidationError } from "sequelize"
import { CustomValidationError } from "../middlewares/errorHandle.middleware"

const getBooks = async (res: Response, next: NextFunction) => {
  try {
    const books = await Book.findAll()
    res.status(200).json(books)
  } catch (e) {
    return next(e);
  }
}

const createBook = async (req: Request<{}, {}, BookDTO>, res: Response, next: NextFunction) => {
  const { title, author, isbn } = req.body

  try {
    const ack = await Book.create({ title, author, isbn, })
    res.status(201).json(ack.dataValues)
  } catch (e) {
    if (e instanceof ValidationError) {
      return next(new CustomValidationError("Invalidated Fields", e.errors))
    }
    next(e)
  }
}

export { getBooks, createBook }