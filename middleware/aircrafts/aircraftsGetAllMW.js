
/**
 * Lekéri az adatbázisból az összes repülőt.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {

        res.locals.aircrafts = [
            {
                _id: "id1",
                RegMark: "HA-123",
                Manufacture: "Airbus",
                Type: "plane",
                TravSpeed: "850 km/h"
            },
            {
                _id: "id2",
                RegMark: "HA-XYZ",
                Manufacture: "Boeing",
                Type: "plane",
                TravSpeed: "840 km/h"
            }
        ]

        return next();
    };
};