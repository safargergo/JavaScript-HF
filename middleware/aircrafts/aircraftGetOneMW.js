const requireOption = require("../requireOption");

/**
 * Az adott id-jú aircraft-hoz tartozó adatokat kéri le az adatbázisból. 
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
    const AircaftModel = requireOption(objectrepository, "AircraftModel");
    return function (req, res, next) {

        AircaftModel.findOne({ _id: req.params.aircraftid}, (err, aircraft) => {
            if (err){
                return next(err);
            }
            if (!aircraft){
                return next(err);
            }

            res.locals.aircraft = aircraft;
            return next();
        });

        /*res.locals.aircraft = {
                _id: "id1",
                RegMark: "HA-123",
                Manufacture: "Airbus",
                Type: "plane",
                TravSpeed: "850 km/h"
            }

        return next();*/
    };
};