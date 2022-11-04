const Schema = require("mongoose").Schema;
const db = require("../config/database");

const Aircaft = db.model("Aircaft", {
    RegMark: String,
    Manufacture: String,
    Type: String,
    TravSpeed: Number,
});

module.exports = Aircaft;