// Display all users in the collection.
db.users.find();

// Display the user with the email address jbach@me.com.
db.users.findOne({ email: "jbach@me.com" });

// Display the user with the last name Mozart.
db.users.find({ lastName: "Mozart" });

// Display the user with the first name Richard.
db.users.find({ firstName: "Richard" });

// Display the user with employeeId 1010.
db.users.findOne({ employeeId: 1010 });
