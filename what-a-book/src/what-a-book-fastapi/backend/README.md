# WhatABook API tests (Not Live)

```bash
source .venv/bin/activate
pip install -r requirements-dev.txt
pytest -v
```

The suite uses an in-memory fake asynchronous MongoDB layer. It does not connect to Atlas or modify production/class data.


# WhatABook Live API Tests

These are integration tests against an already-running FastAPI server. They
do not import `app.main`, so they do not depend on Python package path setup.

## Start the API

From the backend directory:

```bash
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000
```

## Install test dependencies

```bash
pip install -r requirements-live-tests.txt
```

## Run the live tests

```bash
pytest -c pytest-live.ini
```

The default target is:

```text
http://localhost:8000
```

To use another address:

```bash
WHATABOOK_API_URL=http://127.0.0.1:8000 pytest -c pytest-live.ini
```

## Data mutation

One test temporarily adds `b1056` to customer `c1001`, verifies it, and removes
it. Cleanup runs before and after the test so repeated test runs remain safe.
