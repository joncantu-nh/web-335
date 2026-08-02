# WhatABook FastAPI + Node UI

August 1, 2026

Course: WEB335
Instructor: Prof. Richard Krasso
Students: Jonathan Cantu and Jennifer Snyder


A full-stack extension of the WhatABook MongoDB class project.

## Stack
- FastAPI REST microservice (`localhost:8000`)
- Official PyMongo asynchronous client
- MongoDB Atlas database (`what-a-book` by default)
- Node.js/Express static UI (`localhost:3000`)

## Features
- Browse all books
- Filter by title, author, or genre
- Retrieve a book by `bookId`
- List customers
- Display a complete customer wishlist using `$lookup`
- Add and remove wishlist books
- Help Center based on the TDD prototype
- Swagger/OpenAPI documentation

## Backend setup
```bash
cd backend
installrun.sh
```
Open Swagger UI at `http://localhost:8000/docs`.

## Frontend setup
In a second terminal:
```bash
cd frontend
npm install
npm start
```
Open `http://localhost:3000`.

## Environment file
The `installrun.sh` script will prompt for the MongoDB password.  If you like you can modify that script and set the environment variable outside of the script.  It will just use what's set in the environment.

```dotenv
MONGODB_URI=mongodb+srv://web335_user:${MONGODB_PWD}@bellevueuniversity.uzidtds.mongodb.net/?retryWrites=true&w=majority
MONGODB_DATABASE=what-a-book
FRONTEND_ORIGIN=http://localhost:3000
```
## Endpoints
| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | MongoDB connectivity check |
| GET | `/api/books` | List/filter books |
| GET | `/api/books/{bookId}` | Retrieve one book |
| GET | `/api/authors` | List authors |
| GET | `/api/genres` | List genres |
| GET | `/api/customers` | List customers |
| GET | `/api/customers/{customerId}` | Retrieve one customer |
| GET | `/api/customers/{customerId}/wishlist` | Complete wishlist |
| POST | `/api/wishlist` | Add a wishlist entry |
| DELETE | `/api/customers/{customerId}/wishlist/{bookId}` | Remove a wishlist entry |
