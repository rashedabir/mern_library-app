const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
  },
  subject: {
    type: String,
    minlength: 10,
  },
});

module.exports = Contact = mongoose.model("contact", contactSchema);
