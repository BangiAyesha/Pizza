const mongoose = require("mongoose");

const Userdetails = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model("userdetails", Userdetails);
