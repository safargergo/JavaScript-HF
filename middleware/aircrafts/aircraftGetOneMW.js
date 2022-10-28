
/**
 * Az adott id-jú aircraft-hoz tartozó adatokat kéri le az adatbázisból. 
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
    return function (req, res, next) {

        res.locals.aircraft = {
                _id: "id1",
                RegMark: "HA-123",
                Manufacture: "Airbus",
                Type: "plane",
                TravSpeed: "850 km/h"
            }

        return next();
    };
};