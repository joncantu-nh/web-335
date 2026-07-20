/**
 * Title: what-a-book-install-v2.js
 * Authors: Jonathan Cantu and Jennifer Snyder
 * Course: WEB335
 * Description: Creates and seeds the WhatABook MongoDB collections
 *              in the database currently selected in mongosh.
 *
 * Usage:
 *   use("whatABookDemo1")
 *   load("what-a-book-install-v2.js")
 */

print("Installing WhatABook into database: " + db.getName());

// Drop existing collections so the script can be rerun safely.
db.books.drop();
db.customers.drop();
db.wishlistitems.drop();

// Create collections.
db.createCollection("books");
db.createCollection("customers");
db.createCollection("wishlistitems");

// Insert books.
db.books.insertMany([
  {
    "bookId": "b1001",
    "title": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasy",
    "isbn13": "9780547928227",
    "firstPublishedYear": 1937,
    "edition": "Mariner Books paperback edition",
    "condition": "Very Good",
    "price": 12.95,
    "signed": false,
    "firstEdition": false,
    "notes": "A classic adventure set in Middle-earth."
  },
  {
    "bookId": "b1002",
    "title": "The Fellowship of the Ring",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasy",
    "isbn13": "9780547928210",
    "firstPublishedYear": 1954,
    "edition": "Mariner Books paperback edition",
    "condition": "Good",
    "price": 10.95,
    "signed": false,
    "firstEdition": false,
    "notes": "The first volume of The Lord of the Rings."
  },
  {
    "bookId": "b1003",
    "title": "The Two Towers",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasy",
    "isbn13": "9780547928203",
    "firstPublishedYear": 1954,
    "edition": "Mariner Books paperback edition",
    "condition": "Very Good",
    "price": 10.95,
    "signed": false,
    "firstEdition": false,
    "notes": "The second volume of The Lord of the Rings."
  },
  {
    "bookId": "b1004",
    "title": "The Return of the King",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasy",
    "isbn13": "9780547928197",
    "firstPublishedYear": 1955,
    "edition": "Mariner Books paperback edition",
    "condition": "Very Good",
    "price": 11.95,
    "signed": false,
    "firstEdition": false,
    "notes": "The concluding volume of The Lord of the Rings."
  },
  {
    "bookId": "b1005",
    "title": "The Silmarillion",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasy",
    "isbn13": "9780544338012",
    "firstPublishedYear": 1977,
    "edition": "Mariner Books paperback edition",
    "condition": "Good",
    "price": 13.5,
    "signed": false,
    "firstEdition": false,
    "notes": "A history of the First Age of Middle-earth, edited by Christopher Tolkien."
  },
  {
    "bookId": "b1006",
    "title": "Unfinished Tales",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasy",
    "isbn13": "9780544337992",
    "firstPublishedYear": 1980,
    "edition": "Mariner Books paperback edition",
    "condition": "Very Good",
    "price": 14.95,
    "signed": false,
    "firstEdition": false,
    "notes": "A collection of narratives and essays edited by Christopher Tolkien."
  },
  {
    "bookId": "b1007",
    "title": "The Children of Húrin",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasy",
    "isbn13": "9780618894642",
    "firstPublishedYear": 2007,
    "edition": "Houghton Mifflin hardcover edition",
    "condition": "Fine",
    "price": 18.95,
    "signed": false,
    "firstEdition": false,
    "notes": "A complete narrative from the legends of the First Age."
  },
  {
    "bookId": "b1008",
    "title": "Beren and Lúthien",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasy",
    "isbn13": "9781328791825",
    "firstPublishedYear": 2017,
    "edition": "Houghton Mifflin Harcourt hardcover edition",
    "condition": "Fine",
    "price": 21.95,
    "signed": false,
    "firstEdition": false,
    "notes": "Edited by Christopher Tolkien with illustrations by Alan Lee."
  },
  {
    "bookId": "b1009",
    "title": "The Sword of Shannara",
    "author": "Terry Brooks",
    "genre": "Fantasy",
    "isbn13": null,
    "firstPublishedYear": 1977,
    "edition": "1997 Easton Press Masterpieces of Fantasy signed collector's edition",
    "condition": "Fine",
    "price": 495.0,
    "signed": true,
    "firstEdition": false,
    "notes": "Leather-bound with gold-gilded page edges and a Certificate of Authenticity signed by Terry Brooks and dated May 8, 1999. Collector's edition may not carry a standard ISBN."
  },
  {
    "bookId": "b1010",
    "title": "The Elfstones of Shannara",
    "author": "Terry Brooks",
    "genre": "Fantasy",
    "isbn13": "9780345285546",
    "firstPublishedYear": 1982,
    "edition": "Del Rey mass-market paperback",
    "condition": "Good",
    "price": 8.95,
    "signed": false,
    "firstEdition": false,
    "notes": "The second novel in the original Shannara trilogy."
  },
  {
    "bookId": "b1011",
    "title": "The Wishsong of Shannara",
    "author": "Terry Brooks",
    "genre": "Fantasy",
    "isbn13": "9780345356369",
    "firstPublishedYear": 1985,
    "edition": "Del Rey mass-market paperback",
    "condition": "Good",
    "price": 8.95,
    "signed": false,
    "firstEdition": false,
    "notes": "The third novel in the original Shannara trilogy."
  },
  {
    "bookId": "b1012",
    "title": "The Scions of Shannara",
    "author": "Terry Brooks",
    "genre": "Fantasy",
    "isbn13": "9780345371431",
    "firstPublishedYear": 1990,
    "edition": "Del Rey paperback edition",
    "condition": "Very Good",
    "price": 9.5,
    "signed": false,
    "firstEdition": false,
    "notes": "The first volume of The Heritage of Shannara."
  },
  {
    "bookId": "b1013",
    "title": "The Druid of Shannara",
    "author": "Terry Brooks",
    "genre": "Fantasy",
    "isbn13": "9780345375583",
    "firstPublishedYear": 1991,
    "edition": "Del Rey paperback edition",
    "condition": "Very Good",
    "price": 9.5,
    "signed": false,
    "firstEdition": false,
    "notes": "The second volume of The Heritage of Shannara."
  },
  {
    "bookId": "b1014",
    "title": "The Elf Queen of Shannara",
    "author": "Terry Brooks",
    "genre": "Fantasy",
    "isbn13": "9780345381676",
    "firstPublishedYear": 1992,
    "edition": "Del Rey paperback edition",
    "condition": "Good",
    "price": 9.25,
    "signed": false,
    "firstEdition": false,
    "notes": "The third volume of The Heritage of Shannara."
  },
  {
    "bookId": "b1015",
    "title": "The Talismans of Shannara",
    "author": "Terry Brooks",
    "genre": "Fantasy",
    "isbn13": "9780345386749",
    "firstPublishedYear": 1993,
    "edition": "Del Rey paperback edition",
    "condition": "Very Good",
    "price": 9.75,
    "signed": false,
    "firstEdition": false,
    "notes": "The fourth volume of The Heritage of Shannara."
  },
  {
    "bookId": "b1016",
    "title": "Running with the Demon",
    "author": "Terry Brooks",
    "genre": "Urban Fantasy",
    "isbn13": "9780345422583",
    "firstPublishedYear": 1997,
    "edition": "Del Rey paperback edition",
    "condition": "Very Good",
    "price": 10.95,
    "signed": false,
    "firstEdition": false,
    "notes": "The first book in the Word & Void trilogy."
  },
  {
    "bookId": "b1017",
    "title": "A Knight of the Word",
    "author": "Terry Brooks",
    "genre": "Urban Fantasy",
    "isbn13": "9780345424648",
    "firstPublishedYear": 1998,
    "edition": "Del Rey paperback edition",
    "condition": "Very Good",
    "price": 10.95,
    "signed": false,
    "firstEdition": false,
    "notes": "The second book in the Word & Void trilogy."
  },
  {
    "bookId": "b1018",
    "title": "Angel Fire East",
    "author": "Terry Brooks",
    "genre": "Urban Fantasy",
    "isbn13": "9780345424662",
    "firstPublishedYear": 1999,
    "edition": "Del Rey paperback edition",
    "condition": "Good",
    "price": 10.5,
    "signed": false,
    "firstEdition": false,
    "notes": "The concluding book in the Word & Void trilogy."
  },
  {
    "bookId": "b1019",
    "title": "Do Androids Dream of Electric Sheep?",
    "author": "Philip K. Dick",
    "genre": "Science Fiction",
    "isbn13": "9780345404473",
    "firstPublishedYear": 1968,
    "edition": "Del Rey paperback edition",
    "condition": "Very Good",
    "price": 11.95,
    "signed": false,
    "firstEdition": false,
    "notes": "The novel that inspired Blade Runner."
  },
  {
    "bookId": "b1020",
    "title": "The Man in the High Castle",
    "author": "Philip K. Dick",
    "genre": "Alternate History",
    "isbn13": "9780547572482",
    "firstPublishedYear": 1962,
    "edition": "Mariner Books paperback edition",
    "condition": "Very Good",
    "price": 12.95,
    "signed": false,
    "firstEdition": false,
    "notes": "An alternate-history novel and Hugo Award winner."
  },
  {
    "bookId": "b1021",
    "title": "Ubik",
    "author": "Philip K. Dick",
    "genre": "Science Fiction",
    "isbn13": "9780547572291",
    "firstPublishedYear": 1969,
    "edition": "Mariner Books paperback edition",
    "condition": "Good",
    "price": 12.5,
    "signed": false,
    "firstEdition": false,
    "notes": "A reality-bending science-fiction novel."
  },
  {
    "bookId": "b1022",
    "title": "A Scanner Darkly",
    "author": "Philip K. Dick",
    "genre": "Science Fiction",
    "isbn13": "9780547572178",
    "firstPublishedYear": 1977,
    "edition": "Mariner Books paperback edition",
    "condition": "Very Good",
    "price": 13.95,
    "signed": false,
    "firstEdition": false,
    "notes": "A dystopian novel about identity, addiction, and surveillance."
  },
  {
    "bookId": "b1023",
    "title": "VALIS",
    "author": "Philip K. Dick",
    "genre": "Science Fiction",
    "isbn13": "9780547572413",
    "firstPublishedYear": 1981,
    "edition": "Mariner Books paperback edition",
    "condition": "Good",
    "price": 12.95,
    "signed": false,
    "firstEdition": false,
    "notes": "The first published novel in the VALIS sequence."
  },
  {
    "bookId": "b1024",
    "title": "Flow My Tears, the Policeman Said",
    "author": "Philip K. Dick",
    "genre": "Science Fiction",
    "isbn13": "9780547572253",
    "firstPublishedYear": 1974,
    "edition": "Mariner Books paperback edition",
    "condition": "Very Good",
    "price": 12.95,
    "signed": false,
    "firstEdition": false,
    "notes": "A novel about a celebrity whose identity suddenly disappears."
  },
  {
    "bookId": "b1025",
    "title": "The Three Stigmata of Palmer Eldritch",
    "author": "Philip K. Dick",
    "genre": "Science Fiction",
    "isbn13": "9780547572550",
    "firstPublishedYear": 1965,
    "edition": "Mariner Books paperback edition",
    "condition": "Good",
    "price": 12.5,
    "signed": false,
    "firstEdition": false,
    "notes": "A psychedelic exploration of reality and corporate power."
  },
  {
    "bookId": "b1026",
    "title": "Martian Time-Slip",
    "author": "Philip K. Dick",
    "genre": "Science Fiction",
    "isbn13": "9780547572536",
    "firstPublishedYear": 1964,
    "edition": "Mariner Books paperback edition",
    "condition": "Good",
    "price": 11.95,
    "signed": false,
    "firstEdition": false,
    "notes": "A novel about colonization, time, and social control on Mars."
  },
  {
    "bookId": "b1027",
    "title": "Foundation",
    "author": "Isaac Asimov",
    "genre": "Science Fiction",
    "isbn13": "9780553293357",
    "firstPublishedYear": 1951,
    "edition": "Bantam mass-market paperback",
    "condition": "Very Good",
    "price": 9.95,
    "signed": false,
    "firstEdition": false,
    "notes": "The first published novel in the Foundation series."
  },
  {
    "bookId": "b1028",
    "title": "Foundation and Empire",
    "author": "Isaac Asimov",
    "genre": "Science Fiction",
    "isbn13": "9780553293371",
    "firstPublishedYear": 1952,
    "edition": "Bantam mass-market paperback",
    "condition": "Good",
    "price": 9.5,
    "signed": false,
    "firstEdition": false,
    "notes": "The second published novel in the Foundation series."
  },
  {
    "bookId": "b1029",
    "title": "Second Foundation",
    "author": "Isaac Asimov",
    "genre": "Science Fiction",
    "isbn13": "9780553293364",
    "firstPublishedYear": 1953,
    "edition": "Bantam mass-market paperback",
    "condition": "Very Good",
    "price": 9.5,
    "signed": false,
    "firstEdition": false,
    "notes": "The third published novel in the Foundation series."
  },
  {
    "bookId": "b1030",
    "title": "Prelude to Foundation",
    "author": "Isaac Asimov",
    "genre": "Science Fiction",
    "isbn13": "9780553278392",
    "firstPublishedYear": 1988,
    "edition": "Bantam mass-market paperback",
    "condition": "Very Good",
    "price": 9.95,
    "signed": false,
    "firstEdition": false,
    "notes": "A prequel focused on Hari Seldon's development of psychohistory."
  },
  {
    "bookId": "b1031",
    "title": "Forward the Foundation",
    "author": "Isaac Asimov",
    "genre": "Science Fiction",
    "isbn13": "9780553565072",
    "firstPublishedYear": 1993,
    "edition": "Bantam mass-market paperback",
    "condition": "Good",
    "price": 9.95,
    "signed": false,
    "firstEdition": false,
    "notes": "The final Foundation novel written by Asimov."
  },
  {
    "bookId": "b1032",
    "title": "I, Robot",
    "author": "Isaac Asimov",
    "genre": "Science Fiction",
    "isbn13": "9780553382563",
    "firstPublishedYear": 1950,
    "edition": "Bantam Spectra trade paperback",
    "condition": "Very Good",
    "price": 10.95,
    "signed": false,
    "firstEdition": false,
    "notes": "A linked collection of robot stories featuring the Three Laws of Robotics."
  },
  {
    "bookId": "b1033",
    "title": "The Caves of Steel",
    "author": "Isaac Asimov",
    "genre": "Science Fiction Mystery",
    "isbn13": "9780553293401",
    "firstPublishedYear": 1953,
    "edition": "Bantam mass-market paperback",
    "condition": "Good",
    "price": 9.5,
    "signed": false,
    "firstEdition": false,
    "notes": "A detective story pairing Elijah Baley with robot R. Daneel Olivaw."
  },
  {
    "bookId": "b1034",
    "title": "The Naked Sun",
    "author": "Isaac Asimov",
    "genre": "Science Fiction Mystery",
    "isbn13": "9780553293395",
    "firstPublishedYear": 1957,
    "edition": "Bantam mass-market paperback",
    "condition": "Very Good",
    "price": 9.5,
    "signed": false,
    "firstEdition": false,
    "notes": "The second Elijah Baley and R. Daneel Olivaw mystery."
  },
  {
    "bookId": "b1035",
    "title": "Interview with the Vampire",
    "author": "Anne Rice",
    "genre": "Gothic Horror",
    "isbn13": "9780345337665",
    "firstPublishedYear": 1976,
    "edition": "Ballantine mass-market paperback",
    "condition": "Very Good",
    "price": 9.95,
    "signed": false,
    "firstEdition": false,
    "notes": "The first novel in The Vampire Chronicles."
  },
  {
    "bookId": "b1036",
    "title": "The Vampire Lestat",
    "author": "Anne Rice",
    "genre": "Gothic Horror",
    "isbn13": "9780345313867",
    "firstPublishedYear": 1985,
    "edition": "Ballantine mass-market paperback",
    "condition": "Good",
    "price": 9.95,
    "signed": false,
    "firstEdition": false,
    "notes": "Lestat recounts his origins and rise as a vampire."
  },
  {
    "bookId": "b1037",
    "title": "The Queen of the Damned",
    "author": "Anne Rice",
    "genre": "Gothic Horror",
    "isbn13": "9780345351524",
    "firstPublishedYear": 1988,
    "edition": "Ballantine mass-market paperback",
    "condition": "Very Good",
    "price": 10.5,
    "signed": false,
    "firstEdition": false,
    "notes": "The third novel in The Vampire Chronicles."
  },
  {
    "bookId": "b1038",
    "title": "The Tale of the Body Thief",
    "author": "Anne Rice",
    "genre": "Gothic Horror",
    "isbn13": "9780345384751",
    "firstPublishedYear": 1992,
    "edition": "Ballantine mass-market paperback",
    "condition": "Good",
    "price": 9.75,
    "signed": false,
    "firstEdition": false,
    "notes": "Lestat exchanges bodies with a mysterious stranger."
  },
  {
    "bookId": "b1039",
    "title": "Memnoch the Devil",
    "author": "Anne Rice",
    "genre": "Gothic Horror",
    "isbn13": "9780345409676",
    "firstPublishedYear": 1995,
    "edition": "Ballantine mass-market paperback",
    "condition": "Good",
    "price": 9.75,
    "signed": false,
    "firstEdition": false,
    "notes": "Lestat is drawn into a theological journey by Memnoch."
  },
  {
    "bookId": "b1040",
    "title": "The Witching Hour",
    "author": "Anne Rice",
    "genre": "Gothic Fantasy",
    "isbn13": "9780345384461",
    "firstPublishedYear": 1990,
    "edition": "Ballantine mass-market paperback",
    "condition": "Very Good",
    "price": 11.95,
    "signed": false,
    "firstEdition": false,
    "notes": "The first novel in the Lives of the Mayfair Witches series."
  },
  {
    "bookId": "b1041",
    "title": "Frankenstein; or, The Modern Prometheus",
    "author": "Mary Shelley",
    "genre": "Gothic Science Fiction",
    "isbn13": "9780486282114",
    "firstPublishedYear": 1818,
    "edition": "Dover Thrift Edition paperback",
    "condition": "Very Good",
    "price": 6.95,
    "signed": false,
    "firstEdition": false,
    "notes": "A foundational work of Gothic literature and early science fiction."
  },
  {
    "bookId": "b1042",
    "title": "The Last Man",
    "author": "Mary Shelley",
    "genre": "Apocalyptic Science Fiction",
    "isbn13": "9780199552351",
    "firstPublishedYear": 1826,
    "edition": "Oxford World's Classics paperback",
    "condition": "Very Good",
    "price": 12.95,
    "signed": false,
    "firstEdition": false,
    "notes": "An early apocalyptic novel about a future pandemic."
  },
  {
    "bookId": "b1043",
    "title": "Watchers",
    "author": "Dean Koontz",
    "genre": "Science Fiction Thriller",
    "isbn13": "9780425188804",
    "firstPublishedYear": 1987,
    "edition": "Berkley mass-market paperback",
    "condition": "Very Good",
    "price": 9.95,
    "signed": false,
    "firstEdition": false,
    "notes": "A suspense novel centered on a genetically enhanced dog."
  },
  {
    "bookId": "b1044",
    "title": "Phantoms",
    "author": "Dean Koontz",
    "genre": "Horror",
    "isbn13": "9780425181102",
    "firstPublishedYear": 1983,
    "edition": "Berkley mass-market paperback",
    "condition": "Good",
    "price": 8.95,
    "signed": false,
    "firstEdition": false,
    "notes": "A mountain town is mysteriously emptied by an ancient threat."
  },
  {
    "bookId": "b1045",
    "title": "Lightning",
    "author": "Dean Koontz",
    "genre": "Science Fiction Thriller",
    "isbn13": "9780425192030",
    "firstPublishedYear": 1988,
    "edition": "Berkley mass-market paperback",
    "condition": "Very Good",
    "price": 9.5,
    "signed": false,
    "firstEdition": false,
    "notes": "A time-travel thriller about a mysterious guardian."
  },
  {
    "bookId": "b1046",
    "title": "Strangers",
    "author": "Dean Koontz",
    "genre": "Science Fiction Thriller",
    "isbn13": "9780425181119",
    "firstPublishedYear": 1986,
    "edition": "Berkley mass-market paperback",
    "condition": "Good",
    "price": 9.25,
    "signed": false,
    "firstEdition": false,
    "notes": "A group of strangers shares unexplained fears and hidden memories."
  },
  {
    "bookId": "b1047",
    "title": "Intensity",
    "author": "Dean Koontz",
    "genre": "Psychological Thriller",
    "isbn13": "9780553582910",
    "firstPublishedYear": 1995,
    "edition": "Bantam mass-market paperback",
    "condition": "Very Good",
    "price": 9.95,
    "signed": false,
    "firstEdition": false,
    "notes": "A fast-paced thriller centered on survival and pursuit."
  },
  {
    "bookId": "b1048",
    "title": "Odd Thomas",
    "author": "Dean Koontz",
    "genre": "Supernatural Thriller",
    "isbn13": "9780553384284",
    "firstPublishedYear": 2003,
    "edition": "Bantam trade paperback",
    "condition": "Very Good",
    "price": 11.95,
    "signed": false,
    "firstEdition": false,
    "notes": "The first novel featuring a young man who can see the dead."
  },
  {
    "bookId": "b1049",
    "title": "Fear Nothing",
    "author": "Dean Koontz",
    "genre": "Science Fiction Thriller",
    "isbn13": "9780553579751",
    "firstPublishedYear": 1997,
    "edition": "Bantam mass-market paperback",
    "condition": "Good",
    "price": 8.95,
    "signed": false,
    "firstEdition": false,
    "notes": "The first Christopher Snow novel."
  },
  {
    "bookId": "b1050",
    "title": "The Taking",
    "author": "Dean Koontz",
    "genre": "Apocalyptic Horror",
    "isbn13": "9780553584509",
    "firstPublishedYear": 2004,
    "edition": "Bantam mass-market paperback",
    "condition": "Very Good",
    "price": 9.5,
    "signed": false,
    "firstEdition": false,
    "notes": "A couple confronts a strange worldwide atmospheric event."
  },
  {
    "bookId": "b1051",
    "title": "Magic Kingdom for Sale—Sold!",
    "author": "Terry Brooks",
    "genre": "Fantasy",
    "isbn13": "9780345338587",
    "firstPublishedYear": 1986,
    "edition": "Del Rey paperback",
    "condition": "Very Good",
    "price": 9.95,
    "signed": false,
    "firstEdition": false,
    "notes": "The first novel in the Magic Kingdom of Landover series."
  },
  {
    "bookId": "b1052",
    "title": "The Black Unicorn",
    "author": "Terry Brooks",
    "genre": "Fantasy",
    "isbn13": "9780345338594",
    "firstPublishedYear": 1987,
    "edition": "Del Rey paperback",
    "condition": "Good",
    "price": 8.95,
    "signed": false,
    "firstEdition": false,
    "notes": "Second novel in the Magic Kingdom of Landover series."
  },
  {
    "bookId": "b1053",
    "title": "Wizard at Large",
    "author": "Terry Brooks",
    "genre": "Fantasy",
    "isbn13": "9780345367693",
    "firstPublishedYear": 1988,
    "edition": "Del Rey paperback",
    "condition": "Very Good",
    "price": 8.95,
    "signed": false,
    "firstEdition": false,
    "notes": "Third novel in the Magic Kingdom of Landover series."
  },
  {
    "bookId": "b1054",
    "title": "The Tangle Box",
    "author": "Terry Brooks",
    "genre": "Fantasy",
    "isbn13": "9780345388750",
    "firstPublishedYear": 1994,
    "edition": "Del Rey paperback",
    "condition": "Very Good",
    "price": 9.95,
    "signed": false,
    "firstEdition": false,
    "notes": "Fourth novel in the Magic Kingdom of Landover series."
  },
  {
    "bookId": "b1055",
    "title": "Witches' Brew",
    "author": "Terry Brooks",
    "genre": "Fantasy",
    "isbn13": "9780345420664",
    "firstPublishedYear": 1995,
    "edition": "Del Rey paperback",
    "condition": "Good",
    "price": 9.95,
    "signed": false,
    "firstEdition": false,
    "notes": "Fifth novel in the Magic Kingdom of Landover series."
  },
  {
    "bookId": "b1056",
    "title": "A Princess of Landover",
    "author": "Terry Brooks",
    "genre": "Fantasy",
    "isbn13": "9780345523501",
    "firstPublishedYear": 2009,
    "edition": "Del Rey hardcover",
    "condition": "Fine",
    "price": 14.95,
    "signed": false,
    "firstEdition": false,
    "notes": "Sixth novel in the Magic Kingdom of Landover series."
  }
]);

// Insert customers.
db.customers.insertMany([
  {
    "customerId": "c1001",
    "firstName": "Jonathan",
    "lastName": "Cantu"
  },
  {
    "customerId": "c1002",
    "firstName": "Jennifer",
    "lastName": "Snyder"
  },
  {
    "customerId": "c1003",
    "firstName": "Dolly",
    "lastName": "Presley"
  },
  {
    "customerId": "c1004",
    "firstName": "Howard",
    "lastName": "Mariner"
  },
  {
    "customerId": "c1005",
    "firstName": "Marge",
    "lastName": "Meadow"
  },
  {
    "customerId": "c1006",
    "firstName": "Alice",
    "lastName": "Wonderland"
  },
  {
    "customerId": "c1007",
    "firstName": "Frasier",
    "lastName": "Crane"
  },
  {
    "customerId": "c1008",
    "firstName": "Niles",
    "lastName": "Crane"
  },
  {
    "customerId": "c1009",
    "firstName": "Luna",
    "lastName": "Lovegood"
  },
  {
    "customerId": "c1010",
    "firstName": "Isaac",
    "lastName": "Clarke"
  },
  {
    "customerId": "c1011",
    "firstName": "Elena",
    "lastName": "Rivers"
  },
  {
    "customerId": "c1012",
    "firstName": "Marcus",
    "lastName": "Vale"
  },
  {
    "customerId": "c1013",
    "firstName": "Sophie",
    "lastName": "Bennett"
  },
  {
    "customerId": "c1014",
    "firstName": "Daniel",
    "lastName": "Hart"
  },
  {
    "customerId": "c1015",
    "firstName": "Rebecca",
    "lastName": "Stone"
  }
]);

// Insert wishlist items.
db.wishlistitems.insertMany([
  {
    "wishlistItemId": "w1001",
    "customerId": "c1001",
    "bookId": "b1001"
  },
  {
    "wishlistItemId": "w1002",
    "customerId": "c1002",
    "bookId": "b1002"
  },
  {
    "wishlistItemId": "w1003",
    "customerId": "c1003",
    "bookId": "b1003"
  },
  {
    "wishlistItemId": "w1004",
    "customerId": "c1004",
    "bookId": "b1004"
  },
  {
    "wishlistItemId": "w1005",
    "customerId": "c1005",
    "bookId": "b1005"
  },
  {
    "wishlistItemId": "w1006",
    "customerId": "c1006",
    "bookId": "b1006"
  },
  {
    "wishlistItemId": "w1007",
    "customerId": "c1007",
    "bookId": "b1007"
  },
  {
    "wishlistItemId": "w1008",
    "customerId": "c1008",
    "bookId": "b1008"
  },
  {
    "wishlistItemId": "w1009",
    "customerId": "c1009",
    "bookId": "b1009"
  },
  {
    "wishlistItemId": "w1010",
    "customerId": "c1010",
    "bookId": "b1010"
  },
  {
    "wishlistItemId": "w1011",
    "customerId": "c1011",
    "bookId": "b1011"
  },
  {
    "wishlistItemId": "w1012",
    "customerId": "c1012",
    "bookId": "b1012"
  },
  {
    "wishlistItemId": "w1013",
    "customerId": "c1013",
    "bookId": "b1013"
  },
  {
    "wishlistItemId": "w1014",
    "customerId": "c1014",
    "bookId": "b1014"
  },
  {
    "wishlistItemId": "w1015",
    "customerId": "c1015",
    "bookId": "b1015"
  },
  {
    "wishlistItemId": "w1016",
    "customerId": "c1001",
    "bookId": "b1016"
  },
  {
    "wishlistItemId": "w1017",
    "customerId": "c1002",
    "bookId": "b1017"
  },
  {
    "wishlistItemId": "w1018",
    "customerId": "c1003",
    "bookId": "b1018"
  },
  {
    "wishlistItemId": "w1019",
    "customerId": "c1004",
    "bookId": "b1019"
  },
  {
    "wishlistItemId": "w1020",
    "customerId": "c1005",
    "bookId": "b1020"
  },
  {
    "wishlistItemId": "w1021",
    "customerId": "c1006",
    "bookId": "b1021"
  },
  {
    "wishlistItemId": "w1022",
    "customerId": "c1007",
    "bookId": "b1022"
  },
  {
    "wishlistItemId": "w1023",
    "customerId": "c1008",
    "bookId": "b1023"
  },
  {
    "wishlistItemId": "w1024",
    "customerId": "c1009",
    "bookId": "b1024"
  },
  {
    "wishlistItemId": "w1025",
    "customerId": "c1010",
    "bookId": "b1025"
  },
  {
    "wishlistItemId": "w1026",
    "customerId": "c1011",
    "bookId": "b1026"
  },
  {
    "wishlistItemId": "w1027",
    "customerId": "c1012",
    "bookId": "b1027"
  },
  {
    "wishlistItemId": "w1028",
    "customerId": "c1013",
    "bookId": "b1028"
  },
  {
    "wishlistItemId": "w1029",
    "customerId": "c1014",
    "bookId": "b1029"
  },
  {
    "wishlistItemId": "w1030",
    "customerId": "c1015",
    "bookId": "b1030"
  },
  {
    "wishlistItemId": "w1031",
    "customerId": "c1001",
    "bookId": "b1031"
  },
  {
    "wishlistItemId": "w1032",
    "customerId": "c1002",
    "bookId": "b1032"
  },
  {
    "wishlistItemId": "w1033",
    "customerId": "c1003",
    "bookId": "b1033"
  },
  {
    "wishlistItemId": "w1034",
    "customerId": "c1004",
    "bookId": "b1034"
  },
  {
    "wishlistItemId": "w1035",
    "customerId": "c1005",
    "bookId": "b1035"
  },
  {
    "wishlistItemId": "w1036",
    "customerId": "c1006",
    "bookId": "b1036"
  },
  {
    "wishlistItemId": "w1037",
    "customerId": "c1007",
    "bookId": "b1037"
  },
  {
    "wishlistItemId": "w1038",
    "customerId": "c1008",
    "bookId": "b1038"
  },
  {
    "wishlistItemId": "w1039",
    "customerId": "c1009",
    "bookId": "b1039"
  },
  {
    "wishlistItemId": "w1040",
    "customerId": "c1010",
    "bookId": "b1040"
  },
  {
    "wishlistItemId": "w1041",
    "customerId": "c1011",
    "bookId": "b1041"
  },
  {
    "wishlistItemId": "w1042",
    "customerId": "c1012",
    "bookId": "b1042"
  },
  {
    "wishlistItemId": "w1043",
    "customerId": "c1013",
    "bookId": "b1043"
  },
  {
    "wishlistItemId": "w1044",
    "customerId": "c1014",
    "bookId": "b1044"
  },
  {
    "wishlistItemId": "w1045",
    "customerId": "c1015",
    "bookId": "b1045"
  },
  {
    "wishlistItemId": "w1046",
    "customerId": "c1001",
    "bookId": "b1046"
  },
  {
    "wishlistItemId": "w1047",
    "customerId": "c1002",
    "bookId": "b1047"
  },
  {
    "wishlistItemId": "w1048",
    "customerId": "c1003",
    "bookId": "b1048"
  },
  {
    "wishlistItemId": "w1049",
    "customerId": "c1004",
    "bookId": "b1049"
  },
  {
    "wishlistItemId": "w1050",
    "customerId": "c1005",
    "bookId": "b1050"
  },
  {
    "wishlistItemId": "w1051",
    "customerId": "c1006",
    "bookId": "b1051"
  },
  {
    "wishlistItemId": "w1052",
    "customerId": "c1007",
    "bookId": "b1052"
  },
  {
    "wishlistItemId": "w1053",
    "customerId": "c1008",
    "bookId": "b1053"
  },
  {
    "wishlistItemId": "w1054",
    "customerId": "c1009",
    "bookId": "b1054"
  },
  {
    "wishlistItemId": "w1055",
    "customerId": "c1010",
    "bookId": "b1055"
  },
  {
    "wishlistItemId": "w1056",
    "customerId": "c1011",
    "bookId": "b1056"
  }
]);

// Verification summary.
print("");
print("========================================");
print("WhatABook installation completed.");
print("Database: " + db.getName());
print("Books: " + db.books.countDocuments());
print("Customers: " + db.customers.countDocuments());
print("Wishlist items: " + db.wishlistitems.countDocuments());
print("========================================");
