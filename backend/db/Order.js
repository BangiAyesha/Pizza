const mongoose = require("mongoose");

const Order = new mongoose.Schema({
    name: { type: String, required: true },
    items: { type: Array, required: true },
    cardnumber: { type: Number, required: true },
    total: { type: Number, required: true },
});

module.exports = mongoose.model("orders", Order);
