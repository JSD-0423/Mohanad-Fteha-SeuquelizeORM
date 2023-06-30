import express, { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';
import { User } from "../db/models/User";
import { Book } from "../db/models/Book";
import { UserBooks } from "../db/models/UserBooks";
import { CustomError } from "../middlewares/errorHandle.middleware";
import { validateId } from "../middlewares/validation.middleware";

const rentBookRoute: Router = express.Router();

declare global {
  namespace Express {
    interface Request {
      userId: number;
    }
  }
}

rentBookRoute.use(passport.authenticate('jwt', { session: false }));
rentBookRoute.use((req: Request, res: Response, next: NextFunction) => {
  const user = jwt.decode(req.cookies.token) as { id: number; };
  req.userId = user.id;
  next();
});

rentBookRoute.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByPk(req.userId, {
      include: {
        model: Book, through: {
          attributes: []
        }
      }
    });
    res.json(user?.books);
  } catch (e) {
    next(e);
  }
});

rentBookRoute.post('/rentBook/:id', async (req: Request<{ id: number; }>, res: Response, next: NextFunction) => {
  try {
    validateId(req.params);

    const { id } = req.params;
    const userId = req.userId;

    const user = await User.findByPk(userId, { attributes: { exclude: ["password"] } });
    const book = await Book.findByPk(id, { include: { model: User } });

    if (!book || (book.users.length > 0))
      throw new CustomError("Book not found", 404);
    if (!user)
      throw new CustomError("User not found", 404);

    const userBook = await UserBooks.create({
      userId: user.id,
      bookId: book.id
    });

    res.json(userBook);
  } catch (e) {
    next(e);
  }
});


export default rentBookRoute;