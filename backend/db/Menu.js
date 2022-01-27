const mongoose = require("mongoose");

const Menu = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model("menus", Menu);
