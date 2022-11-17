const Schema = require("mongoose").Schema;
const db = require("../config/database");

const User = db.model("User", {
    Email: String,
    Username: String,
    Password: String
});

module.exports = User;