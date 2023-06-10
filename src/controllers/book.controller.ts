import { Response } from "express"
import Book from "../db/models/Book"


const getBooks = async (res: Response) => {
  try {
    const books = await Book.findAll()
    res.json(books)
  } catch (e) {
    res.send("Hello")
  }
}

export { getBooks }