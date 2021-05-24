const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});

const mongoURI = "mongodb://localhost:27017/mern-auth" || process.env.MONGO_URI;

mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) {
      throw err;
    } else {
      console.log("Database Connected...");
    }
  }
);

app.use("/users", require("./routes/userRouter"));
app.use("/public", require("./routes/contactRouter"));
app.use("/author", require("./routes/authorRouter"));
app.use("/member", require("./routes/memberRouter"));
app.use("/book", require("./routes/bookRouter"));
