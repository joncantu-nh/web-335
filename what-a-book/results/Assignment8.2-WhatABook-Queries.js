/*
 * Title: what-a-book-queries.js
 * Authors: Jonathan Cantu and Jennifer Snyder
 * Course: WEB335 - NoSQL Databases
 * Assignment: 8.2 - WhatABook Database Queries
 *
 * Description:
 * MongoDB shell queries to demonstrate the functionality of the
 * WhatABook database.
 */

// Select the WhatABook database
db = db.getSiblingDB("whatABook");

// Search values (modify if desired)
const genreToFind = "Fantasy";
const authorToFind = "Terry Brooks";
const bookIdToFind = "b1009";

/*************************************************************
 * Query 1 - Display a list of all books
 *************************************************************/
print("\n==================================================");
print("1. LIST OF ALL BOOKS");
print("==================================================");

db.books.find(
    {},
    {
        _id: 0,
        bookId: 1,
        title: 1,
        author: 1,
        genre: 1,
        price: 1
    }
)
.sort({ title: 1 })
.forEach(book => printjson(book));


/*************************************************************
 * Query 2 - Display a list of books by genre
 *************************************************************/
print("\n==================================================");
print("2. LIST OF BOOKS BY GENRE");
print("==================================================");

db.books.find(
    { genre: genreToFind },
    {
        _id: 0,
        bookId: 1,
        title: 1,
        author: 1,
        genre: 1,
        price: 1
    }
)
.sort({ author: 1, title: 1 })
.forEach(book => printjson(book));


/*************************************************************
 * Query 3 - Display a list of books by author
 *************************************************************/
print("\n==================================================");
print("3. LIST OF BOOKS BY AUTHOR");
print("==================================================");

db.books.find(
    { author: authorToFind },
    {
        _id: 0,
        bookId: 1,
        title: 1,
        author: 1,
        genre: 1,
        price: 1
    }
)
.sort({ title: 1 })
.forEach(book => printjson(book));


/*************************************************************
 * Query 4 - Display a book by bookId
 *************************************************************/
print("\n==================================================");
print("4. DISPLAY BOOK BY BOOK ID");
print("==================================================");

const book = db.books.findOne(
    { bookId: bookIdToFind },
    {
        _id: 0,
        bookId: 1,
        title: 1,
        author: 1,
        genre: 1,
        isbn13: 1,
        firstPublishedYear: 1,
        condition: 1,
        price: 1,
        signed: 1,
        firstEdition: 1,
        notes: 1
    }
);

if (book) {
    printjson(book);
} else {
    print("No book found with bookId: " + bookIdToFind);
}
