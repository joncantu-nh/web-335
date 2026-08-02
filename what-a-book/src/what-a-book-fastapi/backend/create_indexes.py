import asyncio

from pymongo import ASCENDING, AsyncMongoClient
from pymongo.server_api import ServerApi

from app.config import settings


async def main() -> None:
    client = AsyncMongoClient(settings.mongodb_uri, server_api=ServerApi("1"))
    database = client[settings.mongodb_database]

    await database.books.create_index([("bookId", ASCENDING)], unique=True)
    await database.customers.create_index([("customerId", ASCENDING)], unique=True)
    await database.wishlistitems.create_index([("wishlistItemId", ASCENDING)], unique=True)
    await database.wishlistitems.create_index(
        [("customerId", ASCENDING), ("bookId", ASCENDING)], unique=True
    )

    await client.close()
    print("Indexes created successfully.")


if __name__ == "__main__":
    asyncio.run(main())
