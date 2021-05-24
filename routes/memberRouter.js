const router = require("express").Router();
const Member = require("../models/memberModel");

router.post("/insert", async (req, res) => {
  try {
    const { name, studentId, dob, gender, phone, type, email, address } = req.body;
    if (!name || !studentId || !dob || !phone || !type || !email || !address || !gender) {
      return res
        .status(400)
        .json({ msg: "Not all Feilds Have Been Entered.." });
    }
    const existingMember = await Member.findOne({ email: email });
    if (existingMember) {
      return res
        .status(400)
        .json({ msg: "A Member with this email already exists" });
    }
    const existingId = await Member.findOne({ studentId: studentId });
    if (existingId) {
      return res
        .status(400)
        .json({ msg: "A Member with this ID already exists" });
    }
    const newMember = new Member({
      name,
      studentId,
      dob,
      gender,
      phone,
      type,
      email,
      address,
    });
    const savedMember = await newMember.save();
    res.json(savedMember);
  } catch (err) {
    res.json(500).json({ error: err.message });
  }
});

router.get("/memberdata", async (req, res) => {
    try {
      const member = await Member.find();
      res.json(member);
    } catch (err) {
      res.send("Error" + err);
    }
  });

  router.get("/deletemember/:id", async(req, res) => {
    await Member.findByIdAndRemove({ _id: req.params.id }, (err, auth) => {
        if(err){
            res.json(err)
        }
        else{
            res.json(auth)
        }
    })
})


module.exports = router;