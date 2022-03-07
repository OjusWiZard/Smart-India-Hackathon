const mongoose = require("mongoose");

const CasteSchema = new mongoose.Schema({
    sid: String,
    phone: String,
    fullname: String,
    relation: String,
    father_name: String,
    mother_name: String,
    city: String,
    district: String,
    tehsil: String,
    state: String,
    country: String,
    community: String,
    class: String,
    association: String,
    createdAt: { type: String, default: new Date().toUTCString() },
});

module.exports = mongoose.model("caste_cert", CasteSchema);
