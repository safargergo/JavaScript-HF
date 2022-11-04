const Schema = require("mongoose").Schema;
const db = require("../config/database");

const User = db.model("User", {
    Name: String,
    EMail: String,
    UserName: String,
    //Password: String,
});

module.exports = User;