const router = require("express").Router();
const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");

router.post("/registration", async (req, res) => {
  try {
    let { email, password, passwordCheck, displayName } = req.body;
    if (!email || !password || !passwordCheck) {
      return res
        .status(400)
        .json({ msg: "Not all Feilds Have Been Entered.." });
    }
    if (password.length < 4) {
      return res
        .status(400)
        .json({ msg: "Password Must Be at Least 4 Characters Long." });
    }
    if (password !== passwordCheck) {
      return res
        .status(400)
        .json({ msg: "Enter The Same Password Twice for Verification." });
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "An Account with this email already exists" });
    }
    if (!displayName) {
      displayName = email;
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.json(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Not all Feilds Have Been Entered.." });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "No Account With This Email is Registerd..." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credential.." });
    }

    const secret =
      'zK,69k.9$5tT8aC^c$)$;T"bk5eK7y]q-6":LRg=4h$;!wwj' ||
      process.env.JWT_TOKEN;

    const token = jwt.sign({ id: user._id, expiresIn: '2h' }, secret);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
        email: user.email,
      },
    });
  } catch (err) {
    res.json(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.user);
    res.json(deleteUser);
  } catch (error) {}
});

router.post("/tokenIsValid", async (req, res) => {
  try {
      const token = req.header("x-auth-token");
      if(!token){
          return res.json(false);
      }
      const secret =
      'zK,69k.9$5tT8aC^c$)$;T"bk5eK7y]q-6":LRg=4h$;!wwj' ||
      process.env.JWT_TOKEN;
      const varified = jwt.verify(token, secret)
      if(!varified){
          return res.json(false);
      }
      const user = await User.findById(varified.id);
      if(!user){
        return res.json(false);
      }
      return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', auth, async(req, res) => {
  const user = await User.findById(req.user);
  res.json({
    displayName: user.displayName,
    id: user._id,
  });
})

module.exports = router;
