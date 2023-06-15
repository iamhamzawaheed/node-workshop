const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, default: null },
    location: { type: String, default: null },
    owner: { type: String },
    contact: { type: String },
    email: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("company", userSchema);