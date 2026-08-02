"""
Live integration tests for the WhatABook FastAPI microservice.

These tests assume the API is already running, normally at:
    http://localhost:8000

Override the URL when needed:
    WHATABOOK_API_URL=http://127.0.0.1:8000 pytest -v

The add/remove test temporarily uses customer c1001 and book b1056.
It removes that relationship before and after the test so repeated runs
remain predictable.
"""

import os
from collections.abc import Generator

import httpx
import pytest


BASE_URL = os.getenv("WHATABOOK_API_URL", "http://localhost:8000").rstrip("/")

KNOWN_CUSTOMER_ID = "c1002"
KNOWN_BOOK_ID = "b1001"
KNOWN_WISHLIST_BOOK_ID = "b1002"

# This pair is not present in the original seed data.
MUTATION_CUSTOMER_ID = "c1001"
MUTATION_BOOK_ID = "b1056"


@pytest.fixture(scope="session")
def client() -> Generator[httpx.Client, None, None]:
    with httpx.Client(base_url=BASE_URL, timeout=10.0) as test_client:
        try:
            response = test_client.get("/health")
            response.raise_for_status()
        except (httpx.HTTPError, httpx.ConnectError) as exc:
            pytest.fail(
                f"Could not connect to the WhatABook API at {BASE_URL}. "
                "Start Uvicorn before running these tests. "
                f"Original error: {exc}",
                pytrace=False,
            )

        yield test_client


def remove_test_wishlist_item(client: httpx.Client) -> None:
    """Remove the temporary test pair when it exists."""
    response = client.delete(
        f"/api/customers/{MUTATION_CUSTOMER_ID}"
        f"/wishlist/{MUTATION_BOOK_ID}"
    )
    assert response.status_code in (200, 404)


def test_health(client: httpx.Client) -> None:
    response = client.get("/health")

    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "ok"
    assert "database" in body


def test_list_all_books(client: httpx.Client) -> None:
    response = client.get("/api/books")

    assert response.status_code == 200
    books = response.json()
    assert isinstance(books, list)
    assert len(books) >= 56
    assert all("bookId" in book for book in books)


@pytest.mark.parametrize(
    ("params", "expected_book_id"),
    [
        ({"genre": "Fantasy"}, "b1001"),
        ({"author": "J.R.R. Tolkien"}, "b1001"),
        ({"title": "The Hobbit"}, "b1001"),
    ],
)
def test_filter_books(
    client: httpx.Client,
    params: dict[str, str],
    expected_book_id: str,
) -> None:
    response = client.get("/api/books", params=params)

    assert response.status_code == 200
    books = response.json()
    assert books
    assert expected_book_id in {book["bookId"] for book in books}


def test_get_book(client: httpx.Client) -> None:
    response = client.get(f"/api/books/{KNOWN_BOOK_ID}")

    assert response.status_code == 200
    book = response.json()
    assert book["bookId"] == KNOWN_BOOK_ID
    assert book["title"] == "The Hobbit"


def test_get_missing_book_returns_404(client: httpx.Client) -> None:
    response = client.get("/api/books/b9999")

    assert response.status_code == 404
    assert response.json()["detail"] == "Book not found."


def test_list_genres(client: httpx.Client) -> None:
    response = client.get("/api/genres")

    assert response.status_code == 200
    genres = response.json()
    assert isinstance(genres, list)
    assert "Fantasy" in genres
    assert "Science Fiction" in genres


def test_list_authors(client: httpx.Client) -> None:
    response = client.get("/api/authors")

    assert response.status_code == 200
    authors = response.json()
    assert isinstance(authors, list)
    assert "J.R.R. Tolkien" in authors
    assert "Terry Brooks" in authors


def test_list_customers(client: httpx.Client) -> None:
    response = client.get("/api/customers")

    assert response.status_code == 200
    customers = response.json()
    assert isinstance(customers, list)
    assert len(customers) >= 15
    assert KNOWN_CUSTOMER_ID in {
        customer["customerId"] for customer in customers
    }


def test_get_customer(client: httpx.Client) -> None:
    response = client.get(f"/api/customers/{KNOWN_CUSTOMER_ID}")

    assert response.status_code == 200
    customer = response.json()
    assert customer["customerId"] == KNOWN_CUSTOMER_ID
    assert customer["firstName"] == "Jennifer"
    assert customer["lastName"] == "Snyder"


def test_get_missing_customer_returns_404(client: httpx.Client) -> None:
    response = client.get("/api/customers/c9999")

    assert response.status_code == 404
    assert response.json()["detail"] == "Customer not found."


def test_get_customer_wishlist(client: httpx.Client) -> None:
    response = client.get(
        f"/api/customers/{KNOWN_CUSTOMER_ID}/wishlist"
    )

    assert response.status_code == 200
    wishlist = response.json()
    assert isinstance(wishlist, list)
    assert wishlist

    book_ids = {item["book"]["bookId"] for item in wishlist}
    assert KNOWN_WISHLIST_BOOK_ID in book_ids

    for item in wishlist:
        assert item["customerId"] == KNOWN_CUSTOMER_ID
        assert "wishlistItemId" in item
        assert "book" in item


def test_get_wishlist_for_missing_customer_returns_404(
    client: httpx.Client,
) -> None:
    response = client.get("/api/customers/c9999/wishlist")

    assert response.status_code == 404
    assert response.json()["detail"] == "Customer not found."


def test_add_duplicate_wishlist_item_returns_409(
    client: httpx.Client,
) -> None:
    response = client.post(
        "/api/wishlist",
        json={
            "customerId": KNOWN_CUSTOMER_ID,
            "bookId": KNOWN_WISHLIST_BOOK_ID,
        },
    )

    assert response.status_code == 409
    assert "already" in response.json()["detail"].lower()


def test_add_wishlist_item_for_missing_customer_returns_404(
    client: httpx.Client,
) -> None:
    response = client.post(
        "/api/wishlist",
        json={"customerId": "c9999", "bookId": KNOWN_BOOK_ID},
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Customer not found."


def test_add_missing_book_to_wishlist_returns_404(
    client: httpx.Client,
) -> None:
    response = client.post(
        "/api/wishlist",
        json={"customerId": KNOWN_CUSTOMER_ID, "bookId": "b9999"},
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Book not found."


def test_add_wishlist_item_validates_request_body(
    client: httpx.Client,
) -> None:
    response = client.post(
        "/api/wishlist",
        json={"customerId": "", "bookId": KNOWN_BOOK_ID},
    )

    assert response.status_code == 422


def test_add_view_and_remove_wishlist_item(
    client: httpx.Client,
) -> None:
    # Ensure a previous interrupted run did not leave the test record behind.
    remove_test_wishlist_item(client)

    try:
        add_response = client.post(
            "/api/wishlist",
            json={
                "customerId": MUTATION_CUSTOMER_ID,
                "bookId": MUTATION_BOOK_ID,
            },
        )
        assert add_response.status_code == 201
        assert add_response.json() == {
            "message": "Book added to wishlist."
        }

        wishlist_response = client.get(
            f"/api/customers/{MUTATION_CUSTOMER_ID}/wishlist"
        )
        assert wishlist_response.status_code == 200

        book_ids = {
            item["book"]["bookId"]
            for item in wishlist_response.json()
        }
        assert MUTATION_BOOK_ID in book_ids

        delete_response = client.delete(
            f"/api/customers/{MUTATION_CUSTOMER_ID}"
            f"/wishlist/{MUTATION_BOOK_ID}"
        )
        assert delete_response.status_code == 200
        assert delete_response.json() == {
            "message": "Book removed from wishlist."
        }

        second_delete = client.delete(
            f"/api/customers/{MUTATION_CUSTOMER_ID}"
            f"/wishlist/{MUTATION_BOOK_ID}"
        )
        assert second_delete.status_code == 404
        assert second_delete.json()["detail"] == "Wishlist item not found."
    finally:
        # Cleanup still occurs if an assertion fails halfway through.
        remove_test_wishlist_item(client)


def test_remove_missing_wishlist_item_returns_404(
    client: httpx.Client,
) -> None:
    response = client.delete(
        f"/api/customers/{KNOWN_CUSTOMER_ID}/wishlist/b9999"
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Wishlist item not found."
