from typing import Annotated

from pydantic import BaseModel, Field, StringConstraints


NonBlank = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1)]


class Book(BaseModel):
    bookId: NonBlank
    title: NonBlank
    author: NonBlank
    genre: NonBlank
    isbn13: str | None = None
    firstPublishedYear: int
    edition: NonBlank
    condition: NonBlank
    price: float = Field(ge=0)
    signed: bool
    firstEdition: bool
    notes: str = ""


class Customer(BaseModel):
    customerId: NonBlank
    firstName: NonBlank
    lastName: NonBlank


class WishlistCreate(BaseModel):
    customerId: NonBlank
    bookId: NonBlank


class WishlistBook(BaseModel):
    wishlistItemId: NonBlank
    customerId: NonBlank
    book: Book


class Message(BaseModel):
    message: str
