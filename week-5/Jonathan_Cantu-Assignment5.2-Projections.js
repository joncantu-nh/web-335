db.users.insertOne({
    firstName: "Alice",
    lastName: "Wonderland",
    employeeId: '7777',
    email: "alice@example.com"
});

db.users.insertMany([
    { firstName: "Frasier", lastName: "Crane", age: 35, email: "frasier.crane@example.com" },
    { firstName: "Niles", lastName: "Crane", age: 33, email: "niles@example.com" }
]);

db.users.find(
    { lastName: "Crane" }
);

db.users.find(
     { firstName: "Alice" }
);

db.users.updateOne(
  { employeeId: "7777" },
  { $set: { email: "AliceInWonderland@example.com" } }
);

db.users.find(
     { employeeId: "7777" }
);

db.users.find(
   {},
   { firstName: 1, lastName: 1, email: 1, _id: 0 }
).forEach(doc => printjson(doc));
