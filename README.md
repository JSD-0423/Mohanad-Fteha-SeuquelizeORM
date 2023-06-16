# Books Library Project 📚

This project is a TypeScript-based books library application that allows you to manage a collection of books. It provides API endpoints to create, retrieve, update, and delete books, with data stored in a database.

### Features

- [x] Create a new book.
- [x] Get a book by ID.
- [x] Get all books.
- [ ] Update a book.
- [ ] Delete a book.

### Technologies Used

- `NodeJS`
- `ExpressJS`
- `TypeScript`
- `Sequelize w/ MySQL`

## API Endpoints

- **Create a new book**

  - Method: `POST`
  - Endpoint: `/books`
  - Request body: JSON object representing the book details
  - Response: JSON object containing the newly created book

- **Get a book by ID**

  - Method: `GET`
  - Endpoint: `/books/:id`
  - Response: JSON object representing the book

- **Get all books**

  - Method: `GET`
  - Endpoint: `/books`
  - Response: Array of JSON objects representing all the books

- **Update a book**

  - Method: `PUT`
  - Endpoint: `/books/:id`
  - Request body: JSON object representing the updated book details
  - Response: JSON object representing the updated book

- **Delete a book**

  - Method: `DELETE`
  - Endpoint: `/books/:id`
  - Response: JSON object indicating success or failure

## Schema

[Link to the database schema](https://bit.ly/42z1kgL)

## License

[MIT License](https://chat.openai.com/c/LICENSE)
