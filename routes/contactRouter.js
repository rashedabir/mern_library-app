const router = require("express").Router();
const Contact = require("../models/contactModel");

router.post("/contact", async (req, res) => {
  try {
    const { firstName, lastName, subject } = req.body;
    if (!firstName || !lastName || !subject) {
      return res
        .status(400)
        .json({ msg: "Not all Feilds Have Been Entered.." });
    }
    if (firstName.length < 3){
        return res
        .status(400)
        .json({ msg: "First Name Must Be at Least 3 Characters Long." });
    }
    if (lastName.length < 3){
        return res
        .status(400)
        .json({ msg: "Last Name Must Be at Least 3 Characters Long." });
    }
    if (subject.length < 10){
        return res
        .status(400)
        .json({ msg: "subject Must Be at Least 10 Characters Long." });
    }
    const newContact = new Contact({
      firstName,
      lastName,
      subject,
    });

    const savedContact = await newContact.save();
    res.json(savedContact);
  } catch (err) {
    res.json(500).json({ error: err.message });
  }
});

module.exports = router;
