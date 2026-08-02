# 'What-A-Book' Project

Date: August 1. 2026
Instructor: Prof. Richard Krasso
Students: Jonathan Cantu and Jennifer Snyder

Note that there are README.md files throughout that go into deeper details about, for example, the fullstack `what-a-book` application Python microservice and Node UI frontend.

## Layout of this project
- `WhatABook_TDD_2.1.docx`: The Technical Design Document for this project database.
- `diagram`: Contains the ORD of our Mongo Database
- `prototypes`: Contains Jennifer's prototypes of UI
- `results`: Contains Assignment 8.2 (queries Javascript and output) as well as a pipeline to produce a CSV of all customers and their wishlist items (CSV output included) 
- `src`: A fullstack application for the `what-a-book` database that includes a Python FastAPI backend and a Node UI frontend.  The REST service includes Pytest tests. There's also a Python script (one of the earlier assignments) to produce results from our database using Python.

```
what-a-book/
├── Assignment8.2-WhatABook-Database_ModelingAndScripts.docx
├── content
│   ├── what-a-book-books.json
│   ├── what-a-book-customers.json
│   ├── what-a-book-install.js
│   └── what-a-book-wishlistitems.json
├── diagram
│   └── WhatABook-Demo1-Diagram.jpeg
├── prototypes
│   └── wk7-335-snyder-cantu-hand-drawn-pro.pdf
├── README.md
├── results
│   ├── Assignment8.2-WhatABook-Queries.js
│   ├── Assignment8.2-WhatABook-Queries.output
│   ├── customer-wishlist-aggregate-pipeline.js
│   └── whatABookDemo1.customers.csv
├── src
│   ├── cantu_usersp2.py
│   └── what-a-book-fastapi
│       ├── backend
│       │   ├── app
│       │   │   ├── __init__.py
│       │   │   ├── __pycache__
│       │   │   │   ├── __init__.cpython-313.pyc
│       │   │   │   ├── config.cpython-313.pyc
│       │   │   │   ├── database.cpython-313.pyc
│       │   │   │   ├── main.cpython-313.pyc
│       │   │   │   └── models.cpython-313.pyc
│       │   │   ├── config.py
│       │   │   ├── database.py
│       │   │   ├── main.py
│       │   │   └── models.py
│       │   ├── create_indexes.py
│       │   ├── installrun.sh
│       │   ├── pytest-live.ini
│       │   ├── pytest.ini
│       │   ├── README.md
│       │   ├── requirements-dev.txt
│       │   ├── requirements-live-tests.txt
│       │   ├── requirements.txt
│       │   ├── tests
│       │   │   ├── __pycache__
│       │   │   │   └── test_api.cpython-313-pytest-8.4.2.pyc
│       │   │   └── test_api.py
│       │   └── tests-live
│       │       └── tests
│       │           ├── __pycache__
│       │           │   └── test_live_api.cpython-313-pytest-8.4.2.pyc
│       │           └── test_live_api.py
│       ├── frontend
│       │   ├── package-lock.json
│       │   ├── package.json
│       │   ├── public
│       │   │   ├── app.js
│       │   │   ├── index.html
│       │   │   └── styles.css
│       │   └── server.js
│       └── README.md
└── WhatABook_TDD_2.1.docx

17 directories, 43 files
```