
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { User } from "../db/models/User"
import { ValidationError } from "sequelize"
import { CustomError, CustomValidationError } from "../middlewares/errorHandle.middleware"
import { compare } from "../utils/bcrypt"

interface Payload {
  id: number,
  name: string,
  email: string
}

const getUsers = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } })
    return res.json(users)
  } catch (e) {
    return next(e)
  }
}

export const signUp = async (req: Request<{}, {}, User>, res: Response, next: NextFunction) => {
  const body = req.body

  try {
    const user = await User.create({ ...body })
    const payload: Payload = {
      id: user.id,
      name: user.name,
      email: user.email
    }

    res.json({
      success: true,
      user: payload
    })
  } catch (e) {
    console.log(e)

    if (e instanceof ValidationError) {
      return next(new CustomValidationError("Invalidated Fields", e.errors))
    }
    next(e)
  }
}

export const signIn = async (req: Request<{}, {}, User>, res: Response, next: NextFunction) => {
  const body = req.body

  try {
    const user = await User.findByPk(body.id)


    if (!user) {
      throw new CustomError("User not found", 404)
    }

    if (!compare(body.password, user.password)) {
      throw new CustomError("Invalid credentials", 401)
    }

    const payload: Payload = {
      id: user.id,
      name: user.name,
      email: user.email
    }

    const token = generateToken(payload, "GM")

    res.json({
      success: true,
      token
    })
  } catch (e) {
    if (e instanceof ValidationError) {
      return next(new CustomValidationError("Invalidated Fields", e.errors))
    }
    next(e)
  }
}

const generateToken = (payload: any, secret: string) => {
  const token = jwt.sign(payload, secret, { expiresIn: '10m' })
  return token
}

export { getUsers }