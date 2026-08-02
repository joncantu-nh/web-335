from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from pymongo import AsyncMongoClient
from pymongo.server_api import ServerApi

from .config import settings


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    client = AsyncMongoClient(
        settings.mongodb_uri,
        server_api=ServerApi("1"),
        serverSelectionTimeoutMS=5000,
    )
    await client.admin.command("ping")
    app.state.mongo_client = client
    app.state.database = client[settings.mongodb_database]
    yield
    await client.close()
