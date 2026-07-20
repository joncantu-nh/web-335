db.customers.aggregate([
  {
    $lookup: {
      from: "wishlistitems",
      localField: "customerId",
      foreignField: "customerId",
      as: "wishlist"
    }
  },
  {
    $unwind: {
      path: "$wishlist",
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $lookup: {
      from: "books",
      localField: "wishlist.bookId",
      foreignField: "bookId",
      as: "book"
    }
  },
  {
    $unwind: {
      path: "$book",
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $project: {
      _id: 0,
      customerId: 1,
      firstName: 1,
      lastName: 1,
      wishlistItemId: "$wishlist.wishlistItemId",
      bookId: "$book.bookId",
      title: "$book.title",
      author: "$book.author",
      genre: "$book.genre",
      isbn13: "$book.isbn13",
      firstPublishedYear: "$book.firstPublishedYear",
      condition: "$book.condition",
      price: "$book.price"
    }
  },
  {
    $sort: {
      customerId: 1,
      author: 1,
      title: 1
    }
  }
]);
