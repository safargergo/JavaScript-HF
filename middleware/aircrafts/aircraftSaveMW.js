
const requireOption = require('../requireOption');

/**
 * A repülő adatait az adatbázisba mentő middleware.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {

    const AircraftModel = requireOption(objectrepository, "AircraftModel");

    return function (req, res, next) {
        if (typeof req.body.RegMark === "undefined"
            || typeof req.body.Manufacture === "undefined"
            || typeof req.body.Type === "undefined"
            || typeof req.body.TravSpeed === "undefined") 
            {
            return next();
        }
        if (typeof res.locals.aircraft == "undefined") {
            res.locals.aircraft = new AircraftModel();
        }

        res.locals.aircraft.RegMark = req.body.RegMark;
        res.locals.aircraft.Manufacture = req.body.Manufacture;
        res.locals.aircraft.Type = req.body.Type;
        res.locals.aircraft.TravSpeed = req.body.TravSpeed;

        res.locals.aircraft.save((err) => {
            if (err) {
                return next(err);
            }
            return res.redirect("/aircrafts")
        })
    };
};