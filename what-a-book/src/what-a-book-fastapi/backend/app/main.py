import re
from uuid import uuid4

from fastapi import FastAPI, HTTPException, Query, Request, status
from fastapi.middleware.cors import CORSMiddleware
from pymongo import ASCENDING
from pymongo.errors import DuplicateKeyError

from .config import settings
from .database import lifespan
from .models import Book, Customer, Message, WishlistBook, WishlistCreate


app = FastAPI(
    title="WhatABook API",
    version="1.0.0",
    description="FastAPI microservice for the WhatABook MongoDB project.",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=False,
    allow_methods=["GET", "POST", "DELETE"],
    allow_headers=["*"],
)


def get_db(request: Request):
    return request.app.state.database


def contains_regex(value: str) -> dict[str, str]:
    return {"$regex": re.escape(value), "$options": "i"}


@app.get("/health")
async def health(request: Request) -> dict[str, str]:
    await request.app.state.mongo_client.admin.command("ping")
    return {"status": "ok", "database": settings.mongodb_database}


@app.get("/api/books", response_model=list[Book])
async def list_books(
    request: Request,
    genre: str | None = Query(default=None),
    author: str | None = Query(default=None),
    title: str | None = Query(default=None),
) -> list[dict]:
    query: dict = {}
    if genre:
        query["genre"] = {"$regex": f"^{re.escape(genre)}$", "$options": "i"}
    if author:
        query["author"] = contains_regex(author)
    if title:
        query["title"] = contains_regex(title)

    cursor = get_db(request).books.find(query, {"_id": 0}).sort(
        [("author", ASCENDING), ("title", ASCENDING)]
    )
    return await cursor.to_list(length=500)


@app.get("/api/books/{book_id}", response_model=Book)
async def get_book(book_id: str, request: Request) -> dict:
    book = await get_db(request).books.find_one({"bookId": book_id}, {"_id": 0})
    if book is None:
        raise HTTPException(status_code=404, detail="Book not found.")
    return book


@app.get("/api/genres", response_model=list[str])
async def list_genres(request: Request) -> list[str]:
    return sorted(await get_db(request).books.distinct("genre"))


@app.get("/api/authors", response_model=list[str])
async def list_authors(request: Request) -> list[str]:
    return sorted(await get_db(request).books.distinct("author"))


@app.get("/api/customers", response_model=list[Customer])
async def list_customers(request: Request) -> list[dict]:
    cursor = get_db(request).customers.find({}, {"_id": 0}).sort(
        [("lastName", ASCENDING), ("firstName", ASCENDING)]
    )
    return await cursor.to_list(length=500)


@app.get("/api/customers/{customer_id}", response_model=Customer)
async def get_customer(customer_id: str, request: Request) -> dict:
    customer = await get_db(request).customers.find_one(
        {"customerId": customer_id}, {"_id": 0}
    )
    if customer is None:
        raise HTTPException(status_code=404, detail="Customer not found.")
    return customer

@app.get( "/api/customers/{customer_id}/wishlist", response_model=list[WishlistBook],)
async def get_wishlist(
    customer_id: str,
    request: Request,
) -> list[dict]:
    database = get_db(request)

    customer = await database.customers.find_one(
        {"customerId": customer_id}
    )

    if customer is None:
        raise HTTPException(
            status_code=404,
            detail="Customer not found.",
        )

    pipeline = [
        {
            "$match": {
                "customerId": customer_id
            }
        },
        {
            "$lookup": {
                "from": "books",
                "localField": "bookId",
                "foreignField": "bookId",
                "as": "book",
            }
        },
        {
            "$unwind": "$book"
        },
        {
            "$project": {
                "_id": 0,
                "wishlistItemId": 1,
                "customerId": 1,
                "book": {
                    "bookId": "$book.bookId",
                    "title": "$book.title",
                    "author": "$book.author",
                    "genre": "$book.genre",
                    "isbn13": "$book.isbn13",
                    "firstPublishedYear": "$book.firstPublishedYear",
                    "edition": "$book.edition",
                    "condition": "$book.condition",
                    "price": "$book.price",
                    "signed": "$book.signed",
                    "firstEdition": "$book.firstEdition",
                    "notes": "$book.notes",
                },
            }
        },
        {
            "$sort": {
                "book.author": 1,
                "book.title": 1,
            }
        },
    ]

    cursor = await get_db(request).wishlistitems.aggregate(pipeline)
    return await cursor.to_list(length=500)

@app.post("/api/wishlist", response_model=Message, status_code=status.HTTP_201_CREATED)
async def add_to_wishlist(payload: WishlistCreate, request: Request) -> Message:
    database = get_db(request)
    if await database.customers.find_one({"customerId": payload.customerId}) is None:
        raise HTTPException(status_code=404, detail="Customer not found.")
    if await database.books.find_one({"bookId": payload.bookId}) is None:
        raise HTTPException(status_code=404, detail="Book not found.")
    if await database.wishlistitems.find_one(
        {"customerId": payload.customerId, "bookId": payload.bookId}
    ):
        raise HTTPException(status_code=409, detail="Book already exists in wishlist.")

    document = {
        "wishlistItemId": f"w-{uuid4().hex[:12]}",
        "customerId": payload.customerId,
        "bookId": payload.bookId,
    }
    try:
        await database.wishlistitems.insert_one(document)
    except DuplicateKeyError as exc:
        raise HTTPException(status_code=409, detail="Book already exists in wishlist.") from exc
    return Message(message="Book added to wishlist.")


@app.delete("/api/customers/{customer_id}/wishlist/{book_id}", response_model=Message)
async def remove_from_wishlist(customer_id: str, book_id: str, request: Request) -> Message:
    result = await get_db(request).wishlistitems.delete_one(
        {"customerId": customer_id, "bookId": book_id}
    )
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Wishlist item not found.")
    return Message(message="Book removed from wishlist.")
