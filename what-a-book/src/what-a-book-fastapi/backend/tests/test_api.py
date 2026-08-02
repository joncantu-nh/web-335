import os
import re
from copy import deepcopy
from dataclasses import dataclass
from typing import Any

import pytest
from fastapi.testclient import TestClient

os.environ.setdefault("MONGODB_URI", "mongodb://example.invalid")
os.environ.setdefault("MONGODB_DATABASE", "what-a-book")
os.environ.setdefault("FRONTEND_ORIGIN", "http://localhost:3000")

from app.main import app  # noqa: E402

BOOKS = [
    {
        "bookId": "b1001",
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien",
        "genre": "Fantasy",
        "isbn13": "9780547928227",
        "firstPublishedYear": 1937,
        "edition": "Mariner Books paperback edition",
        "condition": "Very Good",
        "price": 12.95,
        "signed": False,
        "firstEdition": False,
        "notes": "A classic adventure set in Middle-earth.",
    },
    {
        "bookId": "b1002",
        "title": "Foundation",
        "author": "Isaac Asimov",
        "genre": "Science Fiction",
        "isbn13": "9780553293357",
        "firstPublishedYear": 1951,
        "edition": "Bantam mass-market paperback",
        "condition": "Very Good",
        "price": 9.95,
        "signed": False,
        "firstEdition": False,
        "notes": "The first published Foundation novel.",
    },
    {
        "bookId": "b1003",
        "title": "The Sword of Shannara",
        "author": "Terry Brooks",
        "genre": "Fantasy",
        "isbn13": None,
        "firstPublishedYear": 1977,
        "edition": "Signed collector's edition",
        "condition": "Fine",
        "price": 495.0,
        "signed": True,
        "firstEdition": False,
        "notes": "Easton Press collector's edition.",
    },
]

CUSTOMERS = [
    {"customerId": "c1001", "firstName": "Jonathan", "lastName": "Cantu"},
    {"customerId": "c1002", "firstName": "Jennifer", "lastName": "Snyder"},
]

WISHLIST_ITEMS = [
    {"wishlistItemId": "w1001", "customerId": "c1002", "bookId": "b1002"}
]


def matches(document: dict[str, Any], query: dict[str, Any]) -> bool:
    for field, expected in query.items():
        actual = document.get(field)
        if isinstance(expected, dict) and "$regex" in expected:
            flags = re.IGNORECASE if "i" in expected.get("$options", "") else 0
            if re.search(expected["$regex"], str(actual or ""), flags) is None:
                return False
        elif actual != expected:
            return False
    return True


def project(document: dict[str, Any], projection: dict[str, int] | None):
    result = deepcopy(document)
    if not projection:
        return result
    included = {key for key, value in projection.items() if value == 1}
    if included:
        result = {key: result[key] for key in included if key in result}
    if projection.get("_id") == 0:
        result.pop("_id", None)
    return result


class FakeCursor:
    def __init__(self, documents):
        self.documents = deepcopy(documents)

    def sort(self, sort_fields):
        for field, direction in reversed(sort_fields):
            self.documents.sort(
                key=lambda item: item.get(field, ""),
                reverse=direction < 0,
            )
        return self

    async def to_list(self, length=None):
        return deepcopy(self.documents if length is None else self.documents[:length])


@dataclass
class FakeInsertOneResult:
    inserted_id: str


@dataclass
class FakeDeleteResult:
    deleted_count: int


class FakeCollection:
    def __init__(self, name, database, documents):
        self.name = name
        self.database = database
        self.documents = deepcopy(documents)

    def find(self, query=None, projection=None):
        query = query or {}
        return FakeCursor([
            project(document, projection)
            for document in self.documents
            if matches(document, query)
        ])

    async def find_one(self, query, projection=None):
        for document in self.documents:
            if matches(document, query):
                return project(document, projection)
        return None

    async def distinct(self, field):
        return list({document[field] for document in self.documents if field in document})

    async def aggregate(self, pipeline):
        customer_id = next(
            (
                stage["$match"].get("customerId")
                for stage in pipeline
                if "$match" in stage
            ),
            None,
        )
        joined = []
        for item in self.documents:
            if customer_id is not None and item["customerId"] != customer_id:
                continue
            book = await self.database.books.find_one({"bookId": item["bookId"]})
            if book:
                joined.append({
                    "wishlistItemId": item["wishlistItemId"],
                    "customerId": item["customerId"],
                    "book": book,
                })
        joined.sort(key=lambda item: (item["book"]["author"], item["book"]["title"]))
        return FakeCursor(joined)

    async def insert_one(self, document):
        self.documents.append(deepcopy(document))
        return FakeInsertOneResult(document["wishlistItemId"])

    async def delete_one(self, query):
        for index, document in enumerate(self.documents):
            if matches(document, query):
                self.documents.pop(index)
                return FakeDeleteResult(1)
        return FakeDeleteResult(0)


class FakeDatabase:
    def __init__(self):
        self.books = FakeCollection("books", self, BOOKS)
        self.customers = FakeCollection("customers", self, CUSTOMERS)
        self.wishlistitems = FakeCollection("wishlistitems", self, WISHLIST_ITEMS)


class FakeAdmin:
    async def command(self, name):
        assert name == "ping"
        return {"ok": 1}


class FakeMongoClient:
    def __init__(self):
        self.admin = FakeAdmin()


@pytest.fixture()
def fake_database():
    return FakeDatabase()


@pytest.fixture()
def client(fake_database):
    app.state.database = fake_database
    app.state.mongo_client = FakeMongoClient()
    test_client = TestClient(app)
    yield test_client
    test_client.close()


def test_health(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "database": "what-a-book"}


def test_list_all_books(client):
    response = client.get("/api/books")
    assert response.status_code == 200
    assert {book["bookId"] for book in response.json()} == {"b1001", "b1002", "b1003"}


@pytest.mark.parametrize(
    ("query_string", "expected_ids"),
    [
        ("genre=Fantasy", {"b1001", "b1003"}),
        ("author=tolkien", {"b1001"}),
        ("title=shannara", {"b1003"}),
    ],
)
def test_filter_books(client, query_string, expected_ids):
    response = client.get(f"/api/books?{query_string}")
    assert response.status_code == 200
    assert {book["bookId"] for book in response.json()} == expected_ids


def test_get_book(client):
    response = client.get("/api/books/b1001")
    assert response.status_code == 200
    assert response.json()["title"] == "The Hobbit"


def test_get_missing_book_returns_404(client):
    response = client.get("/api/books/b9999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Book not found."


def test_list_genres(client):
    response = client.get("/api/genres")
    assert response.status_code == 200
    assert response.json() == ["Fantasy", "Science Fiction"]


def test_list_authors(client):
    response = client.get("/api/authors")
    assert response.status_code == 200
    assert response.json() == ["Isaac Asimov", "J.R.R. Tolkien", "Terry Brooks"]


def test_list_customers(client):
    response = client.get("/api/customers")
    assert response.status_code == 200
    assert len(response.json()) == 2


def test_get_customer(client):
    response = client.get("/api/customers/c1002")
    assert response.status_code == 200
    assert response.json()["firstName"] == "Jennifer"


def test_get_missing_customer_returns_404(client):
    response = client.get("/api/customers/c9999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Customer not found."


def test_get_customer_wishlist(client):
    response = client.get("/api/customers/c1002/wishlist")
    assert response.status_code == 200
    body = response.json()
    assert len(body) == 1
    assert body[0]["wishlistItemId"] == "w1001"
    assert body[0]["book"]["bookId"] == "b1002"


def test_get_wishlist_for_missing_customer_returns_404(client):
    response = client.get("/api/customers/c9999/wishlist")
    assert response.status_code == 404
    assert response.json()["detail"] == "Customer not found."


def test_add_book_to_wishlist(client, fake_database):
    response = client.post(
        "/api/wishlist",
        json={"customerId": "c1001", "bookId": "b1001"},
    )
    assert response.status_code == 201
    assert response.json() == {"message": "Book added to wishlist."}
    assert any(
        item["customerId"] == "c1001" and item["bookId"] == "b1001"
        for item in fake_database.wishlistitems.documents
    )


def test_add_duplicate_wishlist_item_returns_409(client):
    response = client.post(
        "/api/wishlist",
        json={"customerId": "c1002", "bookId": "b1002"},
    )
    assert response.status_code == 409
    assert "already" in response.json()["detail"].lower()


def test_add_wishlist_item_for_missing_customer_returns_404(client):
    response = client.post(
        "/api/wishlist",
        json={"customerId": "c9999", "bookId": "b1001"},
    )
    assert response.status_code == 404
    assert response.json()["detail"] == "Customer not found."


def test_add_missing_book_to_wishlist_returns_404(client):
    response = client.post(
        "/api/wishlist",
        json={"customerId": "c1001", "bookId": "b9999"},
    )
    assert response.status_code == 404
    assert response.json()["detail"] == "Book not found."


def test_add_wishlist_item_validates_request_body(client):
    response = client.post(
        "/api/wishlist",
        json={"customerId": "", "bookId": "b1001"},
    )
    assert response.status_code == 422


def test_remove_book_from_wishlist(client, fake_database):
    response = client.delete("/api/customers/c1002/wishlist/b1002")
    assert response.status_code == 200
    assert response.json() == {"message": "Book removed from wishlist."}
    assert not any(
        item["customerId"] == "c1002" and item["bookId"] == "b1002"
        for item in fake_database.wishlistitems.documents
    )


def test_remove_missing_wishlist_item_returns_404(client):
    response = client.delete("/api/customers/c1001/wishlist/b9999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Wishlist item not found."
