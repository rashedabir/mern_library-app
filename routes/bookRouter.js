const router = require("express").Router();
const Author = require("../models/authorModel");
const Book = require("../models/bookModel");

router.post("/add", async (req, res) => {
  try {
    const { name, code, date, category, email, price } = req.body;
    if (!name || !code || !date || !category || !email || !price) {
      return res
        .status(400)
        .json({ msg: "Not all Feilds Have Been Entered.." });
    }
    if (name.length < 3) {
      return res
        .status(400)
        .json({ msg: "Book Name Must Be at Least 3 Characters Long." });
    }
    const varifyAuthor = await Author.findOne({ email: email });
    if (!varifyAuthor) {
      return res.status(400).json({ msg: "Author Doesn't Matched" });
    }
    const existingCode = await Book.findOne({ code: code });
    if (existingCode) {
      return res.status(400).json({ msg: "This Book Code is Already Exists" });
    }
    
    const newBook = new Book({
      name,
      code,
      date,
      category,
      email,
      price,
    });
    const saveBook = await newBook.save();
    res.json(saveBook);
  } catch (err) {
    res.json(500).json({ error: err.message });
  }
});

router.get("/bookdata", async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (err) {
      res.send("Error" + err);
    }
  });

  router.get("/deletebook/:id", async(req, res) => {
    await Book.findByIdAndRemove({ _id: req.params.id }, (err, auth) => {
        if(err){
            res.json(err)
        }
        else{
            res.json(auth)
        }
    })
})


module.exports = router;