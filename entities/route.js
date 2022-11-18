const Schema = require("mongoose").Schema;
const db = require("../config/database");

const Route = db.model("Route", {
    Start: String,
    Destination: String,
    Distance: Number,
    Departure: String,
    Arrival: String,
    Done: Boolean,
    _Aircraft: {
        type: Schema.Types.ObjectId,
        ref: "Aircraft"
    }
});

module.exports = Route;