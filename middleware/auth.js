const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res
        .status(401)
        .json({ msg: "No Authentication Token, Authorization Denied" });
    }
    const secret = '\zK,69k.9$5tT8aC^c\$)$;T"bk5eK7y]q-6":LRg=4h$;!wwj' || process.env.JWT_TOKEN;
    const varified = jwt.verify(token, secret);
    if(!varified){
        return res
        .status(401)
        .json({ msg: "Token Varified Failed, Authorization Denied" });
    }
   req.user = varified.id;
   console.log(varified);
   next();
  } catch (err) {
    res.status(500).json({error: err.message})
  }
};

module.exports = auth;
