
"""
Title: cantu_usersp1.py
Author: Jonathan Cantu
Date: 19 July 2026
Description: Hands-On 5.2 - Python with MongoDB, Part II.
A Python program that connects to MongoDB database and performs various CRUD operations.
"""

# Import the required modules
import os
from datetime import datetime, timezone
from urllib.parse import quote_plus
from pymongo import MongoClient

# Creds
username = "web335_user"
password = os.environ.get("MONGODB_PASSWORD")

if not password:
    raise ValueError(
        "The MONGODB_PASSWORD environment variable has not been configured."
    )

encoded_username = quote_plus(username)
encoded_password = quote_plus(password)

connection_string = (
    f"mongodb+srv://{encoded_username}:{encoded_password}"
    "@bellevueuniversity.uzidtds.mongodb.net/"
    "?retryWrites=true&w=majority"
)

# STEP 2: Connect
client = MongoClient(connection_string)

db = client["test"]

# Are we there yet?
client.admin.command("ping")

print("-- DISPLAYING ALL USERS --")
for user in db.users.find(
    {},
    {"firstName": 1, "lastName": 1, "_id": 0}
):
    print(user)

print("\n-- DISPLAYING EMPLOYEE 1011 --")
print(db.users.find_one({"employeeId": "1011"}))

print("\n-- DISPLAYING USER WITH LAST NAME MOZART --")
print(db.users.find_one({"lastName": "Mozart"}))

#
# STEP 3: Create a new user document
#

new_user = {
    "firstName": "Joseph",
    "lastName": "Haydn",
    "employeeId": "1013",
    "email": "jhaydn@me.com",
    "dateCreated": datetime.now(timezone.utc)
}

# Cleanup
db.users.delete_one({"employeeId": "1013"})

insert_result = db.users.insert_one(new_user)

print("-- INSERTED USER ID --")
print(insert_result.inserted_id)

#
# STEP 4: Prove that the document was created
#
print("\n-- USER DOCUMENT AFTER INSERT --")

created_user = db.users.find_one({"employeeId": "1013"})
print(created_user)

#
# STEP 5: Change the new user's email address
#
update_result = db.users.update_one(
    {"employeeId": "1013"},
    {
        "$set": {
            "email": "joseph.haydn@me.com"
        }
    }
)

print("\n-- NUMBER OF DOCUMENTS UPDATED --")
print(update_result.modified_count)

#
# STEP 6: Prove that the document was updated
#
print("\n-- USER DOCUMENT AFTER UPDATE --")

updated_user = db.users.find_one({"employeeId": "1013"})
print(updated_user)


#
# STEP 7: Remove the user document
#
delete_result = db.users.delete_one({"employeeId": "1013"})

print("\n-- NUMBER OF DOCUMENTS DELETED --")
print(delete_result.deleted_count)

#
# STEP 8: Prove that the document was deleted
#
print("\n-- SEARCHING FOR DELETED USER --")

deleted_user = db.users.find_one({"employeeId": "1013"})
print(deleted_user)


client.close()

