import joi from "joi"
import { Book, User } from "../db/models/models"
import { CustomError } from "./errorHandle.middleware"

const bookSchema = joi.object({
  title: joi.string().required(),
  author: joi.string().required(),
  isbn: joi.string().min(10).max(50).required()
})

export const validateBook = (book: Book) => {
  const { error, value } = bookSchema.validate(book)

  if (error) {
    throw new CustomError(error.message, 400)
  }

  return value
}

const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required()
})

export const validateUser = (user: User) => {
  const { error, value } = userSchema.validate(user)

  if (error) {
    throw new CustomError(error.message, 400)
  }

  return value
}

const params = joi.object({
  id: joi.number().required()
})

export const validateId = (p: { id: number }) => {
  const { error, value } = params.validate(p)

  if (error) {
    throw new CustomError(error.message, 400)
  }

  return value
}