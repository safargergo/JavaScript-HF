
const requireOption = require('../requireOption');

/**
 * Lekéri az adatbázisból az összes repülőt.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {

    const AircaftModel = requireOption(objectrepository, "AircraftModel");

    return function (req, res, next) {
        AircaftModel.find({}, (err, aircrafts) => {
            if (err){
                return next(err);
            }

            res.locals.aircrafts = aircrafts;
            return next();
        });

    };
};