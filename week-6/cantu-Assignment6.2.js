/**
 * Author: Jonathan Cantu
 * Course: WEB335
 * Assignment: Hands-On 6.1 Aggregate Queries
 */

// a. Display all students:
db.students.find().pretty();

// b. Add a new student:
db.students.insertOne({
    firstName: "Jon",
    lastName: "Cantu",
    studentId: "s1019",
    houseId: "h1009"
});

db.students.find({
    studentId: "s1019"
});

// c. Update one property from student previously  added:
db.students.updateOne(
    { studentId: "s1019" },
    {
        $set: {
            firstName: "Jonathan"
        }
    }
);

db.students.find({
    studentId: "s1019"
});

// d. Delete student:
db.students.deleteOne({
    studentId: "s1019"
});

db.students.find({
    studentId: "s1019"
});

// e. Display all students by house.
db.houses.aggregate([
  {
    $lookup: {
      from: "students",
      localField: "houseId",
      foreignField: "houseId",
      as: "students"
    }
  },
  {
    $project: {
      _id: 0,
      founder: 1,
      mascot: 1,
      students: {
        firstName: 1,
        lastName: 1,
        studentId: 1
      }
    }
  }
]);

// f. Display Gryffindor students.
db.houses.aggregate([
    {
        $match: {
            founder: "Godric Gryffindor"
        }
    },
    {
        $lookup: {
            from: "students",
            localField: "houseId",
            foreignField: "houseId",
            as: "students"
        }
    }
]);

// g. Display Eagle house students.
db.houses.aggregate([
    {
        $match: {
            mascot: "Eagle"
        }
    },
    {
        $lookup: {
            from: "students",
            localField: "houseId",
            foreignField: "houseId",
            as: "students"
        }
    }
]);

