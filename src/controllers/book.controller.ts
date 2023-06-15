import { NextFunction, Response } from "express"
import Book from "../db/models/Book"
import BookDTO from "../dto/book.dto"
import { ValidationErrorItem } from "sequelize"

const getBooks = async (res: Response, next: NextFunction) => {
  try {
    const books = await Book.findAll()
    res.status(200).json(books)
  } catch (e) {
    return next(e);
  }
}

const createBook = (req: Request | any, res: Response) => {
  const { title, author, isbn } = req.body

  Book.create({ title, author, isbn, }).then((value) => {
    res.status(201).json(value.dataValues);
  }).catch((err) => {
    let errors: string[] = err.errors.map((e: ValidationErrorItem) => e.message);
    res.status(422).json({ errors })
  })
}

export { getBooks, createBook }