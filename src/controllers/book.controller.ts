import { NextFunction, Response } from "express"
import Book from "../db/models/Book"

const getBooks = async (res: Response, next: NextFunction) => {
  try {
    const books = await Book.findAll()
    res.status(200).json(books)
  } catch (e) {
    return next(e);
  }
}

export { getBooks }