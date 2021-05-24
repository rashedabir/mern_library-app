const router = require("express").Router();
const Author = require("../models/authorModel");

router.post("/add", async (req, res) => {
  try {
    const { name, email, phone, gender,  address } = req.body;
    if (!name || !email || !phone || !address || !gender) {
      return res
        .status(400)
        .json({ msg: "Not all Feilds Have Been Entered.." });
    }
    if (name.length < 3) {
      return res
        .status(400)
        .json({ msg: "Name Must Be at Least 3 Characters Long." });
    }
    const existingAuthor = await Author.findOne({ email: email });
    if (existingAuthor) {
      return res
        .status(400)
        .json({ msg: "An Author with this email already exists" });
    }
    if (phone.length < 5) {
      return res
        .status(400)
        .json({ msg: "Phone Number Must Be at Least 5 Characters Long." });
    }
    const newAuthor = new Author({
      name,
      email,
      phone,
      gender,
      address,
    });
    const saveAuthor = await newAuthor.save();
    res.json(saveAuthor);
  } catch (err) {
    res.json(500).json({ error: err.message });
  }
});

router.get("/authordata", async (req, res) => {
  try {
    const author = await Author.find();
    res.json(author);
  } catch (err) {
    res.send("Error" + err);
  }
});

router.get("/deleteauthor/:id", async(req, res) => {
    await Author.findByIdAndRemove({ _id: req.params.id }, (err, auth) => {
        if(err){
            res.json(err)
        }
        else{
            res.json(auth)
        }
    })
})

module.exports = router;
