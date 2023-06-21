import express, { Router } from "express"
import { getUsers, signIn, signUp } from "../controllers/user.controller"

const userRoute: Router = express.Router()

userRoute.get('/', getUsers)
userRoute.post('/signup', signUp)
userRoute.post('/signin', signIn)

export default userRoute