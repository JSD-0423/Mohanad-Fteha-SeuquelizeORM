import { Request, Response, NextFunction } from 'express'
import { ValidationError, ValidationErrorItem } from 'sequelize'

export class CustomError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export class CustomValidationError extends ValidationError {
  statusCode: number

  constructor(message: string, errors: ValidationErrorItem[]) {
    super(message, errors)
    this.statusCode = 422
  }
}


export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ error: error.message })
  }

  if (error instanceof CustomValidationError) {
    let { errors, statusCode } = error
    return res.status(statusCode).json({ errors: errors.map((e) => e.message) })
  }

  res.status(500).json({ error: 'Internal Server Error' })
}