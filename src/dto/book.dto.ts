export default interface Book {
  id: number,
  title: string,
  author: string,
  isbn: string
}

type PartialBook = Partial<Book>

export { PartialBook }