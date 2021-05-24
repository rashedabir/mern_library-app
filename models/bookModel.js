const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
    },
    code:{
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    }
})

module.exports = Book = mongoose.model("book", bookSchema);