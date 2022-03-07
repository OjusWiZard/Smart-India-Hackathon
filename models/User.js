const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    dob: String,
    email: String,
    phone: String,
    createdAt: { type: String, default: new Date().toUTCString() },
});

module.exports = mongoose.model("users", UserSchema);
