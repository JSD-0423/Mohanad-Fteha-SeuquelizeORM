import { NextFunction, Request, Response } from "express"
import { Book } from "../db/models/models"
import { ValidationError } from "sequelize"
import { CustomError, CustomValidationError } from "../middlewares/errorHandle.middleware"
import { validateBook, validateId } from "../middlewares/validation.middleware"


const getBooks = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const books = await Book.findAll()
    return res.status(200).json(books)
  } catch (e) {
    return next(e)
  }
}

const createBook = async (req: Request<{}, {}, Book>, res: Response, next: NextFunction) => {
  const { title, author, isbn } = req.body

  try {
    validateBook(req.body)
    const ack = await Book.create({ title, author, isbn })
    res.status(201).json(ack.dataValues)
  } catch (e) {
    if (e instanceof ValidationError) {
      return next(new CustomValidationError("Invalidated Fields", e.errors))
    }
    next(e)
  }
}

const getBookById = async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {
  validateId(req.params)
  const { id } = req.params
  try {
    const ack = await Book.findByPk(id)
    if (!ack) throw new CustomError("Book not found", 404)

    res.status(200).json(ack.dataValues)
  } catch (e) {
    next(e)
  }
}

const updateBook = async (req: Request<{ id: number }, {}, Partial<Book>>, res: Response, next: NextFunction) => {
  try {
    validateId(req.params)
    const { id } = req.params
    const values = { ...req.body }
    const ack = await Book.update({ ...values }, { where: { id } })

    if (ack["0"] !== undefined) {
      res.status(204).json({ msg: "No content changed" })
      return
    }

    res.status(200).json({ msg: "Changed" })
  } catch (e) {
    next(e)
  }
}

const deleteBook = async (req: Request<{ id: number }>, res: Response, next: NextFunction) => {

  try {
    validateId(req.params)
    const { id } = req.params

    const ack = await Book.destroy({ where: { id } })
    if (!ack) throw new CustomError("Book not found", 404)

    res.json({ msg: "Successfully deleted" })
  } catch (e) {
    next(e)
  }
}
export { getBooks, createBook, getBookById, updateBook, deleteBook }