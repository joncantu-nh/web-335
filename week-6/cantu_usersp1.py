
"""
Title: cantu_usersp1.py
Author: Jonathan Cantu
Date: 12 July 2026
Description: Hands-On 4.2 - Python with MongoDB, Part I.
This program connects to the web335DB database and performs
queries against the users collection.
"""

# Import the required modules
from urllib.parse import quote_plus
from pymongo import MongoClient

# MongoDB Atlas database credentials
username = "web335_user"
password = "<Password Goes Here>"

# Encode the username and password for use in a connection URI
encoded_username = quote_plus(username)
encoded_password = quote_plus(password)

# Build the MongoDB Atlas connection string
connection_string = (
    f"mongodb+srv://{encoded_username}:{encoded_password}"
    "@bellevueuniversity.uzidtds.mongodb.net/"
    "?retryWrites=true&w=majority"
)

# Connect to MongoDB Atlas
client = MongoClient(connection_string)

# Access the web335DB database
db = client["test"]

# Confirm authentication before running the assignment queries
client.admin.command("ping")

# Display all documents in the users collection
print("-- DISPLAYING ALL USERS --")

for user in db.users.find(
    {},
    {"firstName": 1, "lastName": 1, "_id": 0}
):
    print(user)

# Display the document where employeeId is 1011
print("\n-- DISPLAYING EMPLOYEE 1011 --")

print(db.users.find_one({"employeeId": "1011"}))

# Display the document where lastName is Mozart
print("\n-- DISPLAYING USER WITH LAST NAME MOZART --")

print(db.users.find_one({"lastName": "Mozart"}))

# Close the connection
client.close()

